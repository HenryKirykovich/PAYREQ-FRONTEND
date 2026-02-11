import React, {useState} from "react";
import {Panel, FormControl, Button, Alert} from "react-bootstrap";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";
import styles from "./AgentConsent.module.scss";

const AgentConsentView = ({invite, onConfirmPassword, onAuthoriseAccount, error, intl}) => {
    const [password, setPassword] = useState("");
    const [mfaCode, setMfaCode] = useState("");
    const [selectedAccount, setSelectedAccount] = useState(invite?.accounts?.[0]?.id || "");

    const textLine1 = intl.formatMessage(
        {id: "agentConsent.textLine1"},
        {billerName: invite.billerName}
    );
    const textLine2 = intl.formatMessage(
        {id: "agentConsent.textLine2"},
        {billerName: invite.billerName}
    );
    const loginLine1 = intl.formatMessage(
        {id: "agentConsent.loginLine1"},
        {billerName: invite.billerName}
    );
    const loginLine2 = intl.formatMessage(
        {id: "agentConsent.loginLine2"},
        {uid: invite.uid}
    );

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        onConfirmPassword(password, mfaCode);
    };

    const handleAuthoriseSubmit = (e) => {
        e.preventDefault();
        onAuthoriseAccount(selectedAccount);
    };

    if (invite.error) {
        return (
            <div className="row" id="invite">
                <div className="col-md-8 col-md-offset-2">
                    <Panel className="agent-card">
                        <Panel.Heading>
                            <h2 className="panel-title">
                                {intl.formatMessage({id: "agentConsent.heading"})}
                            </h2>
                        </Panel.Heading>
                        <Panel.Body>
                            <Alert bsStyle="danger">
                                <p>{invite.error}</p>
                            </Alert>
                            <form className="form-login form-horizontal" role="form">
                                <div className="col-sm-12">
                                    <div className="btn-toolbar pull-right margin-top-sm">
                                        <Link to="/portal/customer/login" className="btn btn-default">
                                            <span>{intl.formatMessage({id: "agentConsent.backButton"})}</span>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Panel.Body>
                    </Panel>
                </div>
            </div>
        );
    }

    if (invite.passwordVerified) {
        // Password verified - show account selection
        return (
            <div className="row" id="invite">
                <div className="col-md-8 col-md-offset-2">
                    <Panel className="agent-card">
                        <Panel.Heading>
                            <h2 className="panel-title">
                                {intl.formatMessage({id: "agentConsent.heading"})}
                            </h2>
                        </Panel.Heading>
                        <Panel.Body>
                            <p>{textLine1}</p>
                            <p>{textLine2}</p>

                            {error && (
                                <Alert bsStyle="danger">
                                    {error}
                                </Alert>
                            )}

                            <form className="form-login form-horizontal" role="form" onSubmit={handleAuthoriseSubmit}>
                                <div className="form-group">
                                    <label className="control-label col-sm-4">
                                        {intl.formatMessage({id: "agentConsent.accountLabel"})}
                                    </label>
                                    <div className="form-control-static col-sm-8">
                                        <FormControl
                                            componentClass="select"
                                            className="form-control"
                                            value={selectedAccount}
                                            onChange={(e) => setSelectedAccount(e.target.value)}
                                        >
                                            {invite.accounts && invite.accounts.map(account => (
                                                <option key={account.id} value={account.id}>
                                                    {account.tagName}
                                                </option>
                                            ))}
                                        </FormControl>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="btn-toolbar pull-right margin-top-sm">
                                        <Button bsStyle="primary" type="submit">
                                            {intl.formatMessage({id: "agentConsent.submitButton"})}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Panel.Body>
                    </Panel>
                </div>
            </div>
        );
    }

    // Show password entry form
    return (
        <div className="row" id="invite">
            <div className="col-md-8 col-md-offset-2">
                <Panel className="agent-card">
                    <Panel.Heading>
                        <h2 className="panel-title">
                            {intl.formatMessage({id: "agentConsent.heading"})}
                        </h2>
                    </Panel.Heading>
                    <Panel.Body>
                        <p>{loginLine1}</p>
                        <p>{loginLine2}</p>

                        {error && (
                            <Alert bsStyle="danger">
                                {error}
                            </Alert>
                        )}

                        <form className="form-login form-horizontal" role="form" onSubmit={handlePasswordSubmit}>
                            <div className="form-group">
                                <label className="control-label col-sm-4">
                                    {intl.formatMessage({id: "agentConsent.passwordLabel"})}
                                </label>
                                <p className="form-control-static col-sm-8">
                                    <FormControl
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        id="password"
                                    />
                                </p>
                            </div>
                            {invite.mfaRequired && (
                                <div className="form-group">
                                    <label className="control-label col-sm-4">
                                        {intl.formatMessage({id: "agentConsent.mfaLabel"})}
                                    </label>
                                    <p className="form-control-static col-sm-8">
                                        <FormControl
                                            type="text"
                                            className="form-control"
                                            value={mfaCode}
                                            onChange={(e) => setMfaCode(e.target.value)}
                                            id="mfaCode"
                                        />
                                    </p>
                                </div>
                            )}
                            <div className="col-sm-12">
                                <div className="btn-toolbar pull-right margin-top-sm">
                                    <Button bsStyle="primary" type="submit">
                                        {intl.formatMessage({id: "agentConsent.verifyButton"})}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Panel.Body>
                </Panel>
            </div>
        </div>
    );
};

export default injectIntl(AgentConsentView);
