import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {Modal, RegularText} from "../../common";

const updateToPaid = (invoice, history) => {
    axios.post(`/data/invoices/${invoice.id}/paid`)
        .then(({data}) => {
            if (data.success) {
                window.location.reload();
            }
        });
};

const SetBillStatusToPaidConfirmationModal =
    ({show, onCancel, invoice, history}) => {
        if (!show) {
            return null;
        }

        return (
            <Modal show={show}
                   title="invoice.view.updateStatus.modal.title"
                   buttonLabel="invoice.view.updateStatus.modal.button"
                   onCancel={onCancel}
                   onPrimaryAction={() => updateToPaid(invoice, history)}
            >
                <RegularText text="invoice.view.updateStatus.modal.info"/>

            </Modal>

        )
    };

export default withRouter(SetBillStatusToPaidConfirmationModal);
