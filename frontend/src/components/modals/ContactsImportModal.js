import React, {useState} from "react";
import {Modal, Button, Alert} from "react-bootstrap";
import {injectIntl} from "react-intl";
import axios from "axios";
import moment from "moment";

const ContactsImportModal = ({show, onClose, onImportComplete, billerId, intl}) => {
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [replaceAll, setReplaceAll] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadUrl = `/upload/contact/import?billerId=${billerId}`;

    const handleFileSelect = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        setUploadedInfo(null);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append("files[]", e.target.files[0]);

        const config = {
            headers: {'Content-Type': 'multipart/form-data'},
            onUploadProgress: (progressEvent) => {
                const percentComplete = Math.round((progressEvent.loaded * 95) / progressEvent.total);
                setUploadProgress(percentComplete);
            }
        };

        axios.post(uploadUrl, formData, config)
            .then(({data}) => {
                setUploadProgress(100);
                setUploadedInfo(data);
                setIsUploading(false);
            })
            .catch(error => {
                console.error("Error uploading file:", error);
                setUploadedInfo({uploadError: "An error occurred while uploading the file."});
                setIsUploading(false);
            });
    };

    const handleImport = () => {
        if (!uploadedInfo) return;

        axios.post("/data/contacts/import", {
            billerId,
            uploadId: uploadedInfo.id,
            replaceAll
        })
            .then(({data}) => {
                if (data.success) {
                    onImportComplete(data);
                    handleClose();
                } else {
                    setUploadedInfo({
                        ...uploadedInfo,
                        uploadError: data.error || "Failed to import contacts"
                    });
                }
            })
            .catch(error => {
                console.error("Error importing contacts:", error);
                setUploadedInfo({
                    ...uploadedInfo,
                    uploadError: "An error occurred while importing contacts."
                });
            });
    };

    const handleClose = () => {
        setUploadedInfo(null);
        setReplaceAll(false);
        setIsUploading(false);
        setUploadProgress(0);
        onClose();
    };

    const uploadHasErrors = uploadedInfo?.uploadError || uploadedInfo?.validationError;
    const confirmationRequired = uploadedInfo?.confirmationRequired;

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Import Contacts
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <p className="well">
                            Select a CSV or Excel file to import contacts. The file should contain account numbers and contact details.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="checkbox" style={{paddingLeft: '35px'}}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={replaceAll}
                                    onChange={(e) => setReplaceAll(e.target.checked)}
                                />
                                Replace all contacts with file values. Contacts not in the file will be deleted.
                            </label>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label className="col-md-12 control-label">
                            Select file for import:
                        </label>
                    </div>
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <input
                                type="file"
                                accept=".csv,.xls,.xlsx"
                                onChange={handleFileSelect}
                                disabled={isUploading}
                            />
                            {isUploading && (
                                <div style={{marginTop: '10px'}}>
                                    <progress value={uploadProgress} max="100" style={{width: '100%'}}/>
                                    <span> {uploadProgress}%</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {isUploading && (
                        <div className="col-sm-12">
                            <div className="loading-alert-inline text-center">
                                <span>Validating the import...</span>
                            </div>
                        </div>
                    )}
                </div>

                {uploadedInfo && (
                    <div className="row">
                        <div className="col-md-12">
                            <div className={uploadHasErrors ? 'well-error' : confirmationRequired ? 'well-confirm' : 'well'}>
                                {uploadedInfo.uploadError && (
                                    <>
                                        <span>Error: {uploadedInfo.uploadError}</span><br/>
                                    </>
                                )}

                                {uploadedInfo.validationError && (
                                    <>
                                        <span>Error: {uploadedInfo.validationError}</span><br/>
                                    </>
                                )}

                                {uploadedInfo.confirmationMessage && (
                                    <>
                                        <span dangerouslySetInnerHTML={{__html: uploadedInfo.confirmationMessage}}/><br/>
                                    </>
                                )}

                                {confirmationRequired && (
                                    <>
                                        <span><strong>The selected file has been processed previously. If you are sure you wish to process this file again, press the Import button below.</strong></span><br/><br/>
                                    </>
                                )}

                                {uploadedInfo.affectedJob && (
                                    <span>
                                        <span className="glyphicon glyphicon-time"></span>
                                        <strong> Job {uploadedInfo.affectedJob.id} </strong>
                                        (started {moment(uploadedInfo.affectedJob.time).fromNow()})
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    bsStyle="primary"
                    onClick={handleImport}
                    disabled={!uploadedInfo || uploadHasErrors || isUploading}
                >
                    Import Contacts
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default injectIntl(ContactsImportModal);
