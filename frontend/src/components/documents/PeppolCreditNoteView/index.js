import React from "react";

import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";

import * as XMLUtils from "../../../utils/xml-utils";
import { DefaultButton, PageHeading } from "../../common";
import BackToDocumentsButton from "../BackToDocumentsButton";
import PdfPreviewCard from "../PdfPreviewCard";
import BISDetailsCard from "../PeppolCommon/BISDetailsCard";
import BISLineItemsCard from "../PeppolCommon/BISLineItemsCard";
import DeliveryCard from "../PeppolCommon/DeliveryCard";
import PartyCard from "../PeppolCommon/PartyCard";
import PayeePartyCard from "../PeppolCommon/PayeePartyCard";
import PaymentMeansCard from "../PeppolCommon/PaymentMeansCard";
import TaxRepresentativePartyCard from "../PeppolCommon/TaxRepresentativePartyCard";

import styles from "./PeppolCreditNoteView.module.scss";

const ActionButtons = () => {
    return (
        <div className={styles.buttonBar}>
            <BackToDocumentsButton buttonComponent={DefaultButton} />

        </div>
    )
};

const PeppolCreditNoteView = ({ invoice, intl }) => {
    const { billDetail, invoiceNo } = invoice;
    const sbd = XMLUtils.parse(billDetail);
    const bisDoc = XMLUtils.node(sbd, "/sbdh:StandardBusinessDocument/ubl-credit-note-2:CreditNote");
    const sellerName = XMLUtils.text(bisDoc, "./cac:AccountingSupplierParty/cac:Party/cac:PartyName/cbc:Name");

    return (
        <React.Fragment>
            <PageHeading text="peppol.invoice.view.pageHeading"
                values={{ invoiceNo: invoiceNo, billerName: sellerName }} />
            <ActionButtons />
            <div className={styles.pageContainer}>
                <div className={styles.billDetailsContainer}>
                    <BISDetailsCard
                        invoice={invoice}
                        bisDoc={bisDoc}
                        bisTypeCode={XMLUtils.text(bisDoc, "./cbc:CreditNoteTypeCode")}
                        intl={intl}
                        headingIntlKey="peppol.creditNote.view.documentDetails.heading"
                        typeLabelIntlKey="peppol.invoice.view.documentDetails.invoiceType.label"
                    />
                    <BISLineItemsCard
                        lines={XMLUtils.nodes(bisDoc, "./cac:CreditNoteLine")}
                        intl={intl}
                    />
                    <PartyCard
                        party={XMLUtils.node(bisDoc, "./cac:AccountingSupplierParty/cac:Party")}
                        intl={intl}
                        headerIntlKey="peppol.invoice.view.documentDetails.supplier.heading"
                    />
                    <PartyCard
                        party={XMLUtils.node(bisDoc, "./cac:AccountingCustomerParty/cac:Party")}
                        intl={intl}
                        headerIntlKey="peppol.invoice.view.documentDetails.customer.heading"
                    />
                    <PayeePartyCard bisDoc={bisDoc} intl={intl} />
                    <TaxRepresentativePartyCard bisDoc={bisDoc} intl={intl} />
                    <DeliveryCard
                        delivery={XMLUtils.node(bisDoc, "./cac:Delivery")}
                        intl={intl}
                    />
                    <PaymentMeansCard
                        paymentMeans={XMLUtils.nodes(bisDoc, "./cac:PaymentMeans")}
                        intl={intl}
                    />
                </div>
                <div className={styles.pdfViewContainer}>
                    {<PdfPreviewCard invoice={invoice} intl={intl} title="peppol.creditNote.preview.heading"
                        noDocumentMessage="invoice.document.pdf.noLatestDocument" />}
                </div>
            </div>
        </React.Fragment>);
};

export default withRouter(injectIntl(PeppolCreditNoteView));
