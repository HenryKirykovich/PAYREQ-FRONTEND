import React, {useEffect, useState} from "react";
import axios from "axios";

import InvoiceDownloadCardView from "./InvoiceDownloadCardView";

const getDownloads = (setIsLoading, setDownloads, billerId) => {
    axios.get("/data/invoices/undownloaded/" + billerId)
        .then(({data}) => {
            if (data.success) setDownloads(data.downloads);
            setIsLoading(false);
        });
};

const InvoiceDownloadCard = ({billerId, setIsLoading}) => {
    const [downloads, setDownloads] = useState([]);

    useEffect(() => {
        getDownloads(setIsLoading, setDownloads, billerId);
    }, [setIsLoading, setDownloads, billerId]);

    if (downloads.length === 0) return null;
    return (
        <React.Fragment>
            {downloads.map(d => <InvoiceDownloadCardView key={d.id}
                                                         receivedDate={d.invoicesReceivedOn}
                                                         count={d.invoiceCount}
                                                         billerName={d.billerName}
                                                         jobId={d.jobId}
                                                         documentType={d.documentType}
            />)}
        </React.Fragment>)

};

export default InvoiceDownloadCard;