import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import Loading from "../Loading";
import axios from "axios/index";
import {getQueryParams} from "../../utils/route-utils";
import fileDownload from "js-file-download";
import styles from "./DailyDownload.module.scss";
import {LargeText, PrimaryButton} from "../common";
import DashboardCard from "../Dashboard/DashboardView/DashboardCard";
import {FormattedDate} from "react-intl";

const getDownloadDetails = (token, setIsLoading, setDownloadDetails) => {
    setIsLoading(true)

    axios.get("/dd", {
        params: {t: token}
    }).then(({data}) => {
        if (data.success) {
            setDownloadDetails(data.downloadDetails)
        }
    })
        .finally(() => setIsLoading(false))
}

const downloadZip = (token, setIsDownloading, setDownloaded) => {
    setIsDownloading(true)

    axios.get("/dd/file", {
        params: {t: token},
        responseType: "arraybuffer"
    }).then(({headers, data}) => {
        if (data.success === false) { //have to be explicit because when the zip downloads it doesn't have a success key
            window.location.href = "/"
        } else {
            const filename = headers["content-disposition"].split("filename=")[1];
            fileDownload(data, filename);
            setDownloaded(true)
        }
    })
        .finally(() => setIsDownloading(false))
}

const DownloadButton = ({token, setDownloaded}) => {
    const [isDownloading, setIsDownloading] = useState(false);
    return (
        <PrimaryButton label="generic.download"
                       onClick={() => downloadZip(token, setIsDownloading, setDownloaded)}
                       isSubmitting={isDownloading}
        />
    )
};

const Downloaded = () => <LargeText text="dashboard.invoiceDownloadCard.downloadComplete" disabled={true}/>;

const InvoiceDownloadCardView = ({billerName, count, receivedDate, token, documentType}) => {
    const [downloaded, setDownloaded] = useState(false);
    return (
        <DashboardCard isBannerCard={true} panelHeading={`dashboard.invoiceDownloadCard.heading.${documentType}`}
                       values={{billerName: billerName}}>
            <LargeText text={`dashboard.invoiceDownloadCard.newDocumentsReceived.${documentType}`}
                       values={{
                           count: count,
                           billerName: billerName,
                           date: <FormattedDate value={new Date(receivedDate)}
                                                year="numeric"
                                                month="short"
                                                day="numeric"
                           />
                       }}/>
            <div className={styles.buttonContainer}>
                {downloaded ? <Downloaded/> : <DownloadButton token={token} setDownloaded={setDownloaded}/>}

            </div>
        </DashboardCard>
    )
};

const DailyDownload = ({location}) => {
    const token = getQueryParams(location).t;
    const [isLoading, setIsLoading] = useState(true);
    const [downloadDetails, setDownloadDetails] = useState();
    useEffect(() => getDownloadDetails(token, setIsLoading, setDownloadDetails), [token, setIsLoading, setDownloadDetails])

    if (isLoading || !downloadDetails) return <Loading/>;

    return (
        <div className={styles.container}>
            <InvoiceDownloadCardView receivedDate={downloadDetails.invoicesReceivedOn}
                                     count={downloadDetails.invoiceCount}
                                     billerName={downloadDetails.billerName}
                                     documentType={downloadDetails.documentType}
                                     token={token}
            />
        </div>);
}

export default withRouter(DailyDownload);
