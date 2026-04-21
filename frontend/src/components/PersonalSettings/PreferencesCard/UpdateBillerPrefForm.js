import React from "react";
import axios from "axios";
import {Formik} from "formik";
import {injectIntl} from "react-intl";
import {LinkButton, Modal, Select, SubmitButton} from "../../common";
import modalStyles from "../../common/Modal/Modal.module.scss"
import {LANGUAGE_DROPDOWN_VALUES, HELPER_DROPDOWN_VALUES} from "./preferences-constants";

const BILL_STATUS_DROPDOWN_VALUES = [
    {value: "sendPending", label: "personalSettings.billStatus.sendPending"},
    {value: "error", label: "personalSettings.billStatus.error"},
    {value: "undelivered", label: "personalSettings.billStatus.undelivered"},
    {value: "readyForDispatch", label: "personalSettings.billStatus.readyForDispatch"},
    {value: "sent", label: "personalSettings.billStatus.sent"},
    {value: "pendingRegistration", label: "personalSettings.billStatus.pendingRegistration"},
    {value: "undeliveredActioned", label: "personalSettings.billStatus.undeliveredActioned"},
    {value: "archived", label: "personalSettings.billStatus.archived"}
];

function updatePref(values, preferences, setIsSubmitted, setSubmitting, setHasLanguageChanged) {
    axios.post("/data/personal/settings/biller-preferences", {
        ...values,
        defaultBillStatus: values.defaultBillStatus ? values.defaultBillStatus.map(option => option.value).join(",") : "",
        showHelpMessages: values.showHelpMessages === "true"
    })
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

function initialBillStatusValues(nameKeys, intl) {
    if (!nameKeys) return "";
    const keyNames = nameKeys.split(",");
    const dropdownValues = keyNames.map(name => BILL_STATUS_DROPDOWN_VALUES.find(billStatusDropdown => billStatusDropdown.value === name))
    return dropdownValues.map(({value: val, label}) => ({value: val, label: intl.formatMessage({id: label})}))
}

function UpdateBillerPrefForm({onCancel, preferences, setIsSubmitted, setHasLanguageChanged, intl}) {
    return (
        <Formik
            initialValues={{
                showHelpMessages: preferences.showHelpMessages.toString(),
                defaultBillStatus: initialBillStatusValues(preferences.defaultBillStatus, intl),
                language: preferences.language,
            }}
            onSubmit={(values, {setSubmitting}) => updatePref(values, preferences, setIsSubmitted, setSubmitting, setHasLanguageChanged)}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  setFieldValue,
                  handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Select name="showHelpMessages"
                                label="personalSettings.preferences.showHelp"
                                hint="personalSettings.preferences.showHelpHint"
                                placeholder="personalSettings.preferences.showHelp"
                                options={HELPER_DROPDOWN_VALUES}
                                value={values.showHelpMessages}
                                onChange={handleChange}
                                error={errors.showHelpMessages}
                                touched={touched.showHelpMessages}/>

                        <Select name="language"
                                hint="personalSettings.preferences.language.hint"
                                label="personalSettings.preferences.language"
                                placeholder="personalSettings.preferences.language"
                                options={LANGUAGE_DROPDOWN_VALUES}
                                internationalisedOptions={false}
                                value={values.language}
                                onChange={handleChange}
                                error={errors.language}
                                touched={touched.language}/>

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

export default injectIntl(UpdateBillerPrefForm);
