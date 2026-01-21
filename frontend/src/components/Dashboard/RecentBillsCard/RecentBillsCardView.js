import React from "react";
import {FormattedDate, FormattedNumber, FormattedRelativeTime} from "react-intl";
import {withRouter} from "react-router-dom";

import {LargeText, LinkButton} from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";
import styles from "./RecentBillsCardView.module.scss";
import {daysUntil, isIEBrowser} from "../../../utils/date-utils";

const BillRow = ({billerId, billerName, minAmountDue, amountDue, dueDate, id, currencyCode, history}) => {
    const dueInDays = daysUntil(dueDate);
    const isIE = isIEBrowser();
    return (
        <div className={styles.billRow}
             onClick={() => history.push(`/portal/customer/biller/${billerId}/inbox/${id}`)}>
            <LargeText className={styles.billerName}>{billerName}</LargeText>

            {minAmountDue &&
                <LargeText className={styles.amountDue}>
                    {/*eslint-disable-next-line*/}
                    <FormattedNumber value={minAmountDue} style="currency" currency={currencyCode}/>
                </LargeText>}

            {!minAmountDue &&
                <LargeText className={styles.amountDue}>
                    {/*eslint-disable-next-line*/}
                    <FormattedNumber value={amountDue} style="currency" currency={currencyCode}/>
                </LargeText>}

            {!isIE && (
                <LargeText>
                    Due&nbsp;
                    {dueInDays > 90 && <FormattedDate value={new Date(dueDate)}/>}
                    {dueInDays < 90 && dueInDays > 0 && <FormattedRelativeTime value={dueInDays} unit={"day"}/>}
                    {dueInDays === 0 && "Today"}
                </LargeText>
            )}
            {isIE && <LargeText>Due&nbsp; <FormattedDate value={new Date(dueDate)}/></LargeText>}
        </div>
    );
};

const ShowMore = ({billerId}) => (
    <div className={styles.cardActions}>
        <LinkButton label="generic.showMore"
                    linkTo={`/portal/customer/biller/${billerId}/inbox`}/>
    </div>
);

const RecentBillsCardView = ({billerId, bills, history}) => {
    const billsDue = bills.filter(b => daysUntil(b.dueDate) >= 0);
    return (
    <DashboardCard panelHeading="dashboard.recentBillsCard.heading" subHeading={billsDue.length > 0 ? "dashboard.recentBillsCard.infoText" : null}>
        {billsDue.length === 0 && <LargeText text={"dashboard.recentBillsCard.noBillsMessage"}/>}
        {billsDue.slice(0, 3).map((bill, i) => <BillRow key={i} {...bill} billerId={billerId} history={history}/>)}
        {billsDue.length > 4 && <ShowMore billerId={billerId}/>}
    </DashboardCard>
)};

RecentBillsCardView.defaultProps = {
    bills: []
};

export default withRouter(RecentBillsCardView);