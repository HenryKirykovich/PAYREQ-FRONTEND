import React from "react";
import {LargeText, PrimaryButton} from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";

const FailedForwardingCardView = ({billerId, count}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.forwardingFailedCard.heading"}>
        <LargeText text={"dashboard.forwardingFailedCard.body"} values={{failedCount: count}}/>
        <PrimaryButton label={"dashboard.forwardingFailedCard.button"}
                       linkTo={`/portal/customer/biller/${billerId}/inbox?forwardingStatus=failed`}
        />
    </DashboardCard>
);

export default FailedForwardingCardView;