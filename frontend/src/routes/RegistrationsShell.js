import React from "react";
import {Route, Switch} from "react-router-dom";

import {useAppState} from "../state";

import PageNotFound from "../components/PageNotFound";
import CreateEmailRegistration from "../components/registrations/email/CreateEmailRegistration";
import RegistrationsCreated from "../components/registrations/email/RegistrationCreated";
import ChannelSelection from "../components/registrations/ChannelSelection";
import BillerSelection from "../components/registrations/BillerSelection";
import Billers from "../components/registrations/Billers";
import BillerRegistrations from "../components/registrations/BillerRegistrations";
import Registration from "../components/registrations/Registration";
import RegistrationUpdated from "../components/registrations/email/RegistrationUpdated";
import RegistrationDeregistered from "../components/registrations/email/RegistrationDeregistered";
import CreateMyBillsAgentRegistration from "../components/registrations/mybillsagent/CreateMyBillsAgentRegistration";
import MyBillsAgentRegistrationCreated from "../components/registrations/mybillsagent/MyBillsAgentRegistrationCreated";
import CreateXeroRegistration from "../components/registrations/xero/CreateXeroRegistration";
import CreatePayreqRegistration from "../components/registrations/payreq/CreatePayreqRegistration";
import CreatePayreqBillsRegistration from "../components/registrations/payreqbills/CreatePayreqBillsRegistration";
import CreateReckonRegistration from "../components/registrations/reckon/CreateReckonRegistration";
import AuthorisedAgentMessage from "../components/registrations/AuthorisedAgentMessage";
import CreateMyobRegistration from "../components/registrations/myob/CreateMyobRegistration"
import AdminCreate from "../components/registrations/AdminCreate";
import AdminCreateSuccess from "../components/registrations/AdminCreateSuccess";

const RegistrationsShell = ({match, location}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/billers`} exact>
                <Billers payerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/billers/:registrationsForBillerId`} exact
                   render={(props) => <BillerRegistrations {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/billers/:registrationsForBillerId/:registrationId`} exact
                   render={(props) => <Registration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/billers/:registrationsForBillerId/:registrationId/updated`} exact>
                <RegistrationUpdated emailsToVerify={location.state && location.state.emailsToVerify}
                                     registrationId={location.state && location.state.registrationId}
                />
            </Route>
            <Route path={`${match.url}/billers/:registrationsForBillerId/:registrationId/deregistered`} exact>
                <RegistrationDeregistered registrationId={location.state && location.state.registrationId}/>
            </Route>

            {/*creation screens*/}
            <Route path={`${match.url}/create`} exact>
                <BillerSelection payerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/create/:registeringForbillerId`} exact
                   render={(props) => <ChannelSelection {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/message`} exact>
                <AuthorisedAgentMessage payerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/create/:registeringForbillerId/email`} exact
                   render={(props) => <CreateEmailRegistration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/mybillsagent`} exact
                   render={(props) => <CreateMyBillsAgentRegistration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/xero`} exact
                   render={(props) => <CreateXeroRegistration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/myob`} exact
                   render={(props) => <CreateMyobRegistration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/reckon`} exact
                   render={(props) => <CreateReckonRegistration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/payreq`} exact
                   render={(props) => <CreatePayreqRegistration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/payreq-bills`} exact
                   render={(props) => <CreatePayreqBillsRegistration {...props} payerId={biller.id}/>}
            />
            <Route path={`${match.url}/create/:registeringForbillerId/email/saved`} exact>
                <RegistrationsCreated emailsToVerify={location.state && location.state.emailsToVerify}
                                      registeringForbillerId={location.state && location.state.registeringForbillerId}
                                      accountNumber={location.state && location.state.accountNumber}
                                      hasPaymentGateway={location.state && location.state.hasPaymentGateway}
                />
            </Route>
            <Route path={`${match.url}/create/:registeringForbillerId/mybillsagent/saved`} exact>
                <MyBillsAgentRegistrationCreated registrationsCreated={location.state && location.state.registrationsCreated}
                                                 registrationsExisting={location.state && location.state.registrationsExisting}
                                                 hasDownloadPreference={location.state && location.state.hasDownloadPreference}
                                                 payerId={biller.id}
                />
            </Route>

            {/*admin subscription creation screen*/}
            <Route path={`${match.url}/admin/create`} exact>
                <AdminCreate billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/admin/create/success`} exact>
                <AdminCreateSuccess billerId={biller.id}/>
            </Route>

            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default RegistrationsShell;
