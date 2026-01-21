import React from "react";
import {FormattedDate, FormattedNumber, FormattedTime} from "react-intl";
import {FieldGroup, PageHeading, LargeText, SecondaryButton} from "../../common";
import {CARD_SCHEME_LABELS} from "../../payments/payment-constants";
import styles from "./AdhocPaymentResult.module.scss"

const PaymentSuccessHeading = () => <PageHeading className={styles.resultHeading}
                                                 text="payments.paymentComplete.heading"/>;

const PaymentDate = ({date}) => {
    if (date) { //check date is not null or undefined because this will default to "now"
        return <span><FormattedDate value={date}/> <FormattedTime value={date}/></span>
    }
    return null
};

const ContactDetails = ({email}) => (
    <React.Fragment>
        <LargeText text="payments.paymentFailed.body"/>
        <LargeText text="payments.paymentFailed.contact" values={{email: email}}/>
    </React.Fragment>
);

const BackToSettings = () => (
        <SecondaryButton className={styles.backButton} label="payments.paymentComplete.backToSettings" linkTo={`./view`}/>
);


const FailureResult = ({contactDetails}) => (
    <div>
        <PageHeading className={styles.resultHeading} text="payments.paymentFailed.heading"/>
        {contactDetails && <ContactDetails {...contactDetails}/>}
        <div className={styles.actions}>
            <BackToSettings/>
        </div>
    </div>
);

const SuccessResults = ({paymentDetails}) => {
    const {card, paymentDate, gatewayTransactionId, amount, currency} = paymentDetails;
    return (
        <React.Fragment>
            <PaymentSuccessHeading/>
            <FieldGroup fields={[
                {label: "payments.paymentComplete.label.transactionId", value: gatewayTransactionId},
                // eslint-disable-next-line
                {label: "payments.paymentComplete.label.amount", value: <FormattedNumber value={amount} style="currency" currency={currency}/>},
                {label: "payments.paymentComplete.label.paymentDate", value: <PaymentDate date={paymentDate}/>},
                {label: "payments.paymentComplete.label.card", value: `${CARD_SCHEME_LABELS[card.cardScheme]} ${card.cardNumberLast4}`}
            ]}/>
            <div className={styles.actions}>
                <BackToSettings/>
            </div>
        </React.Fragment>
    )
};

const AdhocPaymentResult = ({location}) => {
    const isSuccess = location.state.data.success;
    const paymentDetails = location.state.data.paymentDetails;
    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                {isSuccess && <SuccessResults paymentDetails={paymentDetails}/>}
                {!isSuccess && <FailureResult contactDetails={location.state.data.error.contactDetails}/>}
            </div>
        </div>
    );
};

export default AdhocPaymentResult;
