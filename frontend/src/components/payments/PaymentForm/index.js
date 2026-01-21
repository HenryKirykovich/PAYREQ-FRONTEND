import React, {useEffect, useState, useCallback} from "react";
import {withRouter} from 'react-router-dom'
import axios from "axios";
import {Formik} from "formik";
import * as Yup from "yup";
import {injectIntl} from "react-intl";
import Loading from "../../Loading";
import InvoiceDetails from "../InvoiceDetails";
import {getInvoice} from "../payments-api";
import {Select, FormStep, PageHeading, LinkButton, AlertDanger, DefaultButton} from "../../common";
import SurchargeList from "../SurchargeList";
import styles from "./PaymentForm.module.scss"
import {calculateSurcharge} from "../../../utils/payment-utils";
import {CARD_SCHEME_LABELS} from "../payment-constants";
import {getCurrencySymbol} from "../../../utils/currency-utils";
import MonoovaCapture from "../../cards/MonoovaCapture";

const onPayWithSavedCard = (selectedCard, invoiceId, amount, surchargePercentage, redirectPath, history) => {
    history.push({
        pathname: "./payment-confirmation",
        state: {
          invoiceId,
          cardId: selectedCard.id,
          cardScheme: selectedCard.scheme,
          last4Digits: selectedCard.last4Digits,
          surchargePercentage,
          amount,
          redirectPath
        }
    });
};

const getGatewayDetails = (setGatewayDetails, setError, invoiceId) => {
    axios.get(`/data/settings/invoice-payment-gateway-details/${invoiceId}`)
         .then(({data}) => {
           if(data.success) {
             const {clientTokens, billerPaymentSources, billerPaymentProcessor} = data;
             const cardsAccepted = billerPaymentSources;
             setGatewayDetails({clientTokens, billerPaymentSources, billerPaymentProcessor, cardsAccepted});
           } else {
             setError(data.error || "pay.validation.error.internalError");
           }
        })
        .catch((error) => {
           console.error('Error fetching gateway details:', error);
           setError("generic.apiErrorMessage");
        });
};

export const SurchargeDetails = injectIntl(
    ({cardsAccepted, cardScheme, selectedAmount, currencyCode, intl}) => {
        const scheme = cardsAccepted.find(ca => ca.providerName === cardScheme);
        if (!scheme) {
            return null;
        }
        const surchargePercentage = scheme.surchargePercentage;
        const surchargeAmount = calculateSurcharge(surchargePercentage, selectedAmount);
        if (surchargeAmount === "0.00") return null;
        return (
            <div className={styles.surchargeContainer}>
                <p>{intl.formatMessage({id: "payments.paymentForm.surchargeNote"}, {
                    currencyCode: currencyCode.toUpperCase(),
                    currencySymbol: getCurrencySymbol(currencyCode),
                    surchargeAmount: surchargeAmount
                })}</p>
            </div>
        )
    });

const TXN_DETAILS = "TXN_DETAILS";
const CARD_DETAILS = "CARD_DETAILS";

const schema = Yup.object().shape({
    amount: Yup.string().required("forms.generic.required.label")
});

const handleTxnDetailsSubmit = (setStep, setSelectedAmount, values) => {
    setSelectedAmount(values.amount);
    setStep(CARD_DETAILS);
};

const getSelectOptions = (invoiceDetails, intl) => {
  const amountOption = {
    value: invoiceDetails.amountDue.toString(),
    label: intl.formatNumber(invoiceDetails.amountDue, {
      style: "currency",
      currency: invoiceDetails.currencyCode
    })
  };
  if (invoiceDetails.minAmountDue) {
    return [
      {
        value: invoiceDetails.minAmountDue.toString(),
        label: intl.formatNumber(invoiceDetails.minAmountDue, {
          style: "currency",
          currency: invoiceDetails.currencyCode
        })
      },
      amountOption]
  }
  return [amountOption]
};

const _EnterTransactionDetailsStep = ({invoiceDetails, step, setStep, setSelectedAmount, redirectPath, intl, history}) => {
    return (
        <FormStep title="settings.paymentForm.transactionDetailsStep.heading"
                  isOpen={true}
                  isActive={step === TXN_DETAILS}
                  className={styles.step}
        >
            <Formik
                initialValues={{
                  amount: invoiceDetails.minAmountDue > 0
                    ? invoiceDetails.minAmountDue.toString()
                    : invoiceDetails.amountDue.toString(),
                }}
                validationSchema={schema}
                onSubmit={values => handleTxnDetailsSubmit(setStep, setSelectedAmount, values)}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Select name="amount"
                                label="settings.paymentForm.amount.label"
                                placeholder={"payments.paymentForm.amount.placeholder"}
                                hint={step === TXN_DETAILS && "payments.paymentForm.amount.hint"}
                                options={getSelectOptions(invoiceDetails, intl)}
                                value={values.amount}
                                onChange={handleChange}
                                error={errors.amount}
                                touched={touched.amount}
                                disabled={isSubmitting || step !== TXN_DETAILS}
                                className={step !== TXN_DETAILS && styles.disabledAmount}
                                internationalisedOptions={false}
                        />

                        {step === TXN_DETAILS &&
                        <FormStep.Actions disabled={isSubmitting} onCancel={() => history.push(redirectPath)}/>}
                    </form>
                )}
            </Formik>
        </FormStep>
    );
};

const EnterTransactionDetailsStep = injectIntl(withRouter(_EnterTransactionDetailsStep))

const SelectSavedCard = ({invoiceDetails, savedCards, setUseDifferentCard, amount, cardsAccepted, redirectPath, history}) => (
    <Formik initialValues={{
        cardId: savedCards.length > 0 ? "" + savedCards[0].id : "",
    }}
            validationSchema={Yup.object().shape({
                cardId: Yup.string().required("payments.paymentForm.savedCardRequiredError")
            })}
            onSubmit={(values, {setSubmitting}) => {
                const cardId = parseInt(values.cardId);
                const selectedCard = savedCards.find(sc => sc.id === cardId);
                const surchargePercentage = cardsAccepted.find(ca => ca.providerName === selectedCard.scheme).surchargePercentage;
                onPayWithSavedCard(selectedCard, invoiceDetails.id, amount, surchargePercentage, redirectPath, history);
                setSubmitting(false);
            }}
    >
        {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
              isSubmitting
          }) => {
            return (
                <form onSubmit={handleSubmit}>
                    {savedCards && (
                        <React.Fragment>
                            <Select name="cardId"
                                    placeholder="autoPayment.form.card.placeholder"
                                    internationalisedOptions={false}
                                    options={savedCards.map(c => ({
                                        value: c.id,
                                        label: CARD_SCHEME_LABELS[c.scheme] + " ***" + c.last4Digits + " " + c.holderName
                                    }))}
                                    value={values.cardId}
                                    onChange={handleChange}
                                    error={errors.cardId}
                                    touched={touched.cardId}
                                    className={styles.cardSelect}
                            />
                            <LinkButton className={styles.useDifferentCardLink}
                                        label="payments.paymentForm.useDifferentCard"
                                        onClick={() => {
                                            setFieldValue("cardId", "");
                                            setUseDifferentCard(true);
                                        }}/>
                        </React.Fragment>
                    )}
                    <FormStep.Actions onCancel={() => history.goBack()} disabled={isSubmitting}/>
                </form>

            )
        }}
    </Formik>
);

const PaymentForm = ({match: {params: {invoiceId}}, location: {redirectOverride}, history, intl}) => {

    const [invoiceDetails, setInvoiceDetails] = useState();
    useEffect(() => getInvoice(setInvoiceDetails, invoiceId), [setInvoiceDetails, invoiceId]);

    const [gatewayDetails, setGatewayDetails] = useState();
    const [error, setError] = useState(null);
    const [useDifferentCard, setUseDifferentCard] = useState(false);

    useEffect(() => {
      getGatewayDetails(setGatewayDetails, setError, invoiceId);
    },
    [setGatewayDetails, invoiceId]);

    const [savedCards, setSavedCards] = useState();
    useEffect(
        () => {
            if (invoiceDetails && invoiceDetails.payerActorId && gatewayDetails) {
                axios.get(`/data/cards/${invoiceDetails.payerActorId}`)
                     .then(({data}) => {
                       const cards = data.cards;
                       const useableCards = cards.filter(c => gatewayDetails.cardsAccepted.map(ca => ca.providerName).indexOf(c.scheme) !== -1)
                       setSavedCards(useableCards);
                       setUseDifferentCard(useableCards.length === 0);
                     });
            }
        },
        [invoiceDetails, setSavedCards, setUseDifferentCard, gatewayDetails]
    );

    const [step, setStep] = useState(TXN_DETAILS);
    const [selectedAmount, setSelectedAmount] = useState();
    const [isMonoovaLoading, setIsMonoovaLoading] = useState(false);

    const redirectDefault = invoiceDetails && `/portal/customer/biller/${invoiceDetails.payerActorId}/inbox/${invoiceDetails.id}`;
    const redirectPath = redirectOverride ? redirectOverride : redirectDefault;

    const isLoading = !invoiceDetails || !savedCards || !gatewayDetails;

    const onMonoovaCardCaptureComplete = useCallback(({primerTransactionId, clientPaymentTokenUniqueReference, saveCard}) => {
      setIsMonoovaLoading(true);
      const invoiceId = invoiceDetails.id;
      axios.post(`/data/invoices/${invoiceDetails.id}/save-card`, {
        primerTransactionId,
        clientPaymentTokenUniqueReference,
        saveCard
      })
           .then(({data}) => {
             if (data.success) {
               const {id, scheme, last4Digits} = data.card;
               history.push({
                 pathname: "./payment-confirmation",
                 state: {
                   invoiceId,
                   amount: selectedAmount,
                   cardId: id,
                   cardScheme: scheme,
                   last4Digits,
                   billerPaymentProcessor: gatewayDetails.billerPaymentProcessor,
                   redirectPath,
                 }
               })
             } else {
               setError(data.error || "pay.validation.error.internalError");
               setIsMonoovaLoading(false);
             }
           })
           .catch(error => {
             console.error('Error saving card:', error);
             setError("pay.validation.error.internalError");
             setIsMonoovaLoading(false);
           });
    }, [invoiceDetails, selectedAmount, setIsMonoovaLoading, gatewayDetails, history, redirectPath]);

  return (
    <div className={styles.paymentFormContainer}>
      {error ? (
        <div className={styles.paymentForm}>
          <div className={styles.header}>
            <PageHeading text="payments.paymentForm.heading" values={{billerName: invoiceDetails?.billerName}} showInWebview={true}/>
          </div>
          <AlertDanger>
            {intl.formatMessage({id: error})}
          </AlertDanger>
          <DefaultButton
            label="forms.generic.back.button"
            icon="menu-left"
            onClick={() => history.push(redirectPath)}
            className={styles.backButton}
          />
        </div>
      ) : (
        <>
          {isLoading && <Loading/>}
          {!isLoading &&
           <div className={styles.paymentForm}>
             <div className={styles.header}>
               <PageHeading text="payments.paymentForm.heading" values={{billerName: invoiceDetails.billerName}} showInWebview={true}/>
               <InvoiceDetails details={invoiceDetails}/>
             </div>

             <EnterTransactionDetailsStep invoiceDetails={invoiceDetails} step={step} setStep={setStep}
                                          setSelectedAmount={setSelectedAmount} redirectPath={redirectPath}/>

             <FormStep title="settings.paymentForm.cardDetailsStep.heading" isOpen={step === CARD_DETAILS}
                       isActive={step === CARD_DETAILS}
                       className={styles.step}>
               {gatewayDetails.cardsAccepted &&
                <SurchargeList cardsAccepted={gatewayDetails.cardsAccepted}/>}

               {!useDifferentCard && <SelectSavedCard invoiceDetails={invoiceDetails}
                                                                       savedCards={savedCards}
                                                                       setUseDifferentCard={setUseDifferentCard}
                                                                       amount={selectedAmount}
                                                                       cardsAccepted={gatewayDetails.cardsAccepted}
                                                                       redirectPath={redirectPath}
                                                                       history={history}/>}
               {useDifferentCard && step === CARD_DETAILS && (
                 <div id="paymentForm">
                   {isMonoovaLoading ?
                     <Loading/>
                     :
                     <MonoovaCapture key={`monoova-${invoiceDetails.billerActorId}-${invoiceId}`}
                                     billerId={invoiceDetails.billerActorId}
                                     gatewayConfig={gatewayDetails.clientTokens}
                                     onSuccess={onMonoovaCardCaptureComplete}
                                     onError={e => console.error("Error saving / paying with card:", e)}
                                     onCancel={() => history.push(redirectPath)}
                                     submitLabel="forms.generic.next.button"
                                     saveCardOption={true}/>
                    }
                 </div>
               )}
             </FormStep>
           </div>
          }
        </>
      )}
    </div>
  );
};

export default withRouter(injectIntl(PaymentForm));
