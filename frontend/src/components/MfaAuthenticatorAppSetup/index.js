import React, {useEffect, useState} from "react";
import Loading from "../Loading";
import {AlertDanger, PageHeading, RegularText} from "../common";
import axios from "axios";
import AuthenticatorAppSetupForm from "./AuthenticatorAppSetupForm";
import {withRouter} from "react-router-dom";

const loadQrState = (setMfaCodeData, setIsLoading, setHasError) => {
    axios.get("/data/personal/settings/mfa/qrcode")
        .then(({data}) => {
            if (data.success) {
                setMfaCodeData(data)
            } else {
                setHasError(true)
            }
        })
        .finally(setIsLoading(false))
};

const setupMfa = (values, history, setSubmitting, setCodesIncorrect) => {
    setSubmitting(true);
    axios.post("/data/personal/settings/mfa/setup", values)
        .then(({data}) => {
            if (data.success) {
                history.push("./update-success")
            } else {
                setCodesIncorrect(true)
            }
        })
        .finally(() => setSubmitting(false))
};


const AuthenticatorAppSetup = ({history}) => {
    const [mfaCodeData, setMfaCodeData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [codesIncorrect, setCodesIncorrect] = useState();

    useEffect(() => loadQrState(setMfaCodeData, setIsLoading, setHasError), []);

    if (isLoading) return <Loading/>;
    if (hasError) return <AlertDanger><RegularText text="personalSettings.security.mfa.qrLoadError"/></AlertDanger>;

    return (
        <React.Fragment>
            <PageHeading text="personalSettings.security.mfa.pageHeading"/>
            <AuthenticatorAppSetupForm mfaCodeData={mfaCodeData}
                                       codesIncorrect={codesIncorrect}
                                       linkTo={{pathname: "../settings"}}
                                       onSubmit={(values, {setSubmitting}) => setupMfa(values, history, setSubmitting, setCodesIncorrect)}/>
        </React.Fragment>
    );
};

export default withRouter(AuthenticatorAppSetup);
