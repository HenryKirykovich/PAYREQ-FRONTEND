import React, {useEffect, useState} from "react";
import Loading from "../Loading";
import BulkDownloadPreferencesView from "./BulkDownloadPreferencesView";
import BulkDownloadPreferencesIntroView from "./BulkDownloadPreferencesIntroView";
import axios from "axios/index";

function populatePreference(billerId, setIsLoading, setDownloadPreference) {
    axios.get(`/data/settings/bulk-download-preferences/${billerId}`)
        .then(({data}) => setDownloadPreference(data.bulkDownloadPreference))
        .finally(() => setIsLoading(false))
}

const BulkDownloadPreferences = ({biller}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [downloadPreference, setDownloadPreference] = useState();

    useEffect(() => populatePreference(biller.id, setIsLoading, setDownloadPreference), [biller])

    if (isLoading) return <Loading/>;

    if (downloadPreference) return <BulkDownloadPreferencesView preference={downloadPreference}/>

    return  <BulkDownloadPreferencesIntroView/>;

};

export default BulkDownloadPreferences