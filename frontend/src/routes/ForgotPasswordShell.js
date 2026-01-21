import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import ForgotPassword from "../components/Login/ForgotPassword/ForgotPassword";
import ForgotPasswordSuccess from "../components/Login/ForgotPassword/ForgotPasswordSuccess";

const ForgotPasswordShell = ({match}) => {
    return (
        <React.Fragment>
            <BlueTrim/>
            <OrangeTrim/>
            <div className="container">
                <Switch>
                    <Route path={`${match.url}`} exact render={() => <ForgotPassword/>}/>
                    <Route path={`${match.url}/success`} render={() => <ForgotPasswordSuccess/>}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default ForgotPasswordShell;