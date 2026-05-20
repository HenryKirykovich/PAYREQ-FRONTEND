import React, {useEffect, useMemo, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Link, Redirect} from "react-router-dom";
import Loading from "../Loading";
import {useAppState} from "../../state";
import {getCurrencySymbol} from "../../utils/currency-utils";
import AccountingPlanGroup from "./AccountingPlanGroup";

const CATEGORY_KEY_PREFIX = "settings.accountingPlan.accountingPlanGroups.";

// Plans may come back as a bare array, or wrapped under a few common keys.
const extractPlans = (data) => {
    if (Array.isArray(data)) return data;
    if (!data) return [];
    if (Array.isArray(data.accountingPlans)) return data.accountingPlans;
    if (Array.isArray(data.list)) return data.list;
    if (Array.isArray(data.results)) return data.results;
    return [];
};

// Build sorted unique category descriptors from the loaded plans.
// `displayCategory` may be either a string id (e.g. "pay-stub") or an object
// like {id|name, displayCategoryOrder}. Per-plan `displayCategoryOrder` is also
// honored as a fallback for sorting.
const buildCategories = (plans) => {
    const seen = new Map();
    plans.forEach((plan) => {
        const raw = plan && plan.displayCategory;
        let name;
        let order;
        if (raw && typeof raw === "object") {
            name = raw.name || raw.id;
            order = raw.displayCategoryOrder;
        } else {
            name = raw;
            order = plan && plan.displayCategoryOrder;
        }
        if (name == null || name === "") return;
        if (!seen.has(name)) {
            seen.set(name, {name, displayCategoryOrder: order});
        } else if (order != null && seen.get(name).displayCategoryOrder == null) {
            seen.get(name).displayCategoryOrder = order;
        }
    });

    const categories = Array.from(seen.values());
    categories.sort((a, b) => {
        const ao = a.displayCategoryOrder;
        const bo = b.displayCategoryOrder;
        if (ao == null && bo == null) return 0;
        if (ao == null) return 1;
        if (bo == null) return -1;
        return ao - bo;
    });
    return categories;
};

const planCategoryName = (plan) => {
    const raw = plan && plan.displayCategory;
    if (raw && typeof raw === "object") return raw.name || raw.id;
    return raw;
};

const AccountingCatalog = ({billerId, intl}) => {
    const [{biller}] = useAppState();
    const [isLoading, setIsLoading] = useState(true);
    const [plans, setPlans] = useState([]);
    const [selectedPlanIds, setSelectedPlanIds] = useState([]);
    const [loadFailed, setLoadFailed] = useState(false);

    useEffect(() => {
        if (!billerId) return undefined;
        let cancelled = false;
        setIsLoading(true);
        setLoadFailed(false);
        axios
            .get("/data/accountingPlans", {params: {billerId}})
            .then(({data}) => {
                if (cancelled) return;
                setPlans(extractPlans(data));
                setSelectedPlanIds([]);
                setIsLoading(false);
            })
            .catch((err) => {
                if (cancelled) return;
                console.error("Error fetching accounting plans:", err);
                setLoadFailed(true);
                setIsLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [billerId]);

    const currencyCode = (biller && biller.accountCurrencyCode) || "AUD";
    const currencySymbol = getCurrencySymbol(currencyCode);

    const categories = useMemo(() => buildCategories(plans), [plans]);

    const selectedPlans = useMemo(
        () =>
            plans.filter((plan) =>
                selectedPlanIds.some((id) => String(id) === String(plan.id))
            ),
        [plans, selectedPlanIds]
    );

    const hasSelected = selectedPlans.length > 0;

    const togglePlan = (plan) => {
        const planId = plan && plan.id;
        if (planId == null) return;
        setSelectedPlanIds((current) => {
            const exists = current.some((id) => String(id) === String(planId));
            if (exists) {
                return current.filter((id) => String(id) !== String(planId));
            }
            return current.concat(planId);
        });
    };

    const getCategoryDisplayName = (categoryName) => {
        const id = `${CATEGORY_KEY_PREFIX}${categoryName}`;
        const translated = intl.formatMessage({id, defaultMessage: categoryName});
        return translated || categoryName;
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!loadFailed && plans.length === 0) {
        return (
            <Redirect to={`/portal/customer/biller/${billerId}/settings/accounting`}/>
        );
    }

    const checkoutPath = `/portal/customer/biller/${billerId}/settings/accounting/catalog/checkout`;
    const backPath = `/portal/customer/biller/${billerId}/settings/accounting`;
    const checkoutState = {
        selectedPlans,
        currencyCode,
        currencySymbol,
    };

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="btn-toolbar btn-toolbar-bottom-margin">
                    <div className="btn-group">
                        <Link to={backPath} className="btn btn-default">
                            <span className="glyphicon glyphicon-arrow-left"/>{" "}
                            {intl.formatMessage({id: "settings.accountingPlan.backButton"})}
                        </Link>
                    </div>

                    <div className="btn-group pull-right">
                        {hasSelected ? (
                            <Link
                                to={{pathname: checkoutPath, state: checkoutState}}
                                className="btn btn-primary"
                            >
                                <span className="glyphicon glyphicon-credit-card"/>{" "}
                                {intl.formatMessage({id: "settings.accountingPlan.checkout"})}
                            </Link>
                        ) : (
                            <a
                                href="#"
                                className="btn btn-primary disabled"
                                onClick={(e) => e.preventDefault()}
                                aria-disabled="true"
                            >
                                <span className="glyphicon glyphicon-credit-card"/>{" "}
                                {intl.formatMessage({id: "settings.accountingPlan.checkout"})}
                            </a>
                        )}
                    </div>

                    <div className="pull-right" style={{marginRight: "25px", marginTop: "5px"}}>
                        <span
                            className="badge"
                            style={{position: "relative", top: "-13px", left: "7px"}}
                        >
                            {selectedPlans.length}
                        </span>
                        <span
                            className="glyphicon glyphicon-shopping-cart text-info"
                            style={{fontSize: "1.6em"}}
                        />
                    </div>
                </div>

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            {intl.formatMessage({id: "settings.accountingPlan.selectPlansToPurchase"})}
                        </h4>
                    </div>

                    <div className="panel-group" id="accounting-plan-group">
                        {categories.map((category) => (
                            <AccountingPlanGroup
                                key={category.name}
                                category={category.name}
                                displayName={getCategoryDisplayName(category.name)}
                                plans={plans.filter(
                                    (plan) => planCategoryName(plan) === category.name
                                )}
                                currencyCode={currencyCode}
                                currencySymbol={currencySymbol}
                                selectedPlanIds={selectedPlanIds}
                                onPlanClick={togglePlan}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(AccountingCatalog);
