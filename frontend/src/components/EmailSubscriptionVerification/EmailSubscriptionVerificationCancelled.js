import React from "react";

import {DefaultButton, LargeText} from "../common";
import PayreqLogo from "../Login/PayreqLogo";
import LoginCard from "../Login/LoginCard";
import {injectIntl} from "react-intl";
import styles from "./EmailSubscriptionVerification.module.scss"


const EmailSubscriptionVerificationCancelled = ({intl}) => {
    return  (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.centerDiv}>
                    <PayreqLogo intl={intl}/>
                    <LoginCard heading="emailSubscriptionCancelled.heading">
                        {/*eslint-disable-next-line*/}
                        <LargeText text="emailSubscriptionCancelled.message"/>
                        <div className={styles.buttons}>
                            <DefaultButton label="emailSubscriptionVerification.noInvite.button"
                                            onClick={() => window.location.href = `/`}/>

                        </div>
                    </LoginCard>
                </div>
            </div>
        </React.Fragment>

    )
}

export default injectIntl(EmailSubscriptionVerificationCancelled);
