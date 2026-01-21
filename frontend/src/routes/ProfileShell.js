import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";

import BrowserUI from "../components/BrowserUI";
import Navber from "../components/Navbar";
import {useAppState} from "../state";
import AccountSelection from "../components/AccountSelection";

const ProfileShell = ({match}) => {
    const [{user}] = useAppState();
    return (
        <React.Fragment>
            <BrowserUI>
                <Navber user={user}/>
            </BrowserUI>
            <div className="container" role="main" aria-labelledby="pageHeading">
                <Switch>
                    <Route path={`${match.url}/accounts`} render={() => <AccountSelection/>}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>

        </React.Fragment>
    );
};

export default ProfileShell;
