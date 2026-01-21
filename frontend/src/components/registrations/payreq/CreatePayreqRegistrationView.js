import React from "react";
import {PageHeading, LargeText} from "../../common";
import CreateRegistrationViewContainer from "../CreateRegistrationViewContainer";
import CreatePayreqRegistrationForm from "./CreatePayreqRegistrationForm";


const CreatePayreqRegistrationView = ({channel, logoPath, billerName, helpImageAuthItem1, helpImageAccountNumber, fastformRegistrationAcceptLabel, serverErrors = [], onSubmit}) => {
    return (
        <CreateRegistrationViewContainer logoPath={logoPath} billerName={billerName}>
            <PageHeading text="registrations.createPayreq.pageHeading"/>
            <LargeText text="registrations.createPayreq.secondaryHeading"/>
            <LargeText text="registrations.createPayreq.verification.heading"/>
            <CreatePayreqRegistrationForm channel={channel}
                                          helpImageAuthItem1={helpImageAuthItem1}
                                          helpImageAccountNumber={helpImageAccountNumber}
                                          fastformRegistrationAcceptLabel={fastformRegistrationAcceptLabel}
                                          onSubmit={onSubmit}
                                          serverErrors={serverErrors}/>
        </CreateRegistrationViewContainer>
    )
};

export default CreatePayreqRegistrationView;
