import React from "react";
import {Formik} from "formik";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {SET_ALERT} from "../../state/reducers/alertReducer";
import {useAppState} from "../../state";
import {Alert, Checkbox, LargeText, Modal, PrimaryButton, Radio} from "../common";
import * as Yup from "yup";
import {injectIntl} from "react-intl";
import {timeInUTC} from "../../utils/date-utils";
import {isBillingAccount} from "../../utils/account-utils";
import styles from "../Inbox/InboxDownloadModal.module.scss";
import {ALERT_TYPES} from "../common/alerts/Alert";

const DOWNLOAD_FORMATS = {
    CSV: "download_csv",
    MERGED: "download_one",
    INDIVIDUAL: "download_bills",
}

const DOWNLOAD_OPTIONS = [
    {value: DOWNLOAD_FORMATS.CSV, label: "inbox.download.modal.radio.csv"},
    {value: DOWNLOAD_FORMATS.MERGED, label: "inbox.download.modal.radio.mergedPDF"},
    {value: DOWNLOAD_FORMATS.INDIVIDUAL, label: "inbox.download.modal.radio.individualPDF"},
];

const PAGE_DOWNLOAD_OPTIONS = [
    {value: "all", label: "inbox.download.modal.pages.all"},
    {value: "first", label: "inbox.download.modal.pages.first"},
]

const getCSVDownload = async ({id, accountType}, values, searchParams, history, dispatch, onCancel, intl) => {
    const columns =  isBillingAccount(accountType) ? intl.formatMessage({id: "mail.tableView.download.billing.columns"}) :
                        intl.formatMessage({id: "mail.tableView.download.payroll.columns"});
    const fieldNames = isBillingAccount(accountType) ? "billerAccountNumber,billRef3,billerInvoiceNumber,amountDue,dueDate,receivedTime,sentTime,numPayersSentTo,numPayersFailed,jobId,status,billRef1,minAmountDue,accountBalance,prevAccountBalance,createdTime,billType"
        : "billerAccountNumber,billRef3,billerInvoiceNumber,receivedTime,sentTime,numPayersSentTo,numPayersFailed,jobId,status,createdTime";

    const {data} = await axios.get(`/data/bills/${id}/download`,
        {
            params: {
                billerId: id,
                pages: values.pagesForDownload === "first" ? 1 : null,
                markDownloaded: values.markDownloaded,
                notifyOnCompletion: values.notifyOnCompletion,
                columns,
                fieldNames,
                type: "all",
                ...searchParams,
                fromDate: timeInUTC(searchParams.fromDate),
                toDate: timeInUTC(searchParams.toDate)
            }
        });

    if (data.success && data.jobId) {
        return history.push(`./mail/download-result/${data.jobId}`);
    }
    if (data.success) {
        onCancel();
        return window.open(`/download/bills/download?downloadFileId=${data.downloadFileId}`);
    }
    return dispatch({type: SET_ALERT, alert: {level: "danger", text: "inbox.download.modal.error"}});

};

const getPDFDownload = (billerId, values, searchParams, history, dispatch) => (
    axios.post(`/data/v2/bills/download/${values.format}`,
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
                history.push(`/portal/customer/biller/${billerId}/mail/download-result/${data.jobId}`);
            } else {
                dispatch({type: SET_ALERT, alert: {level: "danger", text: "inbox.download.modal.error"}});
            }
        })
);

const download = async (biller, values, searchParams, history, dispatch, onCancel, intl) => {
    if (values.format === DOWNLOAD_FORMATS.CSV) {
        return getCSVDownload(biller, values, searchParams, history, dispatch, onCancel, intl);
    }

    return getPDFDownload(biller.id, values, searchParams, history, dispatch);
};

const schema = Yup.object().shape({
    format: Yup.string().required("forms.generic.required.label")
});

const abovePdfDownloadLimit = (format, count, downloadLimit) => (format === DOWNLOAD_FORMATS.MERGED && count > downloadLimit);

const MailDownloadModal =
    ({biller, show, onCancel, history, intl,  count, downloadLimit}) => {
        const [{mail}, dispatch] = useAppState();
        if (!show) {
            return null;
        }
        return (
            <Formik
                initialValues={{
                    format: DOWNLOAD_FORMATS.CSV,
                    pagesForDownload: "all",
                    markDownloaded: true,
                    notifyOnCompletion: true
                }}
                validationSchema={schema}
                onSubmit={(values) => download(biller, values, mail.searchParams, history, dispatch, onCancel, intl)}
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
                                       options={DOWNLOAD_OPTIONS}
                                       value={values.format}
                                       onChange={handleChange}
                                       error={errors.format}
                                       touched={touched.format}
                                />


                                {![DOWNLOAD_FORMATS.CSV].includes(values.format) && (
                                    <Radio name="pagesForDownload"
                                           label="inbox.download.modal.pagesToInclude"
                                           options={PAGE_DOWNLOAD_OPTIONS}
                                           value={values.pagesForDownload}
                                           onChange={handleChange}
                                           error={errors.pagesForDownload}
                                           touched={touched.pagesForDownload}
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

export default injectIntl(withRouter(MailDownloadModal));
