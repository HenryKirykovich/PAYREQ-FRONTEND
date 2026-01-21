import React from "react";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";

import {Checkbox, SubmitButton, TextInput} from "../../common";
import * as Yup from "yup";

export const getFieldError = (serverError, intl) => {
    return serverError ? intl.formatMessage({id: "mfa." + serverError.error}) : null;
};

const schema = Yup.object().shape({
    mfacode: Yup.string().required("forms.generic.required.label")
});

const MfaForm =
    ({onSubmit, serverError, intl}) => {
        return (
            <Formik
                initialValues={{
                    mfacode: "",
                    rememberMfa: false
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
                      setFieldValue,
                      setFieldTouched,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                            <TextInput name="mfacode"
                                       label="mfa.code.label"
                                       placeholder="mfa.code.label"
                                       value={values.mfacode}
                                       onChange={handleChange}
                                       error={errors.mfacode || getFieldError(serverError, intl)}
                                       touched={touched.mfacode}
                                       autocomplete="off"
                            />
                            <Checkbox name="rememberMfa"
                                      label="mfa.rememberMfa.label"
                                      value={values.rememberMfa}
                                      onChange={() => setFieldValue("rememberMfa", !values.rememberMfa)}
                                      onBlur={() => setFieldTouched("rememberMfa")}
                                      error={errors.rememberMfa}
                                      touched={touched.rememberMfa}
                            />

                            <SubmitButton label="mfa.submitButton" disabled={isSubmitting}/>
                    </form>
                )}
            </Formik>

        )
    };

export default withRouter(MfaForm);