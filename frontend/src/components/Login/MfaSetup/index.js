import React, {useEffect, useState} from "react";
import Loading from "../../Loading";
import {AlertDanger, RegularText} from "../../common";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {goToLoginPath} from "../../../utils/login-utils";
import {useAppState} from "../../../state";
import MfaSetupView from "./MfaSetupView";
import {LEGACY_POST_AXIOS_CONFIG} from "../../../utils/form-utils";

const setupMfa = (values, history, setSubmitting, setCodesIncorrect) => {
    setSubmitting(true);
    const params = new URLSearchParams();
    params.append('tokenOne', values.tokenOne);
    params.append('tokenTwo', values.tokenTwo);

    axios.post("/auth/mfa/setup", params, LEGACY_POST_AXIOS_CONFIG)
        .then(({data}) => {
            if (data.success) {
                goToLoginPath(data.context);
            } else {
                setCodesIncorrect(true)
            }
        })
        .finally(() => setSubmitting(false))
};

const loadQrState = (setMfaCodeData, setIsLoading, setHasError) => {
    axios.get("/auth/mfa")
        .then(({data}) => {
            if (data.success) {
                setMfaCodeData(data)
            } else {
                setHasError(true)
            }
        })
        .finally(setIsLoading(false))
};


const MfaSetup = ({history}) => {
    const [mfaCodeData, setMfaCodeData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [codesIncorrect, setCodesIncorrect] = useState();
    const [{user}] = useAppState();

    useEffect(() => loadQrState(setMfaCodeData, setIsLoading, setHasError), []);

    if (user) return goToLoginPath(user);
    if (isLoading) return <Loading/>;
    if (hasError) return <AlertDanger><RegularText text="personalSettings.security.mfa.qrLoadError"/></AlertDanger>;
    return (
        <MfaSetupView mfaCodeData={mfaCodeData}
                      codesIncorrect={codesIncorrect}
                      setupMfa={(values, {setSubmitting}) => setupMfa(values, history, setSubmitting, setCodesIncorrect)}/>
    );
};

export default withRouter(MfaSetup);
