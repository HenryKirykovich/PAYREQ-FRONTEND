import React from "react";

const categoryName = (accountingPlanCategory) => {
    if (accountingPlanCategory && typeof accountingPlanCategory === "object") {
        return accountingPlanCategory.name || accountingPlanCategory.id;
    }
    return accountingPlanCategory;
};

const AccountingPlanGroup = ({
    accountingPlanCategory,
    displayName,
    accountingPlans,
    currencyCode,
    currencySymbol,
    isOpen,
    onToggle,
    accountingPlanClicked,
}) => {
    const categoryElementId = categoryName(accountingPlanCategory);
    const href = `#${categoryElementId}`;

    const handleToggle = (event) => {
        event.preventDefault();
        onToggle();
    };

    const handleAccountingPlanClicked = (event, accountingPlan) => {
        event.preventDefault();
        accountingPlanClicked(accountingPlan);
    };

    return (
        <div className="panel panel-default" style={{borderColor: "#fff"}}>
            <a
                className="panel-heading collapse-sub-heading"
                data-toggle="collapse"
                data-parent="#accounting-plan-group"
                data-target={href}
                href={href}
                onClick={handleToggle}
            >
                <h5 className="panel-title">
                    {displayName}
                </h5>
            </a>
            <div id={categoryElementId} className={`panel-collapse collapse${isOpen ? " in" : ""}`}>
                <table className="table table-condensed table-hover">
                    <tbody>
                        {accountingPlans.map((accountingPlan) => (
                            <tr key={accountingPlan.id}>
                                <td style={{textAlign: "right", width: "30px"}}>
                                    {accountingPlan.selected ? (
                                        <span className="glyphicon glyphicon-ok text-success glyphicon-right-margin"/>
                                    ) : (
                                        <span className="glyphicon glyphicon-ok text-success glyphicon-right-margin hide-element"/>
                                    )}
                                </td>
                                <td>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a
                                        onClick={(event) => handleAccountingPlanClicked(event, accountingPlan)}
                                        className="list-group-item list-group-item-action remove-border"
                                        href="#"
                                    >
                                        {accountingPlan.name} <small>({accountingPlan.description})</small>
                                    </a>
                                </td>
                                <td>{currencySymbol}{accountingPlan.priceDisplay}</td>
                                <td>{currencyCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AccountingPlanGroup;
