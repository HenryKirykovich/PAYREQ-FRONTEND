import LoginCard from "./LoginCard";
import styles from "./Login.module.scss";
import LoginPasswordForm from "./LoginPasswordForm";
import SwitchAccountLink from "./SwitchAccountLink";
import React from "react";

const PasswordRequiredView = ({signIn,username, setUsername, serverErrors, intl}) => {
    return (
        <LoginCard heading="login.password.pageHeading"
                   text="login.password.pageMessage"
                   values={{username: username}}
                   headingContainerStyles={styles.headingContainer}>
            {/*eslint-disable-next-line*/}
            <LoginPasswordForm onSubmit={signIn}
                               serverErrors={serverErrors}
                               intl={intl}/>
            <SwitchAccountLink onClick={() => setUsername()}/>
        </LoginCard>
    )
}

export default PasswordRequiredView;