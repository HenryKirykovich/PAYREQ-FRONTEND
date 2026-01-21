import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {injectIntl} from "react-intl";
import {AlertDanger, Checkbox, LargeText, LinkButton, RegularText, Select, SubmitButton} from "../../common";
import EmailRegistrationVerificationFormFields from "../email/EmailRegistrationVerificationFormFields";
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
                        {
                            ...values,
                            account: biller.registrationContactIdField
                        })}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const getFieldError = (errors, fld, intl, biller) => {
    const err = errors.find(({field}) => field === fld);
    return err ? intl.formatMessage({id: "registrations.createEmail." + err.name + ".error"}, {
        ...err.values,
        account: biller.registrationContactIdField
    }) : null;
};

const getValidationSchema = (channel) => (
    Yup.object().shape({
            accountNumber: Yup.string().required("forms.generic.required.label").matches(new RegExp(channel.registrationContactIdFormat || '.+'), channel.registrationContactIdValidationMsg).max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth1: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth2: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth3: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth4: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            organisation: Yup.string().required("forms.generic.required.label"),
            accountCode: Yup.string().required("forms.generic.required.label"),
            tax: Yup.string().required("forms.generic.required.label"),
            invoiceStatus: Yup.string().required("forms.generic.required.label"),
            amountPayable: Yup.string().required("forms.generic.required.label"),
            accept: Yup.boolean().oneOf([true], "forms.generic.required.label")
        }
    )
);

export const TAX_OPTIONS = [
    {value: "Inclusive", label: "registrations.createXero.tax.inclusive"},
    {value: "Exclusive", label: "registrations.createXero.tax.exclusive"},
    {value: "NoTax", label: "registrations.createXero.tax.notax"}
];

export const INVOICE_STATUS_OPTIONS = [
    {value: "DRAFT", label: "registrations.createXero.invoiceStatus.draft"},
    {value: "AUTHORISED", label: "registrations.createXero.invoiceStatus.authorised"},
    {value: "SUBMITTED", label: "registrations.createXero.invoiceStatus.submitted"}
];

export const AMOUNT_PAYABLE_OPTIONS = [
    {value: "TOTAL", label: "registrations.createXero.amountPayable.total"},
    {value: "MINIMUM", label: "registrations.createXero.amountPayable.minimum"}
];

const CreateXeroRegistrationForm = ({channel, helpImageAccountNumber, helpImageAuthItem1, xeroOrganisations, fastformRegistrationAcceptLabel, onSubmit, serverErrors = [], intl}) => {
    return (
        <Formik
            initialValues={{
                accountNumber: "", auth1: "", auth2: "", auth3: "", auth4: "", accept: false,
                organisation: "", accountCode: "", tax: "", invoiceStatus: "", amountPayable: ""
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
                                                                 disabled={isSubmitting}
                        />
                        <LargeText text="registrations.createXero.xeroDetailsHeading"/>
                        <Select name="organisation"
                                label="registrations.createXero.organisation.label"
                                placeholder="registrations.createXero.organisation.placeholder"
                                hint="registrations.createXero.organisation.hint"
                                options={xeroOrganisations}
                                internationalisedOptions={false}
                                value={values.organisation}
                                onChange={handleChange}
                                error={errors.organisation}
                                touched={touched.organisation}
                        />
                        {values.organisation && (
                            <React.Fragment>
                                <Select name="accountCode"
                                        label="registrations.createXero.accountCode.label"
                                        placeholder="registrations.createXero.accountCode.placeholder"
                                        hint="registrations.createXero.accountCode.hint"
                                        options={xeroOrganisations.find(({value}) => value === values.organisation).accounts.map(({code, displayName}) => ({
                                            value: code,
                                            label: displayName
                                        }))}
                                        internationalisedOptions={false}
                                        value={values.accountCode}
                                        onChange={handleChange}
                                        error={errors.accountCode}
                                        touched={touched.accountCode}
                                />
                                <Select name="tax"
                                        label="registrations.createXero.tax.label"
                                        placeholder="registrations.createXero.tax.placeholder"
                                        hint="registrations.createXero.tax.hint"
                                        options={TAX_OPTIONS}
                                        value={values.tax}
                                        onChange={handleChange}
                                        error={errors.tax}
                                        touched={touched.tax}
                                />
                                <Select name="invoiceStatus"
                                        label="registrations.createXero.invoiceStatus.label"
                                        placeholder="registrations.createXero.invoiceStatus.placeholder"
                                        hint="registrations.createXero.invoiceStatus.hint"
                                        options={INVOICE_STATUS_OPTIONS}
                                        value={values.invoiceStatus}
                                        onChange={handleChange}
                                        error={errors.invoiceStatus}
                                        touched={touched.invoiceStatus}
                                />
                                <Select name="amountPayable"
                                        label="registrations.createXero.amountPayable.label"
                                        placeholder="registrations.createXero.amountPayable.placeholder"
                                        hint="registrations.createXero.amountPayable.hint"
                                        options={AMOUNT_PAYABLE_OPTIONS}
                                        value={values.amountPayable}
                                        onChange={handleChange}
                                        error={errors.amountPayable}
                                        touched={touched.amountPayable}
                                />
                            </React.Fragment>
                        )
                        }


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
                            <SubmitButton type="submit" label="registrations.createEmail.submitButton.label"
                                          isSubmitting={isSubmitting}/>
                            <LinkButton label="forms.generic.cancel.button" linkTo={"../../billers"}/>
                        </div>
                        {serverErrors.length > 0 && <FormErrors errors={serverErrors} biller={channel} intl={intl}/>}
                    </form>
                )
            )}
        </Formik>
    );
};

export default injectIntl(CreateXeroRegistrationForm);
