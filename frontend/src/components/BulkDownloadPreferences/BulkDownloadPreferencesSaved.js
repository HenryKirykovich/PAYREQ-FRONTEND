import React from "react";
import {DefaultButton, LargeText, PageHeading} from "../common";

const BulkDownloadPreferencesSaved = () => (
    <React.Fragment>
        <PageHeading text="personalSettings.preferences.bulkDownloadPreference.saved.heading"/>
        <LargeText text="personalSettings.preferences.bulkDownloadPreference.saved.body"/>
        <DefaultButton label="forms.generic.back.button" linkTo="./view"/>
    </React.Fragment>
)

export default BulkDownloadPreferencesSaved;