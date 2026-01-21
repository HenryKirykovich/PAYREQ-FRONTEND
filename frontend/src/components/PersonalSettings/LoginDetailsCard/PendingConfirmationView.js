import React, {useState} from "react";
import axios from "axios";
import styles from "./LoginDetailsCard.module.scss";
import {LinkButton, RegularText, SecondaryHeading} from "../../common";
import EmailReSentConfirmationModal from "./EmailReSentConfirmationModal";
import CancelEmailUpdateModal from "./CancelEmailUpdateModal";

const resendVerificationEmail = (setIsConfirmationResent, setServerError) => {
    axios.post(`/data/personal/settings/email/resend`)
        .then(({data}) => {
            if (data.success === true) {
                setIsConfirmationResent(true)
            } else {
                setServerError(data.error)
            }
        });
};

const PendingConfirmationView = ({emailDetails}) => {
    const [isConfirmationResent, setIsConfirmationResent] = useState(false);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [resendError, setResendError] = useState();
    return (
        <div className={styles.pendingConfirmationContainer}>
            <SecondaryHeading className={styles.pendingConfirmationHeading}
                              text="personalSettings.email.pendingConfirmation"/>

            <div className={styles.row}>
                <RegularText text="personalSettings.email.changed"
                             values={{email: emailDetails.pendingNewEmail}}/>
                <LinkButton
                    onClick={() => resendVerificationEmail(setIsConfirmationResent, setResendError)}
                    label="personalSettings.email.resendConfirmationEmail"/>
                {resendError && <RegularText text={`personalSettings.email.request.resendFailed.${resendError}`}
                                             className={styles.errorText}/>}
            </div>
            <div className={styles.row}>
                <RegularText text="personalSettings.email.loginWith.oldEmail"
                             values={{email: emailDetails.email}}/>
            </div>
            <div className={styles.row}>
                <RegularText text="personalSettings.email.request.cancelMessage"/>
                <LinkButton onClick={() => setOpenCancelModal(true)}
                            label="personalSettings.email.request.cancel"/>
            </div>

            <EmailReSentConfirmationModal show={isConfirmationResent}
                                          onCancel={() => setIsConfirmationResent(false)}
                                          userDetails={emailDetails}/>

            <CancelEmailUpdateModal show={openCancelModal}
                                    onCancel={() => setOpenCancelModal(false)}
                                    emailDetails={emailDetails}/>
        </div>
    )

};

export default PendingConfirmationView;