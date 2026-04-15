import React from "react";
import {injectIntl} from "react-intl";
import {Icon, Table} from "../common";
import * as R from 'ramda';
import {withRouter} from "react-router-dom";
import {COLUMN_LABELS, SORT_DIRECTION} from "./contacts-constants";
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

const ContactsTable = ({rows, onColumnClick, sortDirection, sortOrder, intl, history, match, biller, visibleColumns, canDeleteContact, onDeleteContact}) => {
    // Filter column labels based on visible columns
    const filteredColumnLabels = Object.keys(COLUMN_LABELS)
        .filter(key => visibleColumns.includes(key))
        .reduce((obj, key) => {
            obj[key] = COLUMN_LABELS[key];
            return obj;
        }, {});

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
        , filteredColumnLabels);

    const sortColumnIndex = Object.keys(filteredColumnLabels).indexOf(sortOrder);
    const getTdClass = (idx) => idx === sortColumnIndex ? "sorted-cell" : "unsorted-cell";

    return (
        <div className="table-responsive">
            <Table className="data-table table table-hover clickable-rows">
                <thead>
                    <tr>
                        {Object.values(columnHeaders)}
                        {canDeleteContact && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                {rows.length === 0 ? (
                    <tr>
                        <td colSpan={Object.keys(filteredColumnLabels).length + (canDeleteContact ? 1 : 0)}>
                            {intl.formatMessage({id: "contacts.search.noContactsFound"})}
                        </td>
                    </tr>
                ) : (
                    rows.map((row, idx) => (
                        <tr key={idx}
                            style={{cursor: "pointer"}}
                            onClick={() => history.push(`${match.url}/${row.id}`)}
                            aria-label={row.billerAccountNumber}
                        >
                            {visibleColumns.includes('billerAccountNumber') && (
                                <td className={getTdClass(visibleColumns.indexOf('billerAccountNumber'))}>
                                    {row.billerAccountNumber}
                                </td>
                            )}
                            {visibleColumns.includes('name') && (
                                <td className={getTdClass(visibleColumns.indexOf('name'))}>
                                    {row.name}
                                </td>
                            )}
                            {visibleColumns.includes('contactId1') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId1'))}>
                                    {row.contactId1}
                                </td>
                            )}
                            {visibleColumns.includes('contactId2') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId2'))}>
                                    {row.contactId2}
                                </td>
                            )}
                            {visibleColumns.includes('contactId3') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId3'))}>
                                    {row.contactId3}
                                </td>
                            )}
                            {visibleColumns.includes('contactId4') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId4'))}>
                                    {row.contactId4}
                                </td>
                            )}
                            {visibleColumns.includes('contactId5') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId5'))}>
                                    {row.contactId5}
                                </td>
                            )}
                            {visibleColumns.includes('contactId6') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId6'))}>
                                    {row.contactId6}
                                </td>
                            )}
                            {visibleColumns.includes('contactId7') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId7'))}>
                                    {row.contactId7}
                                </td>
                            )}
                            {visibleColumns.includes('contactId8') && (
                                <td className={getTdClass(visibleColumns.indexOf('contactId8'))}>
                                    {row.contactId8}
                                </td>
                            )}
                            {visibleColumns.includes('lastUpdated') && (
                                <td className={getTdClass(visibleColumns.indexOf('lastUpdated'))} style={{whiteSpace: "nowrap"}}>
                                    {getDateAsUTCFormatted(row.lastUpdated)}
                                </td>
                            )}
                            {canDeleteContact && (
                                <td style={{whiteSpace: "nowrap"}}>
                                    <button 
                                        className="btn btn-link" 
                                        style={{padding: "5px"}} 
                                        title="Delete Contact"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteContact(row);
                                        }}
                                        aria-label="Delete Contact" 
                                        role="button"
                                    >
                                        <span className="glyphicon glyphicon-remove"></span>
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))
                )}
                </tbody>
            </Table>
        </div>
    );
};

export default withRouter(injectIntl(ContactsTable));
