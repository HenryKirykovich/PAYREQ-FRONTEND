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

const ReportsShell = ({match}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
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
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default ReportsShell;
