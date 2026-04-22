import React from "react";
import {withRouter} from "react-router-dom";

import WalkthroughModal from "../components/walkthrough/WalkthroughModal";
import {Route, Switch} from "react-router-dom";
import BillerShell from "./BillerShell";
import AuthShell from "./AuthShell";
import PageNotFound from "../components/PageNotFound";
import ProfileShell from "./ProfileShell";
import BrowserUI from "../components/BrowserUI";
import Navber from "../components/Navbar";
import UserNotifications from "../components/settings/users/UserNotifications";
import {useAppState} from "../state";

const UserRoutes = withRouter(({match}) => {
    const [{user}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/profile`} component={ProfileShell}/>
            <Route path={`${match.url}/user/notifications`} render={() => (
                <React.Fragment>
                    <BrowserUI><Navber user={user}/></BrowserUI>
                    <div className="container" role="main">
                        <UserNotifications/>
                    </div>
                </React.Fragment>
            )}/>
            <Route path={`${match.url}/biller/:billerId`} component={BillerShell}/>
            <Route path={`${match.url}`} component={AuthShell}/>
            <Route component={PageNotFound}/>
        </Switch>
    );
});

const UserShell = () => {
    return (
        <React.Fragment>
            <UserRoutes/>
            <WalkthroughModal/>
        </React.Fragment>
    );
};

export default UserShell;
