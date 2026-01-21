import React from "react";
import {FormattedDate, FormattedNumber, FormattedTime, injectIntl} from "react-intl";
import {FieldGroup, LinkButton, DefaultButton, PageHeading, SecondaryButton} from "../common";
import {CARD_SCHEME_LABELS} from "./payment-constants";
import styles from "./PaymentResult.module.scss"
import LargeText from "../common/text/LargeText";

const PaymentSuccessHeading = () => <PageHeading className={styles.resultHeading} text="payments.paymentComplete.heading" showInWebview={true}/>;

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

const BackToBillsButton = ({buttonComponent: ButtonComponent = LinkButton, redirect}) => {
    return (
        <ButtonComponent linkTo={redirect}
                         noIconDecoration={true}
                         label="payments.paymentComplete.backToBillsButton"
                         icon="menu-left"/>
    )
};


const FailureResult = injectIntl(({contactDetails, errorMessage, redirect, intl}) => (
    <div>
        <PageHeading className={styles.resultHeading} text="payments.paymentFailed.heading" showInWebview={true}/>
        <LargeText>
          {intl.formatMessage({id: errorMessage})}
        </LargeText>
        {contactDetails && <ContactDetails {...contactDetails}/>}
        <div className={styles.failureActions}>
            <BackToBillsButton buttonComponent={DefaultButton} redirect={redirect}/>
        </div>
    </div>
));

const SuccessResults = ({invoice, paymentDetails, redirect}) => {
    const {card, paymentDate, gatewayTransactionId, amount, currency} = paymentDetails;
    return (
        <React.Fragment>
            <PaymentSuccessHeading/>
            <FieldGroup className={styles.fieldGroup} fields={[
                {label: "payments.confirmPayment.label.to", value: invoice.billerName},
                {label: "payments.paymentComplete.label.transactionId", value: gatewayTransactionId},
                {label: "payments.confirmPayment.label.invoice", value: invoice.invoiceNo},
                // eslint-disable-next-line
                {label: "payments.paymentComplete.label.amount", value: <FormattedNumber value={amount} style="currency" currency={currency}/>},
                {label: "payments.paymentComplete.label.paymentDate", value: <PaymentDate date={paymentDate}/>},
                {label: "payments.paymentComplete.label.card", value: `${CARD_SCHEME_LABELS[card.cardScheme]} ${card.cardNumberLast4}`}
            ]} />
            <div className={styles.actions}>
                <BackToBillsButton buttonComponent={DefaultButton} redirect={redirect}/>
                <SecondaryButton label="cards.createAutoPayment.buttonLabel" linkTo="../../auto-payments/create"/>
            </div>
        </React.Fragment>
    )
};

const PaymentResult = ({location}) => {
    const isSuccess = location.state.data.success;
    const invoice = location.state.data.invoice;
    const paymentDetails = location.state.data.paymentDetails;
    const redirect = location.state.redirectPath;
    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                {isSuccess && <SuccessResults invoice={invoice} paymentDetails={paymentDetails} redirect={redirect}/>}
                {!isSuccess && <FailureResult contactDetails={location.state.data.error.contactDetails} errorMessage={location.state.data.error.message} redirect={redirect}/>}
            </div>
        </div>
    );
};

export default PaymentResult;
