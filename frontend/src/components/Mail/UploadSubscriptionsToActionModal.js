import {withRouter} from "react-router-dom";
import {Modal, PrimaryButton, RegularText} from "../common";
import React from "react";


const UploadSubscriptionsToActionModal = ({billerId, show, setShowUploadSubscriptionToActionModal}) => {
        return (
            <Modal show={show}
                   title="mail.uploadMail.subscriptionsToActionModal.heading"
                   buttonLabel="forms.generic.view"
                   onCancel={() => setShowUploadSubscriptionToActionModal(false)}
                   onPrimaryAction={() => window.location.href = `/customer#/biller/${billerId}/registrations/contactChanged`}
                   PrimaryButtonComponent={PrimaryButton}
            >
                <RegularText text="mail.uploadMail.subscriptionsToActionModal.message"/>
            </Modal>
        )
    };

export default withRouter(UploadSubscriptionsToActionModal);
