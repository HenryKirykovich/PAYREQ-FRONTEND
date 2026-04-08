import React from "react";
import {Route, Switch} from "react-router-dom";

import BrowserUI from "../components/BrowserUI";
import PageNotFound from "../components/PageNotFound";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import VerifyAccountConfirmation from "../components/VerifyAccountConfirmation";
import VerifyAccount from "../components/VerifyAccount";
import EmailUpdateConfirmation from "../components/EmailUpdateConfirmation";
import EmailConnectionConfirmation from "../components/EmailSubscriptionVerification";
import EmailConnectionVerificationCancelled
    from "../components/EmailSubscriptionVerification/EmailSubscriptionVerificationCancelled";
import EmailConnectionVerificationConfirmed
    from "../components/EmailSubscriptionVerification/EmailSubscriptionVerificationConfirmed";
import AgentConsent from "../components/AgentConsent";

const VerificationShell = ({match}) => {
    return (
        <React.Fragment>
            <BrowserUI>
                <BlueTrim />
            </BrowserUI>
            <OrangeTrim/>
            <div className="container">
                <Switch>
                    <Route path={`${match.url}/verify-account`}  render={() => <VerifyAccount/>}/>
                    <Route path={`${match.url}/verify-account-confirmation/:code/:id`} component={VerifyAccountConfirmation}/>
                    <Route path={`${match.url}/email-update-confirmation`} component={EmailUpdateConfirmation}/>
                    <Route path={`${match.url}/email-verification/:code/:id`} component={EmailConnectionConfirmation}/>
                    <Route path={`${match.url}/email-verification-confirmation/cancelled`} component={EmailConnectionVerificationCancelled}/>
                    <Route path={`${match.url}/email-verification-confirmation/confirmed`} component={EmailConnectionVerificationConfirmed}/>
                    <Route path={`${match.url}/agent-authorisation/:code/:id`} component={AgentConsent}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default VerificationShell;
