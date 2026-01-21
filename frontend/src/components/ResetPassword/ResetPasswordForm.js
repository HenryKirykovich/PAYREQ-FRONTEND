import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import PasswordStrengthMeter from "../PersonalSettings/SecurityDetailsCard/PasswordStrengthMeter";
import {Alert, RegularText, SubmitButton, TextInput} from "../common";
import {Formik} from "formik";
import styles from "./ResetPassword.module.scss";
import {injectIntl} from "react-intl";
import {goToLoginPath} from "../../utils/login-utils";
import {ALERT_TYPES} from "../common/alerts/Alert";
import {LEGACY_POST_AXIOS_CONFIG, PASSWORD_YUP_VALIDATION} from "../../utils/form-utils";

const resetPassword = (values, id, inviteCode, setServerError, setSubmitting) => {
    const data = new URLSearchParams();
    data.append('id', id);
    data.append('code', inviteCode);
    data.append('password', values.newPassword);
    axios.post("/auth/forgot/password/reset", data, LEGACY_POST_AXIOS_CONFIG)
        .then(({data}) => {
            if (!data.success) {
                setServerError(data.error)
            } else {
                goToLoginPath(data.context)
            }
        })
        .finally(() => setSubmitting(false))
}

const schema = () => {
    return Yup.object().shape({
        newPassword: PASSWORD_YUP_VALIDATION
        ,
        confirmPassword: Yup.string()
            .required("forms.generic.required.label")
            .oneOf([Yup.ref('newPassword'), null], "personalSettings.password.match")
    })
}

const FormError = ({error}) => (
        <Alert className={styles.errorAlert} type={ALERT_TYPES.DANGER}>
            <RegularText text={`resetPassword.error.${error}`} />
        </Alert>
);


function ResetPasswordForm({id, inviteCode, intl}) {
    const [serverError, setServerError] = useState();

    return (
        <Formik initialValues={{
            newPassword: "",
            confirmPassword: ""
        }}
                onSubmit={(values, {setSubmitting}) => resetPassword(values, id, inviteCode, setServerError, setSubmitting)}
                validationSchema={schema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.formInputsContainer}>

                        <div className={styles.newPassword}>
                            <TextInput type="password"
                                       placeholder="personalSettings.password.new"
                                       name="newPassword"
                                       label="personalSettings.password.new"
                                       hint="personalSettings.password.weak"
                                       value={values.newPassword}
                                       onChange={handleChange}
                                       error={errors.newPassword}
                                       touched={touched.newPassword}/>
                        </div>


                        <PasswordStrengthMeter password={values.newPassword}/>

                        <TextInput type="password"
                                   placeholder="personalSettings.password.confirm"
                                   name="confirmPassword"
                                   label="personalSettings.password.confirm"
                                   value={values.confirmPassword}
                                   onChange={handleChange}
                                   error={errors.confirmPassword}
                                   touched={touched.confirmPassword}/>
                    </div>

                    {serverError && <FormError error={serverError} intl={intl}/>}
                    <SubmitButton label="resetPassword.submit.button" disabled={isSubmitting}/>
                </form>
            )}
        </Formik>
    )
}

export default injectIntl(ResetPasswordForm)