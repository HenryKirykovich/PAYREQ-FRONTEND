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

function getEmailSubscriptionVerification(code, id, setInvite, setIsLoading) {
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


function cancelEmailSubscription(code, id, history, setShowError) {
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

function confirmEmailSubscription(code, id, history, setShowError) {
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
        <LoginCard heading="emailSubscriptionVerification.heading">
            {/*eslint-disable-next-line*/}
            <LargeText text="emailSubscriptionVerification.noInvite.message"/>
            <div className={styles.buttons}>
                <DefaultButton label="emailSubscriptionVerification.noInvite.button"
                               linkTo="/portal/customer/login" />
            </div>
        </LoginCard>
    )
}

export const InviteConfirmation = ({invite, showError, submitConfirmation, submitCancellation}) => {
    return (
        <LoginCard heading="emailSubscriptionVerification.heading">
            {/*eslint-disable-next-line*/}
            <LargeText text="emailSubscriptionVerification.message" values={{billerName: invite.billerName}}/>
            <div className={styles.buttons}>
                <DefaultButton label="emailSubscriptionVerification.button.cancel"
                               onClick={submitCancellation}/>
                <PrimaryButton label="emailSubscriptionVerification.button.confirm"
                               onClick={submitConfirmation}/>
            </div>
            {showError && <div className={styles.error}><AlertDanger value="emailSubscriptionVerification.error"/> </div>}
        </LoginCard>
    )
}

const EmailSubscriptionVerification = ({ match: { params: { code, id} }, intl, history}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [invite, setInvite] = useState();
    const [showError, setShowError] = useState(false);

    useEffect(
        () => getEmailSubscriptionVerification(code, id, setInvite, setIsLoading),
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
                                                  submitCancellation={() => cancelEmailSubscription(code, id, history, setShowError)}
                                                  submitConfirmation={() => confirmEmailSubscription(code, id, history, setShowError)}/>
                            : <NoInviteFound/>}
                </div>
            </div>
        </React.Fragment>

    )
}

export default injectIntl(withRouter(EmailSubscriptionVerification));
