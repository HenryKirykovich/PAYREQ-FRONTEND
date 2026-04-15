import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";

const XeroWelcomeCardView = ({ billerId }) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.xeroWelcomeCard.heading"}>
        <LargeText text={"dashboard.xeroWelcomeCard.body"} />
        <PrimaryButton
            label={"dashboard.xeroWelcomeCard.button"}
            linkTo={`/customer/biller/${billerId}/registrations/create`}
            icon="plus"
        />
    </DashboardCard>
);

export default XeroWelcomeCardView;
