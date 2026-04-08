import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";

import {AlertDanger, DefaultButton, LargeText, PrimaryButton} from "../common";
import PayreqLogo from "../Login/PayreqLogo";
import LoginCard from "../Login/LoginCard";
import {injectIntl} from "react-intl";
import styles from "./EmailSubscriptionVerification.module.scss"
import axios from "axios";
import Loading from "../Loading";
import {LEGACY_POST_AXIOS_CONFIG} from "../../utils/form-utils";

function getEmailConnectionVerification(code, id, setInvite, setIsLoading) {
    axios.get("/auth/email-verification",
        {
            params: {
                code: code,
                detailId: id,
            }
        })
        .then(({data}) => setInvite(data.invite))
        .finally(() => setIsLoading(false))
}


function cancelEmailConnection(code, id, history, setShowError) {
    setShowError(false);

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('detailId', id);

    axios.post("/auth/email-unsubscribe",params, LEGACY_POST_AXIOS_CONFIG)
        .then(({data}) => {
            if(data.success){
                history.push("/verify/email-verification-confirmation/cancelled");
            } else {
                setShowError(true);
            }
        })
}

function confirmEmailConnection(code, id, history, setShowError) {
    setShowError(false);

    const params = new URLSearchParams();
    params.append('code', code);
    params.append('detailId', id);

    axios.post("/auth/email-verification",params, LEGACY_POST_AXIOS_CONFIG)
        .then(({data}) => {
            if(data.success){
                history.push("/verify/email-verification-confirmation/confirmed");
            } else {
                setShowError(true);
            }
        })
}

export const NoInviteFound = () => {
    return (
        <LoginCard heading="emailConnectionVerification.heading">
            {/*eslint-disable-next-line*/}
            <LargeText text="emailConnectionVerification.noInvite.message"/>
            <div className={styles.buttons}>
                <DefaultButton label="emailConnectionVerification.noInvite.button"
                               linkTo="/portal/customer/login" />
            </div>
        </LoginCard>
    )
}

export const InviteConfirmation = ({invite, showError, submitConfirmation, submitCancellation}) => {
    return (
        <LoginCard heading="emailConnectionVerification.heading">
            {/*eslint-disable-next-line*/}
            <LargeText text="emailConnectionVerification.message" values={{billerName: invite.billerName}}/>
            <div className={styles.buttons}>
                <DefaultButton label="emailConnectionVerification.button.cancel"
                               onClick={submitCancellation}/>
                <PrimaryButton label="emailConnectionVerification.button.confirm"
                               onClick={submitConfirmation}/>
            </div>
            {showError && <div className={styles.error}><AlertDanger value="emailConnectionVerification.error"/> </div>}
        </LoginCard>
    )
}

const EmailConnectionVerification = ({ match: { params: { code, id} }, intl, history}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [invite, setInvite] = useState();
    const [showError, setShowError] = useState(false);

    useEffect(
        () => getEmailConnectionVerification(code, id, setInvite, setIsLoading),
        [code, id]
    );

    if (isLoading) return <Loading/>;

    return  (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.centerDiv}>
                    <PayreqLogo intl={intl}/>
                    {invite ? <InviteConfirmation invite={invite}
                                                  showError={showError}
                                                  submitCancellation={() => cancelEmailConnection(code, id, history, setShowError)}
                                                  submitConfirmation={() => confirmEmailConnection(code, id, history, setShowError)}/>
                            : <NoInviteFound/>}
                </div>
            </div>
        </React.Fragment>

    )
}

export default injectIntl(withRouter(EmailConnectionVerification));
