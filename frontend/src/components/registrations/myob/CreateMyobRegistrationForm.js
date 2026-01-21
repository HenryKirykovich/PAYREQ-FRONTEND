import React from 'react';

import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {injectIntl} from "react-intl";
import {Formik} from "formik";
import EmailRegistrationVerificationFormFields from "../email/EmailRegistrationVerificationFormFields";
import {validateRegistrationAuthItems} from "../../../utils/registration-utils";
import {AlertDanger, Checkbox, LargeText, LinkButton, RegularText, Select, SubmitButton} from "../../common";
import {TAX_OPTIONS, AMOUNT_PAYABLE_OPTIONS} from "./constrants";
import * as Yup from "yup";
import {DEFAULT_MAX_STRING_LENGTH} from "../../../utils/form-utils";


export const getFieldError = (serverError, intl, fldErrorMessage, biller) => {
    const containsError =  serverError &&  serverError.map(error => error.message).includes(fldErrorMessage);
    return containsError ? intl.formatMessage({id: "registrations.createEmail." + serverError.error}, {
        ...containsError.values,
        account: biller.registrationContactIdField
    }) : null;
};

const FormErrors = ({errors, biller, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(({name, values}) =>
                    <li key={name}>{intl.formatMessage({id: "registrations.createEmail." + name + ".error"},
                        {
                            ...values,
                            account: biller.registrationContactIdField
                        })}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const getValidationSchema = (channel) => (
    Yup.object().shape({
            accountNumber: Yup.string().required("forms.generic.required.label").matches(new RegExp(channel.registrationContactIdFormat || '.+'), channel.registrationContactIdValidationMsg).max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth1: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth2: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth3: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth4: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            organisation: Yup.string().required("forms.generic.required.label"),
            tax: Yup.string().required("forms.generic.required.label"),
            amountPayable: Yup.string().required("forms.generic.required.label"),
            accept: Yup.boolean().oneOf([true], "forms.generic.required.label")
        }
    )
);

const CreateMyobRegistrationForm = ({channel, helpImageAccountNumber, helpImageAuthItem1, onSubmit, serverErrors, myobOrganisations, fastformRegistrationAcceptLabel, intl}) => {
    return (
        <Formik
            initialValues={{
                accountNumber: "",
                auth1: "",
                auth2: "",
                auth3: "",
                auth4: "",
                accept: false,
                organisation: "",
                tax: "",
                amountPayable: ""
            }}
            validationSchema={getValidationSchema(channel)}
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
                                                                 disabled={isSubmitting}/>
                        <LargeText text="registrations.createMyob.DetailsHeading"/>

                        <Select name="organisation"
                                label="registrations.createMyob.business.label"
                                placeholder="registrations.createMyob.business.placeholder"
                                hint="registrations.createMyob.business.hint"
                                options={myobOrganisations}
                                internationalisedOptions={false}
                                value={values.organisation}
                                onChange={handleChange}
                                error={errors.organisation}
                                touched={touched.organisation}/>

                        {values.organisation &&
                        <React.Fragment>
                            <Select name="tax"
                                    label="registrations.createMyob.tax.label"
                                    placeholder="registrations.createMyob.tax.placeholder"
                                    hint="registrations.createMyob.tax.hint"
                                    options={TAX_OPTIONS}
                                    value={values.tax}
                                    onChange={handleChange}
                                    error={errors.tax}
                                    touched={touched.tax}/>

                            <Select name="amountPayable"
                                    label="registrations.createMyob.amountPayable.label"
                                    placeholder="registrations.createMyob.amountPayable.placeholder"
                                    hint="registrations.createMyob.amountPayable.hint"
                                    options={AMOUNT_PAYABLE_OPTIONS}
                                    value={values.amountPayable}
                                    onChange={handleChange}
                                    error={errors.amountPayable}
                                    touched={touched.amountPayable}/>
                        </React.Fragment>
                        }

                        <RegularText text="fastForm.registration.accept.text"/>
                        <Checkbox name="accept"
                                  label={fastformRegistrationAcceptLabel || "fastForm.registration.accept.label"}
                                  value={values.accept}
                                  onChange={() => setFieldValue("accept", !values.accept)}
                                  onBlur={handleBlur}
                                  error={errors.accept}
                                  touched={touched.accept}
                                  disabled={isSubmitting}/>
                        <div className={styles.buttonContainer}>
                            <SubmitButton type="submit" label="registrations.createEmail.submitButton.label"
                                          isSubmitting={isSubmitting}/>
                            <LinkButton label="forms.generic.cancel.button" linkTo={"../../billers"}/>
                        </div>
                        {serverErrors && <FormErrors errors={serverErrors} biller={channel} intl={intl}/>}
                    </form>
                )
            )}
        </Formik>
    )
};

export default injectIntl(CreateMyobRegistrationForm);
