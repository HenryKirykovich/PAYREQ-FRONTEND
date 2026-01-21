import React, { useState } from "react";

import * as XMLUtils from "../../../utils/xml-utils"
import { upCase } from "../../../utils/string-utils";
import { Card, FieldGroup } from "../../common";
import { HideAndShow, TaxDetails } from "./peppol-common";

import styles from "./PeppolCommon.module.scss";

function BISDetailsCard({ invoice, bisDoc, bisTypeCode, headingIntlKey, typeLabelIntlKey, intl }) {
    const [showDetails, setShowDetails] = useState(true);

    const { invoiceNo, receivedTime, dueDate, currencyCode, amountDue } = invoice;

    const note = XMLUtils.text(bisDoc, "./cbc:Note");
    const taxPointDate = XMLUtils.text(bisDoc, "./cbc:TaxPointDate");
    const taxCurrencyCode = XMLUtils.text(bisDoc, "./cbc:TaxCurrencyCode");
    const accountingCost = XMLUtils.text(bisDoc, "./cbc:AccountingCost");
    const taxTotals = XMLUtils.nodes(bisDoc, "./cac:TaxTotal");
    const paymentTerms = XMLUtils.text(bisDoc, "./cac:PaymentTerms/cbc:Note");
    const buyerReference = XMLUtils.text(bisDoc, "./cbc:BuyerReference");
    const startPeriod = XMLUtils.text(bisDoc, "./cac:InvoicePeriod/cbc:StartDate");
    const endPeriod = XMLUtils.text(bisDoc, "./cac:InvoicePeriod/cbc:EndDate");
    const purchaseOrder = XMLUtils.text(bisDoc, "./cac:OrderReference/cbc:ID");
    const salesOrder = XMLUtils.text(bisDoc, "./cac:OrderReference/cbc:SalesOrderID");

    return (
        <Card heading={headingIntlKey}>
            <div style={{ height: showDetails ? "auto" : "25px", overflow: "hidden" }}>
                <FieldGroup className={styles.detailsContainer}>
                    <FieldGroup.Field label={intl.formatMessage({ id: typeLabelIntlKey })}
                        value={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.invoiceType." + bisTypeCode })} />
                    <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.invoiceNo.label" })}
                        value={invoiceNo} />
                    <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.issueDate.label" })}
                        value={intl.formatDate(receivedTime)} />
                    {dueDate && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.dueDate.label" })}
                        value={intl.formatDate(dueDate)} />}
                    {paymentTerms && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.paymentTerms.label" })}
                        value={paymentTerms} />}
                    <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.currency.label" })} value={ upCase(currencyCode) } />
                    <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.amount.label" })}
                        value={intl.formatNumber(amountDue, { style: "currency", currency: currencyCode })} />
                    {taxTotals.map((taxTotal, idx) => <TaxDetails taxTotalRec={taxTotal} intl={intl} key={"taxTotals" + idx} />)}
                    {taxPointDate && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.taxPointDate.label" })}
                        value={intl.formatDate(taxPointDate)} />}
                    {taxCurrencyCode && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.taxCurrencyCode.label" })}
                        value={taxCurrencyCode.toUpperCase()} />}
                    {accountingCost && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.accountingCost.label" })}
                        value={accountingCost} />}
                    {note && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.note.label" })}
                        value={note} />}
                    {buyerReference && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.buyerRef.label" })}
                        value={buyerReference} />}
                    {startPeriod && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.startDate.label" })}
                        value={intl.formatDate(startPeriod)} />}
                    {endPeriod && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.endDate.label" })}
                        value={intl.formatDate(endPeriod)} />}
                    {purchaseOrder && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.purchaseOrder.label" })}
                        value={purchaseOrder} />}
                    {salesOrder && <FieldGroup.Field label={intl.formatMessage({ id: "peppol.invoice.view.documentDetails.salesOrder.label" })}
                        value={salesOrder} />}
                </FieldGroup>
            </div>
            <HideAndShow showDetails={showDetails} setShowDetailsFn={setShowDetails} />
        </Card>
    )
};

export default BISDetailsCard;
