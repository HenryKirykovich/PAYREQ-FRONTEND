import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useHistory} from "react-router-dom";
import {injectIntl} from "react-intl";
import AgentConsentView from "./AgentConsentView";
import Loading from "../Loading";

const AgentConsent = ({intl}) => {
    const {code, id} = useParams();
    const history = useHistory();
    const [model, setModel] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (code && id) {
            axios.get("/auth/agent-authorisation", {params: {code, id}})
                .then(({data}) => {
                    if (!data.invite) {
                        window.location.href = "/portal/customer/login";
                    } else {
                        setModel(data);
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    console.error("Error fetching agent authorisation:", err);
                    setIsLoading(false);
                });
        }
    }, [code, id]);

    const handleConfirmPassword = (password, mfacode) => {
        setError(null);
        axios.post("/auth/agent-authorisation/password", {
            id: model.invite.id,
            code: model.invite.code,
            password,
            token: mfacode
        })
            .then(({data}) => {
                if (data.success) {
                    setModel(data);
                    setError(null);
                } else {
                    if (data.message) {
                        const errorKey = `agentConsent.errors.${data.message}`;
                        try {
                            const errorMsg = intl.formatMessage({id: errorKey});
                            setError(errorMsg);
                        } catch (e) {
                            setError(intl.formatMessage(
                                {id: "agentConsent.verifyError"},
                                {billerName: model.invite.billerName}
                            ));
                        }
                    } else {
                        setError(intl.formatMessage(
                            {id: "agentConsent.verifyError"},
                            {billerName: model.invite.billerName}
                        ));
                    }
                }
            })
            .catch(err => {
                console.error("Error verifying password:", err);
                setError(intl.formatMessage({id: "agentConsent.verifyFail"}));
            });
    };

    const handleAuthoriseAccount = (account) => {
        setError(null);
        axios.post("/auth/agent-authorisation/authorise", {
            id: model.invite.id,
            code: model.invite.code,
            account
        })
            .then(({data}) => {
                if (data.success) {
                    alert(intl.formatMessage({id: "agentConsent.success"}));
                    window.location.href = "/portal/customer/login";
                } else {
                    if (data.message) {
                        const errorKey = `agentConsent.errors.${data.message}`;
                        try {
                            let errorMsg = intl.formatMessage({id: errorKey});
                            if (data.message === "existing.auth") {
                                errorMsg = intl.formatMessage(
                                    {id: errorKey},
                                    {billerName: model.invite.billerName}
                                );
                            }
                            setError(errorMsg);
                        } catch (e) {
                            setError(intl.formatMessage(
                                {id: "agentConsent.authoriseError"},
                                {billerName: model.invite.billerName}
                            ));
                        }
                    } else {
                        setError(intl.formatMessage(
                            {id: "agentConsent.authoriseError"},
                            {billerName: model.invite.billerName}
                        ));
                    }
                }
            })
            .catch(err => {
                console.error("Error authorising account:", err);
                setError(intl.formatMessage({id: "agentConsent.authoriseFail"}));
            });
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!model || !model.invite) {
        return null;
    }

    return (
        <AgentConsentView
            invite={model.invite}
            onConfirmPassword={handleConfirmPassword}
            onAuthoriseAccount={handleAuthoriseAccount}
            error={error}
        />
    );
};

export default injectIntl(AgentConsent);
