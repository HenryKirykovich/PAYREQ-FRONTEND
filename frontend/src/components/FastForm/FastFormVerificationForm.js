import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";

import {LargeText, SubmitButton, TextInput} from "../common";
import styles from "./FastFormVerificationForm.module.scss";
import {injectIntl} from "react-intl";
import AlertDanger from "../common/alerts/AlertDanger";

const schema = Yup.object().shape({
        code: Yup.string().required("forms.generic.required.label").length(6, "fastForm.registration.verification.max.length"),
    });

const FormErrors = ({errors, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(({error}) => <li>{intl.formatMessage({id: "fastForm.registration.verification." + error})}</li>)}
            </ul>
        </AlertDanger>
    </div>
);


const FastFormVerificationForm = ({onSubmit, initialValues, email, formErrors,  intl}) => (

    <Formik initialValues={initialValues || {code: ""}}
            validationSchema={schema}
            onSubmit={onSubmit}>
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
          }) => (
            (

                <form onSubmit={handleSubmit}>
                    <LargeText text="fastForm.registration.verification.secondary.heading"  values={{emailVal: email}}/>
                    <TextInput key="code"
                               name="code"
                               label="fastForm.registration.code.label"
                               value={values.code}
                               onChange={handleChange}
                               error={errors.code}
                               touched={touched.code}
                    />

                    <SubmitButton label="fastForm.registration.button.label" disabled={isSubmitting}/>
                    {formErrors.length > 0 && <FormErrors errors={formErrors} intl={intl}/>}
                </form>
            )
        )}
    </Formik>
);

export default injectIntl(FastFormVerificationForm);