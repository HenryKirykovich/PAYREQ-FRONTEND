import React from "react";
import {withRouter} from "react-router-dom";

import WalkthroughModal from "../components/walkthrough/WalkthroughModal";
import {Route, Switch} from "react-router-dom";
import BillerShell from "./BillerShell";
import AuthShell from "./AuthShell";
import PageNotFound from "../components/PageNotFound";
import ProfileShell from "./ProfileShell";

const UserRoutes = withRouter(({match}) => (
    <Switch>
        <Route path={`${match.url}/profile`} component={ProfileShell}/>
        <Route path={`${match.url}/biller/:billerId`} component={BillerShell}/>
        <Route path={`${match.url}`} component={AuthShell}/>
        <Route component={PageNotFound}/>
    </Switch>
));

const UserShell = () => {
    return (
        <React.Fragment>
            <UserRoutes/>
            <WalkthroughModal/>
        </React.Fragment>
    );
};

export default UserShell;
