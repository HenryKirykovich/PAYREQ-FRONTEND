import React, {useState, useEffect} from "react";
import axios from "axios";

import DownloadHistoryView from "./DownloadHistoryView";

import Loading from "../Loading";
const getInitialPageNumber = pageNumber => pageNumber || 1;
const getDownloadHistory = (billerId, pageNumber, setHistoryData, setSubmitting) => {
    setSubmitting && setSubmitting(true);
    axios.get(`/data/jobs`, {
        params: {
            billerId, pageNumber
        }
    })
        .then(({data}) => {
            setHistoryData(data);
            setSubmitting && setSubmitting(false);
        })
    ;
};
function DownloadHistory({billerId, pageNumber}) {


    const [historyData, setHistoryData] = useState();
    const [isSubmitting, setSubmitting] = useState(true);

    useEffect(() => getDownloadHistory(billerId, getInitialPageNumber(pageNumber), setHistoryData, setSubmitting), [billerId, pageNumber, setHistoryData, setSubmitting])

    if (!historyData) return <Loading/>;

    return <DownloadHistoryView historyData={historyData}
                                billerId={billerId}
                                isSubmitting={isSubmitting}
                                total={historyData.meta.total}
                                showing={historyData.meta.showing}
                                handleData={(setSubmitting, pageNumber) => {
                                    getDownloadHistory(billerId, pageNumber, setHistoryData, setSubmitting);
                                }}
                                onRefresh={() => {
                                    getDownloadHistory(billerId, getInitialPageNumber(pageNumber), setHistoryData, setSubmitting);
                                }}
    />
};

export default DownloadHistory;