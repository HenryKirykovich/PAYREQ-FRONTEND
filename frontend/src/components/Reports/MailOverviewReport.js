import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {FormControl} from "react-bootstrap";
import {Button, Alert} from "../common";
import Loading from "../Loading";

const MailOverviewReport = ({billerId, intl}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState(null);
    const [groupingField1, setGroupingField1] = useState("month");
    const [groupingField2, setGroupingField2] = useState(null);
    const [showSearch, setShowSearch] = useState(true);
    const [showGraph, setShowGraph] = useState(true);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const drilldownOptions = [
        {id: "month", name: "Month"},
        {id: "year", name: "Year"},
        {id: "biller", name: "Biller"},
        {id: "status", name: "Status"}
    ];

    useEffect(() => {
        if (billerId) {
            fetchReport();
        }
    }, [billerId, groupingField1, groupingField2, dateFrom, dateTo]);

    const fetchReport = () => {
        setIsLoading(true);
        axios.get(`/data/reports/bi/mail-overview`, {
            params: {
                billerId,
                groupingField1,
                groupingField2,
                dateFrom,
                dateTo
            }
        })
            .then(({data}) => {
                setTableData(data.tableData || []);
                setChartData(data.chartData || null);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching mail overview report:", error);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    const columns = [
        {key: "grouping1", label: groupingField1 || "Group 1"},
        {key: "grouping2", label: groupingField2 || "Group 2"},
        {key: "sent", label: "Sent"},
        {key: "delivered", label: "Delivered"},
        {key: "opened", label: "Opened"},
        {key: "bounced", label: "Bounced"},
        {key: "failed", label: "Failed"}
    ];

    return (
        <div>
            <h1 className="page-heading">{intl.formatMessage({id: "reports.bi.mailOverview"})}</h1>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        Search & Grouping
                        <span style={{float: "right"}}>
                            <a
                                data-toggle="collapse"
                                href="#collapse1"
                                style={{color: "#595959"}}
                                onClick={() => setShowSearch(!showSearch)}
                            >
                                {showSearch ? "Hide" : "Show"}
                            </a>
                        </span>
                    </h4>
                </div>
                <div id="collapse1" className={`panel-body collapse ${showSearch ? 'in' : ''}`}>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Date From</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label>Date To</label>
                            <input
                                type="date"
                                className="form-control"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-6">
                            <label>Group by Column 1</label>
                            <FormControl
                                componentClass="select"
                                value={groupingField1}
                                onChange={(e) => setGroupingField1(e.target.value)}
                                disabled={!!groupingField2}
                            >
                                {drilldownOptions.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </FormControl>
                        </div>
                        <div className="col-md-6">
                            <label>Group by Column 2</label>
                            <FormControl
                                componentClass="select"
                                value={groupingField2 || ""}
                                onChange={(e) => setGroupingField2(e.target.value || null)}
                            >
                                <option value="">None</option>
                                {drilldownOptions.filter(opt => opt.id !== groupingField1).map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                                ))}
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>

            {chartData && (
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            Graph
                            <span style={{float: "right"}}>
                                <a
                                    data-toggle="collapse"
                                    href="#collapse2"
                                    style={{color: "#595959"}}
                                    onClick={() => setShowGraph(!showGraph)}
                                >
                                    {showGraph ? "Hide" : "Show"}
                                </a>
                            </span>
                        </h4>
                    </div>
                    <div id="collapse2" className={`panel-body collapse ${showGraph ? 'in' : ''}`}>
                        <Alert variant="info">Chart visualization (requires chart library integration)</Alert>
                    </div>
                </div>
            )}

            <table className="table table-striped">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key}>{col.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length}>No data available</td>
                        </tr>
                    ) : (
                        tableData.map((row, idx) => (
                            <tr key={idx}>
                                {columns.map(col => (
                                    <td key={col.key}>{row[col.key] || '-'}</td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default injectIntl(MailOverviewReport);
