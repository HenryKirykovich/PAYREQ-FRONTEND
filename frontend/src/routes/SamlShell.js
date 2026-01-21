import React from "react";
import {Route, Switch} from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import SamlUnauthorised from "../components/SamlUnauthorised";

const SamlShell = ({match}) => {
    return (
        <React.Fragment>
            <BlueTrim/>
            <OrangeTrim/>
            <div className="container">
                <Switch>
                    <Route path={`${match.url}/unauthorised/400`}>
                        <SamlUnauthorised code="400"/>
                    </Route>
                    <Route path={`${match.url}/unauthorised/401`}>
                        <SamlUnauthorised code="401"/>
                    </Route>
                    <Route path={`${match.url}/unauthorised/403`}>
                        <SamlUnauthorised code="403"/>
                    </Route>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default SamlShell;
