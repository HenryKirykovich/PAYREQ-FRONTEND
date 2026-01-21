import React from "react";
import {withRouter} from "react-router-dom";
import {FormattedDate} from "react-intl";
import {LargeText, LinkButton} from "../../common";
import DashboardCard from "../DashboardView/DashboardCard";
import styles from "./RecentPayrollDocumentsCardView.module.scss";

const PayrollDocumentRow = ({billerId, billerName, receivedTime, id, description, history}) => {
    return (
        <div className={styles.payrollDocumentRow} onClick={() => history.push(`/portal/customer/biller/${billerId}/inbox/${id}`)}>
            <LargeText className={styles.billerName}>{billerName}</LargeText>

            <LargeText text="dashboard.recentPayrollDocumentsCard.received" values={{description: description}} />
            <LargeText className={styles.dateArrived}>
                {/*eslint-disable-next-line*/}
                <FormattedDate value={receivedTime}/>
            </LargeText>

        </div>
    );
};

const ShowMore = ({billerId}) => (
    <div className={styles.cardActions}>
        <LinkButton label="generic.showMore"
                    linkTo={`/portal/customer/biller/${billerId}/inbox`}
        />
    </div>
);

const RecentPayrollDocumentsCardView = ({billerId, documents, history}) => {
    return (
    <DashboardCard panelHeading="dashboard.recentPayrollDocumentsCard.heading" subHeading={documents.length > 0 ? "dashboard.recentPayrollDocumentsCard.subHeading" : null}>
        {documents.length === 0 && <LargeText text={"dashboard.recentPayrollDocumentsCard.noDocumentsMessage"}/>}
        {documents.slice(0, 3).map((document, i) => <PayrollDocumentRow key={i} {...document} billerId={billerId} history={history}/>)}
        {documents.length > 4 && <ShowMore billerId={billerId}/>}
    </DashboardCard>
)};

RecentPayrollDocumentsCardView.defaultProps = {
    documents: []
};

export default withRouter(RecentPayrollDocumentsCardView);