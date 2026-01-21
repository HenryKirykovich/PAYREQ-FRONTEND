import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {injectIntl} from "react-intl";
import {AlertDanger, ArrayInput, Checkbox, LinkButton, RegularText, SubmitButton} from "../../common";
import EmailRegistrationVerificationFormFields from "./EmailRegistrationVerificationFormFields";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {validateRegistrationAuthItems} from "../../../utils/registration-utils";
import {DEFAULT_MAX_STRING_LENGTH} from "../../../utils/form-utils";

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

export const getEmailRegistrationValidationSchema = (channel) => {
    return Yup.object().shape({
        emails: Yup.array()
            .of(Yup.string().email("forms.generic.email.validation.label").required("forms.generic.required.label").max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"))
            .required('forms.generic.required.label')
            .min(1, 'Enter at least one email address'),
        accountNumber: Yup.string().required("forms.generic.required.label").matches(new RegExp(channel.registrationContactIdFormat || '.+'), channel.registrationContactIdValidationMsg).max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth1: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth2: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth3: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth4: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
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

const CreateEmailRegistrationForm = ({channel, helpImageAccountNumber, helpImageAuthItem1, fastformRegistrationAcceptLabel, onSubmit, serverErrors = [], initialValues, intl}) => {
    return (
        <Formik
            initialValues={{
                emails: [""], accountNumber: "", auth1: "", auth2: "", auth3: "", auth4: "", accept: false,
                ...initialValues
            }}
            validationSchema={getEmailRegistrationValidationSchema(channel)}
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
                                                                 helpImageAccountNumber={helpImageAccountNumber}
                                                                 helpImageAuthItem1={helpImageAuthItem1}
                                                                 handleChange={handleChange}
                                                                 formErrors={serverErrors}
                                                                 getFieldError={getFieldError}
                                                                 disabled={isSubmitting}
                        />

                        <ArrayInput name="emails"
                                    errors={errors.emails}
                                    groupErrors={getEmailErrors(serverErrors, "email", intl, channel)}
                                    values={values.emails}
                                    touched={touched.emails}
                                    hint="registrations.createEmail.emailsInputHint"
                                    label="registrations.createEmail.emaislInputLabel"
                                    ariaLabelIntlPrefix="registrations.createEmail"
                                    addLinkLabel="registrations.createEmail.addEmailButtonLabel"
                                    handleChange={handleChange}
                                    maxInputs={channel.maxNoDetails}
                                    disabled={isSubmitting}
                        />

                        <RegularText text="fastForm.registration.accept.text"/>
                        <Checkbox name="accept"
                                  label={fastformRegistrationAcceptLabel || "fastForm.registration.accept.label"}
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

export default injectIntl(CreateEmailRegistrationForm);
