import React, {useState} from "react";

import styles from "./FastFormVerifyView.module.scss"

import axios from "axios/index";

import {PageHeading, RegularText, DefaultButton, Alert} from "../common";
import FastFormVerificationForm from "./FastFormVerificationForm";

import {withRouter} from "react-router-dom";
import {injectIntl} from "react-intl";

const onSubmit = (billerId, code, values, setSubmitting, setServerErrors, history) => {
    setSubmitting(true);
    axios.post(
        `/ff/biller/${billerId}/verify/${code}`,
        values
    )
        .then(({data}) => {
            if (data.success) {
                sessionStorage.setItem('fastpass', code);
                history.push({pathname: "../confirmation/" + code + "/" + data.hasMyBills, state: {data}})
            } else {
                setServerErrors(data.errors);
            }
        })
        .finally(() => setSubmitting(false));
};

const resendCode = (billerId, code, setSubmitting, setResent, setMaxResends) => {
    setSubmitting(true)
    setMaxResends(false)
    setResent(false)

    axios.post(
        `/ff/biller/${billerId}/resend/${code}`
    )
        .then(({data}) => {
            if (data.success) {
                setResent(true)
            } else {
                setMaxResends(true)
            }
        }).finally(() => setSubmitting(false));
};

const ResendVerificationCode = ({email, billerId, code, intl}) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [resent, setResent] = useState(false);
    const [maxResends, setMaxResends] = useState(false)

    return (
        <div className={styles.resendContainer}>
            <RegularText text="verifyDevice.resend.heading" className={styles.resendHeading}/>
            <RegularText text="verifyDevice.resend.message"/>
            {resent && <Alert type="success" className={styles.alert}>{intl.formatMessage({id: "verifyDevice.resend.alert"}, {email: email})}</Alert>}
            {maxResends && <Alert type="danger" className={styles.alert} value="verifyDevice.resend.max"/>}
            <DefaultButton label="registration.view.resendVerificationEmail"
                           disabled={isSubmitting}
                           onClick={() => resendCode(billerId, code, setSubmitting, setResent, setMaxResends)}/>
            <RegularText text="verifyDevice.resend.help" className={styles.verifyHelp}/>
        </div>
    )

}

const FastFormVerifyView = ({billerId, biller, email, code, history, intl}) => {
    const [serverErrors, setServerErrors] = useState([]);
    return (
        <div className={styles.container}>
            <div className={styles.centerDiv}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} src={biller.logoPath} alt=""/>
                </div>

                <div className={styles.heading}>
                    <PageHeading text="fastForm.registration.heading" values={{tagName: biller.tagName}}/>
                </div>

                <FastFormVerificationForm email={email} formErrors={serverErrors}
                                          onSubmit={(values, {setSubmitting}) => onSubmit(billerId, code, values, setSubmitting, setServerErrors, history)}/>
                <ResendVerificationCode email={email}
                                        intl={intl}
                                        billerId={billerId}
                                        code={code}/>

            </div>
        </div>
    );
};


export default withRouter(injectIntl(FastFormVerifyView));