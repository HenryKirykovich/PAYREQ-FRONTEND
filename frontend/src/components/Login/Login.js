import React, {useState} from "react";

import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {useAppState} from "../../state";

import {goToLoginPath} from "../../utils/login-utils";
import LoginView from "./LoginView";
import {LEGACY_POST_AXIOS_CONFIG} from "../../utils/form-utils";
import {Helmet} from "react-helmet";

const onSubmit = (values, setSubmitting, setUsername, setServerErrors, setShowCreateMessage) => {
    setSubmitting(true);
    setServerErrors([]);
    setShowCreateMessage(false);

    const params = new URLSearchParams();
    params.append('username', values.username);
    axios.post(
        `/auth/check/username/login`,
        params, LEGACY_POST_AXIOS_CONFIG
    )
        .then(({data}) => {
            if(data.success) {
                if(data.userexists){
                    setUsername(values.username);
                } else {
                    setShowCreateMessage(true);
                }
            } else {
                setServerErrors(data.errors);
            }})
        .finally(() => setSubmitting(false));
};

const onSubmitLogin = (values, username, setSubmitting, setServerErrors, history) => {
    setSubmitting(true);
    setServerErrors([]);
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', values.password);

    axios.post(
        `/auth/login`,
        params, LEGACY_POST_AXIOS_CONFIG
    )
        .then(({data}) => {
            if(data.success) {
                if (data.context) {
                    switch(data.loginStatus) {
                        case 'user-verification-required':
                            history.push("../../verify/verify-account");
                            break;
                        case 'mfa-setup-required':
                            history.push("./mfa-setup");
                            break;
                        case 'mfa-verification-required':
                            history.push("./mfa");
                            break;
                        case 'device-verification-required':
                            history.push("./verify-device");
                            break;
                        case 'proceed-to-login':
                            goToLoginPath(data.context);
                            break;
                        default:
                            //do nothing

                    }
                }
            } else {
                setServerErrors([{message: 'invalid.password'}]);
            }})
        .finally(() => setSubmitting(false));
};





const Login = ({history}) => {
    const [serverErrors, setServerErrors] = useState([]);
    const [username, setUsername] = useState();
    const [showCreateAccountMessage, setShowCreateMessage] = useState(false);
    const [{user}] = useAppState();

    //already logged in go to billers
    //    <script src="http://localhost:3000/payreq-ui/xero-sso.js" type="text/javascript" />
    if (user) return goToLoginPath(user);
    return (
        <React.Fragment>
            <Helmet>
                <script src="/xero-sso.js" type="text/javascript" />
            </Helmet>
            <LoginView setUsername={setUsername}
                       setShowCreateMessage={setShowCreateMessage}
                       showCreateAccountMessage={showCreateAccountMessage}
                       serverErrors={serverErrors}
                       verifyEmail={(values, {setSubmitting}) => onSubmit(values, setSubmitting, setUsername, setServerErrors, setShowCreateMessage)}
                       username={username}
                       signIn={(values, {setSubmitting}) => onSubmitLogin(values, username, setSubmitting, setServerErrors, history)}/>
        </React.Fragment>
    );
};

export default injectIntl(withRouter(Login));
