import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import CreatePayreqBillsRegistrationView from "./CreatePayreqBillsRegistrationView"
import {useAppState} from "../../../state";

const getPayreqConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/mybills-bills`)
        .then(({data}) => setConfig(data));
};

const submitRegistration = (values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, user, hasPaymentGateway) => {
    setSubmitting(true);
    axios.post(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/mybills-bills`, values)
        .then(({data}) => {
            if (data.success) {
                return history.push({
                    pathname: "./email/saved",
                    state: {
                        registeringForbillerId: registeringForbillerId,
                        accountNumber: values.accountNumber,
                        hasPaymentGateway: hasPaymentGateway
                    }});
            }
            setServerErrors(data.errors);
            setSubmitting(false);
        });
};

const CreatePayreqBillsRegistration = ({payerId, match: {params: {registeringForbillerId}}, history}) => {
    const [serverErrors, setServerErrors] = useState();
    const [config, setConfig] = useState();
    const [{user}] = useAppState();
    useEffect(() => getPayreqConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId, setConfig]);

    if (!config) return <Loading/>;

    return <CreatePayreqBillsRegistrationView channel={config.channel}
                                         serverErrors={serverErrors}
                                         user={user}
                                         helpImageAuthItem1={config.helpImageAuthItem1}
                                         helpImageAccountNumber={config.helpImageAccountNumber}
                                         logoPath={config.logoPath}
                                         billerName={config.tagName}
                                         fastformRegistrationAcceptLabel={config.fastformRegistrationAcceptLabel}
                                         onSubmit={(values, setSubmitting) => submitRegistration(values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, user, config.hasPaymentGateway)}/>;
};

export default withRouter(CreatePayreqBillsRegistration);
