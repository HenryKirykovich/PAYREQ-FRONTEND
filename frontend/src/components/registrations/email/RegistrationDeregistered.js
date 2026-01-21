import React from "react";

import {PageHeading, LargeText, DefaultButton} from "../../common"

const RegistrationsCreated = ({registrationId}) => {
    return(
    (
        <div>
            <PageHeading text="registrations.deregistration.success.heading"/>
            <LargeText text="registrations.deregistration.success.message"/>
            <DefaultButton icon="menu-left"
                           label="forms.generic.back.button"
                           linkTo={`../${registrationId}`}
            />
        </div>
    )
)};

export default RegistrationsCreated;
