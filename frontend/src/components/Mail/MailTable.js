import React from "react";
import {injectIntl} from "react-intl";
import {Icon, Label, Table} from "../common";
import * as R from 'ramda';
import {withRouter} from "react-router-dom";
import styles from "./MailTable.module.scss"
import {
    SORT_DIRECTION
} from "../Inbox/inbox-constants";
import {getDateAsUTCFormatted} from "../../utils/date-utils";
import {isBillingAccount} from "../../utils/account-utils";
import {
    MAIL_STATUS_ALL, MAIL_STATUS_AWAITING_CREDITS, MAIL_STATUS_IGNORED,
    MAIL_STATUS_NOT_DELIVERED,
    MAIL_STATUS_NOT_DELIVERED_ACTIONED, MAIL_STATUS_OPTIONS,
    MAIL_STATUS_SENT
} from "./mail-constants";

const DO_NOT_ALLOW_SORT = ["numPayersFailed"];

const dateFormat = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
};

const BILLING_COLUMN_LABELS_SENT_STATUS = {
    billerCustomerNumber: "mail.tableView.billing.customerNumber",
    payerName: "mail.tableView.billing.customerName",
    amountDue: "mail.tableView.billing.total",
    dueDate: "mail.tableView.billing.minDue",
    billerInvoiceNumber: "mail.tableView.billing.invoiceNo",
    receivedTime: "mail.tableView.billing.receivedDate",
    sendToPrinter: "mail.tableView.billing.sentBy",
    documentPages: "mail.tableView.billing.noPages",
    firstActionedTime: "mail.tableView.billing.sentDate",
    numPayersSentTo: "mail.tableView.billing.noOfDispatches",
    numPayersFailed: "mail.tableView.billing.noFailedPayers",
    jobId: "mail.tableView.billing.jobId",
    status: "mail.tableView.billing.status"
}

const BILLING_COLUMN_LABELS_DEFAULT = {
    billerCustomerNumber: "mail.tableView.billing.customerNumber",
    payerName: "mail.tableView.billing.customerName",
    amountDue: "mail.tableView.billing.total",
    dueDate: "mail.tableView.billing.minDue",
    billerInvoiceNumber: "mail.tableView.billing.invoiceNo",
    receivedTime: "mail.tableView.billing.receivedDate",
    sendToPrinter: "mail.tableView.billing.sentBy",
    documentPages: "mail.tableView.billing.noPages",
    jobId: "mail.tableView.billing.jobId",
    status: "mail.tableView.billing.status"
}

const PAYROLL_COLUMN_LABELS_DEFAULT = {
    billerCustomerNumber: "mail.tableView.payroll.employeeNumber",
    payerName: "mail.tableView.payroll.employeeName",
    billerInvoiceNumber: "mail.tableView.payroll.documentNo",
    receivedTime: "mail.tableView.billing.receivedDate",
    sendToPrinter: "mail.tableView.billing.sentBy",
    documentPages: "mail.tableView.billing.noPages",
    jobId: "mail.tableView.billing.jobId",
    status: "mail.tableView.billing.status"
}

const PAYROLL_COLUMN_LABELS_SENT_STATUS = {
    billerCustomerNumber: "mail.tableView.payroll.employeeNumber",
    payerName: "mail.tableView.payroll.employeeName",
    billerInvoiceNumber: "mail.tableView.payroll.documentNo",
    receivedTime: "mail.tableView.billing.receivedDate",
    sendToPrinter: "mail.tableView.billing.sentBy",
    documentPages: "mail.tableView.billing.noPages",
    firstActionedTime: "mail.tableView.billing.sentDate",
    numPayersSentTo: "mail.tableView.billing.noOfDispatches",
    numPayersFailed: "mail.tableView.billing.noFailedPayers",
    jobId: "mail.tableView.billing.jobId",
    status: "mail.tableView.billing.status"
}


const isSent = mailStatus => [MAIL_STATUS_SENT, MAIL_STATUS_NOT_DELIVERED,
                              MAIL_STATUS_NOT_DELIVERED_ACTIONED, MAIL_STATUS_ALL].includes(mailStatus);

const getColumnsforBillingStatus = mailStatus => {
    if (isSent(mailStatus)) return BILLING_COLUMN_LABELS_SENT_STATUS;

    return BILLING_COLUMN_LABELS_DEFAULT;
}

const getColumnsforPayroll = mailStatus => {
    if (isSent(mailStatus)) return PAYROLL_COLUMN_LABELS_SENT_STATUS;

    return PAYROLL_COLUMN_LABELS_DEFAULT;
}

const getColumnsForAccountTypeAndStatus = (accountType, mailStatus) => {
    if (isBillingAccount(accountType)) {
        return getColumnsforBillingStatus(mailStatus);
    }

    return getColumnsforPayroll(mailStatus);
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
    return intl.formatDate(row.receivedTime, dateFormat)
};


const formatDueDate = (row) => {
    return getDateAsUTCFormatted(row.dueDate, { timeZone: 'UTC', month: 'short', day: 'numeric', year: 'numeric' });
};


const formatSentDate = (row, intl) => {
    if (!row.firstActionedTime || row.status === MAIL_STATUS_AWAITING_CREDITS)
        return intl.formatMessage({id: "generic.na"});

    return intl.formatDate(row.firstActionedTime, dateFormat)
};

const formatSendToPrinter = (row, intl) => {
    if (row.sendToPrinter) return intl.formatMessage({id: "mail.tableView.sentBy.print"});
    return intl.formatMessage({id: "mail.tableView.sentBy.digital"});
}

const formatStatus = (row, intl) => {
    if (row.status === MAIL_STATUS_IGNORED) return intl.formatMessage({id: "mail.view.mailStatus.status.ignored"});
    if (row.status === MAIL_STATUS_NOT_DELIVERED && row.actioned === true) return intl.formatMessage({id: "mail.view.mailStatus.status.undeliveredActioned"});

    const statsLabel = MAIL_STATUS_OPTIONS.filter( option => option.value === row.status)[0];
    return intl.formatMessage({id: statsLabel.label});
};

const formatNoPayers = (row, intl) => {
    if (!row.numPayersSentTo || row.status === MAIL_STATUS_AWAITING_CREDITS)
        return intl.formatMessage({id: "generic.na"});

    return row.numPayersSentTo;
}

const formatNoFailedPayers = (row) => {
    const noFailedPayer = row.numPayersFailed;
    if (noFailedPayer === 0) {
        return noFailedPayer;
    }

    return (
        <Label type={Label.DANGER} className={styles.failedCount}>
            <div>{noFailedPayer}</div>
        </Label>
    );
}

const formatAmount= (row, intl) => {
    if (row.amountDue !== null) {
        return intl.formatNumber(row.amountDue, {style: "currency", currency: row.currency})
    }
}

const BillingRowsSentStatus = ({row, getTdClass, intl}) => {
    return (
        <React.Fragment>
            <td className={getTdClass(0)}>{row.billerCustomerNumber}</td>
            <td className={getTdClass(1)}>{row.payerName}</td>
            <td className={getTdClass(2)}>{formatAmount(row, intl)}</td>
            <td className={getTdClass(3)}>{formatDueDate(row)}</td>
            <td className={getTdClass(4)}>{row.billerInvoiceNumber}</td>
            <td className={getTdClass(5)}>{formatRecievedTime(row, intl)}</td>
            <td className={getTdClass(6)}>{formatSendToPrinter(row, intl)}</td>
            <td className={getTdClass(7)}>{row.documentPages}</td>
            <td className={getTdClass(8)}>{formatSentDate(row, intl)}</td>
            <td className={getTdClass(9)}>{formatNoPayers(row, intl)}</td>
            <td className={getTdClass(10)}>{formatNoFailedPayers(row)}</td>
            <td className={getTdClass(11)}>{row.jobId}</td>
            <td className={getTdClass(12)}>{formatStatus(row, intl)}</td>
        </React.Fragment>
    )
}

const BillingRowsAwaitingReviewStatus = ({row, getTdClass, intl}) => {
    return (
        <React.Fragment>
            <td className={getTdClass(0)}>{row.billerCustomerNumber}</td>
            <td className={getTdClass(1)}>{row.payerName}</td>
            <td className={getTdClass(2)}>{formatAmount(row, intl)}</td>
            <td className={getTdClass(3)}>{formatDueDate(row)}</td>
            <td className={getTdClass(4)}>{row.billerInvoiceNumber}</td>
            <td className={getTdClass(5)}>{formatRecievedTime(row, intl)}</td>
            <td className={getTdClass(6)}>{formatSendToPrinter(row, intl)}</td>
            <td className={getTdClass(7)}>{row.documentPages}</td>
            <td className={getTdClass(8)}>{row.jobId}</td>
            <td className={getTdClass(9)}>{formatStatus(row, intl)}</td>
        </React.Fragment>
    )
}

const PayrollRowsSentStatus = ({row, getTdClass, intl}) => {
    return (
        <React.Fragment>
            <td className={getTdClass(0)}>{row.billerCustomerNumber}</td>
            <td className={getTdClass(1)}>{row.payerName}</td>
            <td className={getTdClass(2)}>{row.billerInvoiceNumber}</td>
            <td className={getTdClass(3)}>{formatRecievedTime(row, intl)}</td>
            <td className={getTdClass(4)}>{formatSendToPrinter(row, intl)}</td>
            <td className={getTdClass(5)}>{row.documentPages}</td>
            <td className={getTdClass(6)}>{formatSentDate(row, intl)}</td>
            <td className={getTdClass(7)}>{formatNoPayers(row, intl)}</td>
            <td className={getTdClass(8)}>{formatNoFailedPayers(row)}</td>
            <td className={getTdClass(9)}>{row.jobId}</td>
            <td className={getTdClass(10)}>{formatStatus(row, intl)}</td>
        </React.Fragment>
    )
}

const PayrollRows = ({row, getTdClass, intl}) => {
    return (
        <React.Fragment>
            <td className={getTdClass(0)}>{row.billerCustomerNumber}</td>
            <td className={getTdClass(1)}>{row.payerName}</td>
            <td className={getTdClass(2)}>{row.billerInvoiceNumber}</td>
            <td className={getTdClass(3)}>{formatRecievedTime(row, intl)}</td>
            <td className={getTdClass(4)}>{formatSendToPrinter(row, intl)}</td>
            <td className={getTdClass(5)}>{row.documentPages}</td>
            <td className={getTdClass(9)}>{row.jobId}</td>
            <td className={getTdClass(10)}>{formatStatus(row, intl)}</td>
        </React.Fragment>
    )
}

const TableRowsBilling = ({row, mailStatus, getTdClass, intl}) => {
    if (isSent(mailStatus)) {
        return <BillingRowsSentStatus row={row} getTdClass={getTdClass} intl={intl}/>
    }

    return <BillingRowsAwaitingReviewStatus row={row} getTdClass={getTdClass} intl={intl}/>
}

const TableRowsPayroll = ({row, mailStatus, getTdClass, intl}) => {
    if (isSent(mailStatus)) {
        return <PayrollRowsSentStatus row={row} getTdClass={getTdClass} intl={intl}/>
    }

    return <PayrollRows row={row} getTdClass={getTdClass} intl={intl}/>
}

const TableRows = ({row, accountType, mailStatus, getTdClass, intl}) => {
    if (isBillingAccount(accountType)) {
        return <TableRowsBilling row={row} mailStatus={mailStatus} getTdClass={getTdClass} intl={intl}/>
    }

    return <TableRowsPayroll row={row} mailStatus={mailStatus} getTdClass={getTdClass} intl={intl}/>;
}

const MailTable = ({rows, biller, onColumnClick, searchParams, sortDirection, sortOrder, intl}) => {
    const {accountType} = biller;
    const {type} = searchParams;

    const tableColumnLabels = getColumnsForAccountTypeAndStatus(accountType, type);
    const columnHeaders = R.mapObjIndexed((label, key, _obj) => {
        const canFieldBeSorted = !DO_NOT_ALLOW_SORT.includes(key);

        if (canFieldBeSorted) {
            return <th key={label}
                    style={{cursor: "pointer"}}
                    onClick={() => onColumnClick && onColumnClick(key)}>
                    {intl.formatMessage({id: label})}
                    <SortColumnView show={sortOrder === key}
                                    sortColumnDirection={sortDirection}
                    />
                </th>
            }

        return <th key={label}>
            {intl.formatMessage({id: label})}
            <SortColumnView show={false}/>
        </th>}
        , tableColumnLabels)

    const sortColumnIndex = Object.keys(tableColumnLabels).indexOf(sortOrder)
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
                    onClick={event => window.open(`/customer#/biller/${row.billerActorId}/bill/${row.id}`, (event.metaKey || event.ctrlKey) ? "_blank" : "_self")}
                    aria-label={row.billerCustomerNumber}
                >
                    <TableRows row={row} getTdClass={getTdClass} accountType={accountType} mailStatus={type} intl={intl}/>
                </tr>
            ))}
            </tbody>
        </Table>
        );
};

export default withRouter(injectIntl(MailTable));
