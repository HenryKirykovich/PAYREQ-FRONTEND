import React, {useState} from "react";

import {withRouter} from "react-router-dom";
import axios from "axios";
import {useAppState} from "../../../state";
import {goToLoginPath} from "../../../utils/login-utils";
import MfaView from "./MfaView";
import {LEGACY_POST_AXIOS_CONFIG} from "../../../utils/form-utils";

const onSubmit = (values, setSubmitting, setServerError) => {
    setSubmitting(true);
    setServerError();
    const params = new URLSearchParams();
    params.append('token', values.mfacode);
    params.append('trustedDevice', values.rememberMfa);
    axios.post(
        `/auth/mfa/login`,
        params, LEGACY_POST_AXIOS_CONFIG
    )
        .then(({data}) => {
            if (data.success) {
                goToLoginPath(data.context);
            } else {
                setServerError(data);
            }
        })
        .finally(() => setSubmitting(false));
};
const Mfa = ({history}) => {
    const [serverError, setServerError] = useState();
    const [{user}] = useAppState();

    //already logged in go to billers
    if (user) return goToLoginPath(user);

    return (
        <MfaView serverError={serverError}
                 submitMfa={(values, {setSubmitting}) => onSubmit(values, setSubmitting, setServerError)}
                 switchAccount={() => history.push("./login")}/>
    );
};

export default withRouter(Mfa);