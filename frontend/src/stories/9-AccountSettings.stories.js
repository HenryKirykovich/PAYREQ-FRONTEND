import React from 'react';
import BulkDownloadPreferencesView from "../components/BulkDownloadPreferences/BulkDownloadPreferencesView";
import BulkDownloadPreferencesIntroView from "../components/BulkDownloadPreferences/BulkDownloadPreferencesIntroView";
import BulkDownloadPreferencesEditForm from "../components/BulkDownloadPreferences/BulkDownloadPreferencesEditForm";


export default {
    title: 'Account Settings',
};

const downloadPreference = {"downloadType": "individual", "pages": "first"};

export const bulkDownloadLandingPage = () => <BulkDownloadPreferencesIntroView/>
export const bulkDownloadCreateForm = () => <BulkDownloadPreferencesEditForm preference={{}} cancelLink="./view"/>
export const bulkDownloadEditForm = () => <BulkDownloadPreferencesEditForm preference={downloadPreference} cancelLink="./view"/>
export const bulkDownloadViewPage = () => <BulkDownloadPreferencesView preference={downloadPreference}/>



