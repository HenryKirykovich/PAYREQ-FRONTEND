import React from "react";
import {withRouter} from 'react-router-dom'
import {Formik} from "formik";
import axios from "axios";
import {LinkButton, Select, SubmitButton} from "../common";
import styles from "./BulkDownloadPreferencesEdit.module.scss"

const DOWNLOAD_VALUES = {individual: "individual", merged: "merged", disabled: "disabled"};
const PAGE_VALUES = {first: "first", all: "all"};

const savePreference = (values, setSubmitting, billerId, history) => {
    if (values.downloadType === DOWNLOAD_VALUES.disabled) {
        axios.delete(`/data/settings/bulk-download-preferences/${billerId}`)
            .then(({data}) => {
                if (data.success) {
                    history.push(`./deleted`)
                }
            })
            .catch(() => setSubmitting(false))
    } else {
        axios.put(`/data/settings/bulk-download-preferences/${billerId}`, values)
            .then(({data}) => {
                if (data.success) {
                    history.push(`./saved`)
                }
            })
            .catch(() => setSubmitting(false))
    }
}

const BulkDownloadPreferencesEditForm = ({preference, cancelLink, billerId, history}) => {
    return (
        <div className={styles.formContainer}>
            <Formik initialValues={{
                downloadType: (preference && preference.downloadType) || DOWNLOAD_VALUES.individual,
                pages: (preference && preference.pages) || PAGE_VALUES.all
            }}
                    onSubmit={(values, {setSubmitting}) => savePreference(values, setSubmitting, billerId, history)}>
                {({
                      values,
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      errors,
                      touched,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Select name="downloadType"
                                label="personalSettings.preferences.bulkDownloadPreference"
                                hint="personalSettings.preferences.bulkDownloadPreference.hint"
                                placeholder="personalSettings.preferences.bulkDownloadPreference.placeholder"
                                value={values.downloadType}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                options={[
                                    {
                                        value: DOWNLOAD_VALUES.individual,
                                        label: `personalSettings.preferences.bulkDownloadPreference.downloadType.${DOWNLOAD_VALUES.individual}`
                                    },
                                    {
                                        value: DOWNLOAD_VALUES.merged,
                                        label: `personalSettings.preferences.bulkDownloadPreference.downloadType.${DOWNLOAD_VALUES.merged}`
                                    },
                                    {
                                        value: DOWNLOAD_VALUES.disabled,
                                        label: `personalSettings.preferences.bulkDownloadPreference.downloadType.${DOWNLOAD_VALUES.disabled}`
                                    }
                                ]}
                                error={errors.downloadType}
                                touched={touched.downloadType}/>
                        {values.downloadType !== DOWNLOAD_VALUES.disabled && (
                            <Select name="pages"
                                    label="personalSettings.preferences.bulkDownloadPreference.pages"
                                    hint="personalSettings.preferences.bulkDownloadPreference.pages.hint"
                                    placeholder="personalSettings.preferences.bulkDownloadPreference.pages.placeholder"
                                    value={values.pages}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    options={[
                                        {
                                            value: PAGE_VALUES.all,
                                            label: `personalSettings.preferences.bulkDownloadPreference.pages.${PAGE_VALUES.all}`
                                        },
                                        {
                                            value: PAGE_VALUES.first,
                                            label: `personalSettings.preferences.bulkDownloadPreference.pages.${PAGE_VALUES.first}`
                                        }
                                    ]}
                                    error={errors.pages}
                                    touched={touched.pages}/>
                        )}

                        <div className={styles.buttonContainer}>
                            <SubmitButton label="forms.generic.save.button" disabled={isSubmitting}/>
                            <LinkButton label="forms.generic.cancel.button" linkTo={cancelLink}/>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default withRouter(BulkDownloadPreferencesEditForm);