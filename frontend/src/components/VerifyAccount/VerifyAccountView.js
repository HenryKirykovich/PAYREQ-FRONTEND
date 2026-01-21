import React from "react";
import styles from "./VerifyAccount.module.scss";
import PayreqLogo from "../Login/PayreqLogo";
import LoginCard from "../Login/LoginCard";
import {Alert, DefaultButton, LargeText, LinkButton, RegularText} from "../common";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import BrowserUI from "../BrowserUI";

const ResendVerificationCode = ({username, intl, resend, isSubmitting, showResent, showMaxResends}) => {
    return (
        <div className={styles.resendContainer}>
            <RegularText text="verifyDevice.resend.heading" className={styles.resendHeading}/>
            <RegularText text="verifyDevice.resend.message" />
            {showResent && <Alert type="success" className={styles.alert}>{intl.formatMessage({id: "verifyDevice.resend.alert"}, {email: username})}</Alert>}
            {showMaxResends && <Alert type="danger" className={styles.alert} value="verifyDevice.resend.max"/>}
            <DefaultButton label="verifyDevice.resend.button"
                           disabled={isSubmitting}
                           onClick={resend}/>
            <div className={styles.helpContainer}>
                <RegularText text="verifyDevice.resend.help.question" className={styles.verifyHelp}/>
                <LinkButton label="verifyDevice.resend.help.email" href={intl.formatMessage({id: "verifyDevice.resend.help.email.mailto"})}/>
            </div>
        </div>
    )
}

const VerifyAccountView = ({intl, username, resend, isSubmitting, showResent, showMaxResends, history}) => {
    return <div className={styles.container}>
        <div className={styles.centerDiv}>
            <PayreqLogo intl={intl}/>
            <LoginCard heading="verifyAccount.heading" headingContainerStyles={styles.headingContainer} >
                {/*eslint-disable-next-line*/}
                <LargeText text="verifyAccount.messageOne"/>
                <ResendVerificationCode username={username}  intl={intl} resend={resend} isSubmitting={isSubmitting} showResent={showResent} showMaxResends={showMaxResends}/>
                <BrowserUI>
                    <LinkButton label="forms.generic.cancel.button" className={styles.backLink}  onClick={() => history.push("../../portal/customer/login")}/>
                </BrowserUI>
            </LoginCard>
        </div>
    </div>
}

export default injectIntl(withRouter(VerifyAccountView));
