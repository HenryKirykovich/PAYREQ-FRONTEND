import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";

const WelcomeCardView = ({ billerId }) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.welcomeCard.heading"}>
        <LargeText text={"dashboard.welcomeCard.body"} />
        <PrimaryButton
            label={"dashboard.welcomeCard.button"}
            linkTo={{pathname: `/customer/biller/${billerId}/registrations/create`}}
            icon="plus"
        />
    </DashboardCard>
);

export default WelcomeCardView;
