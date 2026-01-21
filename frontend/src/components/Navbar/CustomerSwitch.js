import React from "react";

import styles from "./CustomerSwitch.module.scss";

export const CustomerSwitch = ({tagName}) => {
    const href = "/portal/customer/profile/accounts";
    return (
    <li role="presentation" className="hidden-sm hidden-md">
        <a href={href} title={tagName} onClick={() => window.location.href =href}>
            <span className="customerName">{tagName}</span>
            <span className={"glyphicon glyphicon-transfer " + styles.switchIconMargin}/>
        </a>
    </li>
)};
