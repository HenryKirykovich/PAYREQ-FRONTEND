import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {useAppState} from "../state";
import PageNotFound from "../components/PageNotFound";
import InvoicesList from "../components/Invoices/InvoicesList";
import InvoiceBillerManagement from "../components/Invoices/InvoiceBillerManagement";
import IncomingEmailConfig from "../components/Invoices/IncomingEmailConfig";

const InvoicesShell = () => {
    const [{biller}] = useAppState();
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/biller/:invoiceBillerId`} exact>
                {({match}) => (
                    <InvoiceBillerManagement
                        billerId={biller.id}
                        invoiceBillerId={match.params.invoiceBillerId}
                    />
                )}
            </Route>
            <Route path={`${match.url}/incomingEmail`} exact>
                <IncomingEmailConfig billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/:type?`} exact>
                {({match}) => (
                    <InvoicesList
                        billerId={biller.id}
                        type={match.params.type || "all"}
                    />
                )}
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default InvoicesShell;
