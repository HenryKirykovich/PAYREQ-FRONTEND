import React, {useState} from "react";
import {Modal, Button, FormControl, Alert} from "react-bootstrap";
import {injectIntl} from "react-intl";
import axios from "axios";

const UPLOAD_ERROR_KEYS = {
    "invalid.filetype": "settings.templates.errors.invalidFiletype",
    "invalid.filetype.csv": "settings.templates.errors.invalidFiletypeCsv",
    "invalid.filetype.html": "settings.templates.errors.invalidFiletypeHtml",
    "invalid.filetype.pdf": "settings.templates.errors.invalidFiletypePdf",
};

const ACCEPTED_FILE_TYPES = ".jpeg,.jpg,.gif,.png,.bmp,.heic,.pdf,.csv,.xlsx,.xls,.xml,.html,.json,.tar,.txt,.zip,.7z";

const BillTemplateUploadModal = ({show, onClose, onUploadComplete, billerId, intl}) => {
    const [templateName, setTemplateName] = useState("");
    const [uploadedInfo, setUploadedInfo] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState(null);

    const uploadUrl = `/data/billTemplates/${billerId}/upload`;

    const handleFileSelect = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        setUploadedInfo(null);
        setUploadProgress(0);
        setError(null);
        setFileName(e.target.files[0].name);

        const formData = new FormData();
        formData.append("files[]", e.target.files[0]);

        axios.post(uploadUrl, formData, {
            headers: {"Content-Type": "multipart/form-data"},
            onUploadProgress: (progressEvent) => {
                setUploadProgress(Math.round((progressEvent.loaded * 95) / progressEvent.total));
            }
        })
            .then(({data}) => {
                setUploadProgress(100);
                if (data.message) {
                    setError(UPLOAD_ERROR_KEYS[data.message] || "settings.templates.genericFail");
                } else {
                    setUploadedInfo(data);
                }
                setIsUploading(false);
            })
            .catch(() => {
                setError("settings.templates.genericFail");
                setIsUploading(false);
            });
    };

    const handleCreate = () => {
        if (!uploadedInfo || !templateName.trim()) return;

        axios.post("/data/billTemplates/create", {
            billerId,
            name: templateName,
            fileName: uploadedInfo.fileName,
            documentId: uploadedInfo.documentId
        })
            .then(({data}) => {
                if (data.success) {
                    onUploadComplete(data);
                    handleClose();
                } else {
                    setError(
                        data.message
                            ? (UPLOAD_ERROR_KEYS[data.message] || "settings.templates.genericError")
                            : "settings.templates.genericError"
                    );
                }
            })
            .catch(() => {
                setError("settings.templates.genericFail");
            });
    };

    const handleClose = () => {
        setTemplateName("");
        setUploadedInfo(null);
        setIsUploading(false);
        setUploadProgress(0);
        setFileName("");
        setError(null);
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {intl.formatMessage({id: "settings.templates.uploadModal.title"})}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="form-group col-md-12">
                        <label className="col-md-3 control-label">
                            {intl.formatMessage({id: "settings.templates.uploadModal.nameLabel"})}
                        </label>
                        <div className="col-md-9">
                            <FormControl
                                type="text"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                id="templateName"
                                placeholder={intl.formatMessage({id: "settings.templates.uploadModal.nameLabel"})}
                            />
                        </div>
                    </div>
                    <div className="form-group col-md-12" style={{marginBottom: 0}}>
                        {isUploading ? (
                            <>
                                <p>{fileName}</p>
                                <progress value={uploadProgress} max="100" style={{width: "100%"}}/>
                                <span> {uploadProgress}%</span>
                            </>
                        ) : (
                            <>
                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept={ACCEPTED_FILE_TYPES}
                                    onChange={handleFileSelect}
                                />
                                {fileName && (
                                    <div style={{marginTop: "5px", fontSize: "12px"}}>{fileName}</div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                {error && (
                    <Alert bsStyle="danger" style={{marginTop: "10px"}}>
                        {intl.formatMessage({id: error})}
                    </Alert>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>
                    {intl.formatMessage({id: "settings.templates.uploadModal.cancel"})}
                </Button>
                <Button
                    bsStyle="primary"
                    onClick={handleCreate}
                    disabled={!uploadedInfo || !templateName.trim() || isUploading}
                >
                    {intl.formatMessage({id: "settings.templates.uploadModal.confirm"})}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default injectIntl(BillTemplateUploadModal);
