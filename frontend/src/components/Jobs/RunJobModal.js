import {Alert, RegularText, Modal, PrimaryButton, Select, FileUpload} from "../common";
import React, {useState, useCallback} from "react";
import axios from "axios";
import {Formik} from "formik";
import styles from "./RunJobModal.module.scss";
import {injectIntl} from "react-intl";
import * as Yup from "yup";
import {withRouter} from "react-router-dom";
import {ALERT_TYPES} from "../common/alerts/Alert";

const ErrorMessage = ({submitResult, filenames}) => (
  <Alert type={ALERT_TYPES.DANGER} className={styles.alertContainer}>
    <RegularText text={submitResult.message} />
  </Alert>
);

const submit = (billerId, inputFiles, {workflow}, submitResult, onSuccess, setIsSubmitting, setSubmitResult, history) => {
  setIsSubmitting(true);
  const workflowId = parseInt(workflow);
  const data = {
    "input-files": inputFiles,
    "workflow-id": workflowId
  };

  axios.post(`/data/jobs/${billerId}/run`, data)
       .then(({data}) => {
         if(data.success) {
           onSuccess();
           history.push({pathname: `/portal/customer/biller/${billerId}/job/${data.jobId}`, state: {data: data}})
         } else {
           setSubmitResult(data);
         }
         setIsSubmitting(false);
       })
       .finally(() => setIsSubmitting(false));
};

const schema = () => {
  return Yup.object().shape({
    workflow: Yup.string().required("forms.generic.required.label"),
  })
};

const workflowInputParameters = (workflow) => {
  return ((workflow || {}).configuration || {}).inputParameters || [];
};

const expectedInputParameters = (workflowOptions, workflowId) => {
  if (!workflowId)
    return [];
  const workflow = workflowOptions.filter(w => w.key === workflowId)[0] || {};
  return workflowInputParameters(workflow);
};

const areAllInputFilesSet = (workflowOptions, workflowId, inputFiles) => {
  return expectedInputParameters(workflowOptions, workflowId)
    .map(i => i.name)
    .every(n => inputFiles.hasOwnProperty(n) && !!inputFiles[n]);
};

const RunJobModal = ({biller, workflowOptions, show, onCancel, history}) => {
  const [inputFiles, setInputFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const onSuccess = useCallback(() => {
    setInputFiles({});
    onCancel();
  }, [onCancel]);

  const cancelAction = useCallback(() => {
    const data = {
      "input-parameters": inputFiles,
    };
    axios.post(`/data/jobs/${biller.id}/dont-run`, data);
    setInputFiles({});
    onCancel();
    setSubmitResult(null);
  }, [biller.id, inputFiles, onCancel]);

  if (!show) {
    return null;
  }

  return (
    <Formik
      initialValues={{workflow: ""}}
      validationSchema={schema}
      onSubmit={(values) => submit(biller.id, inputFiles, values, submitResult, onSuccess, setIsSubmitting, setSubmitResult, history)}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit
      }) => {

        const handleChangeSelect = e => {
          handleChange(e);
          setTimeout(() => e.target.blur(), 100);
        };

        return (
          <form onSubmit={handleSubmit}>
            <Modal show={show}
                   title="job.workflow.header"
                   buttonLabel={submitResult && submitResult.confirmationRequired ? "job.workflow.submitWarningBtn" : "job.workflow.submitBtn"}
                   onCancel={cancelAction}
                   onPrimaryAction={handleSubmit}
                   PrimaryButtonComponent={PrimaryButton}
                   disabled={!values.workflow || !areAllInputFilesSet(workflowOptions, values.workflow, inputFiles)}
                   cancelDisabled={isSubmitting}
            >

              <Select name="workflow"
                      label="job.workflow.select"
                      placeholder="job.workflow.select.placeholder"
                      options={workflowOptions}
                      value={values.workflow}
                      onChange={handleChangeSelect}
                      onBlur={handleBlur}
                      error={errors.option}
                      touched={touched.option}
                      internationalisedOptions={false}
              />

              { values.workflow
                && expectedInputParameters(workflowOptions, values.workflow).map(i =>
                  <FileUpload key={i.name}
                              name={i.name}
                              label={`${i.displayDescription} (*.${i.inputFileExt})`}
                              accept={`.${i.inputFileExt}`}
                              isMultiFileUpload={false}
                              disableAfterUpload={false}
                              className={styles.uploadField}
                              error={errors.file}
                              touched={touched.file}
                              fileUploadURL={`/data/jobs/${biller.id}/upload-file`}
                              setUploadedFileIds={id => setInputFiles(prev => ({...prev,
                                                                                [i.name]: id}))
                              }
                              setIsSubmitting={setIsSubmitting}
                              translate={false}
                  />
              )}

              {submitResult && submitResult.message && <ErrorMessage submitResult={submitResult} />}

            </Modal>
          </form>
        )}}
    </Formik>
  );
};

export default withRouter(injectIntl(RunJobModal));
