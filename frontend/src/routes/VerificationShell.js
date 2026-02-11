import React from "react";
import {Route, Switch} from "react-router-dom";

import BrowserUI from "../components/BrowserUI";
import PageNotFound from "../components/PageNotFound";
import {OrangeTrim} from "../components/Navbar/OrangeTrim";
import {BlueTrim} from "../components/Navbar/BlueTrim";
import VerifyAccountConfirmation from "../components/VerifyAccountConfirmation";
import VerifyAccount from "../components/VerifyAccount";
import EmailUpdateConfirmation from "../components/EmailUpdateConfirmation";
import EmailSubscriptionConfirmation from "../components/EmailSubscriptionVerification";
import EmailSubscriptionVerificationCancelled
    from "../components/EmailSubscriptionVerification/EmailSubscriptionVerificationCancelled";
import EmailSubscriptionVerificationConfirmed
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
                    <Route path={`${match.url}/email-verification/:code/:id`} component={EmailSubscriptionConfirmation}/>
                    <Route path={`${match.url}/email-verification-confirmation/cancelled`} component={EmailSubscriptionVerificationCancelled}/>
                    <Route path={`${match.url}/email-verification-confirmation/confirmed`} component={EmailSubscriptionVerificationConfirmed}/>
                    <Route path={`${match.url}/agent-authorisation/:code/:id`} component={AgentConsent}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default VerificationShell;
