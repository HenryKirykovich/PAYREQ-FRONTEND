import React from "react";
import {Modal, PrimaryButton, RegularText} from "../../common";

const EmailReSentConfirmationModal = ({show, onCancel, userDetails}) => (
    <Modal show={show}
           title="personalSettings.email.confirmationSent"
           buttonLabel="forms.generic.ok"
           onCancel={onCancel}
           onPrimaryAction={onCancel}
           PrimaryButtonComponent={PrimaryButton}
           disabled={false}>
        <RegularText text="personalSettings.email.changed" values={{email: userDetails.pendingNewEmail}}/>
    </Modal>
);;

export default EmailReSentConfirmationModal;