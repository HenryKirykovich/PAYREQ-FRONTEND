import React from "react";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";

import {SubmitButton, TextInput} from "../../common";
import * as Yup from "yup";

const schema = Yup.object().shape({
    email: Yup.string().email("forms.generic.email.validation.label").required("forms.generic.required.label"),
});

const ForgotPasswordForm =
    ({onSubmit}) => {
        return (
            <Formik
                initialValues={{
                    email: ""
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
                            <TextInput name="email"
                                       label="forgotPassword.email.label"
                                       placeholder="forgotPassword.email.placeholder"
                                       value={values.email}
                                       onChange={handleChange}
                                       error={errors.email}
                                       touched={touched.email}
                            />

                        <SubmitButton label="forgotPassword.submitButton" disabled={isSubmitting}/>
                    </form>
                )}
            </Formik>

        )
    };

export default withRouter(ForgotPasswordForm);