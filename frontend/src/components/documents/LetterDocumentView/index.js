import React from "react";

import {injectIntl} from "react-intl";
import {
    Card, DefaultButton, PageHeading
} from "../../common";
import styles from "./LetterDocumentView.module.scss"
import FieldGroup from "../../common/FieldGroup";
import DeliveredByDetailsCard from "../DeliveredByDetailsCard";
import PdfPreviewCard from "../PdfPreviewCard";
import BackToDocumentsButton from "../BackToDocumentsButton";

const ActionButtons = () => {
    return (
        <div className={styles.buttonBar}>
            <BackToDocumentsButton buttonComponent={DefaultButton}/>

        </div>
    )
};

const LetterDetailsCard = ({invoice, intl}) => {
    return (
        <Card heading="invoice.payroll.view.documentDetails.heading">
            <FieldGroup className={styles.detailsContainer}>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.payroll.view.documentDetails.mailer.label"})}
                                  value={invoice.billerName}/>
                <FieldGroup.Field label={intl.formatMessage({id: "invoice.letter.view.documentDetails.customerRef.label"})}
                                  value={invoice.billerCustomerNumber}/>
            </FieldGroup>
        </Card>
    )
};

const LetterDocumentView = ({invoice, intl}) => (
        <React.Fragment>
            <PageHeading text="invoice.letter.view.pageHeading"/>
            <ActionButtons/>
            <div className={styles.pageContainer}>
                <div className={styles.registrationDetailsContainer}>
                    <LetterDetailsCard invoice={invoice}
                                               intl={intl}/>
                    <DeliveredByDetailsCard invoice={invoice}
                                            intl={intl}/>
                </div>
                <div className={styles.billDetailsContainer}>
                    <PdfPreviewCard invoice={invoice}
                                    intl={intl}
                                    title="invoice.letter.view.preview.heading" noDocumentMessage="invoice.document.pdf.noLatestDocument"/>
                </div>
            </div>
        </React.Fragment>
    )
;

export default injectIntl(LetterDocumentView);