import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {SET_ALERT} from "../../state/reducers/alertReducer";
import {useAppState} from "../../state";
import {DangerButton, Modal, RegularText} from "../common";

const deleteAutoPayment = (billerId, id, history, dispatch) => {
    axios.delete(`/data/auto-payments/${billerId}/${id}`)
        .then(({data}) => {
            if (data.success) {
                dispatch({type: SET_ALERT, alert: {level: "success", text: "autoPayment.delete.success"}});
                history.push("../auto-payments");
            }
        });
};

const DeleteAutoPaymentModal =
    ({billerId, show, onCancel, autoPayment, history}) => {
        const [, dispatch] = useAppState();
        return (
            <Modal show={show}
                   title="autoPayment.delete.heading"
                   buttonLabel="forms.generic.delete.button"
                   onCancel={onCancel}
                   onPrimaryAction={() => deleteAutoPayment(billerId, autoPayment.id, history, dispatch)}
                   PrimaryButtonComponent={DangerButton}
            >
                <RegularText text="autoPayment.delete.areYouSure"/>
            </Modal>
        )
    };

export default withRouter(DeleteAutoPaymentModal);