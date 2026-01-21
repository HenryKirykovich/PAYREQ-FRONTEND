import React from "react";
import {LargeText} from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";
import {injectIntl} from "react-intl";
import styles from "./SupportDetailsCard.module.scss";

const SupportDetailsCard = ({intl}) => {
    return (
        <DashboardCard panelHeading="dashboard.supportDetails.heading">
            <div className={styles.supportDetailsWrapper}>
                <LargeText text={"dashboard.supportDetails.body"}/>
                <a href={intl.formatMessage({id: "spannerMenu.helpCentreURL"})} className={styles.contactDetails}>
                    {intl.formatMessage({id: "spannerMenu.accessHelpCentre"})}</a>
            </div>
        </DashboardCard>
    )
};

export default injectIntl(SupportDetailsCard);
