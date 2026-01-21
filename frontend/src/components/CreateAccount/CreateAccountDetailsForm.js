import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {Alert, Checkbox, Icon, LinkButton, RegularText, Select, SubmitButton, TextInput} from "../common";
import {Formik} from "formik";
import {ALERT_TYPES} from "../common/alerts/Alert";
import {LEGACY_POST_AXIOS_CONFIG, PASSWORD_YUP_VALIDATION} from "../../utils/form-utils";
import styles from "./CreateAccount.module.scss";
import PasswordStrengthMeter from "../PersonalSettings/SecurityDetailsCard/PasswordStrengthMeter";
import {injectIntl} from "react-intl";
import {
    ALL_COUNTRY_DROPDOWN_VALUES,
    BILLER_COUNTRY_DROPDOWN_VALUES
} from "../PersonalSettings/PersonalDetailsCard/constants";
import {DEFAULT_MAX_STRING_LENGTH} from "../../utils/form-utils";
import {withRouter} from "react-router-dom";
import * as QueryString from "query-string";
import BrowserUI from "../BrowserUI";

const countryAustralia = "AU";

const yesValue = "Y";
const noValue = "N";

export const IS_BUSINESS_DROPDOWN_VALUES = [
    {value: noValue, label: "forms.generic.false"},
    {value: yesValue, label: "forms.generic.true"},
]

export const getFieldError = (fldErrorMessage, serverError, intl) => {
    const containsError =  serverError &&  serverError.map(error => error.message).includes(fldErrorMessage);
    return containsError ? intl.formatMessage({id: "createAccount.error." + fldErrorMessage}) : null;
};

const createAccount = (values, username, fastpass, setServerErrors, setSubmitting, history) => {
    setSubmitting(true);

    const data = {...values,
        username: username,
        language: localStorage.getItem("language"),
        ...(fastpass ? {fastpass: fastpass} : {})
    }

    axios.post("/auth/register", QueryString.stringify(data), LEGACY_POST_AXIOS_CONFIG)
        .then(({data}) => {
            if (data.success) {
                //userExists when fastpass is used to create an account
                if (data.userExists){
                    window.location.href = "/customer#/registration/existingconfirmation";
                } else {
                    sessionStorage.removeItem('fastpass');
                    history.push("/verify/verify-account");
                }
            } else {
                if (data.badActivity) {
                    window.location.href = "/customer#/payer/error";
                } else {
                    setServerErrors(data.errors)
                }

            }
        })
        .finally(() => setSubmitting(false))
}

const schema = () => {
    return Yup.object().shape({
        firstname: Yup.string().required("forms.generic.required.label").max(DEFAULT_MAX_STRING_LENGTH, 'forms.generic.max.length.label'),
        surname: Yup.string().required("forms.generic.required.label").max(DEFAULT_MAX_STRING_LENGTH, 'forms.generic.max.length.label'),
        mobile: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, 'createAccount.error.mobile.max'),
        countryCode: Yup.string().required("forms.generic.required.label"),
        isBusiness: Yup.string().required("forms.generic.required.label"),
        company: Yup.string().when("isBusiness", {
            is: yesValue,
            then: Yup.string().required("forms.generic.required.label")
        }).max(DEFAULT_MAX_STRING_LENGTH, 'forms.generic.max.length.label'),
        newPassword: PASSWORD_YUP_VALIDATION,
        confirmPassword: Yup.string()
            .required("forms.generic.required.label")
            .oneOf([Yup.ref('newPassword'), null], "personalSettings.password.match"),
        termsAccepted: Yup.boolean().oneOf([true], "forms.generic.required.label")
    })
}

const FormError = ({errors, username}) => (
        <Alert className={styles.errorAlert} type={ALERT_TYPES.DANGER}>
            {errors.map(error => <RegularText text={`createAccount.error.${error.message}`} values={{username: username}} />)}
        </Alert>
);

const TermsAndConditionsLink = ({href, label, className, intl}) => (
    <div className={className}>
        <a target="_blank" href={href} rel="noopener noreferrer">
            {intl.formatMessage({id: label})}
            <Icon className={styles.icon} name="new-window"/>
        </a>

    </div>
)

function CreateAccountDetailsForm({username, fastpass, formDefaults, setUsername, history, intl}) {
    const [serverErrors, setServerErrors] = useState();

    return (
        <Formik initialValues={{
            firstname: "",
            surname: "",
            mobile: formDefaults.mobile || "",
            countryCode: formDefaults.country || "AU",
            isBusiness: "N",
            company: "",
            newPassword: "",
            confirmPassword: "",
            termsAccepted: false
        }}
                onSubmit={(values, {setSubmitting}) => createAccount(values, username, fastpass, setServerErrors, setSubmitting, history)}
                validationSchema={schema}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                  setFieldTouched,
                  handleBlur
              }) => (
                <form onSubmit={handleSubmit}>
                    <TextInput name="firstname"
                               placeholder="createAccount.firstname.label"
                               label="createAccount.firstname.label"
                               hint="createAccount.firstname.hint"
                               value={values.firstname}
                               onChange={handleChange}
                               error={errors.firstname || getFieldError('firstname.invalid' , serverErrors, intl)}
                               touched={touched.firstname}/>
                    <TextInput name="surname"
                               placeholder="createAccount.surname.label"
                               label="createAccount.surname.label"
                               hint="createAccount.surname.hint"
                               value={values.surname}
                               onChange={handleChange}
                               error={errors.surname || getFieldError('firstname.invalid', serverErrors, intl)}
                               touched={touched.surname}/>
                    <TextInput name="mobile"
                               placeholder="createAccount.mobile.label"
                               label="createAccount.mobile.label"
                               hint="createAccount.mobile.hint"
                               value={values.mobile}
                               onChange={handleChange}
                               error={errors.mobile}
                               touched={touched.mobile}/>

                    <Select name="countryCode"
                            label="createAccount.country.label"
                            placeholder="createAccount.country.label"
                            options={BILLER_COUNTRY_DROPDOWN_VALUES}
                            secondaryOptions={ALL_COUNTRY_DROPDOWN_VALUES}
                            value={values.countryCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.countryCode}
                            touched={touched.countryCode}/>

                    {values.countryCode === countryAustralia &&
                        <Select name="isBusiness"
                                label="createAccount.isBusiness.label"
                                placeholder="createAccount.isBusiness.label"
                                options={IS_BUSINESS_DROPDOWN_VALUES}
                                value={values.isBusiness}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.isBusiness}
                                touched={touched.isBusiness}/>}

                    {values.countryCode === countryAustralia && values.isBusiness === yesValue &&
                        <TextInput name="company"
                                   placeholder="createAccount.company.label"
                                   label="createAccount.company.label"
                                   hint="createAccount.company.hint"
                                   value={values.company}
                                   onChange={handleChange}
                                   error={errors.company || getFieldError('company.invalid', serverErrors, intl)}
                                   touched={touched.company}/>}

                    <div className={styles.newPassword}>
                        <TextInput type="password"
                                   placeholder="personalSettings.password.new"
                                   name="newPassword"
                                   label="personalSettings.password.new"
                                   hint="personalSettings.password.weak"
                                   value={values.newPassword}
                                   onChange={handleChange}
                                   error={errors.newPassword}
                                   touched={touched.newPassword}/>
                    </div>


                    <PasswordStrengthMeter password={values.newPassword}/>

                    <TextInput type="password"
                               placeholder="personalSettings.password.confirm"
                               name="confirmPassword"
                               label="personalSettings.password.confirm"
                               value={values.confirmPassword}
                               onChange={handleChange}
                               error={errors.confirmPassword}
                               touched={touched.confirmPassword}/>

                    <Checkbox name="termsAccepted"
                              value={values.termsAccepted}
                              onChange={() => setFieldValue("termsAccepted", !values.termsAccepted)}
                              onBlur={() => setFieldTouched("termsAccepted")}
                              error={errors.termsAccepted}
                              touched={touched.termsAccepted}
                    >
                        <span>{intl.formatMessage({id: "createAccount.terms.text"})}</span>
                        <TermsAndConditionsLink href={intl.formatMessage({id: 'footer.agreementURL'})} label="createAccount.terms.userAgreement" className={styles.terms} intl={intl}/>
                        <TermsAndConditionsLink href={intl.formatMessage({id: 'footer.termsURL'})} label="createAccount.terms.website" intl={intl}/>

                    </Checkbox>

                    {serverErrors && <FormError errors={serverErrors} username={username}/>}
                    <div className={styles.createAccountButtons}>
                        <SubmitButton label="createAccount.detailForm.submit" disabled={isSubmitting}/>
                        <BrowserUI>
                            <LinkButton label="createAccount.detailForm.back" onClick={()=> setUsername(null)}/>
                        </BrowserUI>

                    </div>
                </form>
            )}
        </Formik>
    )
}

export default withRouter(injectIntl(CreateAccountDetailsForm));
