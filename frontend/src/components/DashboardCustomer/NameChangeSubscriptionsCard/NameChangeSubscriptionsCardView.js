import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";

const NameChangeSubscriptionsCardView = ({ billerId , count}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.nameChangeSubscriptions.heading"}>
        <LargeText text={"dashboard.nameChangeSubscriptions.body"} values={{count: count}}/>
        <PrimaryButton
            label={"dashboard.nameChangeSubscriptions.button"}
            onClick={() => window.location.href = `/customer#/biller/${billerId}/registrations/contactChanged`}
        />
    </DashboardCard>
);

export default NameChangeSubscriptionsCardView;
