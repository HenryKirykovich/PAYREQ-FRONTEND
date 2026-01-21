import React from "react";
import {DefaultButton, LargeText, PageHeading,} from "../common";

const AutoPaymentSaved = () => (
    <div>
        <PageHeading text="autoPayment.saved.heading"/>
        <LargeText text="autoPayment.saved.body"/>
        <DefaultButton label="autoPayment.saved.viewAutoPayments.button" linkTo="../auto-payments"/>
    </div>
);

export default AutoPaymentSaved;