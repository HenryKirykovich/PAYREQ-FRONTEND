import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import CreateMyobRegistrationView from './CreateMyobRegistrationView'

const getMyobConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/myob`)
        .then(({data}) => setConfig(data))
};

const submitRegistration = (values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, hasPaymentGateway) => {
    setSubmitting(true);
    axios.post(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/myob`, values)
        .then(({data}) => {
            if (data.success) {
                return history.push({
                    pathname: "./email/saved",
                    state: {
                        registeringForbillerId: registeringForbillerId,
                        accountNumber: values.accountNumber,
                        hasPaymentGateway: hasPaymentGateway
                    }
                });
            }
            setServerErrors(data.errors);
            setSubmitting(false);
        });
};

const CreateMyobRegistration = ({payerId, match: {params: {registeringForbillerId}}, history}) => {
    const [serverErrors, setServerErrors] = useState();
    const [config, setConfig] = useState();
    useEffect(() => getMyobConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId, setConfig]);
    if (!config) return <Loading/>;
    return <CreateMyobRegistrationView channel={config.channel}
                                       helpImageAccountNumber={config.helpImageAccountNumber}
                                       helpImageAuthItem1={config.helpImageAuthItem1}
                                       serverErrors={serverErrors}
                                       logoPath={config.logoPath}
                                       billerName={config.tagName}
                                       connection={config.connection}
                                       fastformRegistrationAcceptLabel={config.fastformRegistrationAcceptLabel}
                                       payerId={payerId}
                                       registeringForbillerId={registeringForbillerId}
                                       myobOrganisations={config.myobaccounts.map(({name, id, accounts}) => ({
                                           label: name,
                                           value: id,
                                           accounts: accounts
                                       }))}
                                       onSubmit={(values, setSubmitting) => submitRegistration(values, setSubmitting, payerId, registeringForbillerId, setServerErrors, history, config.hasPaymentGateway)}/>
};
export default withRouter(CreateMyobRegistration);
