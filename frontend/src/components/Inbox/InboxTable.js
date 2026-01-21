import React from "react";
import {injectIntl} from "react-intl";
import {Icon, Table} from "../common";
import * as R from 'ramda';
import {withRouter} from "react-router-dom";
import styles from "./InboxTable.module.scss"
import {isMonetaryDocument} from "../../utils/document-utils";
import {
    getBillStatusText,
    INVOICE_AUTO_PAYMENT_STATUS, INVOICE_DOCUMENT_TYPES,
    INVOICE_FORWARDING_STATUS,
    INVOICE_PAYMENT_STATUS,
    SORT_DIRECTION
} from "./inbox-constants";
import {getDateAsUTCFormatted} from "../../utils/date-utils";

export const COLUMN_LABELS = {
    billerName: "inbox.tableView.organisation",
    address: "inbox.tableView.address",
    billerCustomerNumber: "inbox.tableView.customerReference",
    minAmountDue: "inbox.tableView.minAmountDue",
    amountDue: "inbox.tableView.totalAmountDue",
    dueDate: "inbox.tableView.dueDate",
    status: "inbox.tableView.paymentStatus",
    forwardingStatus: "inbox.tableView.forwardingStatus",
    downloadStatus: "inbox.tableView.downloadStatus",
    receivedTime: "inbox.tableView.deliveredTime"
}

const SortColumnView = ({show, sortColumnDirection}) => {
    if (!show) return null;
    return (
        <React.Fragment>
            {sortColumnDirection === SORT_DIRECTION.asc ? <Icon name="chevron-up" className={styles.chevron}/> :
                <Icon name="chevron-down" className={styles.chevron}/>}
        </React.Fragment>
    );
};

const formatRecievedTime = (row, intl) => {
    return intl.formatDate(row.receivedTime, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    })
};
const formatAmount = (amountDue, currencyCode, documentType, intl) => {
    if (!isMonetaryDocument(documentType) || !amountDue) return null;
    const updatedAmountDue = documentType === INVOICE_DOCUMENT_TYPES.peppol_credit_note ? amountDue * -1 : amountDue;
    return intl.formatNumber(updatedAmountDue, {
        style: "currency",
        currency: currencyCode
    })
};

const formatDownloadStatus = (row, intl) => {
    if (row.forwardingStatus) {
        return intl.formatMessage({id:"generic.na"});
    }
    return intl.formatMessage({id: row.downloadStatus ? "invoice.view.documentDetails.downloaded" : "invoice.view.documentDetails.awaitingDownload"});
};


const getDownloadStatusClass = row => {
    if (row.forwardingStatus) {
        return "";
    }
    return row.downloadStatus ? "" : styles.infoText;
};

const formatStatus = (row, intl) => {
    if (!isMonetaryDocument(row.documentType)) return null;
    const suffix = row.status === INVOICE_PAYMENT_STATUS.paymentDue && !row.autoPaymentStatus ? "*" : ""
    return intl.formatMessage({id: getBillStatusText(row)}) + suffix;
};

const getStatusClass = row => {
    if (!(row.status === "paid") && [INVOICE_AUTO_PAYMENT_STATUS.aboveLimit, INVOICE_AUTO_PAYMENT_STATUS.failed].includes(row.autoPaymentStatus)) {
        return styles.dangerText;
    }
    return "";
};

const formatForwardingStatus = (row, intl) => {
    if (!isMonetaryDocument(row.documentType)) return null;
    return intl.formatMessage({id: "bill.forwardingStatus." + row.forwardingStatus})
};

const getForwardingStatusClass = forwardingStatus => {
    return [INVOICE_FORWARDING_STATUS.failed, INVOICE_FORWARDING_STATUS.awaitingInformation].includes(forwardingStatus) ? styles.dangerText : ""
};

const formatDueDate = (row, intl) => {
    if (!isMonetaryDocument(row.documentType)) return null;
    return getDateAsUTCFormatted(row.dueDate);
};

const getCustomerReference = (row) => {
    if (row.documentType === INVOICE_DOCUMENT_TYPES.payroll) return row.description;
    return row.billerCustomerNumber;
};

const InboxTable = ({rows, onColumnClick, sortDirection, sortOrder, intl, history}) => {
    const columnHeaders = R.mapObjIndexed((label, key, _obj) =>
            <th key={label}
                style={{cursor: "pointer"}}
                onClick={() => onColumnClick && onColumnClick(key)}
            >
                {intl.formatMessage({id: label})}
                <SortColumnView show={sortOrder === key}
                                sortColumnDirection={sortDirection}
                />
            </th>
        , COLUMN_LABELS)
    const sortColumnIndex = Object.keys(COLUMN_LABELS).indexOf(sortOrder)
    const getTdClass = (idx) => idx === sortColumnIndex ? styles.sortedCell : styles.unsortedCell;
    return (
        <Table>
            <thead>
            <tr>
                {Object.values(columnHeaders)}
            </tr>
            </thead>

            <tbody>
            {rows.map((row, idx) => (
                <tr key={idx}
                    style={{cursor: "pointer"}}
                    onClick={() => history.push(`./inbox/${row.id}`)}
                    aria-label={row.description}
                >
                    <td className={getTdClass(0)}>{row.billerName}</td>
                    <td className={getTdClass(1)}>{row.billRef2}</td>
                    <td className={getTdClass(2)}>{getCustomerReference(row)}</td>
                    <td className={getTdClass(3)}>{formatAmount(row.minAmountDue, row.currencyCode, row.documentType, intl)}</td>
                    <td className={getTdClass(4)}>{formatAmount(row.amountDue, row.currencyCode, row.documentType, intl)}</td>
                    <td className={getTdClass(5)}>{formatDueDate(row, intl)}</td>
                    <td className={`${getTdClass(6)} ${getStatusClass(row)}`}>{formatStatus(row, intl)}</td>
                    <td className={`${getTdClass(7)} ${getForwardingStatusClass(row.forwardingStatus)}`}>
                        {formatForwardingStatus(row, intl)}
                    </td>
                    <td className={`${getTdClass(8)} ${getDownloadStatusClass(row)}`}>
                        {formatDownloadStatus(row, intl)}
                    </td>
                    <td className={getTdClass(9)}>{formatRecievedTime(row, intl)}</td>
                </tr>
            ))}
            </tbody>
        </Table>
        );
};

export default withRouter(injectIntl(InboxTable));
