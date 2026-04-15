import React, {useState} from "react";
import {Modal, Button, Alert} from "react-bootstrap";
import {injectIntl} from "react-intl";
import axios from "axios";
import moment from "moment";

const MyBillsAgentImportModal = ({show, onClose, onImportComplete, billerId, intl}) => {
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadUrl = `/upload/mybillsagent/import?billerId=${billerId}`;

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

        axios.post("/data/mybillsagent/import", {
            billerId,
            uploadId: uploadedInfo.id
        })
            .then(({data}) => {
                if (data.success) {
                    onImportComplete(data);
                    handleClose();
                } else {
                    setUploadedInfo({
                        ...uploadedInfo,
                        uploadError: data.error || "Failed to import MyBills Agent registrations"
                    });
                }
            })
            .catch(error => {
                console.error("Error importing:", error);
                setUploadedInfo({
                    ...uploadedInfo,
                    uploadError: "An error occurred while importing."
                });
            });
    };

    const handleClose = () => {
        setUploadedInfo(null);
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
                    {intl.formatMessage({id: "mybillsagentImportModal.title"})}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <p className="well" dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({id: "mybillsagentImportModal.instructions"})
                        }}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label className="col-md-2 control-label">File</label>
                        <div className="col-md-10">
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
                                <span>{intl.formatMessage({id: "mybillsagentImportModal.validating"})}</span>
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
                                        <span><strong>{intl.formatMessage({id: "mybillsagentImportModal.error.fileAlreadyUploadedConfirm"})}</strong></span><br/><br/>
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
                    {intl.formatMessage({id: "forms.generic.cancel.button"})}
                </Button>
                <Button
                    bsStyle="primary"
                    onClick={handleImport}
                    disabled={!uploadedInfo || uploadHasErrors || isUploading}
                >
                    {intl.formatMessage({id: "forms.generic.import.button"})}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default injectIntl(MyBillsAgentImportModal);
