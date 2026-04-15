import React from "react";
import {injectIntl} from "react-intl";
import {Icon, Table} from "../common";
import * as R from 'ramda';
import {withRouter} from "react-router-dom";
import {COLUMN_LABELS, SORT_DIRECTION} from "./bills-constants";
import {getDateAsUTCFormatted} from "../../utils/date-utils";

const SortColumnView = ({show, sortColumnDirection}) => {
    if (!show) return null;
    return (
        <React.Fragment>
            {sortColumnDirection === SORT_DIRECTION.asc ? 
                <Icon name="chevron-up"/> : 
                <Icon name="chevron-down"/>}
        </React.Fragment>
    );
};

const formatCurrency = (amount, currencyCode, intl) => {
    if (!amount) return null;
    return intl.formatNumber(amount, {
        style: "currency",
        currency: currencyCode || "USD"
    });
};

const formatDate = (date) => {
    if (!date) return null;
    return getDateAsUTCFormatted(date);
};

const BillsTable = ({rows, onColumnClick, sortDirection, sortOrder, intl, history, match, biller}) => {
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
        , COLUMN_LABELS);

    const sortColumnIndex = Object.keys(COLUMN_LABELS).indexOf(sortOrder);
    const getTdClass = (idx) => idx === sortColumnIndex ? "sorted-cell" : "unsorted-cell";

    return (
        <div className="table-responsive">
            <Table className="data-table table table-hover clickable-rows">
                <thead>
                    <tr>
                        {Object.values(columnHeaders)}
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                {rows.length === 0 ? (
                    <tr>
                        <td colSpan={Object.keys(COLUMN_LABELS).length + 1}>
                            {intl.formatMessage({id: "bills.search.noBillsFound"})}
                        </td>
                    </tr>
                ) : (
                    rows.map((row, idx) => (
                        <tr key={idx}
                            style={{cursor: "pointer"}}
                            onClick={() => history.push(`${match.url}/${row.id}`)}
                            aria-label={row.billerInvoiceNumber}
                        >
                            <td className={getTdClass(0)}>{row.billerInvoiceNumber}</td>
                            <td className={getTdClass(1)}>
                                {row.payerName || <em className="text-muted">Not known</em>}
                            </td>
                            <td className={getTdClass(2)}>{row.billerAccountNumber}</td>
                            <td className={getTdClass(3)}>
                                {formatCurrency(row.amountDue, row.currency, intl)}
                            </td>
                            <td className={getTdClass(4)} style={{whiteSpace: "nowrap"}}>
                                {formatDate(row.dueDate)}
                            </td>
                            <td className={getTdClass(5)} style={{whiteSpace: "nowrap"}}>
                                {formatDate(row.receivedTime)}
                            </td>
                            <td className={getTdClass(6)}>
                                {row.sendToPrinter ? "Print" : "Digital"}
                            </td>
                            <td className={getTdClass(7)}>{row.documentPages}</td>
                            <td className={getTdClass(8)} style={{whiteSpace: "nowrap"}}>
                                {row.firstActionedTime ? 
                                    formatDate(row.firstActionedTime) : 
                                    <em className="text-muted">In Progress</em>
                                }
                            </td>
                            <td className={getTdClass(9)}>
                                {row.firstActionedTime ? 
                                    row.numPayersSentTo : 
                                    <em className="text-muted">Pending</em>
                                }
                            </td>
                            <td className={getTdClass(10)}>
                                {row.numPayersFailed > 0 ? 
                                    <span className="label label-danger">{row.numPayersFailed}</span> : 
                                    row.numPayersFailed
                                }
                            </td>
                            <td className={getTdClass(11)}>{row.jobId}</td>
                            <td className={getTdClass(12)} style={{whiteSpace: "nowrap"}}>
                                <abbr title={row.statusDescription || row.status}>
                                    {row.statusText || row.status}
                                </abbr>
                            </td>
                            <td style={{whiteSpace: "nowrap"}}>
                                {row.documentId && (
                                    <a 
                                        className="btn btn-xs" 
                                        title="Download Document" 
                                        href={`/data/documents/${row.documentId}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <span className="glyphicon glyphicon-file"></span>
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        </div>
    );
};

export default withRouter(injectIntl(BillsTable));
