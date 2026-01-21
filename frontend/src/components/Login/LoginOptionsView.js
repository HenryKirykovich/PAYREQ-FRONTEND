import LoginCard from "./LoginCard";
import styles from "./Login.module.scss";
import LoginUsernameForm from "./LoginUsernameForm";
import React from "react";
import {injectIntl} from "react-intl";


const LoginDivider = ({intl}) =>  {
    return (
        <div className={styles.loginDivider}>
            <span>{intl.formatMessage({id: "login.divider.value"})}</span>
        </div>
    );
}


const XeroSingleSignOn = ({intl})  => {
    return (
        <div className={styles.xeroButton}>
          <span data-xero-sso data-href="/xero/sign-in" data-label={intl.formatMessage({id: "login.xero.title"})}></span>
        </div>
    );
}

const SingleSignOn = ({intl}) => {
    return (
        <React.Fragment>
            <XeroSingleSignOn intl={intl}/>
        </React.Fragment>
    )
}

const LoginOptionsView = ({verifyEmail, serverErrors, setShowCreateMessage, showCreateAccountMessage, intl, history}) =>  {
    return  (
        <LoginCard heading="login.pageHeading" headingContainerStyles={styles.headingContainer}>
            {/*eslint-disable-next-line*/}
            <LoginUsernameForm onSubmit={verifyEmail}
                               serverErrors={serverErrors}
                               setShowCreateMessage={setShowCreateMessage}
                               showCreateAccountMessage={showCreateAccountMessage}
                               intl={intl}
                               history={history}/>
            <LoginDivider intl={intl}/>
            <SingleSignOn intl={intl}/>
        </LoginCard>
    )
}

export default injectIntl(LoginOptionsView);
