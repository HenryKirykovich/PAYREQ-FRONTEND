import React from "react";
import {Formik} from "formik";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {SET_ALERT} from "../../state/reducers/alertReducer";
import {useAppState} from "../../state";
import {Alert, Checkbox, Icon, LargeText, Modal, PrimaryButton, Radio} from "../common";
import * as Yup from "yup";
import {injectIntl} from "react-intl";
import {ALERT_TYPES} from "../common/alerts/Alert";
import styles from "./InboxDownloadModal.module.scss"
import {timeInUTC} from "../../utils/date-utils";

const DOWNLOAD_FORMATS = {
    CSV: "download_csv",
    MERGED: "download_one",
    INDIVIDUAL: "download_bills",
    GROUPED: "download_10mb"
}

const DOWNLOAD_OPTIONS = [
    {value: DOWNLOAD_FORMATS.MERGED, label: "inbox.download.modal.radio.mergedPDF"},
    {value: DOWNLOAD_FORMATS.INDIVIDUAL, label: "inbox.download.modal.radio.individualPDF"},
];

const DOWNLOAD_OPTIONS_COMPANY = [
    {value: DOWNLOAD_FORMATS.CSV, label: "inbox.download.modal.radio.csv"},
    {value: DOWNLOAD_FORMATS.MERGED, label: "inbox.download.modal.radio.mergedPDF"},
    {value: DOWNLOAD_FORMATS.INDIVIDUAL, label: "inbox.download.modal.radio.individualPDF"},
    {value: DOWNLOAD_FORMATS.GROUPED, label: "inbox.download.modal.radio.groupedPDF"}
];

const getCSVDownload = async (billerId, values, searchParams, history, dispatch, onCancel, intl) => {
    const {data} = await axios.get(`/data/invoices/${billerId}/download`,
        {
            params: {
                billerId,
                pages: values.pagesForDownload === "first" ? 1 : null,
                markDownloaded: values.markDownloaded,
                notifyOnCompletion: values.notifyOnCompletion,
                columns: intl.formatMessage({id: "inbox.download.column.labels"}),
                fieldNames: "billerName,invoiceNo,amountDue,minAmountDue,dueDate,billerCode,billerCustomerNumber,crn,billRef2,receivedTime,documentType,usageCharge,prevAccountBalance",
                type: "all",
                ...searchParams,
                fromDate: timeInUTC(searchParams.fromDate),
                toDate: timeInUTC(searchParams.toDate)
            }
        });
    if (data.success && data.jobId) {
        return history.push(`./inbox/download-result/${data.jobId}`);
    }
    if (data.success) {
        onCancel();
        return window.open(`/download/invoices/download?downloadFileId=${data.downloadFileId}`);
    }
    return dispatch({type: SET_ALERT, alert: {level: "danger", text: "inbox.download.modal.error"}});

};

const getPDFDownload = (billerId, values, searchParams, history, dispatch) => (
    axios.post(`/data/invoices/download/${values.format}`,
        {
            billerId,
            pages: values.pagesForDownload === "first" ? 1 : null,
            markDownloaded: values.markDownloaded,
            notifyOnCompletion: values.notifyOnCompletion,
            ...searchParams,
            fromDate: timeInUTC(searchParams.fromDate),
            toDate: timeInUTC(searchParams.toDate)
        })
        .then(({data}) => {
            if (data.success && data.jobId) {
                history.push(`./inbox/download-result/${data.jobId}`);
            } else {
                dispatch({type: SET_ALERT, alert: {level: "danger", text: "inbox.download.modal.error"}});
            }
        })
);

const download = async (billerId, values, searchParams, history, dispatch, onCancel, intl) => {
    if (values.format === DOWNLOAD_FORMATS.CSV) {
        return getCSVDownload(billerId, values, searchParams, history, dispatch, onCancel, intl);
    }

    return getPDFDownload(billerId, values, searchParams, history, dispatch);
};

const schema = Yup.object().shape({
    format: Yup.string().required("forms.generic.required.label")
});

const HintComponent = injectIntl(({intl}) => (
    <a href="https://help.payreq.com/support/solutions/articles/11000097902" className={styles.hint}
       rel="noopener noreferrer" target="_blank">
        {intl.formatMessage({id: "inbox.download.modal.radio.help"})}
        <Icon name="new-window" className={styles.hintIcon}/>
    </a>
))

const abovePdfDownloadLimit = (format, count, downloadLimit) => (format === DOWNLOAD_FORMATS.MERGED && count > downloadLimit);

const InboxDownloadModal =
    ({biller, show, onCancel, history, intl, showWarning, count, downloadLimit}) => {
        const [{inbox}, dispatch] = useAppState();
        if (!show) {
            return null;
        }
        return (
            <Formik
                initialValues={{
                    format: biller.isCompany ? DOWNLOAD_FORMATS.CSV : DOWNLOAD_FORMATS.INDIVIDUAL,
                    pagesForDownload: "all",
                    markDownloaded: true,
                    notifyOnCompletion: true
                }}
                validationSchema={schema}
                onSubmit={(values) => download(biller.id, values, inbox.searchParams, history, dispatch, onCancel, intl)}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      isSubmitting
                  }) => {
                    const isAbovePdfDownloadLimit = abovePdfDownloadLimit(values.format, count, downloadLimit);
                    return (
                        <form onSubmit={handleSubmit}>
                            <Modal show={show}
                                   title="inbox.download.modal.heading"
                                   buttonLabel="generic.download"
                                   onCancel={onCancel}
                                   onPrimaryAction={handleSubmit}
                                   PrimaryButtonComponent={PrimaryButton}
                                   disabled={isSubmitting || isAbovePdfDownloadLimit}
                            >


                                <Radio name="format"
                                       label="inbox.download.modal.radio.label"
                                       HintComponent={biller.isCompany && HintComponent}
                                       options={biller.isCompany ? DOWNLOAD_OPTIONS_COMPANY : DOWNLOAD_OPTIONS}
                                       value={values.format}
                                       onChange={handleChange}
                                       error={errors.format}
                                       touched={touched.format}
                                />


                                {![DOWNLOAD_FORMATS.CSV, DOWNLOAD_FORMATS.GROUPED].includes(values.format) && (
                                    <Radio name="pagesForDownload"
                                           label="inbox.download.modal.pagesToInclude"
                                           options={[
                                               {value: "all", label: "inbox.download.modal.pages.all"},
                                               {value: "first", label: "inbox.download.modal.pages.first"},
                                           ]}
                                           value={values.pagesForDownload}
                                           onChange={handleChange}
                                           error={errors.pagesForDownload}
                                           touched={touched.pagesForDownload}
                                    />
                                )}
                                {values.format === DOWNLOAD_FORMATS.CSV && (
                                    <Checkbox name="markDownloaded"
                                              label="inbox.download.modal.markDownloadedCheckbox"
                                              value={values.markDownloaded}
                                              onChange={handleChange}
                                              error={errors.markDownloaded}
                                              touched={touched.markDownloaded}
                                    />
                                )}
                                {values.format !== DOWNLOAD_FORMATS.CSV && (
                                    <Checkbox name="notifyOnCompletion"
                                              label="inbox.download.modal.emailOnCompletion"
                                              value={values.notifyOnCompletion}
                                              onChange={handleChange}
                                              error={errors.notifyOnCompletion}
                                              touched={touched.notifyOnCompletion}
                                    />
                                )}

                                {showWarning && (
                                    <Alert className={styles.downloadWarning}
                                           value="inbox.download.modal.warning"
                                           type={ALERT_TYPES.WARNING}/>
                                )}
                                <LargeText style={{marginBottom: "2rem"}}>
                                    {intl.formatMessage({id: "inbox.download.modal.summary1"})}
                                    {'\u00A0'}<strong>{intl.formatMessage({id: "inbox.download.modal.summary2"}, {count: count})}</strong>
                                </LargeText>
                                {isAbovePdfDownloadLimit && (
                                    <Alert className={styles.downloadWarning}
                                           value="inbox.download.modal.downloadLimitError"
                                           values={{limit: downloadLimit}}
                                           type={ALERT_TYPES.DANGER}/>
                                )}
                            </Modal>
                        </form>
                    )}}
            </Formik>

        )
    };

export default injectIntl(withRouter(InboxDownloadModal));
