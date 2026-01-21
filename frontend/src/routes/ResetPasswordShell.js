import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import ResetPassword from "../components/ResetPassword";

const ResetPasswordShell = ({match}) => {
    return (
        <React.Fragment>
            <BlueTrim/>
            <OrangeTrim/>
            <div className="container">
                <Switch>
                    <Route path={`${match.url}/password/:code/:id`}>
                        <ResetPassword/>
                    </Route>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default ResetPasswordShell;