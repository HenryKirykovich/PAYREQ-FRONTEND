import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";

import {SubmitButton} from "../../common";
import ReactSelect from "../../common/form/ReactSelect";

const schema = Yup.object().shape({
    propertymeProperty: Yup.string().required("forms.generic.required.label")
});

const PropertyMeUpdatePropertyForm = ({onSubmit, initialValues, options, submitLabel}) => (
    <Formik initialValues={initialValues || {propertymeProperty: ""}}
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
                <form onSubmit={handleSubmit}>



                    <ReactSelect name="propertymeProperty"
                                 iid="propertymeProperty"
                                 label={options.field1.label}
                                 placeholder="invoice.view.forwarding.propertyme.property.palceholder"
                                 options={options.field1.options}
                                 defaultValue={values.propertymeProperty}

                    />

                    <SubmitButton label={submitLabel} disabled={isSubmitting}/>
                </form>
        )}
    </Formik>
);

export default PropertyMeUpdatePropertyForm;