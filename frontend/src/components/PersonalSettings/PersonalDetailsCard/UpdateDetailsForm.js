import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {AlertDanger, LinkButton, Modal, Select, SubmitButton, TextInput} from "../../common";
import modalStyles from "../../common/Modal/Modal.module.scss";
import {ALL_COUNTRY_DROPDOWN_VALUES, BILLER_COUNTRY_DROPDOWN_VALUES} from "./constants";
import styles from "./PersonalDetails.module.scss";
import {DEFAULT_MAX_STRING_LENGTH} from "../../../utils/form-utils";

function updatePersonalDetailsModal(values, setIsFormSubmitted, setError) {
    setError(null);

    axios.post(`/data/personal/settings/details`, {
        contactDetails: values,
        countryCode: values.countryCode
    })
        .then(({data}) => {
            if (data.success === true) {
                setIsFormSubmitted(true)
            } else {
                setError(data.error);
            }
        })
}

const updateDetailsSchema = Yup.object().shape({
    address1: Yup.string()
        .required("forms.generic.required.label")
        .max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
    address2: Yup.string()
        .max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
    city: Yup.string()
        .required("forms.generic.required.label")
        .max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
    state: Yup.string().required("forms.generic.required.label")
        .max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
    postalCode: Yup.string()
        .required("forms.generic.required.label")
        .min(4)
        .max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
    countryCode: Yup.string().required("forms.generic.required.label"),
})

const UpdateDetailsForm = ({personalDetails, onCancel, setIsFormSubmitted}) => {
    const [error, setError] = useState(false);

    const {contactDetails, countryCode} = personalDetails;
    return (
        <Formik
            initialValues={{
                address1: contactDetails.address1 || "",
                address2: contactDetails.address2 || "",
                city: contactDetails.city || "",
                state: contactDetails.state || "",
                postalCode: contactDetails.postalCode || "",
                countryCode: countryCode ? countryCode.toUpperCase() : ""
            }}
            validationSchema={updateDetailsSchema}
            onSubmit={values => updatePersonalDetailsModal(values, setIsFormSubmitted, setError)}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <TextInput name="address1"
                                   label="personalSettings.personal.details.address1"
                                   value={values.address1}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   error={errors.address1}
                                   touched={touched.address1}/>

                        <TextInput name="address2"
                                   label="personalSettings.personal.details.address2"
                                   value={values.address2}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   error={errors.address2}
                                   touched={touched.address2}/>

                        <TextInput name="city"
                                   label="personalSettings.personal.details.city"
                                   value={values.city}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   error={errors.city}
                                   touched={touched.city}/>

                        <TextInput name="state"
                                   label="personalSettings.personal.details.state"
                                   value={values.state}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   error={errors.state}
                                   touched={touched.state}/>

                        <TextInput key="postalCode"
                                   name="postalCode"
                                   label="personalSettings.personal.details.postCode"
                                   value={values.postalCode}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   error={errors.postalCode}
                                   touched={touched.postalCode}/>

                        <Select name="countryCode"
                                label="personalSettings.personal.details.country"
                                placeholder="personalSettings.personal.details.country"
                                options={BILLER_COUNTRY_DROPDOWN_VALUES}
                                secondaryOptions={ALL_COUNTRY_DROPDOWN_VALUES}
                                value={values.countryCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.countryCode}
                                touched={touched.countryCode}/>
                        {error && <div className={styles.formErrors}><AlertDanger value={`personalSettings.personal.details.error.${error}`}/></div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={modalStyles.modalFooter}>
                            <LinkButton onClick={onCancel} label="forms.generic.cancel.button"
                                        disabled={false}/>
                            <SubmitButton label="forms.generic.save.button" disabled={isSubmitting}/>
                        </div>
                    </Modal.Footer>
                </form>
            )}
        </Formik>
    )
};

export default UpdateDetailsForm
