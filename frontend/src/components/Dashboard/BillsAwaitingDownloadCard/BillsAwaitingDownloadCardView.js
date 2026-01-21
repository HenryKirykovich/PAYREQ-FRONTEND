import React from "react";
import {LargeText, PrimaryButton} from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";

const BillsAwaitingDownloadCardView = ({billerId, count}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.billsAwaitingDownloadCard.heading"}>
        <LargeText text={"dashboard.billsAwaitingDownloadCard.body"} values={{failedCount: count}}/>
        <PrimaryButton label={"dashboard.billsAwaitingDownloadCard.button"}
                       linkTo={`/portal/customer/biller/${billerId}/inbox?downloadStatus=awaiting-download`}
        />
    </DashboardCard>
);

export default BillsAwaitingDownloadCardView;