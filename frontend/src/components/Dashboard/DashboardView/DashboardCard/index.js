import React from "react";
import {injectIntl} from "react-intl";

import styles from "./DashboardCard.module.scss";
import {RegularText} from "../../../common";

const DashboardCard = ({className, panelHeading, children, intl, isBannerCard, subHeading, values}) => (
    <div
        className={[isBannerCard ? styles.headerCard : styles.card, "panel", className, styles.cardContainer].join(" ")}>
        <div className="panel-heading">
            <h2 className={"panel-title"}>{intl.formatMessage({id: panelHeading}, values)}</h2>
            {subHeading && <RegularText className={styles.subHeading} text={subHeading}/>}
        </div>
        <div className="panel-body">{children}</div>
    </div>
);
export default injectIntl(DashboardCard);