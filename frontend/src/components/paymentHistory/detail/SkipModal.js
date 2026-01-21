import React from 'react';
import axios from "axios";
import {DangerButton, Modal, RegularText} from "../../common";
import {withRouter} from "react-router-dom";

const skipPayment = (id, history) => {
    axios.post(`/data/payment-history/skip/${id}`)
        .then(({data}) => {
            if (data.success === true) {
                history.push('../payments')
            }
        });
};

const SkipModal = ({paymentId, show, onCancel, history}) => (
    <Modal show={show}
           title="paymentHistory.skipModal.heading"
           buttonLabel="forms.generic.true"
           onCancel={onCancel}
           onPrimaryAction={() => skipPayment(paymentId, history)}
           PrimaryButtonComponent={DangerButton}
    >
        <RegularText text="paymentHistory.skipModal.text"/>
    </Modal>
);

export default withRouter(SkipModal);
