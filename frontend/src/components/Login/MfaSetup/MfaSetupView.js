import React from 'react';
import styles from "./MfaSetup.module.scss";
import LoginCard from "../LoginCard";
import {PageHeading} from "../../common";
import AuthenticatorAppSetupForm from "../../MfaAuthenticatorAppSetup/AuthenticatorAppSetupForm";

const MfaSetupView = ({mfaCodeData, codesIncorrect, setupMfa}) => {
    return <div className={styles.container}>
        <div className={styles.centerDiv}>
            <LoginCard>
                <PageHeading text="personalSettings.security.mfa.pageHeading"/>
                <AuthenticatorAppSetupForm mfaCodeData={mfaCodeData}
                                           codesIncorrect={codesIncorrect}
                                           linkTo={{pathname: "./login"}}
                                           onSubmit={setupMfa}/>
            </LoginCard>
        </div>
    </div>

}

export default MfaSetupView;

