import React, {useState} from "react";
import {Modal, Button, FormControl, Alert} from "react-bootstrap";
import axios from "axios";

const BillTemplateUploadModal = ({show, onClose, onUploadComplete, billerId}) => {
    const [templateName, setTemplateName] = useState("");
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState("");

    const uploadUrl = `/data/billTemplates/${billerId}/upload`;

    const handleFileSelect = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        setUploadedInfo(null);
        setUploadProgress(0);
        setFileName(e.target.files[0].name);

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

    const handleCreate = () => {
        if (!uploadedInfo || !templateName.trim()) return;

        axios.post("/data/billTemplates/create", {
            billerId,
            name: templateName,
            fileName: uploadedInfo.fileName,
            fileDataId: uploadedInfo.id
        })
            .then(({data}) => {
                if (data.success) {
                    onUploadComplete(data);
                    handleClose();
                } else {
                    setUploadedInfo({
                        ...uploadedInfo,
                        error: data.error || "Failed to create bill template"
                    });
                }
            })
            .catch(error => {
                console.error("Error creating template:", error);
                setUploadedInfo({
                    ...uploadedInfo,
                    error: "An error occurred while creating the template."
                });
            });
    };

    const handleClose = () => {
        setTemplateName("");
        setUploadedInfo(null);
        setIsUploading(false);
        setUploadProgress(0);
        setFileName("");
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Upload Bill Template</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label className="col-md-3 control-label">
                            Template Name
                        </label>
                        <div className="col-md-9">
                            <FormControl
                                type="text"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                id="templateName"
                                placeholder="Enter template name"
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-12" style={{marginBottom: 0}}>
                        <input
                            type="file"
                            onChange={handleFileSelect}
                            disabled={isUploading}
                        />
                        {fileName && <div style={{marginTop: '5px', fontSize: '12px'}}>{fileName}</div>}
                        {isUploading && (
                            <div style={{marginTop: '10px'}}>
                                <progress value={uploadProgress} max="100" style={{width: '100%'}}/>
                                <span> {uploadProgress}%</span>
                            </div>
                        )}
                    </div>
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
                    onClick={handleCreate}
                    disabled={!uploadedInfo || !templateName.trim() || !!uploadedInfo?.error || isUploading}
                >
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BillTemplateUploadModal;
