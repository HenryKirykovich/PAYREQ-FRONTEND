import React from 'react';
import styles from "./Mfa.module.scss";
import PayreqLogo from "../PayreqLogo";
import LoginCard from "../LoginCard";
import MfaForm from "./MfaForm";
import SwitchAccountLink from "../SwitchAccountLink";
import {injectIntl} from "react-intl";

const MfaView = ({intl, serverError, submitMfa, switchAccount}) => {
    return   <div className={styles.container}>
        <div className={styles.centerDiv}>
            <PayreqLogo intl={intl}/>
            <LoginCard heading="mfa.heading" text="mfa.instruction">
                {/*eslint-disable-next-line*/}
                <MfaForm serverError={serverError}
                         intl={intl}
                         onSubmit={submitMfa}/>
                <SwitchAccountLink onClick={switchAccount}/>
            </LoginCard>
        </div>
    </div>
}

export default injectIntl(MfaView);