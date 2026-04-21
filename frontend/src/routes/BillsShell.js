import React from "react";
import {Route, Switch} from "react-router-dom";
import {useAppState} from "../state";
import PageNotFound from "../components/PageNotFound";
import Bills from "../components/Bills";
import BillDetail from "../components/Bills/BillDetail";

const BillsShell = ({match}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/:billId`}
                   render={(props) => <BillDetail {...props} billerId={biller.id}/>}
            />
            <Route path={`${match.url}`} exact>
                <Bills billerId={biller.id}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default BillsShell;
