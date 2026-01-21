import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";

import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import Login from "../components/Login/Login";
import Mfa from "../components/Login/Mfa/Mfa";
import VerifyDevice from "../components/Login/VerifyDevice/VerifyDevice"
import MfaSetup from "../components/Login/MfaSetup/index";

const AuthShell = ({match}) => {
    return (
        <React.Fragment>
            <BlueTrim/>
            <OrangeTrim/>
            <div className="container" role="main" aria-labelledby="pageHeading">
                <Switch>
                    <Route path={`${match.url}/login`} render={() => <Login/>}/>
                    <Route path={`${match.url}/mfa`} render={() => <Mfa/>}/>
                    <Route path={`${match.url}/verify-device`} render={() => <VerifyDevice/>}/>
                    <Route path={`${match.url}/mfa-setup`} render={() => <MfaSetup/>}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>

        </React.Fragment>
    );
};

export default AuthShell;