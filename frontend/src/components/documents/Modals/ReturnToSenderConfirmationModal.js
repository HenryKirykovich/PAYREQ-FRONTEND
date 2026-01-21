import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {DangerButton, Modal, RegularText} from "../../common";

const returnToSender = (invoice, history) => {
    axios.post(`/data/invoices/${invoice.id}/return-to-sender`)
        .then(({data}) => {
            if (data.success) {
                history.push(`/portal/customer/biller/${invoice.payerActorId}/inbox`)
            }
        });
};

const ReturnToSenderConfirmationModal =
    ({show, onCancel, invoice, history}) => {
        if (!show) {
            return null;
        }

        return (
            <Modal show={show}
                   title="invoice.view.returnToSender.button"
                   buttonLabel="invoice.view.returnToSender.button"
                   onCancel={onCancel}
                   onPrimaryAction={() => returnToSender(invoice, history)}
                   PrimaryButtonComponent={DangerButton}
            >
                <RegularText text="invoice.view.returnToSender.modal.info"/>

            </Modal>

        )
    };

export default withRouter(ReturnToSenderConfirmationModal);