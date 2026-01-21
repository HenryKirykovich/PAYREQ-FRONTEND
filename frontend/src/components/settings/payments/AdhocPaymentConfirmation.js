import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

import {FieldGroup, PrimaryButton, Number, LinkButton, PageHeading} from "../../common";

import {useAppState} from "../../../state";

import styles from "./AdhocPaymentConfirmation.module.scss"
import {CARD_SCHEME_LABELS} from "../../payments/payment-constants";
import {calculateSurcharge} from "../../../utils/payment-utils";

const pay = (appState, oneTimeToken, amount, reference, providerName, surchargePercentage, history) => {
  axios.post(`/data/settings/payment-gateway/${appState.biller.id}/pay`,
    {oneTimeToken,
      amount: amount.toString(10),
      reference,
      providerName,
      surchargePercentage: surchargePercentage.toString(10)
    },
    {localErrorHandling: true}
  )
    .then(({data}) => history.push({pathname: "./payment-result", state: {data}}))
    .catch(_error => {
      history.push({pathname: "./payment-result", state: {data: {success: false}}})
    });
};

const ConfirmButton = withRouter(
    ({oneTimeToken, amount, reference, cardScheme, surchargePercentage, history}) => {
        const [appState] = useAppState();
        const [isSubmitting, setIsSubmitting] = useState(false);
        return <PrimaryButton label="payments.pay.button.label"
                              onClick={() => {
                                  setIsSubmitting(true);
                                  pay(appState, oneTimeToken, amount, reference, cardScheme, surchargePercentage, history)
                              }}
                              disabled={isSubmitting}/>
    });

const ConfirmationDetails = ({amount, reference, cardScheme, last4Digits, surchargePercentage, currency}) => {
    const surchargeAmount = calculateSurcharge(surchargePercentage, amount);
    const total = surchargeAmount + amount;
    return (
        <div className={styles.confirmationDetails}>
            <FieldGroup fields={[
                {label: "settings.paymentForm.reference.label", value: reference},
                {label: "forms.generic.card", value: `${CARD_SCHEME_LABELS[cardScheme]} ${last4Digits}`},
                {label: "forms.generic.amount", value: <Number value={amount} type="currency" currency={currency}/>},
                {label: "settings.gateway.surcharge", value: <Number value={surchargeAmount} type="currency" currency={currency}/>},
                {label: "forms.generic.total", value: <Number value={total} type="currency" currency={currency}/>}
            ]}/>
        </div>
    )};

const PaymentActions = ({oneTimeToken, reference, amount, cardScheme, surchargePercentage}) => {
    return (
        <div className={styles.actions}>
            <LinkButton label="forms.generic.cancel.button" linkTo={`./view`}/>
            <ConfirmButton oneTimeToken={oneTimeToken} cardScheme={cardScheme} reference={reference} amount={amount} surchargePercentage={surchargePercentage}/>
        </div>
    )
};

export const PaymentConfirmationView = ({oneTimeToken, reference, amount, cardScheme, last4Digits, surchargePercentage, currency}) => (
    <div className={styles.container}>
        <div className={styles.detailsContainer}>
            <PageHeading className={styles.confirmationHeading} text="payments.confirmPayment.heading"/>
            <ConfirmationDetails reference={reference} amount={amount} cardScheme={cardScheme} last4Digits={last4Digits} surchargePercentage={surchargePercentage} currency={currency}/>
            <PaymentActions oneTimeToken={oneTimeToken} reference={reference} amount={amount} cardScheme={cardScheme} surchargePercentage={surchargePercentage}/>
        </div>
    </div>
);

const AdhocPaymentConfirmation = ({location: {state: {iframeResponse, amount, cardScheme, last4Digits, surchargePercentage, currency}}}) => (
    <PaymentConfirmationView oneTimeToken={iframeResponse.payment_source}
                             reference={iframeResponse.ref_id}
                             amount={amount}
                             cardScheme={cardScheme}
                             last4Digits={last4Digits}
                             surchargePercentage={surchargePercentage}
                             currency={currency}/>
);

export default AdhocPaymentConfirmation;
