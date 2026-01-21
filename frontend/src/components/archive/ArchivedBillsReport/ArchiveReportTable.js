import React from "react";
import {injectIntl} from "react-intl";
import {Table, SecondaryButton} from "../../common";
import {CSVLink} from "react-csv";
import styles from "./ArchiveReport.module.scss";

const getCount = count => (count || 0);

const ReportTable = ({reportRows, intl}) => {
    if (reportRows.length === 0) return null;
    return (
        <div className={styles.tableContainer}>
            <Table
                headerLabels={[
                    "reports.archive.billerName",
                    "reports.archive.totalArchived",
                    "reports.archive.dispatchedViaRegisteredChannel",
                    "reports.archive.dispatchedViaArchive",
                    "reports.archive.archiveBillViews"
                ]}
                rows={reportRows.map(({billerName, totalArchived, dispatchedViaRegisteredChannel, dispatchedViaArchive, archiveBillViews}) => {
                    return [
                        billerName,
                        getCount(totalArchived),
                        getCount(dispatchedViaRegisteredChannel),
                        getCount(dispatchedViaArchive),
                        getCount(archiveBillViews)
                    ]
                })}
            >
            </Table>
            <CSVLink
                filename={`archived-bills-report-${new Date().getTime()}.csv`}
                data={reportRows}
                headers={[
                    {label: intl.formatMessage({id: "reports.archive.billerName"}), key: "billerName"},
                    {label: intl.formatMessage({id: "reports.archive.totalArchived"}), key: "totalArchived"},
                    {label: intl.formatMessage({id: "reports.archive.dispatchedViaRegisteredChannel"}), key: "dispatchedViaRegisteredChannel"},
                    {label: intl.formatMessage({id: "reports.archive.dispatchedViaArchive"}), key: "dispatchedViaArchive"},
                    {label: intl.formatMessage({id: "reports.archive.archiveBillViews"}), key: "archiveBillViews"}
                ]}>
                <SecondaryButton label="generic.download" icon="download"/>
            </CSVLink>
        </div>
    )
};

export default injectIntl(ReportTable);