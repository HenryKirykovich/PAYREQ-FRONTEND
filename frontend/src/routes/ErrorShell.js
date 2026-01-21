import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import XeroError from "../components/Error/XeroError";

const ErrorShell = ({match}) => {
    return (
        <React.Fragment>
            <BlueTrim/>
            <OrangeTrim/>
            <div className="container">
                <Switch>
                    <Route path={`${match.url}/xero/400`}>
                        <XeroError code="400"/>
                    </Route>
                    <Route path={`${match.url}/xero/403`}>
                        <XeroError code="403"/>
                    </Route>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default ErrorShell;
