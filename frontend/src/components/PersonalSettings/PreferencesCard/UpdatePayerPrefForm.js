import React from "react";
import {LinkButton, Modal, Select, SubmitButton} from "../../common";
import {Formik} from "formik";
import axios from "axios";
import modalStyles from "../../common/Modal/Modal.module.scss"
import {LANGUAGE_DROPDOWN_VALUES} from "./preferences-constants";

const ALERT_DROPDOWN_VALUES = [
    {value: "immediate", label: "forms.generic.on"},
    {value: "never", label: "forms.generic.off"},
];

function updatePref(values, preferences, setIsSubmitted, setSubmitting, setHasLanguageChanged) {
    axios.post("/data/personal/settings/payer-preferences", values)
        .then(({data}) => {
            if (data.success === true) {
                setIsSubmitted(true);
                if (preferences.language !== values.language) {
                    localStorage.setItem("language", values.language)
                    setHasLanguageChanged(true)
                }
            }
        })
        .finally(() => setSubmitting(false))
}

function UpdatePayerPrefForm({preferences, onCancel, setIsSubmitted, setHasLanguageChanged}) {
    const hasBillerWithPaymentGateway = !!preferences.userAlertPrefs;
    const initialPaymentReminder = preferences.userAlertPrefs && preferences.userAlertPrefs.find(p => p.name === "mybills.paymentreminder").alertFreq
    const initialLang = preferences.language || "en"
    const initialValues = hasBillerWithPaymentGateway ? {language: initialLang, paymentReminder: initialPaymentReminder} : {language: initialLang};
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, {setSubmitting}) => updatePref(values, preferences, setIsSubmitted, setSubmitting, setHasLanguageChanged)}>
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
                        <Select name="language"
                                hint="personalSettings.preferences.language.hint"
                                label="personalSettings.preferences.language"
                                placeholder="personalSettings.preferences.language"
                                options={LANGUAGE_DROPDOWN_VALUES}
                                value={values.language}
                                onChange={handleChange}
                                error={errors.language}
                                touched={touched.language}/>

                        {hasBillerWithPaymentGateway && (
                            <Select name="paymentReminder"
                                    hint="personalSettings.preferences.paymentReminderHint"
                                    label="personalSettings.preferences.paymentReminder"
                                    placeholder="personalSettings.preferences.paymentReminder"
                                    options={ALERT_DROPDOWN_VALUES}
                                    value={values.paymentReminder}
                                    onChange={handleChange}
                                    error={errors.paymentReminder}
                                    touched={touched.paymentReminder}/>
                        )}
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

export default UpdatePayerPrefForm;
