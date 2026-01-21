import React, {useCallback} from "react";

import styles from "./PdfPreviewCard.module.scss";
import {Document, Page} from "react-pdf/dist/esm/entry.webpack";
import {Card, Icon, LinkButton, RegularText} from "../../common";
import {isIEBrowser} from "../../../utils/date-utils";
import axios from "axios";

function DocumentPreview ({invoice, showXmlDownload, intl, setIsDownloaded}) {
    const pageProps = window.innerWidth < 1000 ? {width: window.innerWidth - 100} : {};
    const isIE = isIEBrowser();
    const {id, invoiceDetail} = invoice;
    const markDownloaded = useCallback(() => {
        axios.post(`/data/invoices/downloaded/${id}`)
        .then(() => {
            setIsDownloaded(true)
        })
    }, [id, setIsDownloaded])
    if (isIE) {
        return (
            <div className={styles.ieUnsupported}>
                <RegularText text="pdfPreviewCard.previewNotSupportedInternetExplorer" />
                <LinkButton onClick={() => {
                            window.open(`/data/invoices/detail/${id}`, "_blank")
                            markDownloaded()}}
                            label="generic.downloadPdf"
                            icon="download"/>

                {invoiceDetail != null &&
                <div>
                    <RegularText text="pdfPreviewCard.downloadPeppolXML" />
                    <LinkButton onClick={() => {
                                window.open(`/data/invoices/detail-xml/${id}`, "_blank")
                                markDownloaded()}}
                                label="generic.downloadPeppolXml"
                                icon="download"/>
                    </div>}
            </div>);
    }


    return (
        <React.Fragment>
            <div className={styles.pdfButtons} >
                <a href={`/data/invoices/detail/${id}`} download
                   onClick={markDownloaded}>
                    <Icon name="download" style={{marginRight: "0.5rem"}}/>{intl.formatMessage({id: "generic.download"})}
                </a>
                {invoiceDetail != null && <LinkButton onClick={() => {
                                                window.open(`/data/invoices/detail-xml/${id}`, "_blank")
                                                markDownloaded()}}
                                                label="generic.downloadPeppolXml"
                                                icon="download"/>}
            </div>
            <Document file={`/data/invoices/detail/${id}`}
                      loading={intl.formatMessage({id: "registration.view.billPreviewLoading"})}
                      error={intl.formatMessage({id: "invoice.view.preview.error"})}>

                <Page pageNumber={1} renderTextLayer={false} {...pageProps} />
            </Document>
        </React.Fragment>
    )

}

const PdfPreviewCard = ({invoice, title, noDocumentMessage, intl, setIsDownloaded}) => (
    <Card heading={title} shadow={false}>
        {invoice ? <DocumentPreview invoice={invoice} intl={intl} setIsDownloaded={setIsDownloaded}/> : <RegularText text={noDocumentMessage}/>}
    </Card>
);


export default PdfPreviewCard;
