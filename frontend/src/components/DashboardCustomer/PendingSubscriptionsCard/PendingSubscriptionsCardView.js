import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";

const PendingSubscriptionsCardView = ({ billerId , count}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.pendingSubscriptions.heading"}>
        <LargeText text={"dashboard.pendingSubscriptions.body"} values={{count: count}}/>
        <PrimaryButton
            label={"dashboard.pendingSubscriptions.button"}
            onClick={() => window.location.href = `/customer#/biller/${billerId}/registrations/pendingFailed`}
        />
    </DashboardCard>
);

export default PendingSubscriptionsCardView;
