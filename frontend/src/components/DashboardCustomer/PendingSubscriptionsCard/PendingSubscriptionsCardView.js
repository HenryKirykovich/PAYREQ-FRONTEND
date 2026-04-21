import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";

const PendingConnectionsCardView = ({ billerId , count}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.pendingConnections.heading"}>
        <LargeText text={"dashboard.pendingConnections.body"} values={{count: count}}/>
        <PrimaryButton
            label={"dashboard.pendingConnections.button"}
            onClick={() => window.location.href = `/customer#/biller/${billerId}/registrations/pendingFailed`}
        />
    </DashboardCard>
);

export default PendingConnectionsCardView;
