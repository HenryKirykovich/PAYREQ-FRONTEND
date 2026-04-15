import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {useHistory} from "react-router-dom";
import Loading from "../../Loading";
import {getDateTimeAsUTCFormatted} from "../../../utils/date-utils";
import {getCurrencySymbol} from "../../../utils/currency-utils";

const PaymentsSettings = ({billerId, biller, intl}) => {
    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    const currencyCode = biller?.accountCurrencyCode || "AUD";
    const currencySymbol = getCurrencySymbol(currencyCode);
    const displayPaymentGateway = !biller?.masterBiller;

    useEffect(() => {
        if (billerId) {
            axios.get("/data/payments", {params: {billerId}})
                .then(({data}) => {
                    setPayments(data.payments || []);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching payments:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId]);

    const handleGoToPaymentGatewaySetup = () => {
        history.push(`/portal/customer/biller/${billerId}/settings/payments/view`);
    };

    if (isLoading) {
        return <Loading/>;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <form className="form-horizontal" role="form">
                    {displayPaymentGateway && (
                        <div className="row">
                            <div className="col-md-12">
                                <div className="payment-gateway-config-landing">
                                    <h2>{intl.formatMessage({id: "settings.payments.gatewaySetupHeading"})}</h2>
                                    <p>
                                        {intl.formatMessage({id: "settings.payments.gatewaySetupAction1"})}
                                        {" "}
                                        <a onClick={handleGoToPaymentGatewaySetup} style={{cursor: "pointer"}}>
                                            {intl.formatMessage({id: "settings.payments.gatewaySetupAction2"})}
                                        </a>
                                        {" "}
                                        {intl.formatMessage({id: "settings.payments.gatewaySetupAction3"})}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="row">
                        <div className="col-md-12">
                            <h2>{intl.formatMessage({id: "settings.payments.transactionHistoryTitle"})}</h2>
                            <p>{intl.formatMessage({id: "settings.payments.transactionHistorySubTitle"})}</p>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>{intl.formatMessage({id: "settings.payments.paymentDate"})}</th>
                                        <th>{intl.formatMessage({id: "settings.payments.subTotal"})} ({currencyCode})</th>
                                        <th>{intl.formatMessage({id: "settings.payments.tax"})} ({currencyCode})</th>
                                        <th>{intl.formatMessage({id: "settings.payments.total"})} ({currencyCode})</th>
                                        <th className="text-center">
                                            {intl.formatMessage({id: "settings.payments.invoice"})}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payments.length === 0 ? (
                                        <tr>
                                            <td colSpan="5">
                                                {intl.formatMessage({id: "settings.payments.noPaymentsMade"})}
                                            </td>
                                        </tr>
                                    ) : (
                                        payments.map((payment, idx) => (
                                            <tr key={idx}>
                                                <td>{getDateTimeAsUTCFormatted(payment.updatedAt)}</td>
                                                <td>{currencySymbol}{payment.subTotal.toFixed(2)}</td>
                                                <td>{currencySymbol}{payment.tax.toFixed(2)}</td>
                                                <td>{currencySymbol}{payment.total.toFixed(2)}</td>
                                                <td className="text-center">
                                                    <a href={payment.documentHref} target="_blank" rel="noopener noreferrer">
                                                        <span className="glyphicon glyphicon-eye-open"></span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default injectIntl(PaymentsSettings);
