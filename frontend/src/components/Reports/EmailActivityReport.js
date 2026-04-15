import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Alert} from "../common";
import Loading from "../Loading";

const EmailActivityReport = ({billerId, intl}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [chartDataOne, setChartDataOne] = useState(null);
    const [chartDataTwo, setChartDataTwo] = useState(null);
    const [showSearch, setShowSearch] = useState(true);
    const [showGraph, setShowGraph] = useState(true);
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    useEffect(() => {
        if (billerId) {
            fetchReport();
        }
    }, [billerId, dateFrom, dateTo]);

    const fetchReport = () => {
        setIsLoading(true);
        axios.get(`/data/reports/bi/email-activity`, {
            params: {
                billerId,
                dateFrom,
                dateTo
            }
        })
            .then(({data}) => {
                setChartDataOne(data.chartDataOne || null);
                setChartDataTwo(data.chartDataTwo || null);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching email activity report:", error);
                setIsLoading(false);
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div>
            <h1 className="page-heading">{intl.formatMessage({id: "reports.bi.emailActivity"})}</h1>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        Search
                        <span style={{float: "right"}}>
                            <a
                                data-toggle="collapse"
                                href="#collapse1"
                                style={{color: "#fbb704"}}
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
                </div>
            </div>

            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title">
                        Graph
                        <span style={{float: "right"}}>
                            <a
                                data-toggle="collapse"
                                href="#collapse2"
                                style={{color: "#fbb704"}}
                                onClick={() => setShowGraph(!showGraph)}
                            >
                                {showGraph ? "Hide" : "Show"}
                            </a>
                        </span>
                    </h4>
                </div>
                <div id="collapse2" className={`panel-body collapse ${showGraph ? 'in' : ''}`}>
                    <div className="row">
                        <div className="col-md-6">
                            <Alert variant="info">Email Activity Chart 1 (requires chart library)</Alert>
                        </div>
                        <div className="col-md-6">
                            <Alert variant="info">Email Activity Pie Chart (requires chart library)</Alert>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(EmailActivityReport);
