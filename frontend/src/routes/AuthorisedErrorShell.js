import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import ReckonError from "../components/Error/ReckonError";
import MyobError from "../components/Error/MyobError";

const AuthorisedErrorShell = ({match}) => {
    return (
        <div className="container">
            <Switch>
                <Route path={`${match.url}/reckon`}>
                    <ReckonError/>
                </Route>
                <Route path={`${match.url}/myob`}>
                    <MyobError/>
                </Route>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    );
};

export default AuthorisedErrorShell;
