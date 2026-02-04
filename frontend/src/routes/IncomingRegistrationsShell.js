import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {useAppState} from "../state";
import PageNotFound from "../components/PageNotFound";
import IncomingRegistrationDetail from "../components/IncomingRegistrations/IncomingRegistrationDetail";
import IncomingMyobRegistration from "../components/IncomingRegistrations/IncomingMyobRegistration";
import IncomingReckonRegistration from "../components/IncomingRegistrations/IncomingReckonRegistration";
import IncomingEmailRegistration from "../components/IncomingRegistrations/IncomingEmailRegistration";

const IncomingRegistrationsShell = () => {
    const [{biller}] = useAppState();
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path={`${match.url}/myob/:registrationId`} exact>
                {({match}) => (
                    <IncomingMyobRegistration 
                        billerId={biller.id} 
                        registrationId={match.params.registrationId}
                    />
                )}
            </Route>
            <Route path={`${match.url}/reckon/:registrationId`} exact>
                {({match}) => (
                    <IncomingReckonRegistration 
                        billerId={biller.id} 
                        registrationId={match.params.registrationId}
                    />
                )}
            </Route>
            <Route path={`${match.url}/email/:registrationId`} exact>
                {({match}) => (
                    <IncomingEmailRegistration 
                        billerId={biller.id} 
                        registrationId={match.params.registrationId}
                    />
                )}
            </Route>
            <Route path={`${match.url}/registration/:registrationId`} exact>
                {({match}) => (
                    <IncomingRegistrationDetail 
                        billerId={biller.id} 
                        registrationId={match.params.registrationId}
                    />
                )}
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default IncomingRegistrationsShell;
