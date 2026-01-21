import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import CreateXeroRegistrationView from "./CreateXeroRegistrationView";

const getXeroConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/xeroconnect`)
        .then(({data}) => setConfig(data));
};

const submitRegistration = (values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, hasPaymentGateway) => {
    setSubmitting(true);
    axios.post(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/xeroconnect`, values)
        .then(({data}) => {
            if (data.success) {
                return history.push({
                    pathname: "./email/saved",
                    state: {
                        registeringForbillerId: registeringForbillerId,
                        accountNumber: values.accountNumber,
                        hasPaymentGateway: hasPaymentGateway
                    }});
                ;
            }
            setServerErrors(data.errors);
            setSubmitting(false);
        });
};

const CreateXeroRegistration = ({payerId, match: {params: {registeringForbillerId}}, history}) => {
    const [serverErrors, setServerErrors] = useState();
    const [config, setConfig] = useState();
    useEffect(() => getXeroConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId, setConfig]);

    if (!config) return <Loading/>;

    return <CreateXeroRegistrationView channel={config.channel}
                                       helpImageAccountNumber={config.helpImageAccountNumber}
                                       helpImageAuthItem1={config.helpImageAuthItem1}
                                       xeroOrganisations={config.xeroaccounts.map(({name, id, accounts}) => ({label: name, value: id, accounts: accounts}))}
                                       serverErrors={serverErrors}
                                       logoPath={config.logoPath}
                                       billerName={config.tagName}
                                       fastformRegistrationAcceptLabel={config.fastformRegistrationAcceptLabel}
                                       payerId={payerId}
                                       registeringForbillerId={registeringForbillerId}
                                       onSubmit={(values, setSubmitting) => submitRegistration(values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, config.hasPaymentGateway)}
    />;
};

export default withRouter(CreateXeroRegistration);
