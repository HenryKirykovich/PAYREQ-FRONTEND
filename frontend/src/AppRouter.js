import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import {useAppState} from "./state";
import UserShell from "./routes/UserShell";
import FastFormShell from "./routes/FastFormShell";
import PayShell from "./routes/PayShell";
import DailyDownloadShell from "./routes/DailyDownloadShell";
import PageNotFound from "./components/PageNotFound";
import {SET_CONFIG} from "./state/reducers/configReducer";
import Loading from "./components/Loading";
import {SET_ERROR} from "./state/reducers/errorReducer";
import ForgotPasswordShell from "./routes/ForgotPasswordShell";
import VerificationShell from "./routes/VerificationShell";
import {SET_USER_CONTEXT} from "./state/reducers/userReducer";
import SignUpShell from "./routes/SignUpShell";
import {getQueryParams} from "./utils/route-utils";
import ResetPasswordShell from "./routes/ResetPasswordShell";
import SamlShell from "./routes/SamlShell";
import ErrorShell from "./routes/ErrorShell";

const errorResponseHandler = (dispatch, error) => {
    const isUsingLocalErrorHandling = error.config.hasOwnProperty("localErrorHandling") && error.config.localErrorHandling === true;
    if (!isUsingLocalErrorHandling) {
        if (error.response.status === 401) {
            window.location.href = "/";
        } else {
            dispatch({
                type: SET_ERROR,
                error: error.response.data && error.response.data.error ? error.response.data.error : {id: null}
            })
        }
    }
    return Promise.reject(error);
};

const configureApiRequestDefaults = ({version}, dispatch) => {
    axios.defaults.headers.common["Cache-Control"] = "no-store";
    axios.defaults.headers.common[version.headerName] = version.current;
    axios.interceptors.response.use(
        response => response,
        error => errorResponseHandler(dispatch, error)
    );
};

const getCsrfToken = (setCsrfProccessed) => {
    axios.get("/sys/csrf", {headers: {"Cache-Control": "no-store"}})
        .then(({data: {token}}) => {
            if (token) {
                axios.defaults.headers.post["X-CSRF-Token"] = token;
                axios.defaults.headers.put["X-CSRF-Token"] = token;
                axios.defaults.headers.delete["X-CSRF-Token"] = token;
            }
            setCsrfProccessed(true)
        });
};

const getConfig = (setConfigProccessed, dispatch) => {
    const params = getQueryParams(window.location)
    axios.get('/sys/config', {headers: {"Cache-Control": "no-store"}})
        .then(function ({data: config}) {
            configureApiRequestDefaults(config, dispatch);
            dispatch({
                type: SET_CONFIG,
                config: {
                    ...config,
                    webView: !params.webBrowserView && (!!window.ReactNativeWebView || params.webView)
                },
            });
            setConfigProccessed(true);
        })
};

const RESTRICTED_ROUTE_PATH = "/portal/customer";
const LOGIN_PATH= `${RESTRICTED_ROUTE_PATH}/login`;
const RESTRICTED_ACCOUNT_PATH = `${RESTRICTED_ROUTE_PATH}/biller`;

const isRestrictedPath = () => window.location.pathname.startsWith(RESTRICTED_ROUTE_PATH);
const isLoginPath = () => window.location.pathname.startsWith(LOGIN_PATH);
const isRestrictedAccountPath = () =>  window.location.pathname.startsWith(RESTRICTED_ACCOUNT_PATH);

const doAuthChecks = (dispatch, setAuthChecksComplete) => {
    axios.get("/auth/login-session", {headers: {"Cache-Control": "no-store"}})
        .then(({data: {success, context}}) => {
            if (success) {
                dispatch({
                    type: SET_USER_CONTEXT,
                    user: context
                })
            } else if (isRestrictedPath() && !isLoginPath()) {
                if(isRestrictedAccountPath()){
                    sessionStorage.setItem('previousPath', window.location.pathname);
                }
                window.location.href = LOGIN_PATH;
            }
            setAuthChecksComplete(true);
        });
};

const AppRouter = () => {
    const [, dispatch] = useAppState();
    const [configProccessed, setConfigProccessed] = useState(false);
    const [csrfProccessed, setCsrfProccessed] = useState(false);
    const [authChecksComplete, setAuthChecksComplete] = useState(false);

    //Ideally auth checks would be in user/restricted shell
    // but some reason, we need to do auth checks first or the csrf token we get back is invalid
    useEffect(() => doAuthChecks(dispatch, setAuthChecksComplete), [dispatch, setAuthChecksComplete]);
    useEffect(() => {
        if (authChecksComplete) return getCsrfToken(setCsrfProccessed)}, [authChecksComplete, setCsrfProccessed]);
    useEffect(() => {
        if (authChecksComplete) return getConfig(setConfigProccessed, dispatch)}, [authChecksComplete, setConfigProccessed, dispatch]);

    const isLoading = !configProccessed || !csrfProccessed || !authChecksComplete;

    if (isLoading) return <Loading/>

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to={LOGIN_PATH}/>
                </Route>
                <Route path={RESTRICTED_ROUTE_PATH} component={UserShell}/>
                <Route path="/portal/sign-up" component={SignUpShell}/>
                <Route path="/portal/reset" component={ResetPasswordShell}/>
                <Route path="/fastform" component={FastFormShell}/>
                <Route path="/pay" component={PayShell}/>
                <Route path="/daily-download" component={DailyDownloadShell}/>
                <Route path="/forgot-password" component={ForgotPasswordShell}/>
                <Route path="/verify" component={VerificationShell}/>
                <Route path="/sso/saml" component={SamlShell}/>
                <Route path="/error" component={ErrorShell}/>
                <Route component={PageNotFound}/>
            </Switch>
        </Router>
    );
};

export default AppRouter;
