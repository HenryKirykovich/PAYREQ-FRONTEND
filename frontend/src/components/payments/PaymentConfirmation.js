import React, {useEffect, useState, useCallback, useRef} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {FieldGroup, PrimaryButton, Number, LinkButton, PageHeading, AlertDanger} from "../common";
import {getInvoice, getPaymentDetails, getCard } from "./payments-api";
import {InvoiceAmount} from "./InvoiceDetails";
import Loading from "../Loading";
import {useAppState} from "../../state";
import styles from "./PaymentConfirmation.module.scss"
import {CARD_SCHEME_LABELS} from "./payment-constants";
import GenericError from "../GenericError";
import {injectIntl} from "react-intl";

const NEW_CARD = "NEW_CARD";
const SAVED_CARD = "SAVED_CARD";

const ErrorMessage = ({errorId, intl}) => (
  <div className={styles.formErrors}>
    <AlertDanger>
      {intl.formatMessage({id: errorId})}
    </AlertDanger>
  </div>
);

const payInvoice = (appState, paymentMethod, invoiceId, amount, cardScheme, redirectPath, history) => {
  axios.post(`/data/invoices/${invoiceId}/pay`, {
    paymentMethod,
    amount: amount.toString(),
    cardScheme,
  }, {
    localErrorHandling: true
  })
       .then(({data}) => {
         if (data.success) {
           history.push({
             pathname: "./payment-result",
             state: {
               data,
               invoiceId,
               redirectPath
             }
           })
         } else {
           history.push({
             pathname: "./payment-result",
             state: {
               data: {
                 success: false,
                 error: {
                   message: data.error || "generic.payments.error.paymentNotMade"}
               },
               redirectPath
             }
           })
         }
       })
       .catch(error => {
         history.push({
           pathname: "./payment-result",
           state: {
             data: {
               success: false,
               error: {
                 message: error.message
               }
             },
             redirectPath
           }
         })
       });
};

const ConfirmButton = withRouter(
    ({paymentMethod, amount, invoiceId, cardScheme, disabled, redirectPath, history}) => {
        const [appState] = useAppState();
        const [isSubmitting, setIsSubmitting] = useState(false);
        return <PrimaryButton label="payments.pay.button.label"
                              onClick={() => {
                                  setIsSubmitting(true);
                                  payInvoice(appState, paymentMethod, invoiceId, amount, cardScheme, redirectPath, history)
                              }}
                              isSubmitting={isSubmitting}
                              disabled={disabled} />
    });

const ConfirmationDetails = ({invoiceDetails, amount, cardScheme, last4Digits, paymentDetails, payNowDisabled}) => {
    return (
        <FieldGroup className={styles.confirmationDetails} fields={[
            {
              label: "payments.confirmPayment.label.to",
              value: invoiceDetails.billerName
            }, {
              label: "payments.confirmPayment.label.invoice",
              value: invoiceDetails.invoiceNo
            }, {
              label: "payments.confirmPayment.label.card",
              value: payNowDisabled ? <div className={styles.spinner} role="status" /> : `${CARD_SCHEME_LABELS[cardScheme]} ${last4Digits}`
            }, {
                label: "payments.confirmPayment.label.amount",
                value: <Number value={amount} type="currency" currency={invoiceDetails.currencyCode}/>
            }, {
              label: "payments.confirmPayment.label.surcharge",
              value: <Number value={paymentDetails.surchargeAmount} type="currency" currency={invoiceDetails.currencyCode}/>},
            {
              label: "payments.confirmPayment.label.total",
              value: <InvoiceAmount amount={paymentDetails.total} currency={invoiceDetails.currencyCode}/>
            }
        ]}/>

    )};

const PaymentActions = ({paymentMethod, invoiceId, amount, cardScheme, payNowDisabled, redirectPath, history}) => {
    return (
        <div className={styles.actions}>
            <LinkButton label="forms.generic.cancel.button"  onClick={() => history.push(redirectPath)}/>
            <ConfirmButton paymentMethod={paymentMethod}
                           invoiceId={invoiceId}
                           amount={amount}
                           cardScheme={cardScheme}
                           disabled={payNowDisabled}
                           redirectPath={redirectPath} />
        </div>
    )
};

export const PaymentConfirmationView = ({paymentMethod, amount, invoiceDetails, invoiceId, cardScheme, last4Digits, paymentDetails, payNowDisabled, redirectPath, history}) => (
    <div className={styles.container}>
        <div className={styles.detailsContainer}>
            <PageHeading className={styles.confirmationHeading} text="payments.confirmPayment.heading" showInWebview={true}/>
            <ConfirmationDetails invoiceDetails={invoiceDetails}
                                 amount={amount}
                                 cardScheme={cardScheme}
                                 last4Digits={last4Digits}
                                 paymentDetails={paymentDetails}
                                 payNowDisabled={payNowDisabled}/>
            <PaymentActions paymentMethod={paymentMethod}
                            invoiceId={invoiceId}
                            amount={amount}
                            cardScheme={cardScheme}
                            payNowDisabled={payNowDisabled}
                            redirectPath={redirectPath}
                            history={history} />
        </div>
    </div>
);

const waitForCardEncryptedPan = billerPaymentProcessor => {
  if (!billerPaymentProcessor) return false;
  // no need to wait for TokenEx token if paying a biller with a Payreq / Monoova gateway
  return billerPaymentProcessor.processorId !== 'payreq';
};

const amountsMatch = (amount1 = "", amount2 = "") => {
  if (amount1 == null || amount2 == null) {
    return false;
  }
  return amount1.toString() === amount2.toString();
};

const notifyCardWithoutEncryptedPan = (invoiceId, cardId) => {
  // fire and forget
  axios.post(`/data/invoices/${invoiceId}/notify-no-encrypted-pan`, {
    cardId
  });
};

const PaymentConfirmation = ({
  location: {
    state: {
      cardId, iframeResponse, amount, invoiceId, cardScheme, last4Digits,
      surchargePercentage, saveCard, redirectPath, primerTransactionId,
      clientPaymentTokenUniqueReference, billerPaymentProcessor
    }
  },
  history,
  intl,
}) => {

    const [invoiceDetails, setInvoiceDetails] = useState();
    const [paymentDetails, setPaymentDetails] = useState();
    const [card, setCard] = useState({});
    const [payNowDisabled, setPayNowDisabled] = useState(waitForCardEncryptedPan(billerPaymentProcessor));
    const isPollingRef = useRef(false);
    const [error, setError] = useState();

    useEffect(() => {
      getInvoice(setInvoiceDetails, invoiceId)
      getPaymentDetails(setPaymentDetails, invoiceId, amount, cardScheme);
    }, [setInvoiceDetails, invoiceId, amount, cardScheme]);

    const checkIfCardHasEncryptedPan = useCallback(async (previousWaitTime, totalWaitTime = 0) => {
      const maxWaitTime = 10 * 1000; // 10s
      if (totalWaitTime >= maxWaitTime) {
        notifyCardWithoutEncryptedPan(invoiceId, cardId);
        setError("payments.paymentForm.captureCardError");
        isPollingRef.current = false;
        return;
      }

      await new Promise(r => setTimeout(r, previousWaitTime));
      const newTotalWaitTime = totalWaitTime + previousWaitTime;

      return new Promise(resolve => {
        getCard((updatedCard) => {
          setCard(updatedCard);
          if (updatedCard.encryptedPan) {
            setPayNowDisabled(false);
            isPollingRef.current = false;
            resolve();
          } else {
            checkIfCardHasEncryptedPan(1.2 * previousWaitTime, newTotalWaitTime).then(resolve);
          }
        }, invoiceId, cardId);
      });
    }, [setCard, invoiceId, cardId]);

    useEffect(() => {
      if (cardId && billerPaymentProcessor && payNowDisabled && !card.encryptedPan && !isPollingRef.current) {
        isPollingRef.current = true;
        checkIfCardHasEncryptedPan(250);
      }
    }, [card, cardId, billerPaymentProcessor, payNowDisabled, checkIfCardHasEncryptedPan]);

      if (!invoiceDetails || !paymentDetails) {
        return <Loading/>;
      }

      if (!amountsMatch(amount, invoiceDetails.minAmountDue) &&
          !amountsMatch(amount, invoiceDetails.amountDue)) {
        return <GenericError />;
      }

      const getPaymentMethod = () => {
        if (cardId) {
          return {
            method: SAVED_CARD,
            cardId
          };
        }
        return {
          method: NEW_CARD,
          oneTimeToken: iframeResponse.payment_source,
          saveCard
        };
      };

      if (error) {
        return <ErrorMessage errorId={error} intl={intl} />
      }

      const paymentMethod = getPaymentMethod();

      return <PaymentConfirmationView paymentMethod={paymentMethod}
                                      invoiceDetails={invoiceDetails}
                                      amount={amount}
                                      invoiceId={invoiceId}
                                      cardScheme={cardScheme}
                                      last4Digits={last4Digits}
                                      paymentDetails={paymentDetails}
                                      payNowDisabled={payNowDisabled}
                                      redirectPath={redirectPath}
                                      history={history} />;
    };

export default withRouter(injectIntl(PaymentConfirmation));
