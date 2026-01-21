import React, {useState} from "react";

import {injectIntl} from "react-intl";
import {
    PageHeading,
    DefaultButton,
    DangerButton
} from "../../common";
import styles from "./PayreqRegistrationView.module.scss"
import RegularText from "../../common/text/RegularText";
import DeregisterConfirmationModal from "./DeregisterConfirmationModal";

import RegistrationDetailsCard from "./Cards/RegistrationDetailsCard";
import PdfPreviewCard from "../../documents/PdfPreviewCard";

const canEdit = registration => registration.status === "active" || registration.status === "pending";


const ActionButtons = ({registration}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className={styles.buttonBar}>
            <DefaultButton icon="menu-left" label="forms.generic.back.button"
                           linkTo={`../${registration.billerActorId}`}/>
            {canEdit(registration) && (
                <div className={styles.deregisterContainer}>
                    <RegularText text="registration.view.deregister.info"/>
                    <DangerButton label="registration.view.deregister.button" onClick={() => setShowModal(true)}/>
                </div>
            )}

            <DeregisterConfirmationModal show={showModal}
                                         info="registrations.deregister.info.payreq"
                                         onCancel={() => setShowModal(false)}
                                         registration={registration}/>

        </div>
    )
};


const PayreqRegistrationView = ({registration, lastBill, intl}) => (
        <React.Fragment>
            <PageHeading text="registration.view.pageHeading" values={{accountNumber: registration.accountNumber}}/>
            <ActionButtons registration={registration}/>
            <div className={styles.pageContainer}>
                <div className={styles.registrationDetailsContainer}>
                    <RegistrationDetailsCard registration={registration} intl={intl}/>
                </div>
                <div className={styles.documentDetailsContainer}>
                    <PdfPreviewCard invoice={lastBill}
                                    title="invoice.document.pdf.latestDocument.heading"
                                    noDocumentMessage="invoice.document.pdf.noLatestDocument"
                                    intl={intl}/>
                </div>
            </div>
        </React.Fragment>
    )
;

export default injectIntl(PayreqRegistrationView);
