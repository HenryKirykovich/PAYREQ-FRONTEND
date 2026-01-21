import React from 'react';
import axios from "axios";
import {Modal, PrimaryButton, RegularText} from "../../common";

const cancelEmailUpdate = () => {
    axios.post(`/data/personal/settings/email/cancel`)
        .then(({data}) => {
            if (data.success === true) {
                window.location.reload()
            }
        });
};

const CancelEmailUpdateModal = ({show, onCancel}) => (
    <Modal show={show}
           title="personalSettings.email.request.cancelModal.heading"
           buttonLabel="forms.generic.true"
           onCancel={onCancel}
           onPrimaryAction={cancelEmailUpdate}
           PrimaryButtonComponent={PrimaryButton}
    >
        <RegularText text="personalSettings.email.request.cancelModal.message"/>
    </Modal>
);

export default CancelEmailUpdateModal;