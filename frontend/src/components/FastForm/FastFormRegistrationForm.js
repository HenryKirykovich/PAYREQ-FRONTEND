import React from "react";
import {Formik} from "formik";
import {injectIntl} from "react-intl";
import * as Yup from "yup";
import {TextInput, AlertDanger, Checkbox, RegularText, SecondaryHeading, SubmitButton} from "../common";
import EmailRegistrationVerificationFormFields from "../registrations/email/EmailRegistrationVerificationFormFields";
import {DEFAULT_MAX_STRING_LENGTH} from "../../utils/form-utils";
import styles from "./FastFormRegistrationForm.module.scss";
import {validateRegistrationAuthItems} from "../../utils/registration-utils";

export const getFieldError = (formErrors, fld, intl, biller) => {
    const err = formErrors.find(({field}) => field === fld);
    return err ? intl.formatMessage({id: "fastForm.registration.create." + err.error}, {account: biller.registrationContactIdField}) : null;
};

function getValidationSchema(biller) {
    return Yup.object().shape({
        email: Yup.string().trim().email("forms.generic.email.validation.label").required("forms.generic.required.label").max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        phone: Yup.string().required("forms.generic.required.label").max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        accountNumber: Yup.string().required("forms.generic.required.label").matches(new RegExp(biller.registrationContactIdFormat || '.+'), biller.registrationContactIdValidationMsg).max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth1: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth2: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth3: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        auth4: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        accept: Yup.boolean().oneOf([true], "forms.generic.required.label"),
    })
}

const FormErrors = ({errors, biller, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(({error}) =>
                    <li>{intl.formatMessage({id: "fastForm.registration.create." + error}, {account: biller.registrationContactIdField})}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const FastFormRegistrationForm = ({onSubmit, biller, initialValues, formErrors, intl}) => {

    // Build initial values from URL params, respecting biller configuration
    const values = {
        email: "",
        phone: "",
        accountNumber: initialValues['accountNumber'] || "",
        auth1: biller.useAuthItem1 && initialValues['auth1'] ? initialValues['auth1'] : "",
        auth2: biller.useAuthItem2 && initialValues['auth2'] ? initialValues['auth2'] : "",
        auth3: biller.useAuthItem3 && initialValues['auth3'] ? initialValues['auth3'] : "",
        auth4: biller.useAuthItem4 && initialValues['auth4'] ? initialValues['auth4'] : "",
        accept: false
    };

    return (
    <Formik initialValues={values}
            validationSchema={getValidationSchema(biller)}
            validate={values => validateRegistrationAuthItems(intl, biller, values)}
            onSubmit={onSubmit}
            validateOnBlur={false}
            validateOnChange={false}
    >
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              setFieldTouched,
              isSubmitting
          }) => (
            (

                <form onSubmit={handleSubmit}>
                    <TextInput key="email"
                               name="email"
                               label={biller.fastformRegistrationEmailLabel || "fastForm.registration.email.label"}
                               value={values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.email || getFieldError(formErrors, "email", intl, biller)}
                               touched={touched.email}
                    />
                    <TextInput key="phone"
                               name="phone"
                               label={biller.fastformRegistrationPhoneLabel || "fastForm.registration.phone.label"}
                               value={values.phone}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.phone}
                               touched={touched.phone}
                    />

                    <div className={styles.padHeading}>
                        <SecondaryHeading text={biller.fastformRegistrationVerificationHeading || "fastForm.registration.verification.heading"}/>
                    </div>
                    {biller.fastformRegistrationVerificationSubHeading && <RegularText text={biller.fastformRegistrationVerificationSubHeading}
                                                                                       data-testid="fastform-registration-verification-sub-heading"/>}
                    <EmailRegistrationVerificationFormFields biller={biller}
                                                             values={values}
                                                             errors={errors}
                                                             touched={touched}
                                                             helpImageAccountNumber={biller.helpImageAccountNumber}
                                                             helpImageAuthItem1={biller.helpImageAuthItem1}
                                                             handleChange={handleChange}
                                                             handleBlur={handleBlur}
                                                             formErrors={formErrors}
                                                             getFieldError={getFieldError}
                    />
                    <RegularText text="fastForm.registration.accept.text"/>
                    <Checkbox name="accept"
                              label={biller.fastformRegistrationAcceptLabel || "fastForm.registration.accept.label"}
                              value={values.accept}
                              onChange={() => setFieldValue("accept", !values.accept)}
                              onBlur={() => setFieldTouched("accept")}
                              error={errors.accept}
                              touched={touched.accept}
                    />
                    <SubmitButton type="submit" label="forms.generic.next.button" disabled={isSubmitting}/>
                    {formErrors.length > 0 && <FormErrors errors={formErrors} biller={biller} intl={intl}/>}
                </form>
            )
        )}
    </Formik>
    );
};

export default injectIntl(FastFormRegistrationForm);
