import React from "react";
import {Formik} from "formik";
import {withRouter} from "react-router-dom";

import {Checkbox, SubmitButton, TextInput} from "../../common";
import * as Yup from "yup";

export const getFieldError = (serverError, intl) => {
    return serverError ? intl.formatMessage({id: "verifyDevice." + serverError.error}) : null;
};

const schema = Yup.object().shape({
    code: Yup.string().required("forms.generic.required.label")
});

const MfaForm =
    ({onSubmit, serverError, intl}) => {
        return (
            <Formik
                initialValues={{
                    code: "",
                    trustDevice: false
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
                            <TextInput name="code"
                                       label="verifyDevice.code.label"
                                       placeholder="verifyDevice.code.placeholder"
                                       value={values.mfacode}
                                       onChange={handleChange}
                                       error={errors.code || getFieldError(serverError, intl)}
                                       touched={touched.code}
                                       autocomplete="off"
                            />
                            <Checkbox name="trustDevice"
                                      label="verifyDevice.trustDevice.label"
                                      value={values.trustDevice}
                                      onChange={() => setFieldValue("trustDevice", !values.trustDevice)}
                                      onBlur={() => setFieldTouched("trustDevice")}
                                      error={errors.trustDevice}
                                      touched={touched.trustDevice}
                            />

                            <SubmitButton label="verifyDevice.submitButton" disabled={isSubmitting}/>
                    </form>
                )}
            </Formik>

        )
    };

export default withRouter(MfaForm);