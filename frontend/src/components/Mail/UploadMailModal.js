import {Alert, FileUpload, Icon, Modal, PrimaryButton, ReactSelectMulti, RegularText, Select} from "../common";
import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {Formik} from "formik";
import styles from "./UploadMailModal.module.scss";
import {injectIntl} from "react-intl";
import {
    CONSUMER_COMMUNICATION_MAIL_TEMPLATE,
    MAIL_UPLOAD_BILL_LOAD_TYPE_HISTORICAL,
    MAIL_UPLOAD_BILL_LOAD_TYPE_OPTIONS,
    MAIL_UPLOAD_BILL_LOAD_TYPE_STANDARD,
    MAIL_UPLOAD_CONTACT_ADD,
    MAIL_UPLOAD_CONTACT_IGNORE,
    MAIL_UPLOAD_CONTACT_OPTIONS,
    PAYROLL_MAIL_FORMAT_TYPE_NON_PAYSTUB,
    PAYROLL_MAIL_FORMAT_TYPE_PAYSTUB,
} from "./mail-constants";
import {ALERT_TYPES} from "../common/alerts/Alert";
import {timeFromNow} from "../../utils/date-utils";
import * as Yup from "yup";
import {withRouter} from "react-router-dom";
import {isBillingAccount} from "../../utils/account-utils";

const isPayrollLoad = (format) => [PAYROLL_MAIL_FORMAT_TYPE_PAYSTUB, PAYROLL_MAIL_FORMAT_TYPE_NON_PAYSTUB].includes(format.typeName);

const getBillFormats = (mailUploadDetails) => mailUploadDetails && mailUploadDetails.billFormats;
const getBillFormatsSorted = (mailUploadDetails) => {
    const allBillFormats = mailUploadDetails && mailUploadDetails.billFormats;
    if (allBillFormats) {
        //always show the comms PDF upload at the end of the sorted bill formats
        const allFormatsToSort = allBillFormats.filter(billFormat => !(billFormat.id === CONSUMER_COMMUNICATION_MAIL_TEMPLATE))
        const commsFormat = allBillFormats.filter(billFormat => (billFormat.id === CONSUMER_COMMUNICATION_MAIL_TEMPLATE))
        return  allFormatsToSort.sort((a,b) => (a.displayName > b.displayName) ? 1 : ((b.displayName > a.displayName) ? -1 : 0))
                                .concat(commsFormat);
    }
    return null;
}

const shouldIgnoreContactUpdate = (format, values) => {
    if(!format) return false;
    const {typeName, readBillerAccountNumberFromContact, forceIgnoreContacts} = format;
    return PAYROLL_MAIL_FORMAT_TYPE_NON_PAYSTUB === typeName || readBillerAccountNumberFromContact || forceIgnoreContacts || values.billLoadType === MAIL_UPLOAD_BILL_LOAD_TYPE_HISTORICAL;

}


const submit = (billerId, uploadedFileIds, {contactOption, billLoadType, billFormat, groupSelection}, submitResult, onSuccess, setIsSubmitting, setSubmitResult, history) => {
    setIsSubmitting(true);
    const data = {"file-ids": uploadedFileIds,
                  "contact-option": contactOption,
                  "bill-load-type": billLoadType,
                  "bill-format": billFormat,
                  "group-selection": groupSelection && groupSelection.map(group => group.value),
                  "confirm": submitResult && submitResult.confirmationRequired ? "true" : null}

    axios.post(`/data/v2/bills/${billerId}/doupload`, data)
        .then(({data}) => {
            if(data.success) {
                onSuccess();
                history.push({pathname: `/portal/customer/biller/${billerId}/mail/uploaded`, state: {data: data}})
            } else {
                setSubmitResult(data)
            }
            setIsSubmitting(false);
        })
        .finally(() => setIsSubmitting(false))
}

const ErrorMessage = ({submitResult}) => (
    <Alert type={ALERT_TYPES.DANGER} className={styles.alertContainer}>
        {submitResult.values ? <RegularText text={submitResult.message} values={submitResult.values}/>
            : <RegularText text={submitResult.message}/>}
    </Alert>
)

const ValidationError = ({submitResult}) => (
    <Alert type={ALERT_TYPES.DANGER} className={styles.alertContainer}>
        <div className={styles.alertIconContainer}>
            <Icon name="error-sign"/>
            <RegularText text="mail.uploadMail.validationError"/>
        </div>
        <ul style={{listStyleType: "disc"}}>
            {submitResult.validationErrors.map(({displayName, billErrors}) => (
                <React.Fragment>
                    <li><RegularText text={displayName}/></li>
                    <ul style={{listStyleType: "circle"}}>
                        {billErrors.map(({page, errors}) => (
                            <React.Fragment>
                                <li><RegularText text="mail.uploadMail.validationError.page" values={{page}}/></li>
                                <ul style={{listStyleType: "square"}}>
                                    {errors.map((error) => (
                                        <li><RegularText text="mail.uploadMail.validationError.error" values={error}/></li>
                                    ))}
                                </ul>
                            </React.Fragment>
                        ))}
                    </ul>
                </React.Fragment>
            ))}
        </ul>
    </Alert>
)

const Warning = ({submitResult}) => (
    <Alert type={ALERT_TYPES.WARNING} className={styles.alertContainer}>
        <div className={styles.alertIconContainer}>
            <Icon name="warning-sign"/>
            <RegularText text="mail.uploadMail.duplicateWarningContinue"/>
        </div>
        <ul style={{listStyleType: "disc"}}>
            {submitResult.affectedJobs.map((file) => (<li><RegularText text="mail.uploadMail.duplicateWarning" values={{...file, ...timeFromNow(file.time)}}/></li>))}
        </ul>
    </Alert>
)

const InfoMessage = ({mailFormatSelected}) => (
    <Alert type={ALERT_TYPES.INFO} className={styles.noMargins}>
        <div className={styles.alertIconContainer}>
            <Icon name="info-sign"/>
            <RegularText className={styles.infoText}
                         text={mailFormatSelected.typeName === PAYROLL_MAIL_FORMAT_TYPE_PAYSTUB ? "mail.uploadMail.credits.paystubs" : "mail.uploadMail.credits.nonpaystubs"} values={{credits: mailFormatSelected.credits}}/>
        </div>
    </Alert>
)

const GenericCommunicationInfoMessage = ({mailUploadDetails, groupSelection, biller}) => {
    const shareWithCount = useMemo(() =>
                groupSelection && groupSelection.length > 0 ? groupSelection.reduce((accumulator, object) => {
                    const {count} = mailUploadDetails.groups.filter(({value}) => value === object.value)[0]
                    return accumulator + count;
                }, 0) : mailUploadDetails.activeRegistrations,
        [groupSelection, mailUploadDetails.groups, mailUploadDetails.activeRegistrations])

    return (
    <Alert type={ALERT_TYPES.INFO} className={styles.genericCommunicationInfo}>
        <div className={styles.alertInfoIconContainer}>
            <Icon name="info-sign"/>
            {groupSelection && groupSelection.length
                ? <RegularText className={styles.infoText}
                               text={isBillingAccount(biller.accountType) ? "mail.uploadMail.genericCommunication.billing.infoGroups" : "mail.uploadMail.genericCommunication.payroll.infoGroups"}
                               values={{shareWithCount, noGroups: groupSelection.length}}/>
                : <RegularText className={styles.infoText}
                         text={isBillingAccount(biller.accountType) ? "mail.uploadMail.genericCommunication.billing.info" : "mail.uploadMail.genericCommunication.payroll.info"}
                         values={{shareWithCount}}/>}
        </div>
    </Alert>)
}


const schema = () => {
    return Yup.object().shape({
        contactOption: Yup.string().required("forms.generic.required.label"),
        billFormat: Yup.string().required("forms.generic.required.label"),
        billLoadType: Yup.string().required("forms.generic.required.label")
    })
}


const UploadMailModal =
    ({biller, mailUploadDetails, show, onCancel, history}) => {
        const [uploadedFileIds, setUploadedFileIds] = useState([]);
        const [mailFormatSelected, setMailFormatSelected] = useState(null);
        const [isSubmitting, setIsSubmitting] = useState(false);
        const [submitResult, setSubmitResult] = useState(null);

        const cancelAction = () => {
            setUploadedFileIds([]);
            setSubmitResult(null);
            onCancel();
        }

        const sortedBillFormats = useMemo(() => getBillFormats(mailUploadDetails) && getBillFormatsSorted(mailUploadDetails),
            [mailUploadDetails])

        useEffect(() =>  setMailFormatSelected(show && sortedBillFormats && sortedBillFormats[0]),
            [sortedBillFormats, show])


        if (!show) {
            return null;
        }

        return (
                <Formik
                    initialValues={{contactOption: shouldIgnoreContactUpdate(sortedBillFormats && sortedBillFormats[0], {billLoadType: MAIL_UPLOAD_BILL_LOAD_TYPE_STANDARD}) ? MAIL_UPLOAD_CONTACT_IGNORE : MAIL_UPLOAD_CONTACT_ADD,
                                    billFormat: sortedBillFormats && sortedBillFormats[0].id,
                                    billLoadType: MAIL_UPLOAD_BILL_LOAD_TYPE_STANDARD}}
                    validationSchema={schema}
                    onSubmit={(values) => submit(biller.id, uploadedFileIds, values, submitResult,  cancelAction, setIsSubmitting, setSubmitResult, history)}
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
                        }

                        return (
                            <form onSubmit={handleSubmit}>
                                <Modal show={show}
                                       title="mail.uploadMail.heading"
                                       buttonLabel={submitResult && submitResult.confirmationRequired ?  "mail.uploadMail.submitWarningBtn" : "mail.uploadMail.submitBtn"}
                                       onCancel={cancelAction}
                                       onPrimaryAction={handleSubmit}
                                       PrimaryButtonComponent={PrimaryButton}
                                       disabled={isSubmitting}>

                                    <FileUpload name="file"
                                                label="mail.uploadMail.upload.label"
                                                accept=".pdf"
                                                isMultiFileUpload={true}
                                                className={styles.uploadField}
                                                error={errors.file}
                                                touched={touched.file}
                                                fileUploadURL={`/data/v2/bills/${biller.id}/upload`}
                                                setUploadedFileIds={setUploadedFileIds}
                                                setIsSubmitting={setIsSubmitting}
                                                />

                                    <Select name="billFormat"
                                            label="mail.uploadMail.billFormat.label"
                                            placeholder="mail.uploadMail.billFormat.placeholder"
                                            internationalisedOptions={false}
                                            options={sortedBillFormats.map(f => ({value: f.id, label: f.displayName}))}
                                            className={styles.billFormat}
                                            value={values.billFormat}
                                            onChange={e => {
                                                const format = getBillFormats(mailUploadDetails).filter(f => f.id.toString() === e.target.value)[0];
                                                setMailFormatSelected(format);
                                                if (shouldIgnoreContactUpdate(format, values)) {
                                                    setFieldValue("contactOption", MAIL_UPLOAD_CONTACT_IGNORE);
                                                }
                                                if (format.id === CONSUMER_COMMUNICATION_MAIL_TEMPLATE) {
                                                   setFieldValue("billLoadType", MAIL_UPLOAD_BILL_LOAD_TYPE_STANDARD);
                                                }
                                                handleChangeSelect(e);
                                            }}
                                            onBlur={handleBlur}
                                            error={errors.billFormat}
                                            touched={touched.billFormat}
                                    />
                                    {mailFormatSelected && mailFormatSelected.indicator &&
                                        <RegularText text={mailFormatSelected.splitEndFile ? "mail.uploadMail.splittingValue.endPage" : "mail.uploadMail.splittingValue.startPage"}
                                                     values={{splitValue: mailFormatSelected.indicator}}/>}
                                    {biller.archivePermission && mailFormatSelected.id !== CONSUMER_COMMUNICATION_MAIL_TEMPLATE &&
                                        <Select name="billLoadType"
                                                label="mail.uploadMail.loadType.label"
                                                placeholder="mail.uploadMail.loadType.placeholder"
                                                options={MAIL_UPLOAD_BILL_LOAD_TYPE_OPTIONS}
                                                value={values.billLoadType}
                                                onChange={e => {
                                                    if (e.target.value === MAIL_UPLOAD_BILL_LOAD_TYPE_HISTORICAL) {
                                                        setFieldValue("contactOption", MAIL_UPLOAD_CONTACT_IGNORE);
                                                    }
                                                    handleChangeSelect(e);
                                                }}
                                                onBlur={handleBlur}
                                                error={errors.billLoadType}
                                                touched={touched.billLoadType}
                                        />}
                                    {!shouldIgnoreContactUpdate(mailFormatSelected, values) &&
                                        <Select name="contactOption"
                                            label="mail.uploadMail.contactOption.label"
                                            placeholder="mail.uploadMail.contactOption.label"
                                            options={MAIL_UPLOAD_CONTACT_OPTIONS}
                                            value={values.contactOption}
                                            onChange={handleChangeSelect}
                                            onBlur={handleBlur}
                                            error={errors.contactOption}
                                            touched={touched.contactOption}
                                        />}
                                    {mailFormatSelected && mailFormatSelected.id === CONSUMER_COMMUNICATION_MAIL_TEMPLATE && mailUploadDetails.groups &&
                                        <div className={styles.genericCommunicationGroupSelection}>
                                            <ReactSelectMulti name='groupSelection'
                                                              label="mail.uploadMail.groupSelection.label"
                                                              placeholder="personalSettings.preferences.billStatus.select"
                                                              options={mailUploadDetails.groups}
                                                              defaultValue={values.groupSelection}
                                                              internationalisedOptions={false}
                                                              onChange={option => setFieldValue('groupSelection', option)}
                                                              error={errors.groupSelection}
                                                              touched={touched.groupSelection}/>
                                        </div>}

                                    {mailFormatSelected && isPayrollLoad(mailFormatSelected) && <InfoMessage mailFormatSelected={mailFormatSelected}/>}
                                    {mailFormatSelected && mailFormatSelected.id === CONSUMER_COMMUNICATION_MAIL_TEMPLATE && <GenericCommunicationInfoMessage mailUploadDetails={mailUploadDetails} groupSelection={values.groupSelection} biller={biller}/>}
                                    {submitResult && submitResult.confirmationRequired && <Warning submitResult={submitResult}/>}
                                    {submitResult && submitResult.message && <ErrorMessage submitResult={submitResult}/>}
                                    {submitResult && submitResult.validationErrors && <ValidationError submitResult={submitResult}/>}

                                </Modal>
                            </form>
                        )}}
                </Formik>
        )
    };

export default withRouter(injectIntl(UploadMailModal));
