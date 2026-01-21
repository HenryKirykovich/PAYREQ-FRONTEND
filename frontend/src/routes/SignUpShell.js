import React from "react";
import {Route, Switch} from "react-router-dom";

import PageNotFound from "../components/PageNotFound";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import InviteAcceptance from "../components/InviteAcceptance";
import CreateAccount from "../components/CreateAccount";
import BrowserUI from "../components/BrowserUI";

const SignUpShell = ({match}) => {
    return (
        <React.Fragment>
            <BrowserUI>
                <BlueTrim />
            </BrowserUI>
            <OrangeTrim/>
            <div className="container">
                <Switch>
                    <Route path={match.url} exact>
                        <CreateAccount/>
                    </Route>
                    <Route path={`${match.url}/invite/:inviteCode/:userId`}>
                        <InviteAcceptance/>
                    </Route>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default SignUpShell;
