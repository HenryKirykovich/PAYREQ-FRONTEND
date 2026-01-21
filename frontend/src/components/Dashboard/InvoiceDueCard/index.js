import React, {useEffect, useState} from "react";
import axios from "axios";

import InvoiceDueCardView from "./InvoiceDueCardView";

const getDueInvoices = (setIsLoading, setInvoicesDue, billerId) => {
    axios.get("/data/invoices/due/" + billerId)
        .then(({data}) => {
            setInvoicesDue(data.success ? data.invoicesDue : []);
            setIsLoading(false);
        });
};

const InvoiceDueCard = ({billerId, setIsLoading}) => {
    const [invoicesDue, setInvoicesDue] = useState([]);

    useEffect(() => {
        getDueInvoices(setIsLoading, setInvoicesDue, billerId);
    }, [setIsLoading, setInvoicesDue, billerId]);

    if (invoicesDue.length === 0) return null;
    return (
        <React.Fragment>
            {invoicesDue.map(i => <InvoiceDueCardView key={i.invoiceId} billerId={billerId} invoiceId={i.invoiceId}
                                                      amount={i.amountDue} billerName={i.billerName} dueDate={i.dueDate}
                                                      currencyCode={i.currencyCode}
            />)}
        </React.Fragment>)

};

export default InvoiceDueCard;