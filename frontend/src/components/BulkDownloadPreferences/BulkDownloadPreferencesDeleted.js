import React from "react";
import {DefaultButton, LargeText, PageHeading} from "../common";

const BulkDownloadPreferencesDeleted = () => (
    <React.Fragment>
        <PageHeading text="personalSettings.preferences.bulkDownloadPreference.deleted.heading"/>
        <LargeText text="personalSettings.preferences.bulkDownloadPreference.deleted.body"/>
        <DefaultButton label="forms.generic.back.button" linkTo="./view"/>
    </React.Fragment>
)

export default BulkDownloadPreferencesDeleted;