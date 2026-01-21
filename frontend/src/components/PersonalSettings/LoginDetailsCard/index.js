import React, {useState} from "react";
import {injectIntl} from "react-intl";

import UpdateEmailModal from "./UpdateEmailModal";
import FieldGroup from "../../common/FieldGroup";
import {AccordionCard, LinkButton} from "../../common";
import PendingConfirmationView from "./PendingConfirmationView";
import styles from "./LoginDetailsCard.module.scss"

function LoginDetailsCard({isOpen, handleSelect, emailDetails, intl}) {
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    return (
        <AccordionCard title="personalSettings.loginDetails"
                       isOpen={isOpen}
                       handleSelect={handleSelect}>
            {emailDetails.pendingNewEmail !== null && <PendingConfirmationView emailDetails={emailDetails}/>}
            {emailDetails.pendingNewEmail === null && (
                <div className={styles.emailContainer}>
                    <FieldGroup fields={[{label: "personalSettings.email", value: emailDetails.email}]}/>
                    {emailDetails.ssoSamlId === null &&
                        <LinkButton icon="edit" label="forms.generic.edit.button" onClick={() => setOpenUpdateModal(true)}
                                    aria-label={intl.formatMessage({id: "personalSettings.email.edit.arialLabel"})}
                        />}
                    <UpdateEmailModal show={openUpdateModal} onCancel={() => window.location.reload()}/>
                </div>
            )}
        </AccordionCard>
    )
}

export default injectIntl(LoginDetailsCard);
