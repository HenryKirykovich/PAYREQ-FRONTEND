import React, {useEffect, useState} from "react";
import {HtmlWidget} from '@paydock/client-sdk/lib/widget';
import {withRouter} from 'react-router-dom'
import axios from "axios";

import Loading from "../../../Loading";
import {PageHeading, TextInput, FormStep} from "../../../common";

import styles from "./AdhocPaymentForm.module.scss"
import {useAppState} from "../../../../state";
import {Formik} from "formik";
import * as Yup from "yup";
import {setupExtraWigetFields, setWidgetDefaults} from "../../../../utils/payment-utils";
import SurchargeList from "../../../payments/SurchargeList";
import {SurchargeDetails} from "../../../payments/PaymentForm";

const onCardCaptureComplete = (iframeResponse, cardScheme, last4Digits, reference, amount, surchargePercentage, history, currency) => {
    const isTokenForExpectedReference = iframeResponse.ref_id === reference;
    if (isTokenForExpectedReference) {
        history.push({
            pathname: "./payment-confirmation",
            state: {iframeResponse, cardScheme, last4Digits, surchargePercentage, amount: parseFloat(amount), currency: currency}
        })
    }
};

const configureCardDetailsWidget = (hasWidgetLoaded, setIsSubmitting, setCardsAccepted, setCardScheme, history, user, billerId, reference, amount, setCurrency) => {
    axios.get(`/data/settings/payment-gateway/${billerId}`)
        .then(({data: {billerPaymentSource: cardsAccepted, publicKey, processorGatewayId, type: gatewayType, mode, currency}}) => {
            setCardsAccepted(cardsAccepted);
            setCurrency(currency);
            let widget = new HtmlWidget("#widget", publicKey, processorGatewayId, 'card', 'payment_source');
            let cardScheme = null;
            let last4Digits = null;
            setWidgetDefaults(
                widget,
                mode,
                reference, 
                cardsAccepted.map(ca => ca.providerName),
                "#paymentForm", 
                () => hasWidgetLoaded(true),
                () => setIsSubmitting(true),
                () => setIsSubmitting(false),
                data => {
                    setCardScheme(data.card_scheme);
                    cardScheme = data.card_scheme;
                    last4Digits = data.card_number_last4;
                },
                iframeResponse => onCardCaptureComplete(
                    iframeResponse,
                    cardScheme,
                    last4Digits,
                    reference,
                    amount,
                    cardsAccepted.find(ca => ca.providerName === cardScheme).surchargePercentage,
                    history,
                    currency
                ));
            setupExtraWigetFields(widget, gatewayType, user);
            widget.load();
        })
};

const schema = Yup.object().shape({
    amount: Yup.number().required("forms.generic.required.label").typeError("forms.generic.number.validation.label"),
    reference: Yup.string().required("forms.generic.required.label")
});

const handleTxnDetailsSubmit = (setStep, setReference, setAmount, {amount, reference}) => {
    setReference(reference);
    setAmount(amount);
    setStep(CARD_DETAILS);
};

const TXN_DETAILS = "TXN_DETAILS";
const CARD_DETAILS = "CARD_DETAILS";

const AdhocPaymentForm = ({biller, match, history}) => {

    const [hasWidgetLoaded, setHasWidgetLoaded] = useState(false);
    const [isWidgetSubmitting, setWidgetSubmitting] = useState(false);
    const [cardsAccepted, setCardsAccepted] = useState([]);
    const [currency, setCurrency] = useState();
    const [cardScheme, setCardScheme] = useState();
    const [reference, setReference] = useState("");
    const [amount, setAmount] = useState("");
    const [step, setStep] = useState(TXN_DETAILS);
    const [{user}] = useAppState();
    const {id: billerId} = biller;

    useEffect(() => {
            if (step === CARD_DETAILS) {
                configureCardDetailsWidget(setHasWidgetLoaded, setWidgetSubmitting, setCardsAccepted, setCardScheme,
                    history, user, billerId, reference, amount, setCurrency)
            }
        },
        [step, setHasWidgetLoaded, setWidgetSubmitting, setCardsAccepted, setCardScheme, history, user, billerId,
            reference, amount, setCurrency]);

    return (
        <div className={styles.paymentFormContainer}>
            <div className={styles.paymentForm}>
                <PageHeading text="payments.paymentForm.heading" values={{billerName: biller.customerName}}/>
                {/*todo: move inline style*/}
                <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
                    <FormStep title="settings.paymentForm.transactionDetailsStep.heading"
                              isOpen={true}
                              isActive={step === TXN_DETAILS}>
                        <Formik
                            initialValues={{
                                amount: "",
                                reference: ""
                            }}
                            validationSchema={schema}
                            onSubmit={(values) => handleTxnDetailsSubmit(setStep, setReference, setAmount, values)}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting
                              }) => (
                                <form onSubmit={handleSubmit}>
                                    <TextInput key="reference"
                                               name="reference"
                                               label="settings.paymentForm.reference.label"
                                               value={values.reference}
                                               onChange={handleChange}
                                               onBlur={handleBlur}
                                               error={errors.reference}
                                               touched={touched.reference}
                                               disabled={isSubmitting || step !== TXN_DETAILS}
                                               hint="settings.paymentForm.reference.placeholder"
                                    />
                                    <TextInput key="amount"
                                               name="amount"
                                               label="settings.paymentForm.amount.label"
                                               value={values.amount}
                                               onChange={handleChange}
                                               error={errors.amount}
                                               touched={touched.amount}
                                               disabled={isSubmitting || step !== TXN_DETAILS}
                                    />
                                    {step === TXN_DETAILS &&
                                    <FormStep.Actions disabled={isSubmitting} onNext={() => {}} cancelLink="./view"/>}
                                </form>
                            )}
                        </Formik>
                    </FormStep>
                    <FormStep title="settings.paymentForm.cardDetailsStep.heading" isOpen={step === CARD_DETAILS} isActive={step === CARD_DETAILS}>
                        <form id="paymentForm">

                            {!hasWidgetLoaded && <Loading/>}
                            {hasWidgetLoaded && <SurchargeList cardsAccepted={cardsAccepted}/>}

                            <div id="widget" className={styles.cardEntry}
                                 widget-style="background-color: #FFFFFF; button-color: rgba(27, 24, 80, 1); text-color: rgb(51, 51, 51); font-size: 15px;"/>
                            {cardScheme && <SurchargeDetails cardsAccepted={cardsAccepted}
                                                             cardScheme={cardScheme}
                                                             selectedAmount={parseFloat(amount)}
                                                             currencyCode={currency}/>}

                            {hasWidgetLoaded && <FormStep.Actions disabled={isWidgetSubmitting} cancelLink="./view"/>}
                        </form>
                    </FormStep>
                </div>
            </div>
        </div>);
};

export default withRouter(AdhocPaymentForm);
