import React from "react";
import {PageHeading, LargeText} from "../../common";
import CreateRegistrationViewContainer from "../CreateRegistrationViewContainer";
import CreatePayreqBillsRegistrationForm from "./CreatePayreqBillsRegistrationForm";


const CreatePayreqBillsRegistrationView = ({channel, logoPath, billerName, helpImageAuthItem1, helpImageAccountNumber, fastformRegistrationAcceptLabel, serverErrors = [], onSubmit}) => {
    return (
        <CreateRegistrationViewContainer logoPath={logoPath} billerName={billerName}>
            <PageHeading text="registrations.createPayreqBills.pageHeading"/>
            <LargeText text="registrations.createPayreqBills.secondaryHeading"/>
            <LargeText text="fastForm.registration.verification.heading"/>
            <CreatePayreqBillsRegistrationForm channel={channel}
                                          helpImageAuthItem1={helpImageAuthItem1}
                                          helpImageAccountNumber={helpImageAccountNumber}
                                          fastformRegistrationAcceptLabel={fastformRegistrationAcceptLabel}
                                         onSubmit={onSubmit}
                                         serverErrors={serverErrors}/>
        </CreateRegistrationViewContainer>
    )
};

export default CreatePayreqBillsRegistrationView;
