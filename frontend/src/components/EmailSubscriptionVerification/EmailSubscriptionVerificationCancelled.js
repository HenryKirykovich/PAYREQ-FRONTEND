import React from "react";

import {DefaultButton, LargeText} from "../common";
import PayreqLogo from "../Login/PayreqLogo";
import LoginCard from "../Login/LoginCard";
import {injectIntl} from "react-intl";
import styles from "./EmailSubscriptionVerification.module.scss"


const EmailConnectionVerificationCancelled = ({intl}) => {
    return  (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.centerDiv}>
                    <PayreqLogo intl={intl}/>
                    <LoginCard heading="emailConnectionCancelled.heading">
                        {/*eslint-disable-next-line*/}
                        <LargeText text="emailConnectionCancelled.message"/>
                        <div className={styles.buttons}>
                            <DefaultButton label="emailConnectionVerification.noInvite.button"
                                            onClick={() => window.location.href = `/`}/>

                        </div>
                    </LoginCard>
                </div>
            </div>
        </React.Fragment>

    )
}

export default injectIntl(EmailConnectionVerificationCancelled);
