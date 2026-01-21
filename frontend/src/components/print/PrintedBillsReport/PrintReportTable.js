import React from "react";
import {injectIntl} from "react-intl";
import {Table, SecondaryButton} from "../../common";
import {CSVLink} from "react-csv";

const getCount = count => (count || 0);



const ReportTable = ({reportRows, intl}) => {
    if (reportRows.length === 0) return null;
    return (
        <React.Fragment>
            <Table
                headerLabels={["reports.print.printKey", "reports.print.reportDate", "reports.print.fileKey", "reports.print.reportName",  "reports.print.country", "reports.print.printruns", "reports.print.documents"]}
                rows={reportRows.map(({printKey, reportdate,  fileKey, reportName, country, printruns, documents}) => (
                    [
                        printKey,
                        reportdate,
                        fileKey,
                        reportName,
                        country,
                        getCount(printruns),
                        getCount(documents)
                    ]
                ))}
                footer={ ["", "", "", "", "Total",
                    reportRows.reduce((a, {printruns}) => a + printruns, 0),
                    reportRows.reduce((a, {documents}) => a + documents, 0)]}
            >
            </Table>
            <CSVLink
                filename={`printed-bills-report-${new Date().getTime()}.csv`}
                data={reportRows}
                headers={[
                    {label: intl.formatMessage({id: "reports.print.printKey"}), key: "printKey"},
                    {label: intl.formatMessage({id: "reports.print.reportDate"}), key: "reportdate"},
                    {label: intl.formatMessage({id: "reports.print.fileKey"}), key: "fileKey"},
                    {label: intl.formatMessage({id: "reports.print.reportName"}), key: "reportName"},
                    {label: intl.formatMessage({id: "reports.print.country"}), key: "country"},
                    {label: intl.formatMessage({id: "reports.print.printruns"}), key: "printruns"},
                    {label: intl.formatMessage({id: "reports.print.documents"}), key: "documents"}
                ]}>
                <SecondaryButton label="generic.download" icon="download"/>
            </CSVLink>
        </React.Fragment>
    )
};

export default injectIntl(ReportTable);