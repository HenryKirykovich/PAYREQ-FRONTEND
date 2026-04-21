import React, {useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Select} from "../common";
import moment from "moment-timezone";

const ReportsDashboard = ({billerId, intl}) => {
    const history = useHistory();

    // Monthly Summary
    const [reportBillerOption, setReportBillerOption] = useState("me");
    const [reportTimeOption, setReportTimeOption] = useState("current");

    // Billing Summary
    const [reportBillerOption2, setReportBillerOption2] = useState("me");
    const [reportTimeOption2, setReportTimeOption2] = useState("current");

    // Billing Detail
    const [reportBillerOption3, setReportBillerOption3] = useState("me");
    const [reportTimeOption3, setReportTimeOption3] = useState("current");

    const billerOptions = [
        {id: "me", name: intl.formatMessage({id: "reports.billers.thisMailer"})},
        {id: "all", name: intl.formatMessage({id: "reports.billers.allMailers"})}
    ];

    const timeOptions = [
        {id: "current", name: intl.formatMessage({id: "reports.period.current"})},
        {id: "previous", name: intl.formatMessage({id: "reports.period.previous"})},
        {id: "last3", name: intl.formatMessage({id: "reports.period.last3"})},
        {id: "last6", name: intl.formatMessage({id: "reports.period.last6"})},
        {id: "all", name: intl.formatMessage({id: "reports.period.all"})}
    ];

    const runReport = (reportType, billerOption, timeOption) => {
        axios.post(`/data/reports/${billerId}/prepare`, {
            reportType,
            billerOption,
            timeOption,
            tz: moment.tz.guess()
        })
            .then(({data}) => {
                const reportKey = data.reportKey;
                if (reportType === "billingReportSummary") {
                    history.push(`/portal/customer/biller/${billerId}/reports/billingsummary/${reportKey}`);
                } else if (reportType === "billingReportDetail") {
                    history.push(`/portal/customer/biller/${billerId}/reports/billingdetail/${reportKey}`);
                } else {
                    history.push(`/portal/customer/biller/${billerId}/reports/report/${reportKey}`);
                }
            })
            .catch(error => {
                console.error("Error creating report:", error);
                alert(intl.formatMessage({id: "reports.error.createFailed"}));
            });
    };

    const handleMonthlySummary = (e) => {
        e.preventDefault();
        runReport("monthlySummary", reportBillerOption, reportTimeOption);
    };

    const handleBillingSummary = (e) => {
        e.preventDefault();
        runReport("billingReportSummary", reportBillerOption2, reportTimeOption2);
    };

    const handleBillingDetail = (e) => {
        e.preventDefault();
        runReport("billingReportDetail", reportBillerOption3, reportTimeOption3);
    };

    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="page-heading">
                        {intl.formatMessage({id: "reports.title"})}
                    </h2>
                </div>
            </div>

            {/* Monthly Summary Report */}
            <div className="row">
                <div className="col-md-12">
                    <h4>{intl.formatMessage({id: "reports.monthlySummary"})}</h4>
                    <form className="form-inline" role="form" onSubmit={handleMonthlySummary}>
                        <label>{intl.formatMessage({id: "reports.billerLabel"})}&nbsp;</label>
                        <select 
                            className="form-control"
                            value={reportBillerOption}
                            onChange={(e) => setReportBillerOption(e.target.value)}
                        >
                            {billerOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </select>
                        {" "}
                        <label>{intl.formatMessage({id: "reports.periodLabel"})}&nbsp;</label>
                        <select 
                            className="form-control"
                            value={reportTimeOption}
                            onChange={(e) => setReportTimeOption(e.target.value)}
                        >
                            {timeOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </select>
                        {" "}
                        <Button bsStyle="primary" type="submit" style={{marginLeft: "30px"}}>
                            {intl.formatMessage({id: "reports.run"})}
                        </Button>
                    </form>

                    <hr/>

                    {/* Billing Summary Report */}
                    <h4>{intl.formatMessage({id: "reports.billingSummary"})}</h4>
                    <form className="form-inline" role="form" onSubmit={handleBillingSummary}>
                        <label>{intl.formatMessage({id: "reports.billerLabel"})}&nbsp;</label>
                        <select 
                            className="form-control"
                            value={reportBillerOption2}
                            onChange={(e) => setReportBillerOption2(e.target.value)}
                        >
                            {billerOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </select>
                        {" "}
                        <label>{intl.formatMessage({id: "reports.periodLabel"})}&nbsp;</label>
                        <select 
                            className="form-control"
                            value={reportTimeOption2}
                            onChange={(e) => setReportTimeOption2(e.target.value)}
                        >
                            {timeOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </select>
                        {" "}
                        <Button bsStyle="primary" type="submit" style={{marginLeft: "30px"}}>
                            {intl.formatMessage({id: "reports.run"})}
                        </Button>
                    </form>

                    <hr/>

                    {/* Billing Detail Report */}
                    <h4>{intl.formatMessage({id: "reports.billingDetail"})}</h4>
                    <form className="form-inline" role="form" onSubmit={handleBillingDetail}>
                        <label>{intl.formatMessage({id: "reports.billerLabel"})}&nbsp;</label>
                        <select 
                            className="form-control"
                            value={reportBillerOption3}
                            onChange={(e) => setReportBillerOption3(e.target.value)}
                        >
                            {billerOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </select>
                        {" "}
                        <label>{intl.formatMessage({id: "reports.periodLabel"})}</label>
                        <select 
                            className="form-control"
                            value={reportTimeOption3}
                            onChange={(e) => setReportTimeOption3(e.target.value)}
                        >
                            {timeOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                            ))}
                        </select>
                        {" "}
                        <Button bsStyle="primary" type="submit" style={{marginLeft: "30px"}}>
                            {intl.formatMessage({id: "reports.run"})}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(ReportsDashboard);
