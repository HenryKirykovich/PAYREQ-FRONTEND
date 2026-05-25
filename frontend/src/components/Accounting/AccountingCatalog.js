import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link, Redirect, useLocation} from "react-router-dom";
import Loading from "../Loading";
import {useAppState} from "../../state";
import {getBillerCurrencyCode, getBillerCurrencySymbol} from "../../utils/currency-utils";
import AccountingPlanGroup from "./AccountingPlanGroup";

const GROUP_KEY_PREFIX = "settings.accountingPlan.accountingPlanGroups.";

const EMBER_CATALOG_STYLES = `
    .btn-toolbar-bottom-margin {
        margin-bottom: 5px;
    }

    #accounting-plan-group > .panel {
        margin-bottom: 0;
        box-shadow: none;
    }

    #accounting-plan-group > .panel > .collapse-sub-heading {
        display: block;
        padding: 10px 15px;
        background-color: #f5f5f5;
        border-color: #ddd;
        color: #777;
        text-decoration: none;
    }

    #accounting-plan-group > .panel > .collapse-sub-heading:hover,
    #accounting-plan-group > .panel > .collapse-sub-heading:focus {
        color: #777;
        text-decoration: none;
    }

    #accounting-plan-group > .panel > .collapse-sub-heading .panel-title {
        color: #777;
    }

    .glyphicon-right-margin {
        margin-right: 5px;
    }

    .hide-element {
        visibility: hidden;
    }
`;

const extractAccountingPlans = (data) => {
    if (Array.isArray(data)) return data;
    if (!data) return [];
    if (Array.isArray(data.accountingPlans)) return data.accountingPlans;
    if (Array.isArray(data.list)) return data.list;
    if (Array.isArray(data.results)) return data.results;
    return [];
};

const extractAccountingPlanCategories = (data) => {
    if (!data) return [];
    if (Array.isArray(data.accountingPlanCategories)) return data.accountingPlanCategories;
    if (Array.isArray(data.accountingPlanCategory)) return data.accountingPlanCategory;
    if (Array.isArray(data.included)) {
        return data.included
            .filter((record) => record && record.type === "accountingPlanCategories")
            .map((record) => ({id: record.id, ...record.attributes}));
    }
    return [];
};

const extractTaxes = (data) => {
    if (!data) return [];
    if (Array.isArray(data.taxes)) return data.taxes;
    if (Array.isArray(data.tax)) return data.tax;
    if (Array.isArray(data.included)) {
        return data.included
            .filter((record) => record && record.type === "taxes")
            .map((record) => ({id: record.id, ...record.attributes}));
    }
    return [];
};

const settingsPath = (billerId, suffix = "") => {
    const prefix = window.location.pathname.startsWith("/portal/customer")
        ? "/portal/customer"
        : "/customer";
    return `${prefix}/biller/${billerId}/settings/accounting${suffix}`;
};

const displayCategoryName = (displayCategory) => {
    if (displayCategory && typeof displayCategory === "object") {
        return displayCategory.name || displayCategory.id;
    }
    return displayCategory;
};

const accountingPlanCategoryName = (category) => {
    if (category && typeof category === "object") {
        return category.name || category.id;
    }
    return category;
};

const accountingPlanCategoryOrder = (category) => {
    if (category && typeof category === "object") {
        return category.displayCategoryOrder;
    }
    return undefined;
};

const buildCategories = (accountingPlans, accountingPlanCategories) => {
    const categoryRecords = new Map();

    accountingPlanCategories.forEach((category) => {
        const name = accountingPlanCategoryName(category);
        if (name !== undefined && name !== null) {
            categoryRecords.set(String(name), category);
        }
    });

    const categories = [];

    accountingPlans.forEach((accountingPlan) => {
        const categoryName = displayCategoryName(accountingPlan.displayCategory);
        if (categoryName === undefined || categoryName === null) return;

        const category = categoryRecords.get(String(categoryName)) || {
            name: categoryName,
            displayCategoryOrder:
                accountingPlanCategoryOrder(accountingPlan.displayCategory) ??
                accountingPlan.displayCategoryOrder,
        };

        if (
            categories.findIndex(
                (existingCategory) =>
                    String(accountingPlanCategoryName(existingCategory)) === String(categoryName)
            ) === -1
        ) {
            categories.push(category);
        }
    });

    return categories.sort((a, b) => {
        const aOrder = accountingPlanCategoryOrder(a);
        const bOrder = accountingPlanCategoryOrder(b);
        if ((aOrder === undefined || aOrder === null) && (bOrder === undefined || bOrder === null)) return 0;
        if (aOrder === undefined || aOrder === null) return 1;
        if (bOrder === undefined || bOrder === null) return -1;
        return aOrder - bOrder;
    });
};

const planTotal = (plan) => {
    const quantity = Number(plan.quantity || 1);
    const price = Number(plan.price || 0);
    return +((price * quantity).toFixed(2));
};

const decoratePlan = (plan, selected) => {
    const price = Number(plan.price);
    const priceDisplay =
        plan.priceDisplay !== undefined && plan.priceDisplay !== null
            ? plan.priceDisplay
            : Number.isFinite(price)
                ? price.toFixed(2)
                : "";
    const quantity = plan.quantity || 1;
    const total = plan.total !== undefined && plan.total !== null ? plan.total : planTotal({...plan, quantity});
    const totalDisplay =
        plan.totalDisplay !== undefined && plan.totalDisplay !== null
            ? plan.totalDisplay
            : Number(total).toFixed(2);

    return {
        ...plan,
        selected,
        quantity,
        priceDisplay,
        total,
        totalDisplay,
    };
};

const AccountingCatalog = ({billerId, intl}) => {
    const location = useLocation();
    const [{biller}] = useAppState();
    const [isLoading, setIsLoading] = useState(true);
    const [accountingPlans, setAccountingPlans] = useState([]);
    const [accountingPlanCategories, setAccountingPlanCategories] = useState([]);
    const [taxes, setTaxes] = useState([]);
    const [selectedAccountingPlanIds, setSelectedAccountingPlanIds] = useState([]);
    const [openCategoryName, setOpenCategoryName] = useState(null);

    useEffect(() => {
        if (!billerId) return undefined;

        let cancelled = false;
        setIsLoading(true);

        axios
            .get("/data/accountingPlans", {params: {billerId}})
            .then(({data}) => {
                if (cancelled) return;
                setAccountingPlans(extractAccountingPlans(data));
                setAccountingPlanCategories(extractAccountingPlanCategories(data));
                setTaxes(extractTaxes(data));
                setSelectedAccountingPlanIds(
                    location.state && Array.isArray(location.state.selectedAccountingPlanIds)
                        ? location.state.selectedAccountingPlanIds
                        : []
                );
                setOpenCategoryName(null);
                setIsLoading(false);
            })
            .catch((error) => {
                if (cancelled) return;
                console.error("Error fetching accounting plans:", error);
                setAccountingPlans([]);
                setAccountingPlanCategories([]);
                setTaxes([]);
                setSelectedAccountingPlanIds([]);
                setOpenCategoryName(null);
                setIsLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [billerId, location.state]);

    const currencyCode = getBillerCurrencyCode(biller);
    const currencySymbol = getBillerCurrencySymbol(biller);

    const categories = useMemo(
        () => buildCategories(accountingPlans, accountingPlanCategories),
        [accountingPlans, accountingPlanCategories]
    );

    const selectedAccountingPlans = useMemo(
        () =>
            accountingPlans
                .filter((accountingPlan) =>
                    selectedAccountingPlanIds.some(
                        (id) => String(id) === String(accountingPlan.id)
                    )
                )
                .map((accountingPlan) => decoratePlan(accountingPlan, true)),
        [accountingPlans, selectedAccountingPlanIds]
    );

    const hasSelectedAccountingPlans = selectedAccountingPlans.length > 0;

    const accountingPlanClicked = (accountingPlan) => {
        setSelectedAccountingPlanIds((current) => {
            const isSelected = current.some(
                (id) => String(id) === String(accountingPlan.id)
            );
            if (isSelected) {
                return current.filter((id) => String(id) !== String(accountingPlan.id));
            }
            return current.concat(accountingPlan.id);
        });
    };

    const categoryDisplayName = (categoryName) => {
        const messageId = `${GROUP_KEY_PREFIX}${categoryName}`;
        const translated = intl.formatMessage({id: messageId, defaultMessage: categoryName});
        return translated || categoryName;
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!accountingPlans || accountingPlans.length <= 0) {
        return (
            <Redirect to={settingsPath(billerId)}/>
        );
    }

    const checkoutPath = settingsPath(billerId, "/catalog/checkout");
    const backPath = settingsPath(billerId);

    return (
        <React.Fragment>
            <style>{EMBER_CATALOG_STYLES}</style>
            <div className="row">
                <div className="col-md-12">
                    <div className="btn-toolbar btn-toolbar-bottom-margin">
                        <div className="btn-group">
                            <Link to={backPath} className="btn btn-default">
                                <span className="glyphicon glyphicon-arrow-left"/>{" "}
                                {intl.formatMessage({id: "settings.accountingPlan.backButton"})}
                            </Link>
                        </div>
                        {hasSelectedAccountingPlans ? (
                            <div className="btn-group pull-right">
                                <Link
                                    to={{
                                        pathname: checkoutPath,
                                        state: {
                                            selectedAccountingPlans,
                                            selectedAccountingPlanIds,
                                            currencyCode,
                                            currencySymbol,
                                            taxes,
                                        },
                                    }}
                                    className="btn btn-primary"
                                >
                                    <span className="glyphicon glyphicon-credit-card"/>{" "}
                                    {intl.formatMessage({id: "settings.accountingPlan.checkout"})}
                                </Link>
                            </div>
                        ) : (
                            <div className="btn-group pull-right">
                                <Link to={checkoutPath} className="btn btn-primary disabled">
                                    <span className="glyphicon glyphicon-credit-card"/>{" "}
                                    {intl.formatMessage({id: "settings.accountingPlan.checkout"})}
                                </Link>
                            </div>
                        )}
                        <div className="pull-right" style={{marginRight: "25px", marginTop: "5px"}}>
                            <span className="badge" style={{position: "relative", top: "-13px", left: "7px"}}>
                                {selectedAccountingPlans.length}
                            </span>
                            <span className="glyphicon glyphicon-shopping-cart text-info" style={{fontSize: "1.6em"}}/>
                        </div>
                    </div>

                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                {intl.formatMessage({id: "settings.accountingPlan.selectPlansToPurchase"})}
                            </h4>
                        </div>

                        <div className="panel-group" id="accounting-plan-group">
                            {categories.map((category) => {
                                const categoryName = accountingPlanCategoryName(category);
                                const plans = accountingPlans
                                    .filter(
                                        (accountingPlan) =>
                                            String(displayCategoryName(accountingPlan.displayCategory)) ===
                                            String(categoryName)
                                    )
                                    .map((accountingPlan) =>
                                        decoratePlan(
                                            accountingPlan,
                                            selectedAccountingPlanIds.some(
                                                (id) => String(id) === String(accountingPlan.id)
                                            )
                                        )
                                    );

                                return (
                                    <AccountingPlanGroup
                                        key={categoryName}
                                        accountingPlanCategory={category}
                                        displayName={categoryDisplayName(categoryName)}
                                        accountingPlans={plans}
                                        currencyCode={currencyCode}
                                        currencySymbol={currencySymbol}
                                        isOpen={String(openCategoryName) === String(categoryName)}
                                        onToggle={() =>
                                            setOpenCategoryName((current) =>
                                                String(current) === String(categoryName) ? null : categoryName
                                            )
                                        }
                                        accountingPlanClicked={accountingPlanClicked}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default injectIntl(AccountingCatalog);
