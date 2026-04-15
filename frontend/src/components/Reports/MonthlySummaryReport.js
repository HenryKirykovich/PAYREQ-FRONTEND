import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../Loading";
import {getDateWithMonthYear} from "../../utils/date-utils";

const MonthlySummaryReport = ({billerId, reportId, intl}) => {
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billerId && reportId) {
            axios.get(`/data/reports/${billerId}/get/${reportId}`)
                .then(({data}) => {
                    setReportData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching report:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId, reportId]);

    const handleDownload = () => {
        window.open(`/download/reports/download/${reportId}/monthlySummary`);
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!reportData || !reportData.data) {
        return (
            <div className="alert alert-warning">
                {intl.formatMessage({id: "reports.noData"})}
            </div>
        );
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h4>{intl.formatMessage({id: "reports.reportTitle"})}</h4>
                </div>
            </div>
            <div className="row actions-row">
                <div className="col-md-12">
                    <Button onClick={handleDownload}>
                        <span className="glyphicon glyphicon-circle-arrow-down"></span>
                        &nbsp;&nbsp;{intl.formatMessage({id: "reports.export"})}
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table data-table table-striped">
                        <thead>
                            <tr>
                                <th rowSpan="2">{intl.formatMessage({id: "reports.month"})}</th>
                                <th rowSpan="2">{intl.formatMessage({id: "reports.name"})}</th>
                                <th rowSpan="2">{intl.formatMessage({id: "reports.billerid"})}</th>
                                <th rowSpan="2">{intl.formatMessage({id: "reports.contacts"})}</th>
                                <th colSpan="5">{intl.formatMessage({id: "reports.registrations"})}</th>
                                <th rowSpan="2">{intl.formatMessage({id: "reports.bills"})}</th>
                            </tr>
                            <tr>
                                <th>{intl.formatMessage({id: "reports.newRegistrations"})}</th>
                                <th>{intl.formatMessage({id: "reports.totalRegistrations"})}</th>
                                <th>{intl.formatMessage({id: "reports.newDeregistrations"})}</th>
                                <th>{intl.formatMessage({id: "reports.totalDeregistrations"})}</th>
                                <th>Net</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.data.map((item, idx) => (
                                <tr key={idx}>
                                    <td nowrap="nowrap">{getDateWithMonthYear(item.month)}</td>
                                    <td>{item.name}</td>
                                    <td>{item.billerid}</td>
                                    <td>{item.contacts}</td>
                                    <td>{item.registrations}</td>
                                    <td>{item.totalRegistrations}</td>
                                    <td>{item.deregistrations}</td>
                                    <td>{item.totalDeregistrations}</td>
                                    <td><strong>{item.netRegistrations}</strong></td>
                                    <td>{item.bills}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(MonthlySummaryReport);
