import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import Loading from "../Loading";
import {useAppState} from "../../state";
import {SET_ALERT} from "../../state/reducers/alertReducer";

const PAYDOCK_IFRAME_QUERY =
    "background_color=%23ffffff" +
    "&background_color=%23ffffff" +
    "&fields_validation=true" +
    "&title=Pay%20for%20accounting%20plan" +
    "&background_color=%23ffffff" +
    "&button_color=%23357ebd" +
    "&fields_validation=true" +
    "&supported_card_types=mastercard,visa";

export const buildIFrameSrc = ({widgetUrl, publicKey, configurationToken}) =>
    `${widgetUrl}?public_key=${publicKey}&configuration_token=${configurationToken}&${PAYDOCK_IFRAME_QUERY}`;

export const formatNumber = (value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric.toFixed(2) : "0.00";
};

export const sumTaxes = (taxes) =>
    (taxes || []).reduce((acc, tax) => acc + (Number(tax && tax.amount) || 0), 0);

const settingsPath = (billerId, suffix = "") => {
    const prefix = window.location.pathname.startsWith("/portal/customer")
        ? "/portal/customer"
        : "/customer";
    return `${prefix}/biller/${billerId}/settings/accounting${suffix}`;
};

// Mirrors qs.stringify(obj, {arrayFormat: "brackets"}). Added inline because
// the `qs` package is not installed (and `URLSearchParams` does not handle the
// nested array-of-objects shape we POST). If `qs` is added to package.json,
// replace this helper with `qs.stringify(body, {arrayFormat: "brackets"})`.
export const formEncode = (obj, prefix) => {
    const pairs = [];
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (value === null || value === undefined) return;
        const fullKey = prefix ? `${prefix}[${key}]` : key;
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (item !== null && typeof item === "object") {
                    const nested = formEncode(item, `${fullKey}[]`);
                    if (nested) pairs.push(nested);
                } else {
                    pairs.push(`${encodeURIComponent(`${fullKey}[]`)}=${encodeURIComponent(item)}`);
                }
            });
        } else if (typeof value === "object") {
            const nested = formEncode(value, fullKey);
            if (nested) pairs.push(nested);
        } else {
            pairs.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
        }
    });
    return pairs.join("&");
};

const AccountingPayment = ({billerId, intl}) => {
    const history = useHistory();
    const location = useLocation();
    const [{biller}, dispatch] = useAppState();
    const checkoutData = location.state || null;

    const [isLoading, setIsLoading] = useState(true);
    const [gatewayDetails, setGatewayDetails] = useState(null);
    const [error, setError] = useState(null);
    const [iframeReloadKey, setIframeReloadKey] = useState(0);
    const iframeRef = useRef(null);
    const isProcessingRef = useRef(false);
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

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
                        : intl.formatMessage({id: "settings.accountingPlan.gatewayError"})
                );
                setIsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [billerId, checkoutData, intl]);

    const processPayment = useCallback(
        (paymentToken) => {
            if (isProcessingRef.current) return;
            isProcessingRef.current = true;

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

            const body = formEncode({
                billerId: parseInt(billerId, 10),
                customerId,
                paymentToken,
                total,
                subTotal,
                taxAmount,
                taxes: appliedTaxes,
                accountingPlans,
            });

            axios
                .post("/data/settings/process-payment-transaction", body, {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                })
                .then(({data}) => {
                    if (!isMountedRef.current) return;
                    if (data && data.success) {
                        setError(null);
                        isProcessingRef.current = false;
                        dispatch({
                            type: SET_ALERT,
                            alert: {level: "success", text: "settings.accountingPlan.paymentSuccess"},
                        });
                        history.push(settingsPath(billerId));
                    } else {
                        const message =
                            (data && data.message) ||
                            intl.formatMessage({id: "settings.accountingPlan.paymentError"});
                        setError(message);
                        setIframeReloadKey((key) => key + 1);
                        isProcessingRef.current = false;
                    }
                })
                .catch((err) => {
                    if (!isMountedRef.current) return;
                    const message =
                        (err && err.response && err.response.data && err.response.data.message) ||
                        intl.formatMessage({id: "settings.accountingPlan.paymentError"});
                    setError(message);
                    setIframeReloadKey((key) => key + 1);
                    isProcessingRef.current = false;
                });
        },
        [biller, billerId, dispatch, history, intl, selectedAccountingPlans, subTotal, taxAmount, taxes, total]
    );

    useEffect(() => {
        if (!gatewayDetails) return undefined;
        const handleMessage = (messageEvent) => {
            if (gatewayDetails && gatewayDetails.widgetUrl) {
                try {
                    const expectedOrigin = new URL(gatewayDetails.widgetUrl).origin;
                    if (messageEvent.origin !== expectedOrigin) return;
                } catch (e) {
                    // skip origin check if URL parse fails
                }
            }
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
                to={settingsPath(billerId, "/catalog")}
            />
        );
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (!biller || !biller.customerId) {
        return (
            <div className="alert alert-danger">
                {intl.formatMessage({id: "settings.accountingPlan.billerUnavailable"})}
            </div>
        );
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
                        to={{
                            pathname: settingsPath(billerId, "/catalog/checkout"),
                            state: checkoutData,
                        }}
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
                    <p className="text-center" role="alert">
                        <span className="text-danger">{error}</span>
                    </p>
                )}

                <div className="form-group">
                    <iframe
                        ref={iframeRef}
                        key={iframeReloadKey}
                        title="PayDock Payment"
                        width="100%"
                        style={{height: "100vh", border: 0}}
                        src={iFrameSrc}
                    />
                </div>
            </div>
        </div>
    );
};

export default injectIntl(AccountingPayment);
