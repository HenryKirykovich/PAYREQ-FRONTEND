import {withRouter} from "react-router-dom";
import {Modal, PrimaryButton, RegularText} from "../common";
import React from "react";


const UploadConnectionsToActionModal = ({billerId, show, setShowUploadConnectionToActionModal}) => {
        return (
            <Modal show={show}
                   title="mail.uploadMail.connectionsToActionModal.heading"
                   buttonLabel="forms.generic.view"
                   onCancel={() => setShowUploadConnectionToActionModal(false)}
                   onPrimaryAction={() => window.location.href = `/customer#/biller/${billerId}/registrations/contactChanged`}
                   PrimaryButtonComponent={PrimaryButton}
            >
                <RegularText text="mail.uploadMail.connectionsToActionModal.message"/>
            </Modal>
        )
    };

export default withRouter(UploadConnectionsToActionModal);
