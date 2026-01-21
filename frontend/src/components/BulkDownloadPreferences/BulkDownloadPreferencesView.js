import React from "react";
import {FieldGroup, PageHeading, PrimaryButton} from "../common";
import styles from "./BulkDownloadPreferencesView.module.scss"

const BulkDownloadPreferencesView = ({preference}) => (
    <React.Fragment>
        <PageHeading text="personalSettings.preferences.bulkDownloadPreference"/>
        <FieldGroup className={styles.group} internationaliseValues={true} fields={[
            {
                label: "personalSettings.preferences.bulkDownloadPreference",
                value: `personalSettings.preferences.bulkDownloadPreference.downloadType.${preference.downloadType}`
            },
            {
                label: "personalSettings.preferences.bulkDownloadPreference.pages",
                value: `personalSettings.preferences.bulkDownloadPreference.pages.${preference.pages}`
            },
        ]}/>
        <PrimaryButton label="forms.generic.edit.button" linkTo={{pathname: "./edit"}} />
    </React.Fragment>
);

export default BulkDownloadPreferencesView;