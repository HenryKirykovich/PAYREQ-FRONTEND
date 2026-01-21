import React from "react";
import {Route, Switch} from "react-router-dom";

import {useAppState} from "../state";

import PageNotFound from "../components/PageNotFound";
import AutoPayments from "../components/AutoPayments";
import CreateAutoPayment from "../components/AutoPayments/CreateAutoPayment";
import AutoPaymentSaved from "../components/AutoPayments/AutoPaymentSaved";
import AutoPayment from "../components/AutoPayments/AutoPayment";
import EditAutoPayment from "../components/AutoPayments/EditAutoPayment";

const AutoPaymentsShell = ({match}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/create`}>
                <CreateAutoPayment billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/auto-payment-saved`}>
                <AutoPaymentSaved billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/:id/edit`}>
                <EditAutoPayment billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/:id`}>
                <AutoPayment billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}`}>
                <AutoPayments billerId={biller.id}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default AutoPaymentsShell;