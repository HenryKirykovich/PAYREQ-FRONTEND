import React from "react";

const formatPriceDisplay = (plan) => {
    if (plan == null) return "";
    if (plan.priceDisplay != null && plan.priceDisplay !== "") return plan.priceDisplay;
    const price = Number(plan.price);
    return Number.isFinite(price) ? price.toFixed(2) : "";
};

const AccountingPlanGroup = ({
    category,
    plans,
    currencyCode,
    currencySymbol,
    selectedPlanIds,
    onPlanClick,
    displayName,
}) => {
    const elementId = `accounting-plan-category-${category}`;
    const isSelected = (plan) =>
        Array.isArray(selectedPlanIds) &&
        selectedPlanIds.some((id) => String(id) === String(plan.id));

    const handleHeadingClick = (event) => {
        event.preventDefault();
    };

    const handlePlanClick = (event, plan) => {
        event.preventDefault();
        if (typeof onPlanClick === "function") {
            onPlanClick(plan);
        }
    };

    return (
        <div className="panel panel-default" style={{borderColor: "#fff"}}>
            <a
                className="panel-heading collapse-sub-heading"
                data-toggle="collapse"
                data-parent="#accounting-plan-group"
                data-target={`#${elementId}`}
                href={`#${elementId}`}
                onClick={handleHeadingClick}
            >
                <h5 className="panel-title">{displayName}</h5>
            </a>
            <div id={elementId} className="panel-collapse collapse">
                <table className="table table-condensed table-hover">
                    <tbody>
                        {plans.map((plan) => {
                            const selected = isSelected(plan);
                            const checkClass = selected
                                ? "glyphicon glyphicon-ok text-success glyphicon-right-margin"
                                : "glyphicon glyphicon-ok text-success glyphicon-right-margin hide-element";
                            return (
                                <tr key={plan.id}>
                                    <td style={{textAlign: "right", width: "30px"}}>
                                        <span className={checkClass}/>
                                    </td>
                                    <td>
                                        <a
                                            href="#"
                                            className="list-group-item list-group-item-action remove-border"
                                            onClick={(event) => handlePlanClick(event, plan)}
                                        >
                                            {plan.name}{" "}
                                            {plan.description ? (
                                                <small>
                                                    <em>({plan.description})</em>
                                                </small>
                                            ) : null}
                                        </a>
                                    </td>
                                    <td>
                                        {currencySymbol}
                                        {formatPriceDisplay(plan)}
                                    </td>
                                    <td>{currencyCode}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountingPlanGroup;
