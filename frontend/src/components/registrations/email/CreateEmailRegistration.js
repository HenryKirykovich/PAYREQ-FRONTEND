import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import CreateEmailRegistrationView from "./CreateEmailRegistrationView"
import {useAppState} from "../../../state";

const getEmailConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/email`)
        .then(({data}) => setConfig(data));
};

const submitRegistration = (values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, user, hasPaymentGateway) => {
    setSubmitting(true);
    axios.post(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/email`, values)
        .then(({data}) => {
            if (data.success) {
                return history.push({
                    pathname: "./email/saved",
                    state: {
                        emailsToVerify: values.emails.filter(email => email !== user.email),
                        registeringForbillerId: registeringForbillerId,
                        accountNumber: values.accountNumber,
                        hasPaymentGateway: hasPaymentGateway
                    }});
            }
            setServerErrors(data.errors);
            setSubmitting(false);
        });
};

const CreateEmailRegistration = ({payerId, match: {params: {registeringForbillerId}}, history}) => {
    const [serverErrors, setServerErrors] = useState();
    const [config, setConfig] = useState();
    const [{user}] = useAppState();
    useEffect(() => getEmailConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId, setConfig]);

    if (!config) return <Loading/>;

    return <CreateEmailRegistrationView channel={config.channel}
                                        helpImageAccountNumber={config.helpImageAccountNumber}
                                        helpImageAuthItem1={config.helpImageAuthItem1}
                                        serverErrors={serverErrors}
                                        user={user}
                                        logoPath={config.logoPath}
                                        billerName={config.tagName}
                                        fastformRegistrationAcceptLabel={config.fastformRegistrationAcceptLabel}
                                        onSubmit={(values, setSubmitting) => submitRegistration(values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, user, config.hasPaymentGateway)}/>;
};

export default withRouter(CreateEmailRegistration);
