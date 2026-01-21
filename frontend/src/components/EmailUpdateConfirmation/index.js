import React from "react";
import {withRouter} from "react-router-dom";

import {LargeText, PrimaryButton} from "../common";
import PayreqLogo from "../Login/PayreqLogo";
import LoginCard from "../Login/LoginCard";
import {injectIntl} from "react-intl";
import styles from "./EmailUpdateConfrimation.module.scss"

const EmailUpdateConfirmation = ({intl}) => {
    return  (
        <React.Fragment>
            <div className={styles.container}>
                <div className={styles.centerDiv}>
                    <PayreqLogo intl={intl}/>
                    <LoginCard heading="emailUpdateConfirmation.heading" headingContainerStyles={styles.headingContainer} >
                        {/*eslint-disable-next-line*/}
                        <LargeText text="emailUpdateConfirmation.message"/>
                        <div className={styles.linkButton}>
                            <PrimaryButton label="fastForm.registration.confirmation.button.login"
                                             onClick={() => window.location.href = `/`}/>
                        </div>
                    </LoginCard>
                </div>
            </div>
        </React.Fragment>

    )
}

export default injectIntl(withRouter(EmailUpdateConfirmation));