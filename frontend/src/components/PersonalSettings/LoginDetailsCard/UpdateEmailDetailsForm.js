import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import {AlertDanger, LinkButton, Modal, SubmitButton, TextInput, RegularText, Select} from "../../common";
import modalStyles from "../../common/Modal/Modal.module.scss";
import styles from "./LoginDetailsCard.module.scss";

const UPDATE_DROPDOWN_VALUES = [
    {value: "true", label: "forms.generic.true"},
    {value: "false", label: "forms.generic.false"},
];
function updateEmailAddress(values, setServerError, setServerMsg, setIsUpdateComplete, setSubmitting) {
    axios.post(`/data/personal/settings/email`,
        {...values,
            updateSubscriptionEmail: values.updateSubscriptionEmail === "true"})
        .then(({data}) => {
            if (data.success === true) {
                setServerMsg(values.email)
                setIsUpdateComplete(true)
            } else {
                setServerError(data.error);
            }
        })
        .finally(() => setSubmitting(false))
}

const updateEmailSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .trim()
            .email("personalSettings.email.validation.label")
            .required("forms.generic.required.label"),
        password: Yup.string()
            .required("forms.generic.required.label"),
    })
}


const FormErrors = ({errors}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            <RegularText text={"forms.formLevelErrors"}/>
            {errors && <RegularText text={`personalSettings.email.error.${errors}`}/>}
        </AlertDanger>
    </div>
);

function UpdateEmailDetailsForm({setServerMsg, setIsUpdateComplete, onCancel, intl}) {
    const [serverError, setServerError] = useState("");
    return (
        <Formik
            initialValues={{email: "", password: "", updateSubscriptionEmail: "true"}}
            validationSchema={updateEmailSchema}
            onSubmit={(values, {setSubmitting}) => {
                updateEmailAddress(values, setServerError, setServerMsg, setIsUpdateComplete, setSubmitting)
            }}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <TextInput key="email"
                                   name="email"
                                   label="personalSettings.email.newEmail.label"
                                   placeholder="personalSettings.email.newEmail.placeholder"
                                   value={values.email}
                                   onChange={handleChange}
                                   error={errors.email}
                                   touched={touched.email}/>

                        <TextInput type="password"
                                   key="password"
                                   name="password"
                                   label="personalSettings.password"
                                   placeholder="personalSettings.email.newEmail.passwordPlaceholder"
                                   value={values.password}
                                   onChange={handleChange}
                                   error={errors.password}
                                   touched={touched.password}/>

                        <Select name="updateSubscriptionEmail"
                                hint="personalSettings.email.update.notification"
                                label="personalSettings.email.update.connection"
                                placeholder="personalSettings.email.update.connection"
                                options={UPDATE_DROPDOWN_VALUES}
                                value={values.updateSubscriptionEmail}
                                onChange={handleChange}
                                error={errors.updateSubscriptionEmail}
                                touched={touched.updateSubscriptionEmail}/>


                        {serverError !== "" && <FormErrors errors={serverError} intl={intl}/>}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={modalStyles.modalFooter}>
                            <LinkButton onClick={onCancel} label="forms.generic.cancel.button"/>
                            <SubmitButton label="forms.generic.save.button" disabled={isSubmitting}/>
                        </div>
                    </Modal.Footer>
                </form>
            )}
        </Formik>
    )
}

export default injectIntl(UpdateEmailDetailsForm)