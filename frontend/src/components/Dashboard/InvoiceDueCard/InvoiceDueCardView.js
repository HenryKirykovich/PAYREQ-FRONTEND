import React from "react";
import {injectIntl} from "react-intl";
import {LargeText, RegularText, PrimaryButton, LinkButton} from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";
import styles from "./InvoiceDueCardView.module.scss"
import {isIEBrowser, daysUntil} from "../../../utils/date-utils";

const InvoiceDueCardView = ({billerId, invoiceId, amount, billerName, dueDate, currencyCode, intl}) => {
    const isIE = isIEBrowser();
    const dueInDays = daysUntil(dueDate);
    if (dueInDays < 0) return null;
    const formattedAmount = intl.formatNumber(amount, {style: "currency", currency: currencyCode});
    return (
        <DashboardCard isBannerCard={true} panelHeading={"dashboard.invoiceDueCard.heading"}>
            {!isIE && dueInDays === 0 && <LargeText text={"dashboard.invoiceDueCard.invoiceDueToday"} values={{amount: formattedAmount, billerName}}/>}
            {!isIE && dueInDays > 0 && <LargeText text={"dashboard.invoiceDueCard.invoiceDetails"} values={{amount: formattedAmount, billerName, dueInDays}}/>}
            {isIE && <LargeText text={"dashboard.invoiceDueCard.invoiceDetails.InternetExplorer"} values={{amount: formattedAmount, billerName}}/>}
            <RegularText text={"dashboard.invoiceDueCard.alreadyPaidWarning"}/>
            <div className={styles.buttonContainer}>
                <PrimaryButton label={"payments.pay.button.label"} linkTo={"/portal/customer/biller/" + billerId + "/inbox/" + invoiceId + "/pay"}/>
                <LinkButton label="dashboard.invoiceDueCard.viewBill" linkTo={`/portal/customer/biller/${billerId}/inbox/${invoiceId}`}/>
            </div>
        </DashboardCard>
    )
};

export default injectIntl(InvoiceDueCardView);