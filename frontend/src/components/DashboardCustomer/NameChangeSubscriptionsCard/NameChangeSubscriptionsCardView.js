import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";

const NameChangeConnectionsCardView = ({ billerId , count}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.nameChangeConnections.heading"}>
        <LargeText text={"dashboard.nameChangeConnections.body"} values={{count: count}}/>
        <PrimaryButton
            label={"dashboard.nameChangeConnections.button"}
            onClick={() => window.location.href = `/customer#/biller/${billerId}/registrations/contactChanged`}
        />
    </DashboardCard>
);

export default NameChangeConnectionsCardView;
