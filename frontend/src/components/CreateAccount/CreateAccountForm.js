import React, {useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {Alert, LinkButton, RegularText, SubmitButton, TextInput} from "../common";
import {Formik} from "formik";
import {ALERT_TYPES} from "../common/alerts/Alert";
import styles from "./CreateAccount.module.scss";
import {LEGACY_POST_AXIOS_CONFIG} from "../../utils/form-utils";
import * as QueryString from "query-string";
import BrowserUI from "../BrowserUI";

const checkEmailForAccountCreation = (values, setSubmitting, setUsername, setServerErrors, setExistingUsername) => {
    setSubmitting(true);

    const data = {
        username: values.email
    };

    axios.post("/auth/check/username", QueryString.stringify(data), LEGACY_POST_AXIOS_CONFIG)
        .then(({data}) => {
            if (data.success) {
                setUsername(values.email)
            } else {
                if(data.badActivity){
                    window.location.href = "/customer#/payer/error";
                } else {
                    setServerErrors(data.errors)
                    setExistingUsername(values.email)
                    setSubmitting(false)
                }
            }

        })
}


const schema = () => {
    return Yup.object().shape({
        email: Yup.string().trim().email("forms.generic.email.validation.label").required("forms.generic.required.label")
    })
}

const FormError = ({errors, username}) => (
        <Alert className={styles.errorAlert} type={ALERT_TYPES.DANGER}>
            {errors.map(error => <RegularText text={`createAccount.error.${error.message}`} values={{username: username}}/>)}
        </Alert>
);

function CreateAccountForm({setUsername}) {
    const [serverErrors, setServerErrors] = useState();
    const [existingUsername, setExistingUsername] = useState();

    return (
        <Formik
            initialValues={{
                email: ""
            }}
            validationSchema={schema}
            onSubmit={(values, {setSubmitting}) => checkEmailForAccountCreation(values, setSubmitting, setUsername, setServerErrors, setExistingUsername)}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                        <TextInput name="email"
                                   placeholder="createAccount.email.placeholder"
                                   label="createAccount.email.label"
                                   hint="createAccount.email.hint"
                                   value={values.email}
                                   onChange={handleChange}
                                   error={errors.email}
                                   touched={touched.email}/>

                    {serverErrors && <FormError errors={serverErrors} username={existingUsername}/>}
                    <div className={styles.createAccountButtons}>
                        <SubmitButton label="createAccount.email.submit" disabled={isSubmitting}/>
                        <BrowserUI>
                            <LinkButton label="createAccount.email.backToLogin" linkTo="/portal/customer/login"/>
                        </BrowserUI>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default CreateAccountForm
