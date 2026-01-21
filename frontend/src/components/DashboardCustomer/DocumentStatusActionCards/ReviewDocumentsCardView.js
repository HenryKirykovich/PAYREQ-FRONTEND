import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";
import {withRouter} from "react-router-dom";
import {MAIL_STATUS_REVIEW} from "../../Mail/mail-constants";

const ReviewDocumentsCardView = ({ billerId , count, history}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.reviewDocuments.heading"}>
        <LargeText text={"dashboard.reviewDocuments.body"} values={{count: count}}/>
        <PrimaryButton
            label={"dashboard.reviewDocuments.button"}
            onClick={() => history.push(`/portal/customer/biller/${billerId}/mail?type=${MAIL_STATUS_REVIEW}`)}
        />
    </DashboardCard>
);

export default withRouter(ReviewDocumentsCardView);
