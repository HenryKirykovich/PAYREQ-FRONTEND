import React from "react";
import {Route, Switch} from "react-router-dom";
import PersonalSettings from "../components/PersonalSettings";
import ChangePasswordView from "../components/PersonalSettings/SecurityDetailsCard/ChangePasswordView";
import ChangeMfa from "../components/PersonalSettings/SecurityDetailsCard/ChangeMfa";
import AuthenticatorAppSetup from "../components/MfaAuthenticatorAppSetup";
import MfaUpdateSuccessful from "../components/MfaUpdateSuccessful";


function PersonalSettingsShell({match: {url}}){
    return(
        <Switch>
            <Route path={`${url}/settings`}>
                <PersonalSettings/>
            </Route>
            <Route path={`${url}/change-password`}>
                <ChangePasswordView/>
            </Route>
            <Route path={`${url}/mfa/update`}>
                <ChangeMfa/>
            </Route>
            <Route path={`${url}/mfa/authenticator-app-setup`}>
                <AuthenticatorAppSetup/>
            </Route>
            <Route path={`${url}/mfa/update-success`}>
                <MfaUpdateSuccessful/>
            </Route>
        </Switch>
    )
}

export default PersonalSettingsShell;