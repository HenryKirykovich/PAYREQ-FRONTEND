import React from 'react';
import {Checkbox, Select, TextInput, ArrayInput, Radio} from "../components/common";
import {Formik} from "formik";
import * as Yup from "yup";

export default {
    title: "Form Components",
};

export const select = () => (
    <Select name="gateway"
            label="payments.gateways.select.label"
            placeholder="payments.gateways.select.placeholder"
            options={[{value: "first", label: "First Label"}, {value: "second", label: "Second Label"}]}
            error={null}
            touched={null}
    />
);


export const selectWithError = () => (
    <Select name="gateway"
            label="payments.gateways.select.label"
            placeholder="payments.gateways.select.placeholder"
            options={[{value: "first", label: "First Label"}, {value: "second", label: "Second Label"}]}
            error={"payments.gateways.select.required"}
            touched={true}
    />
);

export const textInput = () => (
    <TextInput name="username"
               label="payments.gateways.generic.username"
    />
);

export const textInputWithError = () => (
    <TextInput name="username"
               label="payments.gateways.generic.username"
               error={"payments.gateways.select.required"}
               touched={true}
    />
);

export const checkbox = () => (
    <Checkbox name="username"
              label="payments.gateways.generic.username"
    />
);

export const checkboxWithError = () => (
    <Checkbox name="username"
              label="payments.gateways.generic.username"
              error={"payments.gateways.select.required"}
              touched={true}
    />
);


export const arrayInput = () => (
    <Formik initialValues={{emails: [""]}}
            validationSchema={Yup.object().shape({
                emails: Yup.array()
                    .of(Yup.string().email("forms.generic.email.validation.label").required("forms.generic.required.label"))
                    .required('forms.generic.required.label') // these constraints are shown if and only if inner constraints are satisfied
                    .min(1, 'Enter at least one email address')
            })}
    >
        {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur
          }) => (
            (
                <form onSubmit={handleSubmit}>
                    <ArrayInput name="emails"
                                errors={errors.emails}
                                values={values.emails}
                                touched={touched.emails}
                                hint="registrations.createEmail.emailsInputHint"
                                label="registrations.createEmail.emaislInputLabel"
                                ariaLabelIntlPrefix="registrations.createEmail"
                                addLinkLabel="registrations.createEmail.addEmailButtonLabel"
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                maxInputs={3}
                    />
                    <button type="submit">click to see validation errors</button>
                </form>
            )
        )}
    </Formik>
);

export const radio = () => (
    <Formik initialValues={{fruit: ""}}>
        {({
              values,
              handleSubmit,
              handleChange,
              handleBlur
          }) => (
            (
                <form onSubmit={handleSubmit}>
                    <Radio name="fruit"
                           label="Select a fruit"
                           value={values.fruit}
                           options={[{value: "strawberry", label: "Strawberry"}, {value: "watermelon", label: "Watermelon"}]}
                           onChange={handleChange}
                           onBlur={handleBlur}
                           hint={"Choose your favourite!"}
                    />
                    {"Formik values: " + JSON.stringify(values)}
                </form>
            )
        )}
    </Formik>
);

export const radioWithError = () => (
    <Radio name="fruit"
           label="Select a fruit"
           value={"carrot"}
           options={[{value: "carrot", label: "Carrot"}, {value: "watermelon", label: "Watermelon"}]}
           hint={"Choose your favourite!"}
           error={"That's not a fruit!"}
           touched={true}
    />
);