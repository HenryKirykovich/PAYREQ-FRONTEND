import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import RegistrationView from "./RegistrationView";
import Loading from "../../Loading";
import PayreqRegistrationView from "./PayreqRegistrationView";

const getRegistration = (registrationId, setResponse) => {
    axios.get(`/data/payerregistrations/v2/${registrationId}`)
        .then(({data}) => setResponse(data));
};

const resendVerificationEmail = (id, isResending, setResendResult) => {
    isResending(true);
    axios.post("/data/payerregistrations/resend", {id: id})
        .then(({data}) => {
            isResending(false);
            setResendResult({id, message: data.error || "registration.view.resendVerificationEmail.sent"})})
};

const Registration = ({match: {params: {registrationId}}}) => {
    const [response, setResponse] = useState();
    useEffect(
        () => getRegistration(registrationId, setResponse),
        [registrationId, setResponse]
    );
    if (!response) return <Loading/>;


    if(response.registration.channelPartnerSystemId === "mybills") {
        return <PayreqRegistrationView registration={response.registration}
                                       lastBill={response.lastBill}
        />
    } else {
        return <RegistrationView registration={response.registration}
                                 lastBill={response.lastBill}
                                 autoPayment={response.autoPayment}
                                 payable={response.payable}
                                 onResendVerificationEmail={resendVerificationEmail}
        />
    };
};

export default withRouter(Registration);