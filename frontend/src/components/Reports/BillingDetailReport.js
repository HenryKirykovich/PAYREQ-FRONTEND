import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../Loading";
import {getDateWithMonthYear} from "../../utils/date-utils";

const BillingDetailReport = ({billerId, reportId, intl}) => {
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
        window.open(`/download/reports/download/${reportId}/billingReportDetail`);
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
                    <h4>{intl.formatMessage({id: "reports.billingDetail"})}</h4>
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
                    <table className="table data-table table-striped report-table">
                        <thead>
                            <tr>
                                <th colSpan="2">{intl.formatMessage({id: "reports.month"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.billerName"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.billId"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.invoiceNo"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.jobId"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.billFeedType"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.channel"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.totalSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.emailsSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.xeroSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.bpaySent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.epostSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.myobSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.mybillsAgentSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.reckonSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.payreqSent"})}</th>
                                <th colSpan="2">{intl.formatMessage({id: "reports.einvoicingSent"})}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.data.map((item, idx) => (
                                <tr key={idx}>
                                    <td colSpan="2">{getDateWithMonthYear(item.actionedTime)}</td>
                                    <td colSpan="2">{item.tagName}</td>
                                    <td colSpan="2">{item.billId}</td>
                                    <td colSpan="2">{item.billerInvoiceNumber}</td>
                                    <td colSpan="2">{item.jobId}</td>
                                    <td colSpan="2">{item.billFeedType}</td>
                                    <td colSpan="2">{item.dispatchType}</td>
                                    <td colSpan="2">{item.quantity}</td>
                                    <td colSpan="2">{item.emailQtyRaw}</td>
                                    <td colSpan="2">{item.xeroQtyRaw}</td>
                                    <td colSpan="2">{item.bpvQtyRaw}</td>
                                    <td colSpan="2">{item.epostQtyRaw}</td>
                                    <td colSpan="2">{item.myobQtyRaw}</td>
                                    <td colSpan="2">{item.mybillsagentQtyRaw}</td>
                                    <td colSpan="2">{item.reckonQtyRaw}</td>
                                    <td colSpan="2">{item.mybillsQtyRaw}</td>
                                    <td colSpan="2">{item.einvoicingQtyRaw}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(BillingDetailReport);
