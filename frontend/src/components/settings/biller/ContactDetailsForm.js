import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";

import {PageHeading, SubmitButton, TextInput} from "../../common";

const schema = Yup.object().shape({
    name: Yup.string().required("forms.generic.required.label"),
    email: Yup.string().email("forms.generic.email.validation.label").required("forms.generic.required.label"),
    phone: Yup.string()
});

const ContactDetailsForm = ({onSubmit, initialValues}) => (
    <Formik initialValues={initialValues || {name: "", email: "", phone: ""}}
            validationSchema={schema}
            onSubmit={onSubmit}>
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting
          }) => (
            (
                <form onSubmit={handleSubmit}>
                    <PageHeading text="settings.contactDetails.createForm.page.heading"/>

                    <TextInput key="name"
                               name="name"
                               label="settings.contactDetails.createForm.name.label"
                               hint="settings.contactDetails.createForm.name.hint"
                               placeholder="settings.contactDetails.createForm.name.placeholder"
                               value={values.name}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.name}
                               touched={touched.name}
                    />
                    <TextInput key="email"
                               name="email"
                               label="settings.contactDetails.createForm.email.label"
                               value={values.email}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.email}
                               touched={touched.email}
                    />
                    <TextInput key="phone"
                               name="phone"
                               label="settings.contactDetails.createForm.phone.label"
                               placeholder="settings.contactDetails.createForm.phone.placeholder"
                               hint="settings.contactDetails.createForm.phone.hint"
                               value={values.phone}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               error={errors.phone}
                               touched={touched.phone}
                    />

                    <SubmitButton label="forms.generic.save.button" disabled={isSubmitting}/>
                </form>
            )
        )}
    </Formik>
);

export default ContactDetailsForm;