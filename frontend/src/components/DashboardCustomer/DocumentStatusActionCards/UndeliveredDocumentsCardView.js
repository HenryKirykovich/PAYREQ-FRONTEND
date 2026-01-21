import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";
import {withRouter} from "react-router-dom";
import {MAIL_STATUS_NOT_DELIVERED} from "../../Mail/mail-constants";

const UndeliveredDocumentsCardView = ({ billerId , count, history}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.undeliveredDocuments.heading"}>
        <LargeText text={"dashboard.undeliveredDocuments.body"} values={{count: count}}/>
        <PrimaryButton
            label={"dashboard.undeliveredDocuments.button"}
            onClick={() => history.push(`/portal/customer/biller/${billerId}/mail?type=${MAIL_STATUS_NOT_DELIVERED}`)}
        />
    </DashboardCard>
);

export default withRouter(UndeliveredDocumentsCardView);
