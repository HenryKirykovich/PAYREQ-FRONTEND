import React, { useState } from 'react';
import { injectIntl } from "react-intl";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";

import { PASSWORD_YUP_VALIDATION } from "../../../utils/form-utils";
import BrowserUI from "../../BrowserUI";
import {
    AlertDanger,
    DefaultButton,
    LargeText,
    LinkButton,
    SubmitButton,
    TextInput,
} from "../../common";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

import styles from "./SecurityDetailsCard.module.scss";

const updatePasswordModal = (values, setServerErrors, setIsChanged, setSubmitting) => {
    axios.post(`/data/settings/password`, values)
        .then(({data}) => {
            if (data.success === true) {
                setIsChanged(true)
            } else {
                setServerErrors(data.errors);
            }
        })
        .finally(() => setSubmitting(false))
}

const updatePasswordSchema = () => {
    return Yup.object().shape({
        currentPassword: Yup.string()
            .required("forms.generic.required.label"),
        newPassword: PASSWORD_YUP_VALIDATION,
        confirmPassword: Yup.string()
            .required("forms.generic.required.label")
            .oneOf([Yup.ref('newPassword'), null], "personalSettings.password.match"),
    })
}

const FormErrors = ({errors, intl}) => (
    <div>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(e => <li
                    key={e}>{intl.formatMessage({id: "personalSettings.passwordChange.error." + e})}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const SuccessfulUpdate = () => {
    return (
        <React.Fragment>
            <LargeText text="personalSettings.password.updated"/>
            <BrowserUI>
                <DefaultButton label="personalSettings.backToSettings"
                    linkTo={{pathname: "./settings"}}
                />
            </BrowserUI>
        </React.Fragment>)
}


function ChangePasswordForm({intl}) {
    const [serverErrors, setServerErrors] = useState([]);
    const [isChanged, setIsChanged] = useState(false)

    if (isChanged) return <SuccessfulUpdate/>

    return (
        <Formik initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        }}
                onSubmit={(values, {setSubmitting}) => updatePasswordModal(values, setServerErrors, setIsChanged, setSubmitting)}
                validationSchema={updatePasswordSchema}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit} className={styles.changePasswordForm}>
                    <TextInput type="password"
                               name="currentPassword"
                               placeholder="personalSettings.password.current"
                               label="personalSettings.password.current"
                               value={values.currentPassword}
                               onChange={handleChange}
                               error={errors.currentPassword}
                               touched={touched.currentPassword}/>

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

                        {serverErrors && serverErrors.length > 0 && <FormErrors errors={serverErrors} intl={intl}/>}
                        <div className={styles.formButtonContainer}>
                            <SubmitButton label="forms.generic.save.button" disabled={isSubmitting}/>
                            <BrowserUI>
                                <LinkButton linkTo={{pathname: "./settings"}}
                                            label="forms.generic.cancel.button"
                                            disabled={isSubmitting}/>
                            </BrowserUI>
                        </div>
                </form>
            )}
        </Formik>
    )
}

export default injectIntl(ChangePasswordForm)
