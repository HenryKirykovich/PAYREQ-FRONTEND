import React, { useState, useCallback } from "react";
import { injectIntl } from "react-intl";
import { AccordionCard, FieldGroup, PrimaryButton, AlertDanger } from "../common";
import styles from "./PayForm.module.scss";
import { getQueryParams } from "../../utils/route-utils";
import MonoovaCapture from "../cards/MonoovaCapture";
import axios from "axios";
import PayPaymentDetails from "./PayPaymentDetails";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { buildMaskedNumber, expireMonth } from "../../utils/card-utils";
import Loading from "../Loading";
import SurchargeList from "../payments/SurchargeList";
import {getPayreqDateAsFormatted} from '../../utils/date-utils';

export const getFieldError = (formErrors, fld, intl, biller) => {
  const err = formErrors.find(({ field }) => field === fld);
  return err ? intl.formatMessage({ id: "pay." + err.error }, { account: biller.registrationContactIdField }) : null;
};

const noop = () => {};

const STAGE = {
  details: 1,
  detailsValidation: 2,
  capture: 3,
  confirmation: 4,
  receipt: 5,
};

// Parse and validate amount - round to nearest cent, set to null if parsing fails
const parseAmount = (amountParam) => {
  if (!amountParam || amountParam === 'undefined' || amountParam === 'null') {
    return '';
  }
  const parsed = parseFloat(amountParam);
  if (isNaN(parsed)) {
    return '';
  }
  // Round to nearest cent (2 decimal places)
  return (Math.round(parsed * 100) / 100).toFixed(2);
};

// Parse accountNumber - return empty string if undefined/null, otherwise return as string with whitespace trimmed
const parseAccountNumber = (accountParam) => {
  if (!accountParam || accountParam === 'undefined' || accountParam === 'null') {
    return '';
  }
  return String(accountParam).replace(/\s/g, '');
};

const PayForm = ({ onSubmit, initialValues, biller, intl}) => {
  const params = getQueryParams(window.location);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStage, setCurrentStage] = useState(STAGE['details']);
  const [gatewayConfig, setGatewayConfig] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [confirmationDetails, setConfirmationDetails] = useState(null);
  const [receiptDetails, setReceiptDetails] = useState(null);
  const [initialDetailsValues, setInitialDetailsValues] = useState({
    accountNumber: parseAccountNumber(params['accountNumber']),
    amount: parseAmount(params['amount']),
  });
  const [detailsError, setDetailsError] = useState(null);
  const [captureError, setCaptureError] = useState(null);
  const [confirmationError, setConfirmationError] = useState(null);

  const isExpanded = useCallback((targetStage) => {
    // expand tiles as we go
    return currentStage >= targetStage;
  }, [currentStage]);

  const continueToCapture = useCallback(gatewayConfig => {
    setCurrentStage(STAGE['capture']);
    setGatewayConfig(gatewayConfig);
  }, [setCurrentStage]);

  const goBackToDetails = useCallback((values, error) => {
    setDetailsError(error);
    setInitialDetailsValues(values);
    setCurrentStage(STAGE['details']);
  }, [setDetailsError, setInitialDetailsValues, setCurrentStage]);

  const continueToDetailsValidation = useCallback(values => {
    setPaymentDetails(values);
    setIsLoading(true);
    setCurrentStage(STAGE['detailsValidation']);
    axios.post('/p/get-gateway-config', {
      billerId: biller.id,
      accountNumber: values.accountNumber,
    })
         .then(({data}) => {
           setIsLoading(false);
           if (data.success) {
             continueToCapture(data);
           } else {
             goBackToDetails(values, data.error);
           }
         })
         .catch(error => {
           console.error("Error fetching payment gateway configuration:", error);
           setIsLoading(false);
         });
  }, [biller.id, setPaymentDetails, setIsLoading, setCurrentStage, continueToCapture, goBackToDetails]);

  const continueToConfirmation = useCallback(confirmationDetails => {
    setConfirmationDetails(confirmationDetails);
    setCurrentStage(STAGE['confirmation']);
  }, [setConfirmationDetails, setCurrentStage]);

  const continueToReceipt = useCallback(({cardId, paymentDetails}) => {
    setCurrentStage(STAGE['receipt']);
    setIsLoading(true);
    axios.post('/p/process-payment', {
      billerId: biller.id,
      cardId,
      accountNumber: paymentDetails.accountNumber,
      amount: paymentDetails.amount,
    })
         .then(({data}) => {
           if (data.success && data.response) {
             setReceiptDetails(data.response);
             setConfirmationError(null); // Clear any previous errors
           } else {
             setConfirmationError(data.error || "generic.payments.error.paymentNotMade");
             setCurrentStage(STAGE['confirmation']); // Go back to confirmation stage
           }
           setIsLoading(false);
         })
         .catch(error => {
           console.error("Error processing payment:", error);
           setConfirmationError("generic.payments.error.paymentNotMade");
           setCurrentStage(STAGE['confirmation']); // Go back to confirmation stage
           setIsLoading(false);
         });
  }, [biller.id, setCurrentStage, setIsLoading, setReceiptDetails]);

  const formatStatus = status => {
    if (status === 'success') {
      return intl.formatMessage({id: "pay.status.label.success"});
    }
    return intl.formatMessage({id: "pay.status.label.fail"});
  };

  return (
    <>
      <AccordionCard title="pay.heading.paymentDetails"
                     isOpen={isExpanded(STAGE['details'])}
                     handleSelect={noop}
      >
        {currentStage === STAGE['details'] ?
         <PayPaymentDetails onSubmit={values => continueToDetailsValidation(values)}
                            initialValues={initialDetailsValues}
                            biller={biller}
                            currentStage={currentStage}
                            detailsError={detailsError}
                            isLoading={isLoading}
                            intl={intl}/>
         : paymentDetails && (
           <FieldGroup className={styles.detailsContainer}>
             <FieldGroup.Field label={biller.registrationContactIdField}
                               value={paymentDetails.accountNumber}
                               labelClassName={styles.paymentDetailLabel}/>
             <FieldGroup.Field label={intl.formatMessage({id: "pay.amount.label"})}
                               value={`${biller.currencySymbol} ${paymentDetails.amount}`}
                               labelClassName={styles.paymentDetailLabel}/>
             {currentStage === STAGE['detailsValidation'] && isLoading && <Loading/>}
           </FieldGroup>
         )
        }
      </AccordionCard>
      <AccordionCard title="pay.heading.cardDetails"
                     isOpen={isExpanded(STAGE['capture'])}
                     handleSelect={noop}
      >
        {currentStage === STAGE['capture'] ?
         <>
           {isLoading ? (
             <Loading />
           ) : (gatewayConfig &&
                <>
                  {gatewayConfig.billerPaymentSources &&
                   <SurchargeList cardsAccepted={gatewayConfig.billerPaymentSources}/>}
                  {captureError && (
                    <AlertDanger>
                      {intl.formatMessage({id: captureError})}
                    </AlertDanger>
                  )}
                  <MonoovaCapture
                    billerId={biller.id}
                    gatewayConfig={gatewayConfig.clientTokens}
                    showCancelButton={false}
                    submitLabel="forms.generic.next.button"
                    className={styles.monoovaWidget}
                    onSuccess={({
                      primerTransactionId,
                      clientPaymentTokenUniqueReference,
                      location
                    }) => {
                      setIsLoading(true);
                      axios.post(
                        `/p/get-confirmation-details`,
                        { billerId: biller.id,
                          amount: paymentDetails.amount,
                          primerTransactionId,
                          clientPaymentTokenUniqueReference })
                           .then(({data}) => {
                             if (data.success && data.card) {
                               setCardDetails(data.card);
                               continueToConfirmation(data.confirmationDetails);
                               setCaptureError(null); // Clear any previous errors
                             } else {
                               console.error("Failed to get payment method details:", data);
                               setCaptureError(data.error || "generic.payments.error.paymentNotMade");
                             }
                             setIsLoading(false);
                           })
                           .catch(error => {
                             console.error("Error getting payment method details:", error);
                             setCaptureError("generic.payments.error.paymentNotMade");
                             setIsLoading(false);
                           });
                    }}
                    onError={(error) => {
                      console.error("Error making payment:", error);
                      setCaptureError("generic.payments.error.paymentNotMade");
                      setIsLoading(false);
                    }}
                    onCancel={() => {}}
                  />
                </>
               )}
         </>
         :
         (cardDetails ? (
           <div>
             <div className={styles.cardPreview}>
               <Cards
                 cvc=""
                 expiry={`${expireMonth(cardDetails.expireMonth)}/${cardDetails.expireYear}`}
                 name={cardDetails.holderName}
                 number={buildMaskedNumber(cardDetails.scheme, cardDetails.last4Digits)}
                 issuer={cardDetails.scheme}
                 preview={true}
               />
             </div>
           </div>
         ) :
         <Loading />)
        }
      </AccordionCard>
      <AccordionCard title="pay.heading.confirmation"
                     isOpen={isExpanded(STAGE['confirmation'])}
                     handleSelect={noop}
      >
        {currentStage === STAGE['confirmation'] ?
        <div>
          {isLoading ? (
          <Loading />
          ) : ( confirmationDetails &&
          <>
            {confirmationError && (
              <AlertDanger>
                {intl.formatMessage({id: confirmationError})}
              </AlertDanger>
            )}
            <FieldGroup className={styles.detailsContainer}>
              <FieldGroup.Field label={intl.formatMessage({id: "pay.baseAmount.label"})}
                                value={`${biller.currencySymbol} ${paymentDetails.amount}`}
                                labelClassName={styles.paymentDetailLabel}/>
              {confirmationDetails && confirmationDetails.surchargeAmount && (
              <FieldGroup.Field label={intl.formatMessage({id: "pay.surchargeAmount.label"})}
                                value={`${biller.currencySymbol} ${confirmationDetails.surchargeAmount}`}
                                labelClassName={styles.paymentDetailLabel}/>
                                )}
              <strong>
                <FieldGroup.Field label={intl.formatMessage({id: "pay.totalAmount.label"})}
                                  value={`${biller.currencySymbol} ${confirmationDetails.totalAmount || paymentDetails.amount}`}
                                  labelClassName={styles.paymentDetailLabel}/>
              </strong>
            </FieldGroup>
            <PrimaryButton
              type="button"
              label="pay.confirm.button"
              disabled={isLoading}
              data-testid="confirm-and-pay-button"
              onClick={() => continueToReceipt({cardId: cardDetails.id, paymentDetails})}
              className={styles.payButton}
            />
          </>
          )}
        </div>
        :
        (confirmationDetails &&
        <>
          <FieldGroup className={styles.detailsContainer}>
            <FieldGroup.Field label={intl.formatMessage({id: "pay.baseAmount.label"})}
                              value={`${biller.currencySymbol} ${paymentDetails.amount}`}
                              labelClassName={styles.paymentDetailLabel}/>
            {confirmationDetails && confirmationDetails.surchargeAmount && (
            <FieldGroup.Field label={intl.formatMessage({id: "pay.surchargeAmount.label"})}
                              value={`${biller.currencySymbol} ${confirmationDetails.surchargeAmount}`}
                              labelClassName={styles.paymentDetailLabel}/>
                              )}
            <strong>
              <FieldGroup.Field label={intl.formatMessage({id: "pay.totalAmount.label"})}
                                value={`${biller.currencySymbol} ${confirmationDetails.totalAmount || paymentDetails.amount}`}
                                labelClassName={styles.paymentDetailLabel}/>
            </strong>
          </FieldGroup>
        </>)
        }
      </AccordionCard>
      <AccordionCard title="pay.heading.receipt"
                     isOpen={isExpanded(STAGE['receipt'])}
                     handleSelect={noop}
      >
        {currentStage === STAGE['receipt'] &&
          <div>
           {isLoading ? (
             <Loading />
           ) : ( receiptDetails &&
                 <FieldGroup className={styles.detailsContainer}>
            <FieldGroup.Field label={intl.formatMessage({id: "pay.gatewayTransactionId.label"})}
                              value={receiptDetails.gatewayTransactionId}
                              labelClassName={styles.paymentDetailLabel}/>
            <FieldGroup.Field label={intl.formatMessage({id: "pay.paymentDate.label"})}
                              value={getPayreqDateAsFormatted(receiptDetails.paymentDate)}
                              labelClassName={styles.paymentDetailLabel}/>
            <FieldGroup.Field label={intl.formatMessage({id: "pay.status.label"})}
                              value={formatStatus(receiptDetails.status)}
                              labelClassName={styles.paymentDetailLabel}/>
          </FieldGroup>
               )}
          </div>
        }
      </AccordionCard>
    </>
  );
};

export default injectIntl(PayForm);
