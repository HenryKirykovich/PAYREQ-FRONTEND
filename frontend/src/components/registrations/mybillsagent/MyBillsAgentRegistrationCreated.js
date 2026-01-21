import React from "react";

import {PageHeading, LargeText, DefaultButton, PrimaryButton} from "../../common"

const BackButton = () => (
    <DefaultButton icon="menu-left"
                   label="registrations.createEmail.success.backButton"
                   linkTo={"../../../billers"}
    />
)

const MyBillsAgentRegistrationCreated = ({registrationsCreated, registrationsExisting, hasDownloadPreference, payerId}) => {
    return (
        (
            <div>
                <PageHeading text="registrations.createEmail.success.heading"/>
                <LargeText text="registrations.createEmail.success.message"/>

                {registrationsCreated.length > 0 &&
                <LargeText text="registrations.createMyBillsAgent.registrationsCreated"
                             values={{count: registrationsCreated.length}}/>}

                {registrationsExisting.length > 0 && (
                    <React.Fragment>
                        <LargeText text="registrations.createMyBillsAgent.registrationsExisting"/>
                        <ul>
                            {registrationsExisting.map(r => <li><LargeText>{r.authfield1}, {r.accountNumber}</LargeText></li>)}
                        </ul>
                    </React.Fragment>
                )}

                {!hasDownloadPreference && (
                    <div style={{marginTop: "2em", marginBottom: "2em"}}>
                        <LargeText text="registrations.createMyBillsAgent.downloadPreference"/>
                        <PrimaryButton label="registrations.createMyBillsAgent.downloadPreference.button"
                                       linkTo={{pathname: `/portal/customer/biller/${payerId}/settings/bulkDownloadPreference/view`}}/>
                    </div>
                )}

                <BackButton/>

            </div>
        )
    )
};

export default MyBillsAgentRegistrationCreated;
