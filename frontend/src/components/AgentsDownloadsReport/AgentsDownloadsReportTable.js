import React from "react";
import {injectIntl} from "react-intl";
import {Table, SecondaryButton} from "../common";
import {CSVLink} from "react-csv";

function AgentsDownloadsReportTable({reportRows, intl}){
    if (reportRows.length === 0) return null;
    return (
        <React.Fragment>
            <Table
                headerLabels={[
                    "reports.agentsdownloads.agentName",
                    "reports.agentsdownloads.agentCode",
                    "reports.agentsdownloads.numberOfBillsAwaitingDownload",
                    "reports.agentsdownloads.dueDate",
                    "reports.agentsdownloads.usesDailyDownloads",
                    "reports.agentsdownloads.authorisedStatus"
                ]}
                rows={reportRows.map(({agentName, agentCode, numberOfBillsAwaitingDownload, dueDate, usesDailyDownloads, authorisedStatus}) => {
                    return [
                        agentName, agentCode, numberOfBillsAwaitingDownload, dueDate, usesDailyDownloads, intl.formatMessage({id: "reports.agentsdownloads.authorisedStatus.".concat(authorisedStatus || "not.authorised")})
                    ];
                })}
            >
            </Table>
            <CSVLink
                filename={`agents-downloads-report-${new Date().getTime()}.csv`}
                data={reportRows}
                headers={[
                    {label: intl.formatMessage({id: "reports.agentsdownloads.agentName"}), key: "agentName"},
                    {label: intl.formatMessage({id: "reports.agentsdownloads.agentCode"}), key: "agentCode"},
                    {label: intl.formatMessage({id: "reports.agentsdownloads.numberOfBillsAwaitingDownload"}), key: "numberOfBillsAwaitingDownload"},
                    {label: intl.formatMessage({id: "reports.agentsdownloads.dueDate"}), key: "dueDate"},
                    {label: intl.formatMessage({id: "reports.agentsdownloads.usesDailyDownloads"}), key: "usesDailyDownloads"},
                    {label: intl.formatMessage({id: "reports.agentsdownloads.authorisedStatus"}), key: "authorisedStatus"}
                ]}>
                <SecondaryButton label="generic.download" icon="download"/>
            </CSVLink>
        </React.Fragment>
    )
};

export default injectIntl(AgentsDownloadsReportTable);
