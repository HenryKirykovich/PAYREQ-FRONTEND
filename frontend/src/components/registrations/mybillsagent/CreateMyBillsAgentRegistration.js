import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import CreateMyBillsAgentRegistrationView from "./CreateMyBillsAgentRegistrationView";

const getEmailConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/mybillsagent`)
        .then(({data}) => setConfig(data));
};

const submitRegistration = (values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history) => {
    setSubmitting(true);
    axios.post(
        `/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/bulk/mybillsagent/v2`,
        {
            bulkregistrations: values.registrations,
            accept: values.accept,
            "is-biller": false
        })
        .then(({data}) => {
            if (data.success) {
                return history.push({
                    pathname: "./mybillsagent/saved",
                    state: {
                        registrationsCreated: data.registrationsCreated,
                        registrationsExisting: data.registrationsExisting,
                        hasDownloadPreference: data.hasDownloadPreference
                    }
                });
            }
            setServerErrors(data.errors);
            setSubmitting(false);
        });
};

const CreateMyBillsAgentRegistration = ({payerId, match: {params: {registeringForbillerId}}, history}) => {
    const [serverErrors, setServerErrors] = useState();
    const [config, setConfig] = useState();
    useEffect(() => getEmailConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId, setConfig]);

    if (!config) return <Loading/>;

    return <CreateMyBillsAgentRegistrationView channel={config.channel}
                                               serverErrors={serverErrors}
                                               logoPath={config.logoPath}
                                               billerName={config.tagName}
                                               fastformRegistrationAcceptLabel={config.fastformRegistrationAcceptLabel}
                                               onSubmit={(values, setSubmitting) => submitRegistration(values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history)}
    />;
};

export default withRouter(CreateMyBillsAgentRegistration);
