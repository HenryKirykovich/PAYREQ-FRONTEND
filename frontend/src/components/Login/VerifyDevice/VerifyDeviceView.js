import styles from "./VerifyDevice.module.scss";
import PayreqLogo from "../PayreqLogo";
import LoginCard from "../LoginCard";
import VerifyDeviceForm from "./VerifyDeviceForm";
import {Alert, DefaultButton, LinkButton, RegularText} from "../../common";
import React, {useState} from "react";
import {injectIntl} from "react-intl";
import axios from "axios";


const onResendVerificationCode = (setSubmitting, setShowResent, setShowMaxResends) => {
    setSubmitting(true);
    setShowResent(false);
    setShowMaxResends(false);

    axios.post(
        `/auth/device/resend-email`
    )
        .then(({data}) => {
            if(data.success) {
                setShowResent(true);
            } else {
                setShowMaxResends(true);
            }})
        .finally(() => setSubmitting(false));
};

const ResendVerificationCode = ({username, intl}) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [showResent, setShowResent] = useState(false);
    const [showMaxResends, setShowMaxResends] = useState(false);

    return (
        <div className={styles.resendContainer}>
            <RegularText text="verifyDevice.resend.heading" className={styles.resendHeading}/>
            <RegularText text="verifyDevice.resend.message" />
            {showResent && <Alert type="success" className={styles.alert}>{intl.formatMessage({id: "verifyDevice.resend.alert"}, {email: username})}</Alert>}
            {showMaxResends && <Alert type="danger" className={styles.alert} value="verifyDevice.resend.max"/>}
            <DefaultButton label="verifyDevice.resend.button"
                           disabled={isSubmitting}
                           onClick={() => onResendVerificationCode(setSubmitting, setShowResent, setShowMaxResends)}/>
            <RegularText text="verifyDevice.resend.help" className={styles.verifyHelp}/>
        </div>
    )
}


const VerifyDeviceView = ({intl, serverError, username, cancel, onVeryDevice}) => {
    return <div className={styles.container}>
        <div className={styles.centerDiv}>
            <PayreqLogo intl={intl}/>
            <LoginCard heading="verifyDevice.heading" headingContainerStyles={styles.headingContainer} text="verifyDevice.text">
                {/*eslint-disable-next-line*/}
                <VerifyDeviceForm serverError={serverError}
                                  intl={intl}
                                  onSubmit={onVeryDevice}/>
                <ResendVerificationCode username={username}  intl={intl}/>
                <LinkButton label="forms.generic.cancel.button" className={styles.backLink}  onClick={cancel}/>

            </LoginCard>
        </div>
    </div>
}

export default injectIntl(VerifyDeviceView);