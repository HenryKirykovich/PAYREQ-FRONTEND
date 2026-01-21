import React from "react";
import {LargeText, PrimaryButton} from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";

const ForwardingActionRequiredCardView = ({billerId, count}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.forwardingActionRequiredCard.heading"}>
        <LargeText text={"dashboard.forwardingActionRequiredCard.body"} values={{failedCount: count}}/>
        <PrimaryButton label={"dashboard.forwardingActionRequiredCard.button"}
                       linkTo={`/portal/customer/biller/${billerId}/inbox?forwardingStatus=failed`}
        />
    </DashboardCard>
);

export default ForwardingActionRequiredCardView;