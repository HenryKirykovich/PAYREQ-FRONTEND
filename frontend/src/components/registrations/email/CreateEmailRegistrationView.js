import React from "react";
import CreateEmailRegistrationForm from "./CreateEmailRegistrationForm";
import {PageHeading, LargeText} from "../../common";
import CreateRegistrationViewContainer from "../CreateRegistrationViewContainer";

const CreateEmailRegistrationView = ({channel, helpImageAccountNumber, helpImageAuthItem1, logoPath, billerName, fastformRegistrationAcceptLabel, user, serverErrors = [], onSubmit}) => {
    return (
        <CreateRegistrationViewContainer logoPath={logoPath} billerName={billerName}>
            <PageHeading text="registrations.createEmail.pageHeading"/>
            <LargeText text="registrations.createEmail.secondaryHeading"/>
            <LargeText text="fastForm.registration.verification.heading"/>
            <CreateEmailRegistrationForm channel={channel}
                                         helpImageAccountNumber={helpImageAccountNumber}
                                         helpImageAuthItem1={helpImageAuthItem1}
                                         fastformRegistrationAcceptLabel={fastformRegistrationAcceptLabel}
                                         onSubmit={onSubmit}
                                         initialValues={{emails: [user.email]}}
                                         serverErrors={serverErrors}/>
        </CreateRegistrationViewContainer>
    )
};

export default CreateEmailRegistrationView;
