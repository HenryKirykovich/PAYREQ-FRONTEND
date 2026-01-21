import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import Loading from "../../Loading";
import CreateReckonRegistrationView from "./CreateReckonRegistrationView";

const getReckonConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/reckon`)
        .then(({data}) => setConfig(data));
};

const CreateReckonRegistration = ({payerId, match: {params: {registeringForbillerId}}, history}) => {
    const [config, setConfig] = useState();
    useEffect(() => getReckonConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId, setConfig]);

    if (!config) return <Loading/>;

    return <CreateReckonRegistrationView payerId={payerId}
                                         registeringForbillerId={registeringForbillerId}
                                         config={config}
    />;
};

export default withRouter(CreateReckonRegistration);
