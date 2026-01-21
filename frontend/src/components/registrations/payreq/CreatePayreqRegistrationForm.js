import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {injectIntl} from "react-intl";
import {AlertDanger, Checkbox, LinkButton, RegularText, SubmitButton} from "../../common";
import EmailRegistrationVerificationFormFields from "../email/EmailRegistrationVerificationFormFields";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {validateRegistrationAuthItems} from "../../../utils/registration-utils";

const FormErrors = ({errors, biller, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(({name, values}) =>
                    <li key={name}>{intl.formatMessage({id: "registrations.createEmail." + name + ".error"},
                        {...values,
                        account: biller.registrationContactIdField})}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

export const getPayreqRegistrationValidationSchema = (channel) => {
    return Yup.object().shape({
        accountNumber: Yup.string().required("forms.generic.required.label").matches(new RegExp(channel.registrationContactIdFormat || '.+'), channel.registrationContactIdValidationMsg),
        auth1: Yup.string(),
        auth2: Yup.string(),
        auth3: Yup.string(),
        auth4: Yup.string(),
        accept: Yup.boolean().oneOf([true], "forms.generic.required.label"),
    })
};

export const getFieldError = (errors, fld, intl, biller) => {
    const err = errors.find(({field}) => field === fld);
    return err ? intl.formatMessage({id: "registrations.createEmail." + err.name + ".error"}, {
        ...err.values,
        account: biller.registrationContactIdField
    }) : null;
};

export const getEmailErrors = (errors, fld, intl, biller) => {
    const errs = errors.filter(({field}) => field === fld);
    return errs.length > 0 ? errs.map(err => intl.formatMessage({id: "registrations.createEmail." + err.name + ".error"}, {
        ...err.values,
        account: biller.registrationContactIdField
    })) : null;
};

const CreatePayreqRegistrationForm = ({channel, onSubmit, serverErrors = [], initialValues,helpImageAuthItem1, helpImageAccountNumber, fastformRegistrationAcceptLabel, intl}) => {
    return (
        <Formik
            initialValues={{
                accountNumber: "", auth1: "", auth2: "", auth3: "", auth4: "", accept: false,
                ...initialValues
            }}
            validationSchema={getPayreqRegistrationValidationSchema(channel)}
            validate={values => validateRegistrationAuthItems(intl, channel, values)}
            onSubmit={(values, {setSubmitting}) => onSubmit(values, setSubmitting)}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting
              }) => (
                (
                    <form onSubmit={handleSubmit}>
                        <EmailRegistrationVerificationFormFields biller={channel}
                                                                 values={values}
                                                                 errors={errors}
                                                                 touched={touched}
                                                                 helpImageAuthItem1={helpImageAuthItem1}
                                                                 helpImageAccountNumber={helpImageAccountNumber}
                                                                 handleChange={handleChange}
                                                                 formErrors={serverErrors}
                                                                 getFieldError={getFieldError}
                                                                 disabled={isSubmitting}
                        />

                        <RegularText text="fastForm.registration.accept.text"/>
                        <Checkbox name="accept"
                                  label={fastformRegistrationAcceptLabel || "registrations.createPayreq.accept.label"}
                                  value={values.accept}
                                  onChange={() => setFieldValue("accept", !values.accept)}
                                  onBlur={handleBlur}
                                  error={errors.accept}
                                  touched={touched.accept}
                                  disabled={isSubmitting}
                        />
                        <div className={styles.buttonContainer}>
                            <SubmitButton type="submit" label="registrations.createEmail.submitButton.label" isSubmitting={isSubmitting}/>
                            <LinkButton label="forms.generic.cancel.button" linkTo={"../../billers"}/>
                        </div>
                        {serverErrors.length > 0 && <FormErrors errors={serverErrors} biller={channel} intl={intl}/>}
                    </form>
                )
            )}
        </Formik>
    );
};

export default injectIntl(CreatePayreqRegistrationForm);
