import React from "react";
import {Route, Switch} from "react-router-dom";

import {useAppState} from "../state";

import PageNotFound from "../components/PageNotFound";
import BillPaymentsReport from "../components/payments/BillPaymentsReport";
import ArchivedBillsReport from "../components/archive/ArchivedBillsReport";
import AutoPaymentReport from "../components/AutoPayments/AutoPaymentReport";
import PrintedBillsReport from "../components/print/PrintedBillsReport";
import RegistrationSummary from "../components/RegistrationSummary/RegistrationSummaryReport";
import AgentsDownloadsReport from "../components/AgentsDownloadsReport";
import ReportsDashboard from "../components/Reports/ReportsDashboard";
import MonthlySummaryReport from "../components/Reports/MonthlySummaryReport";
import BillingSummaryReport from "../components/Reports/BillingSummaryReport";
import BillingDetailReport from "../components/Reports/BillingDetailReport";
import MailOverviewReport from "../components/Reports/MailOverviewReport";
import EmailActivityReport from "../components/Reports/EmailActivityReport";

const ReportsShell = ({match}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            {/* Main Reports Dashboard */}
            <Route path={`${match.url}`} exact>
                <ReportsDashboard billerId={biller.id}/>
            </Route>

            {/* Report Results */}
            <Route path={`${match.url}/report/:reportId`}
                   render={(props) => <MonthlySummaryReport billerId={biller.id} reportId={props.match.params.reportId}/>}/>
            <Route path={`${match.url}/billingsummary/:reportId`}
                   render={(props) => <BillingSummaryReport billerId={biller.id} reportId={props.match.params.reportId}/>}/>
            <Route path={`${match.url}/billingdetail/:reportId`}
                   render={(props) => <BillingDetailReport billerId={biller.id} reportId={props.match.params.reportId}/>}/>

            {/* Existing Reports */}
            <Route path={`${match.url}/billpayments`}>
                <BillPaymentsReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/archivedbills`}>
                <ArchivedBillsReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/autopayment`}>
                <AutoPaymentReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/print`}>
                <PrintedBillsReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/registrationsummary`}>
                <RegistrationSummary billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/agentsdownloads`}>
                <AgentsDownloadsReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/bi/mail-overview`} exact>
                <MailOverviewReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/bi/email-activity`} exact>
                <EmailActivityReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/mail/overview`} exact>
                <MailOverviewReport billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/email/activity`} exact>
                <EmailActivityReport billerId={biller.id}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default ReportsShell;
