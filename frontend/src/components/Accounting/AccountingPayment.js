import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import Loading from "../Loading";
import {useAppState} from "../../state";

const PAYDOCK_IFRAME_QUERY =
    "background_color=%23ffffff" +
    "&fields_validation=true" +
    "&title=Pay%20for%20accounting%20plan" +
    "&button_color=%23357ebd" +
    "&supported_card_types=mastercard,visa";

const buildIFrameSrc = ({widgetUrl, publicKey, configurationToken}) =>
    `${widgetUrl}?public_key=${publicKey}&configuration_token=${configurationToken}&${PAYDOCK_IFRAME_QUERY}`;

const formatNumber = (value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric.toFixed(2) : "0.00";
};

const sumTaxes = (taxes) =>
    (taxes || []).reduce((acc, tax) => acc + (Number(tax && tax.amount) || 0), 0);

const AccountingPayment = ({billerId, intl}) => {
    const history = useHistory();
    const location = useLocation();
    const [{biller}] = useAppState();
    const checkoutData = location && location.state ? location.state : null;

    const [isLoading, setIsLoading] = useState(true);
    const [gatewayDetails, setGatewayDetails] = useState(null);
    const [error, setError] = useState(null);
    const iframeRef = useRef(null);

    const total = checkoutData ? Number(checkoutData.total) || 0 : 0;
    const subTotal = checkoutData ? Number(checkoutData.subTotal) || 0 : 0;
    const taxes = checkoutData && Array.isArray(checkoutData.taxes) ? checkoutData.taxes : [];
    const currencyCode = checkoutData ? checkoutData.currencyCode || "" : "";
    const currencySymbol = checkoutData ? checkoutData.currencySymbol || "" : "";
    const selectedAccountingPlans =
        checkoutData && Array.isArray(checkoutData.selectedAccountingPlans)
            ? checkoutData.selectedAccountingPlans
            : [];
    const taxAmount = +sumTaxes(taxes).toFixed(2);

    const totalDisplay = formatNumber(total);
    const subTotalDisplay = formatNumber(subTotal);

    useEffect(() => {
        if (!checkoutData || !billerId) return;
        let cancelled = false;
        setIsLoading(true);
        axios
            .get("/data/settings/payment-gateway-details", {params: {billerId}})
            .then(({data}) => {
                if (cancelled) return;
                setGatewayDetails(data);
                setIsLoading(false);
            })
            .catch((err) => {
                if (cancelled) return;
                console.error("Error fetching payment gateway details:", err);
                setError(
                    err && err.response && err.response.data && err.response.data.message
                        ? err.response.data.message
                        : "Failed to load payment gateway details"
                );
                setIsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [billerId, checkoutData]);

    const processPayment = useCallback(
        (paymentToken) => {
            const customerId = biller ? biller.customerId : undefined;
            const appliedTaxes = taxes.map((tax) => ({
                id: parseInt(tax.id, 10),
                amount: tax.amount,
            }));
            const accountingPlans = selectedAccountingPlans.map((plan) => ({
                id: parseInt(plan.id, 10),
                quantity: "" + plan.quantity,
                total: "" + plan.total,
            }));

            axios
                .post("/data/settings/process-payment-transaction", {
                    billerId: parseInt(billerId, 10),
                    customerId,
                    paymentToken,
                    total,
                    subTotal,
                    taxAmount,
                    taxes: appliedTaxes,
                    accountingPlans,
                })
                .then(({data}) => {
                    if (data && data.success) {
                        setError(null);
                        // eslint-disable-next-line no-alert
                        alert("Payment processed successfully.");
                        history.push(`/portal/customer/biller/${billerId}/settings/accounting`);
                    } else {
                        const message =
                            (data && data.message) ||
                            "An error occurred while processing the payment. Please try again later.";
                        setError(message);
                        if (iframeRef.current) {
                            iframeRef.current.src = iframeRef.current.src;
                        }
                    }
                })
                .catch((err) => {
                    const message =
                        (err && err.response && err.response.data && err.response.data.message) ||
                        "An error occurred while processing the payment. Please try again later.";
                    setError(message);
                    if (iframeRef.current) {
                        iframeRef.current.src = iframeRef.current.src;
                    }
                });
        },
        [biller, billerId, history, selectedAccountingPlans, subTotal, taxAmount, taxes, total]
    );

    useEffect(() => {
        if (!gatewayDetails) return undefined;
        const handleMessage = (messageEvent) => {
            try {
                const eventData =
                    typeof messageEvent.data === "string"
                        ? JSON.parse(messageEvent.data)
                        : messageEvent.data;
                if (eventData && eventData.event === "finish") {
                    processPayment(eventData.payment_source);
                }
            } catch (parseError) {
                // Ignore non-JSON messages from other window sources
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [gatewayDetails, processPayment]);

    if (!checkoutData) {
        return (
            <Redirect
                to={`/portal/customer/biller/${billerId}/settings/accounting/catalog`}
            />
        );
    }

    if (isLoading) {
        return <Loading/>;
    }

    const iFrameSrc = gatewayDetails ? buildIFrameSrc(gatewayDetails) : "";
    const backButtonLabel = intl.formatMessage({id: "settings.accountingPlan.backButton"});
    const totalPayableLabel = intl.formatMessage({id: "settings.accountingPlan.totalPayable"});
    const subTotalLabel = intl.formatMessage({id: "settings.accountingPlan.subTotal"});

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="btn-toolbar btn-toolbar-bottom-margin">
                    <Link
                        to={`/portal/customer/biller/${billerId}/settings/accounting/catalog/checkout`}
                        className="btn btn-default"
                    >
                        <span className="glyphicon glyphicon-arrow-left"/> {backButtonLabel}
                    </Link>
                </div>
                <p className="well">
                    <strong>
                        {totalPayableLabel} {currencySymbol}{totalDisplay} {currencyCode}
                    </strong>
                    <small>
                        {" "}{subTotalLabel} {currencySymbol}{subTotalDisplay}
                        {taxes.map((tax, index) => (
                            <span key={tax.id != null ? tax.id : `tax-${index}`}>
                                {", "}{tax.name} {currencySymbol}
                                {tax.amountDisplay != null ? tax.amountDisplay : formatNumber(tax.amount)}
                            </span>
                        ))}
                    </small>
                </p>

                {error && (
                    <p className="text-center">
                        <span className="text-danger">{error}</span>
                    </p>
                )}

                <div className="form-group">
                    <iframe
                        ref={iframeRef}
                        title="PayDock Payment"
                        width="100%"
                        style={{height: "100vh"}}
                        frameBorder="0"
                        id="paydoc"
                        src={iFrameSrc}
                    />
                </div>
            </div>
        </div>
    );
};

export default injectIntl(AccountingPayment);
