import React, {useState} from "react";
import {Modal, Button, FormControl, Alert} from "react-bootstrap";
import {injectIntl} from "react-intl";
import axios from "axios";

const BillUploadModal = ({
    show,
    onClose,
    onUploadComplete,
    billerId,
    uploadUrl,
    billFormats,
    showFormats,
    showBillLoadOptions,
    showContactOptions,
    showAvailableCredits,
    availableCreditsText,
    showSplittingInfo,
    splittingInfo,
    billLoadOptions,
    contactOptions,
    intl
}) => {
    const [uploadIds, setUploadIds] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState(null);
    const [affectedJobsErrorMessage, setAffectedJobsErrorMessage] = useState(null);
    const [validationErrorMessage, setValidationErrorMessage] = useState(null);
    const [billFormatSelected, setBillFormatSelected] = useState(null);
    const [selectedBillLoadOption, setSelectedBillLoadOption] = useState(billLoadOptions?.[0]?.value);
    const [selectedContactOption, setSelectedContactOption] = useState(contactOptions?.[0]?.value);

    const handleFileSelect = (e) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setIsUploading(true);
        setErrorMessage(null);
        setUploadProgress(0);

        const formData = new FormData();
        Array.from(e.target.files).forEach((file, index) => {
            formData.append(`files-${index}`, file);
        });
        formData.append("noFiles", e.target.files.length);

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
                setUploadIds(data.ids || [data.id]);
                setIsUploading(false);
            })
            .catch(error => {
                console.error("Error uploading files:", error);
                setErrorMessage("An error occurred while uploading files. Please try again.");
                setIsUploading(false);
                setUploadProgress(0);
            });
    };

    const handleUpload = () => {
        const uploadData = {
            uploadIds,
            billFormatSelected,
            selectedBillLoadOption,
            selectedContactOption
        };
        onUploadComplete(uploadData);
        handleClose();
    };

    const handleClose = () => {
        setUploadIds([]);
        setIsUploading(false);
        setUploadProgress(0);
        setErrorMessage(null);
        setBillFormatSelected(null);
        onClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {intl.formatMessage({id: "upload"})}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <p className="well" dangerouslySetInnerHTML={{
                            __html: intl.formatMessage({id: "uploadInstructions"})
                        }}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <label className="col-md-12 control-label">
                            {intl.formatMessage({id: "uploadFile"})}
                        </label>
                    </div>
                    <div className="col-md-12" style={{marginBottom: '1rem'}}>
                        <input
                            type="file"
                            multiple
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

                    {showFormats && billFormats && (
                        <div className="col-md-12">
                            <label className="col-md-4 control-label">
                                {intl.formatMessage({id: "billFormats"})}
                            </label>
                            <div className="col-md-8">
                                {billFormats.map(format => (
                                    <div className="checkbox" style={{marginTop: 0}} key={format.idString}>
                                        <label>
                                            <input
                                                type="radio"
                                                name="billTemplates"
                                                checked={billFormatSelected === format.idString}
                                                value={format.idString}
                                                onChange={() => setBillFormatSelected(format.idString)}
                                            />
                                            <span>{format.displayName}</span>
                                        </label>
                                    </div>
                                ))}
                                <span className="help-block">
                                    {intl.formatMessage({id: "billFormatsInstructions"})}
                                </span>
                            </div>
                        </div>
                    )}

                    {showBillLoadOptions && billLoadOptions && (
                        <div className="col-md-12" style={{marginBottom: '1rem'}}>
                            <label className="col-md-4 control-label">
                                {intl.formatMessage({id: "selectBillLoadType"})}
                            </label>
                            <div className="col-md-8">
                                <FormControl
                                    componentClass="select"
                                    value={selectedBillLoadOption}
                                    onChange={(e) => setSelectedBillLoadOption(e.target.value)}
                                >
                                    {billLoadOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </FormControl>
                            </div>
                        </div>
                    )}

                    {showContactOptions && contactOptions && (
                        <div className="col-md-12">
                            <label className="col-md-4 control-label">
                                {intl.formatMessage({id: "uploadContacts"})}
                            </label>
                            <div className="col-md-8">
                                <FormControl
                                    componentClass="select"
                                    value={selectedContactOption}
                                    onChange={(e) => setSelectedContactOption(e.target.value)}
                                >
                                    {contactOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.name}
                                        </option>
                                    ))}
                                </FormControl>
                            </div>
                        </div>
                    )}

                    {showAvailableCredits && (
                        <div className="col-md-12">
                            <div className="col-md-12" style={{marginTop: '2rem'}}>
                                {intl.formatMessage({id: "availableCreditsPrefixText"})}{' '}
                                <label className="control-label">{availableCreditsText}</label>{' '}
                                {intl.formatMessage({id: "availableCreditsSuffixText"})}
                            </div>
                        </div>
                    )}

                    {showSplittingInfo && splittingInfo && (
                        <div className="col-md-12">
                            <div className="col-md-12" style={{marginTop: '2rem'}} dangerouslySetInnerHTML={{__html: splittingInfo}}/>
                        </div>
                    )}

                    {errorMessage && (
                        <div className="col-md-12">
                            <Alert bsStyle="danger">{errorMessage}</Alert>
                        </div>
                    )}

                    {isUploading && (
                        <div className="col-sm-12">
                            <div className="loading-alert-inline text-center">
                                <span>Verifying file...</span>
                            </div>
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>
                    {intl.formatMessage({id: "forms.generic.cancel.button"})}
                </Button>
                <Button
                    bsStyle="primary"
                    onClick={handleUpload}
                    disabled={uploadIds.length === 0 || isUploading}
                >
                    {intl.formatMessage({id: "forms.generic.upload.button"})}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default injectIntl(BillUploadModal);
