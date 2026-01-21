import React from "react";
import axios from "axios";

import {PageHeading, LargeText, SecondaryHeading, RegularText} from "../../common";
import CreateXeroRegistrationForm from "./CreateXeroRegistrationForm";
import CreateRegistrationViewContainer from "../CreateRegistrationViewContainer";
import xeroButtonImage from "../../../resources/images/oauthButtons/xero-connect-blue.svg"

const connectXeroAccount = (payerId, registeringForbillerId) => {
    axios.get(`/data/settings/xero/${payerId}/connecttoxero/${registeringForbillerId}/registration`)
        .then(({data}) => window.location.href = data.requesttoken.uri)
};

const ConnectToXero = ({payerId, registeringForbillerId}) => (
    <React.Fragment>
        <SecondaryHeading text="registrations.createXero.connectHeading"/>
        <RegularText text="registrations.createXero.connect1"/>
        <ol>
            <li><RegularText text="registrations.createXero.connect2"/></li>
            <li><RegularText text="registrations.createXero.connect3"/></li>
        </ol>
        <p><RegularText text="registrations.createXero.connect4"/></p>
        <p><RegularText text="registrations.createXero.connect5"/></p>
        <img src={xeroButtonImage}
             style={{cursor: "pointer"}}
             alt="Connect to Xero"
             onClick={() => connectXeroAccount(payerId, registeringForbillerId)}/>
    </React.Fragment>
);

const CreateEmailRegistrationView = ({channel, helpImageAccountNumber, helpImageAuthItem1, payerId, registeringForbillerId, xeroOrganisations, logoPath, billerName, fastformRegistrationAcceptLabel, serverErrors = [], onSubmit}) => {
    return (
        <CreateRegistrationViewContainer logoPath={logoPath} billerName={billerName}>
            <PageHeading text="registrations.createXero.pageHeading"/>

            {xeroOrganisations.length > 0 && (
                <React.Fragment>
                    <LargeText text="registrations.createXero.secondaryHeading"/>
                    <LargeText text="fastForm.registration.verification.heading"/>
                    <CreateXeroRegistrationForm channel={channel}
                                                helpImageAccountNumber={helpImageAccountNumber}
                                                helpImageAuthItem1={helpImageAuthItem1}
                                                fastformRegistrationAcceptLabel={fastformRegistrationAcceptLabel}
                                                onSubmit={onSubmit}
                                                serverErrors={serverErrors}
                                                xeroOrganisations={xeroOrganisations}
                    />
                </React.Fragment>)
            }
            {xeroOrganisations.length === 0 &&
            <ConnectToXero payerId={payerId} registeringForbillerId={registeringForbillerId}/>
            }

        </CreateRegistrationViewContainer>
    )
};

export default CreateEmailRegistrationView;
