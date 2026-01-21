import React from 'react';
import styles from "./VerifyAccountConfirmation.module.scss";
import PayreqLogo from "../Login/PayreqLogo";
import LoginCard from "../Login/LoginCard";
import {Alert, LargeText, PrimaryButton} from "../common";
import FieldGroup from "../common/FieldGroup";
import {injectIntl} from "react-intl";

const VerifyAccountConfirmationCard = ({invite, isSubmitting, verifyAccount, serverError,intl}) => {
    return (
        <div className={styles.container}>
            <div className={styles.centerDiv}>
                <PayreqLogo intl={intl}/>
                <LoginCard heading="verifyAccountConfirmation.heading" headingContainerStyles={styles.headingContainer} >
                    {/*eslint-disable-next-line*/}
                    <LargeText text="verifyAccountConfirmation.message"/>
                    <FieldGroup className={styles.detailsContainer}>
                        {invite && invite.email &&
                        <FieldGroup.Field label={intl.formatMessage({id: "verifyAccountConfirmation.email.label"})}
                                          value={<p className={styles.emailAddress}>{invite.email}</p>}/>}
                    </FieldGroup>

                    <div className={styles.buttonContainer}>
                        <PrimaryButton label="verifyAccountConfirmation.button"
                                       disabled={isSubmitting}
                                       onClick={verifyAccount}/>
                    </div>

                    {serverError && <div className={styles.errorContainer}> <Alert type="danger" value="verifyAccountConfirmation.error"/></div>}

                </LoginCard>
            </div>
        </div>
    )
}

export default injectIntl(VerifyAccountConfirmationCard);