import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import Loading from "../../Loading";

const settingsPath = (billerId, suffix = "") => {
    const prefix = window.location.pathname.startsWith("/portal/customer")
        ? "/portal/customer"
        : "/customer";
    return `${prefix}/biller/${billerId}/settings/accounting${suffix}`;
};

const firstArray = (data, keys) => {
    for (let i = 0; i < keys.length; i += 1) {
        if (Array.isArray(data && data[keys[i]])) return data[keys[i]];
    }
    return [];
};

const extractAccounting = (data) => {
    if (Array.isArray(data)) return data[0] || null;
    if (!data) return null;
    if (data.accounting) return data.accounting;
    if (Array.isArray(data.accountings)) return data.accountings[0] || null;
    if (data.accountingSettings) return data.accountingSettings;
    return null;
};

const relatedByIds = (records, ids) => {
    if (!Array.isArray(ids)) return [];
    return ids
        .map((id) => records.find((record) => String(record.id) === String(id)))
        .filter(Boolean);
};

const extractRelationshipIds = (record, name) => {
    const relationship = record && record.relationships && record.relationships[name];
    const data = relationship && relationship.data;
    if (!Array.isArray(data)) return null;
    return data.map((item) => item.id);
};

const normalizeApiData = (data) => {
    const accounting = extractAccounting(data);
    const included = Array.isArray(data && data.included) ? data.included : [];
    const includedPlans = included
        .filter((record) => record && record.type === "customerAccountingPlans")
        .map((record) => ({id: record.id, ...record.attributes, relationships: record.relationships}));
    const includedCredits = included
        .filter((record) => record && record.type === "accountingPlanCredits")
        .map((record) => ({id: record.id, ...record.attributes}));
    const customerAccountingPlans =
        firstArray(data, ["customerAccountingPlans", "customerAccountingPlan"]).length > 0
            ? firstArray(data, ["customerAccountingPlans", "customerAccountingPlan"])
            : Array.isArray(accounting && accounting.customerAccountingPlan)
                ? accounting.customerAccountingPlan
                : relatedByIds(includedPlans, extractRelationshipIds(accounting, "customerAccountingPlan"));
    const accountingPlanCredits = firstArray(data, ["accountingPlanCredits", "accountingPlanCredit"]);

    return {
        accounting,
        customerAccountingPlans: customerAccountingPlans.map((plan) => {
            const creditIds = extractRelationshipIds(plan, "accountingPlanCredit");
            return {
                ...plan,
                accountingPlanCredit:
                    Array.isArray(plan.accountingPlanCredit)
                        ? plan.accountingPlanCredit
                        : relatedByIds(
                            accountingPlanCredits.length > 0 ? accountingPlanCredits : includedCredits,
                            creditIds
                        ),
            };
        }),
    };
};

const isPrepayOnly = (plan) => plan && plan.type === "pre-pay";

const availableCreditDisplay = (plan) => {
    if (plan.type === "post-pay") return "Unlimited";

    const credits = Array.isArray(plan.accountingPlanCredit) ? plan.accountingPlanCredit : [];
    if (credits.some((credit) => credit.type === "unlimited")) return "Unlimited";

    return credits.reduce((sum, credit) => sum + (Number(credit.availableCredit) || 0), 0);
};

const adjustedBalance = (value) => {
    const numeric = Number(value) || 0;
    return numeric <= 0 ? 0 : numeric;
};

const urgencyClass = (value) => {
    const numCredits = adjustedBalance(value);
    if (numCredits < 5) return "panel-danger";
    if (numCredits < 10) return "panel-warning";
    return "panel-info";
};

const AccountingSettings = ({billerId, intl}) => {
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!billerId) return undefined;

        let cancelled = false;
        setIsLoading(true);

        axios
            .get("/data/accountings", {
                params: {billerId},
                localErrorHandling: true,
            })
            .then(({data}) => {
                if (cancelled) return;
                setModel(normalizeApiData(data));
                setIsLoading(false);
            })
            .catch((error) => {
                if (cancelled) return;
                console.error("Error fetching accounting settings:", error);
                setModel({accounting: null, customerAccountingPlans: []});
                setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [billerId]);

    const accounting = model && model.accounting;
    const customerAccountingPlans = useMemo(
        () => (model && model.customerAccountingPlans) || [],
        [model]
    );

    if (isLoading) {
        return <Loading/>;
    }

    if (!accounting) {
        return null;
    }

    const hasPrepayOnlyPlans = customerAccountingPlans.some(isPrepayOnly);
    const hasPurchaseableAccountingPlans = !!accounting.hasPurchaseableAccountingPlans;
    const purchasePath = settingsPath(billerId, "/catalog");
    const isBiller = !!accounting.isBiller;
    const currentPayStubBalanceAdjusted = adjustedBalance(accounting.currentPayStubCreditBalance);
    const currentNonPayStubBalanceAdjusted = adjustedBalance(accounting.currentNonPayStubCreditBalance);

    return (
        <React.Fragment>
            <div className="row">
                {accounting.billersUsingCredit && hasPrepayOnlyPlans && (
                    <div className="col-md-12">
                        <p>
                            {" "}
                            {intl.formatMessage({id: "settings.accountingPlan.billerCredits"})}{" "}
                            {accounting.billersUsingCredit}
                        </p>
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-md-12">
                    {hasPurchaseableAccountingPlans && (
                        <div className="btn-toolbar pull-right btn-toolbar-bottom-margin">
                            <Link to={purchasePath} className="btn btn-primary">
                                <span className="glyphicon glyphicon-list glyphicon-right-margin"/>{" "}
                                {intl.formatMessage({id: "settings.accountingPlan.purchaseButton"})}{" "}
                            </Link>
                        </div>
                    )}
                    {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                    <form className="form-horizontal" role="form">
                        <div className="row">
                            <div className={hasPrepayOnlyPlans ? "col-md-8" : "col-md-12"}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>{intl.formatMessage({id: "settings.accountingPlan.name"})}</th>
                                            <th>{intl.formatMessage({id: "settings.accountingPlan.creditRemaining"})}</th>
                                            <th>{intl.formatMessage({id: "settings.accountingPlan.expiresOn"})}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerAccountingPlans.length > 0 ? (
                                            customerAccountingPlans.map((accountingPlan) => (
                                                <tr key={accountingPlan.id}>
                                                    <td>
                                                        {accountingPlan.name}
                                                        <small><em> {accountingPlan.description}</em></small>
                                                    </td>
                                                    <td>{availableCreditDisplay(accountingPlan)}</td>
                                                    <td>
                                                        {accountingPlan.endDate
                                                            ? intl.formatDate(accountingPlan.endDate)
                                                            : ""}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">
                                                    {intl.formatMessage({id: "settings.accountingPlan.noAccountingPlanFound"})}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            {hasPrepayOnlyPlans && (
                                <div className="col-md-4">
                                    {isBiller ? (
                                        <div
                                            className={`panel ${urgencyClass(currentNonPayStubBalanceAdjusted)}`}
                                            data-cy="nonPaystubDisplay"
                                        >
                                            <div className="panel-heading">
                                                <h4 className="panel-title">
                                                    {intl.formatMessage({id: "settings.accountingPlan.totalRemainingHeader"})}
                                                </h4>
                                            </div>
                                            <div className="panel-body">
                                                <div className="center-aligned">
                                                    <span className="really-big" data-cy="nonPaystubVal">
                                                        {currentNonPayStubBalanceAdjusted}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <React.Fragment>
                                            <div
                                                className={`panel ${urgencyClass(currentPayStubBalanceAdjusted)}`}
                                                data-cy="paystubDisplay"
                                            >
                                                <div className="panel-heading">
                                                    <h4 className="panel-title">
                                                        {intl.formatMessage({id: "settings.accountingPlan.totalPayStubRemainingHeader"})}
                                                    </h4>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="center-aligned">
                                                        <span className="really-big" data-cy="paystubVal">
                                                            {currentPayStubBalanceAdjusted}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {accounting.nonPayrollExists && (
                                                <div
                                                    className={`panel ${urgencyClass(currentNonPayStubBalanceAdjusted)}`}
                                                    data-cy="nonPaystubDisplay"
                                                >
                                                    <div className="panel-heading">
                                                        <h4 className="panel-title">
                                                            {intl.formatMessage({id: "settings.accountingPlan.totalNonPayStubRemainingHeader"})}
                                                        </h4>
                                                    </div>
                                                    <div className="panel-body">
                                                        <div className="center-aligned">
                                                            <span className="really-big" data-cy="nonPaystubVal">
                                                                {currentNonPayStubBalanceAdjusted}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </React.Fragment>
                                    )}
                                </div>
                            )}
                            {accounting.chargingModel && (
                                <div className="col-md-12">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4 className="panel-title">Channel Credit Charges</h4>
                                        </div>
                                        {accounting.chargingModel.map((cModel, index) => (
                                            <table className="table table-striped" key={`${cModel.channelPartnerSystemId}-${index}`}>
                                                <thead>
                                                    <tr>
                                                        <th>{cModel.channelPartnerSystemId} {cModel.typeDescription}</th>
                                                        <th/>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="col-md-10 col-md-offset-1">Base Credit Charge</td>
                                                        <td>{cModel.baseCredits} credits</td>
                                                    </tr>
                                                    {cModel.hasChannelPremium && (
                                                        <tr>
                                                            <td className="col-md-10">
                                                                Premium Size Charge
                                                                <small><em> credit charge for each document sent</em></small>
                                                            </td>
                                                            <td>{cModel.premiumCredits} credits</td>
                                                        </tr>
                                                    )}
                                                    {cModel.hasSizePremium && (
                                                        <tr>
                                                            <td className="col-md-10">
                                                                Premium Size Charge
                                                                <small><em> credit charge for each 50KB over 200KB</em></small>
                                                            </td>
                                                            <td>{cModel.premiumSizeCredits} credits</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    );
};

export default injectIntl(AccountingSettings);
