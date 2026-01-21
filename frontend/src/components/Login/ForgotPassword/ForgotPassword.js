import React from "react";

import axios from "axios";
import {withRouter} from "react-router-dom";
import styles from "./ForgotPassword.module.scss";
import LoginCard from "../LoginCard";
import ForgotPasswordForm from "./ForgotPasswordForm";
import {LEGACY_POST_AXIOS_CONFIG} from "../../../utils/form-utils";

const onSubmit = (values, setSubmitting, history) => {
    setSubmitting(true);
    const params = new URLSearchParams();
    params.append('username', values.email);
    params.append('language', localStorage.getItem("language"))
    axios.post(
        `/auth/forgot/password`,
        params, LEGACY_POST_AXIOS_CONFIG
    )
        .then(() => {
            history.push("../../forgot-password/success")})
        .finally(() => setSubmitting(false));
};

const ForgotPassword = ({history}) => {
    return (<div className={styles.container}>
        <div className={styles.centerDiv}>
            {/*eslint-disable-next-line*/}
            <LoginCard heading="forgotPassword.pageHeading" text="forgotPassword.instructions">
                <ForgotPasswordForm onSubmit={(values, {setSubmitting}) => onSubmit(values, setSubmitting, history)}
                                    history={history}/>
            </LoginCard>
        </div>
    </div>
    );
};

export default withRouter(ForgotPassword);