import React from "react";

import BrowserUI from "../BrowserUI";
import { DefaultButton, LargeText, PageHeading } from "../common";

const MfaUpdateSuccessful = () => (
    <React.Fragment>
        <PageHeading text="personalSettings.security.mfa.updateSuccessful.pageHeading" />
        <LargeText text="personalSettings.security.mfa.updateSuccessful.body" />
        <BrowserUI>
            <DefaultButton label="personalSettings.backToSettings" linkTo={{ pathname: "../settings" }} />
        </BrowserUI>
    </React.Fragment>
)

export default MfaUpdateSuccessful;
