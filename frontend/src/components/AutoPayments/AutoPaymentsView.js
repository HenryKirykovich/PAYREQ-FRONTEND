import * as React from 'react';
import {Link, withRouter} from "react-router-dom";

import {PageHeading, PrimaryButton, RegularText, SecondaryButton, LargeText, Card} from "../common";
import styles from "./AutoPaymentsView.module.scss"
import {CARD_SCHEME_LABELS} from "../payments/payment-constants";

const AutoPaymentsUnavailable = () => (
    <React.Fragment>
        <PageHeading text="autoPayment.listScreen.heading"/>
        <LargeText text="autoPayment.unavailable"/>
    </React.Fragment>);

const AutoPayment = ({autoPayment}) => {
    const {id, billerName, accountNumber, scheme, last4Digits} = autoPayment;
    return (
        <Card hover className={styles.autoPaymentItem}>
            <Link to={`./auto-payments/${id}`}>
                <LargeText text="autoPayment.list.item.heading" values={{billerName, accountNumber}}/>
                <RegularText text="autoPayment.list.item.body" values={{
                    scheme: CARD_SCHEME_LABELS[scheme],
                    last4Digits
                }}/>
            </Link>
        </Card>
    )
};

const AutoPaymentsView = ({autoPayments, billers}) => {

    if (billers && billers.length === 0 && autoPayments.length === 0) {
        return <AutoPaymentsUnavailable/>;
    }

    return (
        <React.Fragment>
            <div className={styles.headingContainer}>
            <PageHeading text="autoPayment.listScreen.heading"/>
            </div>

            <div className={styles.buttonContainer}>
                <PrimaryButton linkTo="./auto-payments/create" label="autoPayment.listScreen.createButtonLabel" icon="plus"/>
                <SecondaryButton linkTo="./cards" label="autoPayment.listScreen.manageCardsButtonLabel" icon="cog"/>
            </div>
            <LargeText text="autoPayment.listScreen.secondaryHeading"/>
            {autoPayments.map(ap => <AutoPayment key={ap.id} autoPayment={ap}/>)}
        </React.Fragment>
    );
};

export default withRouter(AutoPaymentsView);
