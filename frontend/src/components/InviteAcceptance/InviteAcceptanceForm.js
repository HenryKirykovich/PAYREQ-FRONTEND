import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import PasswordStrengthMeter from "../PersonalSettings/SecurityDetailsCard/PasswordStrengthMeter";
import {Alert, Checkbox, RegularText, SubmitButton, TextInput} from "../common";
import {Formik} from "formik";
import styles from "./InviteAcceptance.module.scss";
import {injectIntl} from "react-intl";
import {goToLoginPath} from "../../utils/login-utils";
import {ALERT_TYPES} from "../common/alerts/Alert";
import {DEFAULT_MAX_STRING_LENGTH, LEGACY_POST_AXIOS_CONFIG, PASSWORD_YUP_VALIDATION} from "../../utils/form-utils";

const acceptInvite = (values, email, inviteCode, userId, setServerError, setSubmitting) => {
    const data = new URLSearchParams();
    data.append('code', inviteCode);
    data.append('uid', email);
    data.append('userId', userId);
    data.append('name', values.name);
    data.append('password', values.newPassword);
    data.append('termsAccepted', values.termsAccepted);
    axios.post("/auth/invite", data, LEGACY_POST_AXIOS_CONFIG)
        .then(({data}) => {
            if (!data.success) {
                setServerError(data.error)
            } else {
                goToLoginPath(data.context)
            }
        })
        .finally(() => setSubmitting(false))
}

const schema = () => {
    return Yup.object().shape({
        name: Yup.string()
            .required("forms.generic.required.label")
            .max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
        newPassword: PASSWORD_YUP_VALIDATION,
        confirmPassword: Yup.string()
            .required("forms.generic.required.label")
            .oneOf([Yup.ref('newPassword'), null], "personalSettings.password.match"),
        termsAccepted: Yup.boolean().oneOf([true], "forms.generic.required.label"),
    })
}

const FormError = ({error}) => (
        <Alert className={styles.errorAlert} type={ALERT_TYPES.DANGER}>
            <RegularText text={`inviteAcceptance.error.${error}`} />
        </Alert>
);


function InviteAcceptanceForm({name, email, inviteCode, userId, intl}) {
    const [serverError, setServerError] = useState();

    return (
        <Formik initialValues={{
            name: name || "",
            newPassword: "",
            confirmPassword: "",
            termsAccepted: false,
        }}
                onSubmit={(values, {setSubmitting}) => acceptInvite(values, email, inviteCode, userId, setServerError, setSubmitting)}
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
                  setFieldTouched
              }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.formInputsContainer}>
                        <TextInput name="name"
                                   placeholder="settings.contactDetails.name"
                                   label="settings.contactDetails.name"
                                   value={values.name}
                                   onChange={handleChange}
                                   error={errors.name}
                                   touched={touched.name}/>

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
                    </div>
                    <Checkbox name="termsAccepted"
                              value={values.termsAccepted}
                              onChange={() => setFieldValue("termsAccepted", !values.termsAccepted)}
                              onBlur={() => setFieldTouched("termsAccepted")}
                              error={errors.termsAccepted}
                              touched={touched.termsAccepted}
                    >
                        <span>{intl.formatMessage({id: "terms.text"})}</span>
                        <div><a target="_blank" href={intl.formatMessage({id: 'footer.agreementURL'})} rel="noopener noreferrer">
                            {intl.formatMessage({id: "terms.link"})}
                        </a></div>
                    </Checkbox>


                    {serverError && <FormError error={serverError} intl={intl}/>}
                    <SubmitButton label="forms.generic.signUp.button" disabled={isSubmitting}/>
                </form>
            )}
        </Formik>
    )
}

export default injectIntl(InviteAcceptanceForm)
