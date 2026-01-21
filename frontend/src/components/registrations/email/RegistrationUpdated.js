import React from "react";

import {PageHeading, SecondaryHeading, LargeText, DefaultButton} from "../../common"

const RegistrationUpdated = ({registrationId, emailsToVerify}) => {
    return(
    (
        <div>
            <PageHeading text="registrations.update.success.heading"/>
            <LargeText text="registrations.update.success.message"/>

            {emailsToVerify && emailsToVerify.length > 0 && (
                <div style={{marginTop: "4rem"}}>
                    <SecondaryHeading text="registrations.createEmail.success.emailVerificationRequired.heading"/>
                    <LargeText text="registrations.createEmail.success.emailVerificationRequired.message"/>
                    <LargeText>
                        <ul>
                            {emailsToVerify.map(email => <li key={email}>{email}</li>)}
                        </ul>
                    </LargeText>
                </div>
            )}
            <DefaultButton icon="menu-left"
                           label="forms.generic.back.button"
                           linkTo={`../${registrationId}`}
            />
        </div>
    )
)};

export default RegistrationUpdated;
