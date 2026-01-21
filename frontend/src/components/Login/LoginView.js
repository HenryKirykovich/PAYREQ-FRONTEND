import React from 'react';
import styles from "./Login.module.scss";
import PayreqLogo from "./PayreqLogo";
import LoginOptionsView from "./LoginOptionsView";
import PasswordRequiredView from "./PasswordRequiredView";
import {LargeText, LinkButton, RegularText} from "../common";
import {injectIntl} from "react-intl";

const CreateAccount = () => {
    return (
        <div className={styles.createAccountContainer}>
            <RegularText text="login.createAccount.text"/>
            <div className={styles.createAccountLinkContainer}>
                <LinkButton linkTo="/portal/sign-up">
                    <LargeText text="login.createAccount.button"/>
                </LinkButton>
            </div>
        </div>
    );
}

const LoginView = ({intl, setUsername, setShowCreateMessage, showCreateAccountMessage, serverErrors, verifyEmail, username, signIn}) => {
    return <div className={styles.container}>
        <div className={styles.centerDiv}>
            <PayreqLogo intl={intl}/>

            {!username && <LoginOptionsView setUsername={setUsername}
                                            setShowCreateMessage={setShowCreateMessage}
                                            showCreateAccountMessage={showCreateAccountMessage}
                                            serverErrors={serverErrors}
                                            verifyEmail={verifyEmail}
                                            intl={intl}/>}

            {username && <PasswordRequiredView username={username}
                                               serverErrors={serverErrors}
                                               intl={intl}
                                               signIn={signIn}
                                               setUsername={setUsername}/>}
            <CreateAccount/>
        </div>
    </div>
}

export default injectIntl(LoginView);