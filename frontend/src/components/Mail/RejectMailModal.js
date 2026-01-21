import {withRouter} from "react-router-dom";
import {Modal, PrimaryButton, RegularText} from "../common";
import React from "react";
import axios from "axios";
import {useAppState} from "../../state";
import {SET_ALERT} from "../../state/reducers/alertReducer";

const rejectMail = (billerId, searchParams, setShowRejectMailModal, dispatch) => {
    axios.post(`/data/v2/bills/${billerId}/rejectall`, searchParams)
        .then(({data}) => {
            if (data.success) {
                dispatch({type: SET_ALERT, alert: {level: "success", text: "mail.rejectMail.approved"}});
                setShowRejectMailModal(false);
            }
        });
}

const RejectMailModal =
    ({billerId, searchParams, total, show, setShowRejectMailModal}) => {
        const [, dispatch] = useAppState();
        return (
            <Modal show={show}
                   title="mail.rejectMail.heading"
                   buttonLabel="mail.rejectMail.heading"
                   onCancel={() => setShowRejectMailModal(false)}
                   onPrimaryAction={() => rejectMail(billerId, searchParams, setShowRejectMailModal, dispatch)}
                   PrimaryButtonComponent={PrimaryButton}
            >
                <RegularText text="mail.rejectMail.text" values={{total: total}}/>
            </Modal>
        )
    };

export default withRouter(RejectMailModal);
