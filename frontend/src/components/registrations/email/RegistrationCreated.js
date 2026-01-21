import React from "react";

import {PageHeading, SecondaryHeading, LargeText, DefaultButton} from "../../common"
import styles from "./CreateEmailRegistrationView.module.scss"

const RegistrationsCreated = ({emailsToVerify, accountNumber, registeringForbillerId, hasPaymentGateway}) => {
    return (
        (
            <div>
                <PageHeading text="registrations.createEmail.success.heading"/>
                <LargeText text="registrations.createEmail.success.message"/>

                {emailsToVerify && emailsToVerify.length > 0 && (
                    <div style={{marginTop: "4rem"}}>
                        <SecondaryHeading text="registrations.createEmail.success.emailVerificationRequired.heading"/>
                        <LargeText text="registrations.createEmail.success.emailVerificationRequired.message"/>
                        <LargeText>
                            <ul>
                                {emailsToVerify.map(email => <li>{email}</li>)}
                            </ul>
                        </LargeText>
                    </div>
                )}
                {hasPaymentGateway && (
                    <div className={styles.autoPaymentPromptContainer}>
                        <LargeText text="registrations.success.autoPaymentPrompt"/>
                        <div className={styles.autoPaymentButtonContainer}>
                            <DefaultButton label="registrations.createEmail.success.setupAutoPayment.no"
                                           linkTo={"../../../billers"}
                            />
                            <DefaultButton label="registrations.createEmail.success.setupAutoPayment.yes"
                                           linkTo={{
                                               pathname: "../../../../auto-payments/create",
                                               state: {
                                                   accountNumber: accountNumber,
                                                   billerActorId: registeringForbillerId
                                               }
                                           }}
                            />

                        </div>
                    </div>
                )
                }
                {!hasPaymentGateway && (
                    <DefaultButton icon="menu-left"
                                   label="registrations.createEmail.success.backButton"
                                   linkTo={"../../../billers"}
                    />
                )
                }

            </div>
        )
    )
};

export default RegistrationsCreated;
