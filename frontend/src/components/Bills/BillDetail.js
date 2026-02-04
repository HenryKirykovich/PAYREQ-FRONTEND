import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {injectIntl} from "react-intl";
import {RegularText} from "../common";
import Loading from "../Loading";
import {getDateAsUTCFormatted} from "../../utils/date-utils";

const BillDetail = ({match, history, intl, billerId}) => {
    const {billId} = match.params;
    const [bill, setBill] = useState(null);
    const [billPayers, setBillPayers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billId) {
            axios.get(`/data/bills/${billId}`)
                .then(({data}) => {
                    setBill(data.bill);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching bill:", error);
                    setIsLoading(false);
                });

            // Fetch bill payers
            axios.get(`/data/bills/${billId}/payers`)
                .then(({data}) => {
                    setBillPayers(data.billPayers || []);
                })
                .catch(error => {
                    console.error("Error fetching bill payers:", error);
                });
        }
    }, [billId]);

    const handleBack = () => {
        history.push(`/portal/customer/biller/${billerId}/bills`);
    };

    const handleRefresh = () => {
        setIsLoading(true);
        axios.get(`/data/bills/${billId}`)
            .then(({data}) => {
                setBill(data.bill);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error refreshing bill:", error);
                setIsLoading(false);
            });
    };

    const formatCurrency = (amount, currencyCode) => {
        if (!amount) return null;
        return intl.formatNumber(amount, {
            style: "currency",
            currency: currencyCode || "USD"
        });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!bill) {
        return <RegularText>Bill not found</RegularText>;
    }

    return (
        <React.Fragment>
            <h1 id="pageHeading" className="page-heading">
                Outgoing Bill "{bill.billerInvoiceNumber}"
                {bill.payerName && <small> sent to {bill.payerName}</small>}
            </h1>

            <div className="row actions-row btn-toolbar" role="toolbar">
                <div className="actions btn-group col-sm-4">
                    <button type="button" className="btn btn-default" onClick={handleBack}>
                        <span className="glyphicon glyphicon-arrow-left"></span> Back to Bills
                    </button>
                    <button type="button" className="btn btn-default" onClick={handleRefresh}>
                        <span className="glyphicon glyphicon-refresh"></span> Refresh
                    </button>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">Bill Details</h4>
                        </div>
                        <div className="panel-body">
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Invoice Number</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static"><strong>{bill.billerInvoiceNumber}</strong></p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Account Number</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">{bill.billerAccountNumber}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Payer Name</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">{bill.payerName || <em>Not known</em>}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Amount Due</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static"><strong>{formatCurrency(bill.amountDue, bill.currency)}</strong></p>
                                    </div>
                                </div>

                                {bill.minAmountDue && (
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Minimum Amount Due</label>
                                        <div className="col-sm-10">
                                            <p className="form-control-static">{formatCurrency(bill.minAmountDue, bill.currency)}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Due Date</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">{getDateAsUTCFormatted(bill.dueDate)}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Received Time</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">{getDateAsUTCFormatted(bill.receivedTime)}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Status</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">
                                            <span className="label label-info">{bill.statusText || bill.status}</span>
                                        </p>
                                    </div>
                                </div>

                                {bill.jobId && (
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Job ID</label>
                                        <div className="col-sm-10">
                                            <p className="form-control-static">{bill.jobId}</p>
                                        </div>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Delivery Method</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">{bill.sendToPrinter ? "Print" : "Digital"}</p>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 control-label">Document Pages</label>
                                    <div className="col-sm-10">
                                        <p className="form-control-static">{bill.documentPages}</p>
                                    </div>
                                </div>

                                {bill.documentId && (
                                    <div className="form-group">
                                        <label className="col-sm-2 control-label">Document</label>
                                        <div className="col-sm-10">
                                            <a 
                                                href={`/data/documents/${bill.documentId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-default"
                                            >
                                                <span className="glyphicon glyphicon-file"></span> Download Document
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {billPayers.length > 0 && (
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">Recipients</h4>
                            </div>
                            <div className="panel-body">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Dispatch Type</th>
                                                <th>Dispatch Time</th>
                                                <th>Actioned Time</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {billPayers.map((payer, idx) => (
                                                <tr key={idx}>
                                                    <td>{payer.dispatchType}</td>
                                                    <td>{payer.dispatchTime ? getDateAsUTCFormatted(payer.dispatchTime) : "-"}</td>
                                                    <td>{payer.actionedTime ? getDateAsUTCFormatted(payer.actionedTime) : "-"}</td>
                                                    <td>
                                                        {payer.nonDeliveredTime ? 
                                                            <span className="label label-danger">Failed</span> : 
                                                            payer.actionedTime ? 
                                                                <span className="label label-success">Delivered</span> : 
                                                                <span className="label label-info">Pending</span>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default withRouter(injectIntl(BillDetail));
