import React, {useEffect, useState} from "react";
import BulkDownloadPreferencesEditForm from "./BulkDownloadPreferencesEditForm";
import {PageHeading} from "../common";
import axios from "axios";
import Loading from "../Loading";

function populatePreference(billerId, setIsLoading, setPreference) {
    axios.get(`/data/settings/bulk-download-preferences/${billerId}`)
        .then(({data}) => setPreference(data.bulkDownloadPreference))
        .finally(() => setIsLoading(false))
}

const BulkDownloadPreferencesEdit = ({biller}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [preference, setPreference] = useState({})

    useEffect(() => populatePreference(biller.id, setIsLoading, setPreference), [biller])

    if (isLoading) return <Loading/>

    return (
        <React.Fragment>
            <PageHeading text="personalSettings.preferences.bulkDownloadPreference.editPageTitle"/>
            <BulkDownloadPreferencesEditForm preference={preference} cancelLink="./view" billerId={biller.id}/>
        </React.Fragment>
    );

};

export default BulkDownloadPreferencesEdit