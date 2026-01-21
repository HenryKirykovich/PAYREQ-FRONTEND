import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";

import BrowserUI from "../../BrowserUI";
import {
    Alert,
    LinkButton, RegularText,
    Select,
    SubmitButton
} from "../../common";
import { ALERT_TYPES } from "../../common/alerts/Alert";

import styles from "./SecurityDetailsCard.module.scss";

const MFA_TYPES = {
    authenticatorApp: "authenticator-app",
    email: "email",
    disabled: "disabled"
}

const updateMfa = (values, history, setSubmitting, setServerError) => {
    if (values.mfaType === MFA_TYPES.authenticatorApp) {
        history.push("./authenticator-app-setup")
    } else {
        setSubmitting(true)
        axios.post("/data/personal/settings/device-verification", values)
            .then(({ data }) => {
                if (data.success) {
                    return history.push("./update-success")
                } else {
                    return setServerError(data.error)
                }
            })
            .finally(setSubmitting(false))
    }
}

const schema = () => {
    return Yup.object().shape({
        mfaType: Yup.string()
            .required("forms.generic.required.label")
    })
}

const FormError = ({ error }) => (
    <Alert className={styles.formErrors} type={ALERT_TYPES.DANGER}>
        <RegularText text={`personalSettings.security.mfa.${error}`} />
    </Alert>
);


const ChangeMfaForm = ({ mfa, history }) => {
    const [serverError, setServerError] = useState()
    return (
        <Formik initialValues={{
            mfaType: mfa.active ? mfa.type : ""
        }}
            onSubmit={(values, { setSubmitting }) => updateMfa(values, history, setSubmitting, setServerError)}
            validationSchema={schema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleSubmit,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit} className={styles.changePasswordForm}>
                    <Select name="mfaType"
                        hint="personalSettings.security.mfa.typeDropdown.hint"
                        label="personalSettings.security.mfa.typeDropdown.label"
                        placeholder="personalSettings.security.mfa.typeDropdown.placeholder"
                        isPlaceholderOptionDisabled={false}
                        options={[
                            { value: MFA_TYPES.email, label: "personalSettings.security.mfa.typeDropdown.email" },
                            {
                                value: MFA_TYPES.authenticatorApp,
                                label: "personalSettings.security.mfa.typeDropdown.authenticator-app"
                            },
                            {
                                value: MFA_TYPES.disabled,
                                label: "personalSettings.security.mfa.typeDropdown.disabled"
                            },
                        ]}
                        value={values.mfaType}
                        onChange={handleChange}
                        error={errors.mfaType}
                        touched={touched.mfaType} />
                    {serverError && <FormError error={serverError} />}
                    <div className={styles.formButtonContainer}>
                        <SubmitButton
                            label={values.mfaType === MFA_TYPES.authenticatorApp ? "forms.generic.next.button" : "forms.generic.save.button"}
                            disabled={isSubmitting} />
                        <BrowserUI>
                            <LinkButton linkTo={{ pathname: "../settings" }}
                                label="forms.generic.cancel.button"
                                disabled={isSubmitting} />
                        </BrowserUI>
                    </div>
                </form>
            )}
        </Formik>
    )
};

export default withRouter(ChangeMfaForm)
