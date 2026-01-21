import React from "react";
import {FormattedDate, FormattedNumber} from "react-intl";

import FieldGroup from "../common/FieldGroup";

export const InvoiceAmount = ({amount, currency}) => (
    <strong>
        {/*eslint-disable-next-line*/}
        <FormattedNumber value={amount} style="currency" currency={currency}/>
    </strong>
);

const InvoiceDetails = ({details}) => {
    let dueDate = new Date(details.dueDate);
    return (
            <FieldGroup fields={[
                {label: "payments.paymentForm.label.invoice", value: details.invoiceNo},
                {label: "payments.paymentForm.label.due", value: <FormattedDate value={dueDate}/>}
            ]} />
    );
};

export default InvoiceDetails;
