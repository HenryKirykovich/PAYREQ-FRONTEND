import React from "react";
import {Route, Switch} from "react-router-dom";

import {useAppState} from "../state";

import PageNotFound from "../components/PageNotFound";
import PaymentHistory from "../components/paymentHistory";
import PaymentDetail from "../components/paymentHistory/detail";

const PaymentHistoryShell = ({match}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/:id`}>
                <PaymentDetail billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}`}>
                <PaymentHistory billerId={biller.id}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default PaymentHistoryShell;
