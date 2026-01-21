import React, {useState} from "react";
import {LargeText, PrimaryButton} from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";
import styles from "./InvoiceDownloadCardView.module.scss"
import {FormattedDate, injectIntl} from "react-intl";
import axios from "axios";
import fileDownload from "js-file-download";

const downloadZip = (jobId, setIsDownlaoding, setDownloaded) => {
    setIsDownlaoding(true)
    axios.get(`/job-result/${jobId}`, {
        responseType: "arraybuffer"
    })
        .then(({headers, data}) => {
            const filename = headers["content-disposition"].split("filename=")[1];
            fileDownload(data, filename);
            setDownloaded(true)
        })
        .finally(() => setIsDownlaoding(false));
};

const DownloadButton = injectIntl(({jobId, setDownloaded, intl, billerName}) => {
        const [isDownloading, setIsDownloading] = useState(false);
        return (
            <PrimaryButton label="generic.download"
                           aria-label={intl.formatMessage({id: "dashboard.invoiceDownloadCard.downloadButton.aria"}, {billerName: billerName})}
                           onClick={() => downloadZip(jobId, setIsDownloading, setDownloaded)}
                           isSubmitting={isDownloading}
            />
        )
    }
);

const Downloaded = () => <LargeText text="dashboard.invoiceDownloadCard.downloadComplete" disabled={true} />;

const InvoiceDownloadCardView = ({billerName, count, receivedDate, jobId, documentType}) => {
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
                {downloaded ? <Downloaded/> :
                    <DownloadButton jobId={jobId} setDownloaded={setDownloaded} billerName={billerName}/>}

            </div>
        </DashboardCard>
    )
};

export default InvoiceDownloadCardView;