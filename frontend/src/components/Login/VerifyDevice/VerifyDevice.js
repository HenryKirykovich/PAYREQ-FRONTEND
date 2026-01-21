import React, {useEffect, useState} from "react";

import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import axios from "axios";

import {useAppState} from "../../../state";
import {goToLoginPath} from "../../../utils/login-utils";
import Loading from "../../Loading";
import VerifyDeviceView from "./VerifyDeviceView";
import {LEGACY_POST_AXIOS_CONFIG} from "../../../utils/form-utils";


export const getUsername = (setIsLoading, setUsername) => {
    axios.get(`/auth/device/resend-email`)
        .then(({data}) => {
            setUsername(data.username);
            setIsLoading(false)
        });
};

const onSubmit = (values, setSubmitting, setServerError) => {
    setServerError();
    setSubmitting(true);
    const params = new URLSearchParams();
    params.append('code', values.code);
    params.append('trustedDevice', values.trustDevice);
    axios.post(
        `/auth/device/login`,
        params, LEGACY_POST_AXIOS_CONFIG
    )
        .then(({data}) => {
            if(data.success) {
                goToLoginPath(data.context);
            } else {
                setServerError(data);
            }})
        .finally(() => setSubmitting(false));
};

const VerifyDevice = ({history}) => {
    const [serverError, setServerError] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState();
    const [{user}] = useAppState();

    useEffect(
        () => getUsername(setIsLoading, setUsername),
        [setIsLoading, setUsername]
    );

    //already logged in go to billers
    if (user) return goToLoginPath(user);

    if (isLoading) return <Loading />

    return (
        <VerifyDeviceView serverError={serverError}
                          username={username}
                          cancel={()=>history.push("./login")}
                          onVeryDevice={(values, {setSubmitting}) => onSubmit(values, setSubmitting, setServerError)}/>
    );
};

export default injectIntl(withRouter(VerifyDevice));