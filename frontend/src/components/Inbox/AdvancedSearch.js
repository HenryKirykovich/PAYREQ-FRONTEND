import React from "react";
import {Accordion, DateInput, Select} from "../common";
import {INVOICE_DOWNLOAD_STATUS, INVOICE_FORWARDING_STATUS, INVOICE_PAYMENT_STATUS, DOCUMENT_TYPE} from "./inbox-constants";
import styles from "./InboxView.module.scss";
import {changeAndSubmit, changeAndSubmitOnDate} from "../../utils/form-utils";

const PAYMENT_STATUS_OPTIONS = [
    {value: "all", label: "generic.allStatuses"},
    {value: INVOICE_PAYMENT_STATUS.paid, label: "bill.status.paid"},
    {value: INVOICE_PAYMENT_STATUS.paymentDue, label: "bill.status.payment-due"},
    {value: INVOICE_PAYMENT_STATUS.noPaymentDue, label: "bill.status.no-payment-due"},
];
const DOWNLOAD_STATUS_OPTIONS = [
    {value: "all", label: "generic.allStatuses"},
    {value: INVOICE_DOWNLOAD_STATUS.awaitingDownload, label: "invoice.view.documentDetails.awaitingDownload"},
    {value: INVOICE_DOWNLOAD_STATUS.downloaded, label: "invoice.view.documentDetails.downloaded"},
];
const FORWARDING_STATUS_OPTIONS = [
    {value: "all", label: "generic.allStatuses"},
    {value: INVOICE_FORWARDING_STATUS.awaitingSent, label: "bill.forwardingStatus.awaiting-send"},
    {value: INVOICE_FORWARDING_STATUS.failed, label: "bill.forwardingStatus.failed-and-action-required"},
    {value: INVOICE_FORWARDING_STATUS.sent, label: "bill.forwardingStatus.sent"},
];

const DOCUMENT_TYPE_OPTIONS = [
    {value: "all", label: "generic.allTypes"},
    {value: DOCUMENT_TYPE.bill, label: "bill.documentType.bill"},
    {value: DOCUMENT_TYPE.billReminder, label: "bill.documentType.billReminder"},
    {value: DOCUMENT_TYPE.letter, label: "bill.documentType.letter"},
    {value: DOCUMENT_TYPE.peppolInvoice, label: "bill.documentType.peppolInvoice"},
    {value: DOCUMENT_TYPE.payroll, label: "bill.documentType.payroll"},
];

const isStatusFilterOn = status => status !== "all"

const getDefaultExpanded = ({
                                paymentStatus,
                                downloadStatus,
                                forwardingStatus,
                                documentType,
                                fromDate,
                                toDate,
                            }) => {
    return !!(isStatusFilterOn(paymentStatus) || isStatusFilterOn(downloadStatus) ||  isStatusFilterOn(forwardingStatus) || isStatusFilterOn(documentType) || fromDate || toDate)
};

const AdvancedSearch = ({values, searchParams, handleChange, handleSubmit, errors, touched}) => {
    return(
        <div className={styles.advancedSearch}>
            <Accordion title="generic.advancedSearch" defaultExpanded={getDefaultExpanded(values)}>
                <Select name="paymentStatus"
                        className={`${styles.advancedSearchField} ${isStatusFilterOn(searchParams.paymentStatus) ? styles.activeFilter : ""}`}
                        label="invoice.view.documentDetails.paymentStatus.label"
                        placeholder="invoice.view.documentDetails.paymentStatus.label"
                        options={PAYMENT_STATUS_OPTIONS}
                        value={values.paymentStatus}
                        isControlled={true}
                        onChange={e => changeAndSubmit(handleChange, handleSubmit, e, errors.paymentStatus)}
                        error={errors.paymentStatus}
                        touched={touched.paymentStatus}
                />
                <Select name="downloadStatus"
                        className={`${styles.advancedSearchField} ${isStatusFilterOn(searchParams.downloadStatus) ? styles.activeFilter : ""}`}
                        label="invoice.view.documentDetails.downloadStatus.label"
                        placeholder="invoice.view.documentDetails.downloadStatus.label"
                        options={DOWNLOAD_STATUS_OPTIONS}
                        value={values.downloadStatus}
                        isControlled={true}
                        onChange={e => changeAndSubmit(handleChange, handleSubmit, e, errors.downloadStatus)}
                        error={errors.downloadStatus}
                        touched={touched.downloadStatus}
                />
                <Select name="forwardingStatus"
                        className={`${styles.advancedSearchField} ${isStatusFilterOn(searchParams.forwardingStatus) ? styles.activeFilter : ""}`}
                        label="bill.forwardingStatus.label"
                        placeholder="bill.forwardingStatus.label"
                        options={FORWARDING_STATUS_OPTIONS}
                        value={values.forwardingStatus}
                        isControlled={true}
                        onChange={e => changeAndSubmit(handleChange, handleSubmit, e, errors.forwardingStatus)}
                        error={errors.forwardingStatus}
                        touched={touched.forwardingStatus}
                />
                <Select name="documentType"
                        className={`${styles.advancedSearchField} ${isStatusFilterOn(searchParams.documentType) ? styles.activeFilter : ""}`}
                        label="invoice.view.documentDetails.documentType.label"
                        placeholder="invoice.view.documentDetails.documentType.label"
                        options={DOCUMENT_TYPE_OPTIONS}
                        value={values.documentType}
                        isControlled={true}
                        onChange={e => changeAndSubmit(handleChange, handleSubmit, e, errors.documentType)}
                        error={errors.documentType}
                        touched={touched.documentType}
                />
                <DateInput name="fromDate"
                           className={`${styles.advancedSearchField} ${searchParams.fromDate ? styles.activeFilter : ""}`}
                           label="forms.generic.fromDate"
                           value={values.fromDate}
                           onChange={e => changeAndSubmitOnDate(handleChange, handleSubmit, e)}
                           error={errors.fromDate}
                           touched={touched.fromDate}/>
                <DateInput name="toDate"
                           className={`${styles.advancedSearchField} ${searchParams.toDate ? styles.activeFilter : ""}`}
                           label="forms.generic.toDate"
                           value={values.toDate}
                           onChange={e => changeAndSubmitOnDate(handleChange, handleSubmit, e)}
                           error={errors.toDate}
                           touched={touched.toDate}/>
            </Accordion>
        </div>
    )
};

export default AdvancedSearch;