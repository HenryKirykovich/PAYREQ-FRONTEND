import React, {useState} from "react";
import {Modal, Button, Alert} from "react-bootstrap";
import axios from "axios";

const DeregistrationsImportModal = ({show, onClose, onImportComplete, billerId}) => {
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [displayUnmatched, setDisplayUnmatched] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadUrl = `/upload/deregistrations/import?billerId=${billerId}`;

    const handleFileSelect = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        setUploadedInfo(null);
        setDisplayUnmatched(false);
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
                setUploadedInfo({error: "An error occurred while uploading the file."});
                setIsUploading(false);
            });
    };

    const handleImport = () => {
        if (!uploadedInfo) return;

        axios.post("/data/deregistrations/import", {
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
                        error: data.error || "Failed to import deregistrations"
                    });
                }
            })
            .catch(error => {
                console.error("Error importing deregistrations:", error);
                setUploadedInfo({
                    ...uploadedInfo,
                    error: "An error occurred while importing deregistrations."
                });
            });
    };

    const handleClose = () => {
        setUploadedInfo(null);
        setDisplayUnmatched(false);
        setIsUploading(false);
        setUploadProgress(0);
        onClose();
    };

    const uploadSummary = uploadedInfo ? 
        `${uploadedInfo.matched || 0} matched, ${uploadedInfo.unmatched?.length || 0} unmatched` : "";

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Import Deregistrations</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <p className="well">
                            Please upload a CSV or Excel file containing the registrations to deregister.
                        </p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label className="col-md-12 control-label">
                            Select File
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
                    {uploadedInfo && (
                        <div className="col-md-12">
                            <p className="well">{uploadSummary}</p>
                            {uploadedInfo.unmatched && uploadedInfo.unmatched.length > 0 && (
                                <p>
                                    Click{' '}
                                    <a className="action-link" onClick={() => setDisplayUnmatched(!displayUnmatched)}>
                                        here
                                    </a>{' '}
                                    to view unmatched items
                                </p>
                            )}
                        </div>
                    )}
                    {displayUnmatched && uploadedInfo?.unmatched && (
                        <div className="col-md-12">
                            <ul className="list-unstyled">
                                {uploadedInfo.unmatched.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {uploadedInfo?.error && (
                    <Alert bsStyle="danger">
                        {uploadedInfo.error}
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                    bsStyle="primary"
                    onClick={handleImport}
                    disabled={!uploadedInfo || uploadedInfo.error || isUploading}
                >
                    Import
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeregistrationsImportModal;
