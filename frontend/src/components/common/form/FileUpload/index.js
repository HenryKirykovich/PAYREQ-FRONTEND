import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {ControlLabel, FormGroup, HelpBlock} from "react-bootstrap";
import styles from "./FileUpload.module.scss";
import {RegularText} from "../../index";
import axios from "axios";

const hasFileUploadStarted = (uploadProgress) => uploadProgress > 0;

const handleUploadChange = (e, fileUploadURL, isMultiFileUpload, setUploadedFileIds, setProgress, setIsSubmitting) => {
    setIsSubmitting(true);
    setUploadedFileIds(isMultiFileUpload ? [] : null);
    if (e.target.files) {
        const data = new FormData();
        if (isMultiFileUpload) {
            e.target.files.forEach((file, id) => {
                data.append(`files-${id}`, file, file.name);
            });
            data.append("noFiles", e.target.files.length);
        } else {
            data.append("files[]", e.target.files[0], e.target.files[0].name);
        }

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                // only go to 95% and then set to 100% on response
                const percentageComplete = Math.max(0, Math.round((((progressEvent.loaded / progressEvent.total) * 100)) - 5));
                setProgress(percentageComplete);
            }
        };

        axios.post(fileUploadURL, data, config)
            .then(({data}) => {
                setUploadedFileIds(isMultiFileUpload ? data.ids : data.id);
                setProgress(100);
                setIsSubmitting(false);
            })
            .finally(() => setIsSubmitting(false))

    }
};

const Index = ({name, label, accept = "", intl, fileUploadURL,
                setUploadedFileIds, hint, className, isMultiFileUpload = false,
                setIsSubmitting, disableAfterUpload = true,
                translate = true}) => {
    const [uploadProgress, setUploadProgress] = useState(0);

    return (
      <FormGroup className={className}
                 controlId={name}>
            <ControlLabel>{translate ? intl.formatMessage({id: label}) : label}</ControlLabel>
            {hint && <HelpBlock className={styles.helpBlock}>{translate ? intl.formatMessage({id: hint}) : hint}</HelpBlock>}
            <input type="file"
                   accept={accept}
                   onChange={e => handleUploadChange(e, fileUploadURL, isMultiFileUpload, setUploadedFileIds, setUploadProgress, setIsSubmitting)}
                   disabled={hasFileUploadStarted(uploadProgress) && disableAfterUpload}
                   multiple={isMultiFileUpload}/>
            <div className={styles.progressBarWrapper}>
                <progress id="progress-bar"
                          className={styles.progressBar}
                          value={uploadProgress}
                          max="100"/>
                <div className={styles.progressPercent}>
                    <RegularText text="mail.uploadMail.progress"
                                 className={styles.progressBarPercentText}
                                 values={{percentage: uploadProgress}} />
                </div>
            </div>
        </FormGroup>
    );
};

export default injectIntl(Index);
