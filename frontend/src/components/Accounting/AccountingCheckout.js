import React, {useMemo, useState} from "react";
import {injectIntl} from "react-intl";
import {Link, Redirect, useLocation} from "react-router-dom";
import {useAppState} from "../../state";
import {getBillerCurrencyCode, getBillerCurrencySymbol} from "../../utils/currency-utils";

const formatNumber = (value) => {
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric.toFixed(2) : "0.00";
};

const settingsPath = (billerId, suffix = "") => {
    const prefix = window.location.pathname.startsWith("/portal/customer")
        ? "/portal/customer"
        : "/customer";
    return `${prefix}/biller/${billerId}/settings/accounting${suffix}`;
};

const planTotal = (plan) => {
    const quantity = Number(plan.quantity) || 1;
    const price = Number(plan.price) || 0;
    return +((price * quantity).toFixed(2));
};

const withDisplays = (plan) => {
    const total = planTotal(plan);
    const price = Number(plan.price);
    return {
        ...plan,
        quantity: Number(plan.quantity) || 1,
        priceDisplay:
            plan.priceDisplay !== undefined && plan.priceDisplay !== null
                ? plan.priceDisplay
                : Number.isFinite(price)
                    ? price.toFixed(2)
                    : "0.00",
        total,
        totalDisplay: formatNumber(total),
    };
};

const taxAmount = (tax, subTotal) =>
    +(((Number(tax.percentage) || 0) / 100) * subTotal).toFixed(2);

const taxMatchesBiller = (tax, biller) => {
    const taxStateId = tax.stateId === undefined ? null : tax.stateId;
    const taxCountryId = tax.countryId === undefined ? null : tax.countryId;
    const billerStateId = biller && biller.stateId !== undefined ? biller.stateId : null;
    const billerCountryId = biller && biller.countryId !== undefined ? biller.countryId : null;

    if (billerStateId !== null && taxStateId !== null && String(taxStateId) === String(billerStateId)) {
        return true;
    }

    return (
        billerCountryId !== null &&
        taxCountryId !== null &&
        String(taxCountryId) === String(billerCountryId) &&
        (taxStateId === null || taxStateId === "")
    );
};

const AccountingCheckout = ({billerId, intl}) => {
    const location = useLocation();
    const [{biller}] = useAppState();
    const checkoutData = location.state || null;
    const [selectedAccountingPlans, setSelectedAccountingPlans] = useState(() =>
        checkoutData && Array.isArray(checkoutData.selectedAccountingPlans)
            ? checkoutData.selectedAccountingPlans.map(withDisplays)
            : []
    );

    const currencyCode = getBillerCurrencyCode(biller);
    const currencySymbol = getBillerCurrencySymbol(biller);
    const allTaxes = checkoutData && Array.isArray(checkoutData.taxes) ? checkoutData.taxes : [];

    const subTotal = useMemo(
        () =>
            +selectedAccountingPlans
                .reduce((sum, accountingPlan) => sum + planTotal(accountingPlan), 0)
                .toFixed(2),
        [selectedAccountingPlans]
    );

    const taxes = useMemo(
        () =>
            allTaxes
                .filter((tax) => taxMatchesBiller(tax, biller))
                .sort((a, b) => (Number(a.sequenceNo) || 0) - (Number(b.sequenceNo) || 0))
                .map((tax) => {
                    const amount = taxAmount(tax, subTotal);
                    return {
                        ...tax,
                        amount,
                        amountDisplay: formatNumber(amount),
                    };
                }),
        [allTaxes, biller, subTotal]
    );

    const taxTotal = +taxes.reduce((sum, tax) => sum + (Number(tax.amount) || 0), 0).toFixed(2);
    const total = +((subTotal + taxTotal).toFixed(2));
    const hasSelectedAccountingPlans = selectedAccountingPlans.length > 0;
    const catalogPath = settingsPath(billerId, "/catalog");
    const paymentPath = settingsPath(billerId, "/catalog/checkout/payment");
    const checkoutState = {
        selectedAccountingPlans: selectedAccountingPlans.map(withDisplays),
        selectedAccountingPlanIds: selectedAccountingPlans.map((plan) => plan.id),
        currencyCode,
        currencySymbol,
        taxes,
        subTotal,
        total,
    };

    const setQuantity = (accountingPlan, value) => {
        const quantity = Math.max(1, Number(value) || 1);
        setSelectedAccountingPlans((plans) =>
            plans.map((plan) =>
                String(plan.id) === String(accountingPlan.id)
                    ? withDisplays({...plan, quantity})
                    : plan
            )
        );
    };

    const removeAccountingPlanFromCheckout = (event, accountingPlan) => {
        event.preventDefault();
        setSelectedAccountingPlans((plans) =>
            plans.filter((plan) => String(plan.id) !== String(accountingPlan.id))
        );
    };

    if (!checkoutData) {
        return <Redirect to={catalogPath}/>;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="btn-toolbar btn-toolbar-bottom-margin">
                    <Link
                        to={{
                            pathname: catalogPath,
                            state: checkoutState,
                        }}
                        className="btn btn-default"
                    >
                        <span className="glyphicon glyphicon-arrow-left"/>{" "}
                        {intl.formatMessage({id: "settings.accountingPlan.backButton"})}
                    </Link>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        {intl.formatMessage({id: "settings.accountingPlan.purchaseAccountingPlans"})}
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>{intl.formatMessage({id: "settings.accountingPlan.accountingPlan"})}</th>
                                <th>
                                    {intl.formatMessage({id: "settings.accountingPlan.unitCost"})} ({currencyCode})
                                </th>
                                <th className="accounting-plan-uints-col">
                                    {intl.formatMessage({id: "settings.accountingPlan.quantity"})}
                                </th>
                                <th className="text-right">
                                    {intl.formatMessage({id: "settings.accountingPlan.total"})}
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {selectedAccountingPlans.map((accountingPlan) => {
                                const displayPlan = withDisplays(accountingPlan);
                                return (
                                    <tr key={accountingPlan.id}>
                                        <td>
                                            {accountingPlan.name} <small>({accountingPlan.description})</small>
                                        </td>
                                        <td>{currencySymbol}{displayPlan.priceDisplay}</td>
                                        <td>
                                            <input
                                                type="number"
                                                step="1"
                                                min="1"
                                                className="accounting-plan-uints-col"
                                                value={displayPlan.quantity}
                                                onChange={(event) => setQuantity(accountingPlan, event.target.value)}
                                            />
                                            {" "}
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a
                                                onClick={(event) => removeAccountingPlanFromCheckout(event, accountingPlan)}
                                                href="#"
                                            >
                                                <span className="glyphicon glyphicon-remove text-danger"/>
                                            </a>
                                        </td>
                                        <td className="text-right">{displayPlan.totalDisplay}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td className="text-right" colSpan="3">Sub total ({currencyCode})</td>
                                <td className="text-right">{formatNumber(subTotal)}</td>
                            </tr>
                            {taxes.map((tax) => (
                                <tr key={tax.id}>
                                    <td className="text-right" colSpan="3">
                                        {tax.name} ({tax.percentage}%)
                                    </td>
                                    <td className="text-right">{tax.amountDisplay}</td>
                                </tr>
                            ))}
                            <tr>
                                <td className="text-right" colSpan="3">
                                    <strong>Total ({currencyCode})</strong>
                                </td>
                                <td className="text-right">
                                    <strong>{currencySymbol}{formatNumber(total)}</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-toolbar pull-right" style={{marginBottom: "5px"}}>
                    {hasSelectedAccountingPlans ? (
                        <Link
                            to={{
                                pathname: paymentPath,
                                state: checkoutState,
                            }}
                            className="btn btn-primary"
                        >
                            <span className="glyphicon glyphicon-credit-card glyphicon-right-margin"/>
                            {intl.formatMessage({id: "settings.accountingPlan.proceedToPay"})}
                        </Link>
                    ) : (
                        <Link to={paymentPath} className="btn btn-primary disabled">
                            <span className="glyphicon glyphicon-credit-card glyphicon-right-margin"/>
                            {intl.formatMessage({id: "settings.accountingPlan.proceedToPay"})}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default injectIntl(AccountingCheckout);
