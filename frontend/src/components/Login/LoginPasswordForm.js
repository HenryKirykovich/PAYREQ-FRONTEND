import React from "react";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";

import {LinkButton, SubmitButton, TextInput} from "../common";
import * as Yup from "yup";
import styles from "./LoginPasswordForm.module.scss";

export const getFieldError = (serverErrors, intl) => {
    return serverErrors.length > 0 ? intl.formatMessage({id: "login.password." + serverErrors[0].message}) : null;
};

const schema = Yup.object().shape({
    password: Yup.string().required("forms.generic.required.label"),
});

const LoginPasswordForm =
    ({onSubmit, serverErrors, history, intl}) => {
        return (
            <Formik
                initialValues={{
                    password: ""
                }}
                validationSchema={schema}
                onSubmit={onSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                            <TextInput name="password"
                                       type="password"
                                       label="login.password.label"
                                       placeholder="login.password.placeholder"
                                       value={values.password}
                                       onChange={handleChange}
                                       error={errors.password || getFieldError(serverErrors, intl)}
                                       touched={touched.password}
                            />

                        <div className={styles.forgotPasswordContainer}>
                            <LinkButton label="login.forgotPasswordLink"
                                        onClick={() => history.push("../../forgot-password")}/>
                        </div>
                        <div className={styles.nextbuttonContain}>
                            <SubmitButton className={styles.nextButton} label="login.password.submitButton" disabled={isSubmitting}/>
                        </div>
                    </form>
                )}
            </Formik>

        )
    };

export default withRouter(LoginPasswordForm);