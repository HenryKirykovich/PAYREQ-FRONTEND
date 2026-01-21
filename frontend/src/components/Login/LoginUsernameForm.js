import React from "react";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";

import {Alert, LinkButton, SubmitButton, TextInput} from "../common";
import * as Yup from "yup";
import styles from "./LoginUsernameForm.module.scss";
import RegularText from "../common/text/RegularText";

export const getFieldError = (serverErrors, intl) => {
    return serverErrors.length > 0 ? intl.formatMessage({id: "login.username." + serverErrors[0].message}) : null;
};

const schema = Yup.object().shape({
    username: Yup.string().trim().email("forms.generic.email.validation.label").required("forms.generic.required.label"),
});

const LoginUsernameForm =
    ({onSubmit, serverErrors, showCreateAccountMessage, history, intl}) => {
        return (
            <Formik
                initialValues={{
                    username: ""
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
                        <TextInput name="username"
                                   label="login.username.label"
                                   placeholder="login.username.placeholder"
                                   value={values.username}
                                   onChange={handleChange}
                                   error={errors.username || getFieldError(serverErrors, intl)}
                                   touched={touched.username}
                        />

                        <div className={styles.forgotPasswordContainer}>
                            <LinkButton label="login.forgotPasswordLink"
                                        onClick={() => history.push("../../forgot-password")}/>
                        </div>
                        {showCreateAccountMessage &&
                        <Alert type="warning" className={styles.alertContainer}>
                            <RegularText text="login.username.createAccount.message" className={styles.createAccountText}/>
                            <a href="/portal/sign-up">{intl.formatMessage({id: "login.username.createAccount.link"})} </a>
                        </Alert>
                        }

                        <div className={styles.nextbuttonContainer}>
                            <SubmitButton className={styles.nextButton} label="login.nextButton" disabled={isSubmitting}/>
                        </div>
                    </form>
                )}
            </Formik>

        )
    };

export default withRouter(LoginUsernameForm);