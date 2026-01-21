import {withRouter} from "react-router-dom";
import {Modal, PrimaryButton, RegularText} from "../common";
import React from "react";
import axios from "axios";
import {useAppState} from "../../state";
import {SET_ALERT} from "../../state/reducers/alertReducer";

const approveMail = (billerId, searchParams, setShowApproveMailModal, dispatch) => {
    axios.post(`/data/v2/bills/${billerId}/approveall`, searchParams)
        .then(({data}) => {
            if (data.success) {
                dispatch({type: SET_ALERT, alert: {level: "success", text: "mail.approveMail.approved"}});
                setShowApproveMailModal(false);
            }
        });
}

const ApproveMailModal =
    ({billerId, searchParams, total, show, setShowApproveMailModal}) => {
        const [, dispatch] = useAppState();
        return (
            <Modal show={show}
                   title="mail.approveMail.heading"
                   buttonLabel="mail.approveMail.heading"
                   onCancel={() => setShowApproveMailModal(false)}
                   onPrimaryAction={() => approveMail(billerId, searchParams, setShowApproveMailModal, dispatch)}
                   PrimaryButtonComponent={PrimaryButton}
            >
                <RegularText text="mail.approveMail.text" values={{total: total}}/>
            </Modal>
        )
    };

export default withRouter(ApproveMailModal);
