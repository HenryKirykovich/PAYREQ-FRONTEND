import React, {useState} from "react";
import {Modal, Button, FormControl} from "react-bootstrap";
import {injectIntl} from "react-intl";

const BillDownloadModal = ({show, onClose, onDownload, intl}) => {
    const [selectedFormat, setSelectedFormat] = useState("download_csv");
    const [firstPageOnly, setFirstPageOnly] = useState(false);
    const [notifyOnCompletion, setNotifyOnCompletion] = useState(false);

    const isCSV = selectedFormat === "download_csv";
    const isMerged = selectedFormat === "download_one";
    const isSingles = selectedFormat === "download_bills";
    const isFirstPageOnlyCompatible = isMerged || isSingles;

    const handleDownload = () => {
        onDownload({
            format: selectedFormat,
            firstPageOnly: isFirstPageOnlyCompatible ? firstPageOnly : false,
            notifyOnCompletion: !isCSV ? notifyOnCompletion : false
        });
    };

    const handleClose = () => {
        setSelectedFormat("download_csv");
        setFirstPageOnly(false);
        setNotifyOnCompletion(false);
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {intl.formatMessage({id: "downloadModalHeading"})}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <div style={{marginBottom: '2rem', fontSize: 'larger'}}>
                            {intl.formatMessage({id: "downloadModal.title"})}
                        </div>
                        <div className="download-modal-radio-container">
                            <label className="download-modal-radio-label">
                                {intl.formatMessage({id: "mailDownloads"})}
                            </label>
                            <div className="radio download-modal-radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="format"
                                        value="download_csv"
                                        checked={isCSV}
                                        onChange={() => setSelectedFormat("download_csv")}
                                    />
                                    {intl.formatMessage({id: "csvOption"})}
                                </label>
                            </div>
                            <div className="radio download-modal-radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="format"
                                        value="download_one"
                                        checked={isMerged}
                                        onChange={() => setSelectedFormat("download_one")}
                                    />
                                    {intl.formatMessage({id: "pdfMergedOption"})}
                                </label>
                            </div>
                            <div className="radio download-modal-radio">
                                <label>
                                    <input
                                        type="radio"
                                        name="format"
                                        value="download_bills"
                                        checked={isSingles}
                                        onChange={() => setSelectedFormat("download_bills")}
                                    />
                                    {intl.formatMessage({id: "pdfIndividualOption"})}
                                </label>
                            </div>
                        </div>

                        {isFirstPageOnlyCompatible && (
                            <div className="download-modal-radio-container">
                                <label className="download-modal-radio-label">
                                    {intl.formatMessage({id: "pagesTitle"})}
                                </label>
                                <div className="radio download-modal-radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="pagesForDownload"
                                            value="all"
                                            checked={!firstPageOnly}
                                            onChange={() => setFirstPageOnly(false)}
                                        />
                                        {intl.formatMessage({id: "pagesAllOption"})}
                                    </label>
                                </div>
                                <div className="radio download-modal-radio">
                                    <label>
                                        <input
                                            type="radio"
                                            name="pagesForDownload"
                                            value="first"
                                            checked={firstPageOnly}
                                            onChange={() => setFirstPageOnly(true)}
                                        />
                                        {intl.formatMessage({id: "pagesFirstOption"})}
                                    </label>
                                </div>
                            </div>
                        )}

                        {!isCSV && (
                            <div className="download-modal-checkbox">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={notifyOnCompletion}
                                        onChange={(e) => setNotifyOnCompletion(e.target.checked)}
                                    />
                                    {' '}{intl.formatMessage({id: "emailNotification"})}
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>
                    {intl.formatMessage({id: "forms.generic.cancel.button"})}
                </Button>
                <Button bsStyle="primary" onClick={handleDownload}>
                    {intl.formatMessage({id: "forms.generic.download.button"})}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default injectIntl(BillDownloadModal);
