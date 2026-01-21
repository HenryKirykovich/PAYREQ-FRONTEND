import React from "react";
import { LargeText, PrimaryButton } from "../../common";
import DashboardCard from "../../Dashboard/DashboardView/DashboardCard";
import {MAIL_STATUS_ERROR} from "../../Mail/mail-constants";
import {withRouter} from "react-router-dom";

const ErrorDocumentsCardView = ({ billerId , count, history}) => (
    <DashboardCard isBannerCard={true} panelHeading={"dashboard.errorDocuments.heading"}>
        <LargeText text={"dashboard.errorDocuments.body"} values={{count: count}}/>
        <PrimaryButton
            label={"dashboard.errorDocuments.button"}
            onClick={() => history.push(`/portal/customer/biller/${billerId}/mail?type=${MAIL_STATUS_ERROR}`)}
        />
    </DashboardCard>
);

export default withRouter(ErrorDocumentsCardView);
