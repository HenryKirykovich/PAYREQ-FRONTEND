import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import styles from "./ForwardingRulesForm.module.scss";

import {Select, SecondaryHeading, TextInput, SubmitButton} from "../../common";

const schema = Yup.object().shape({
    biller: Yup.string().required("forms.generic.required.label"),
    accounts: Yup.string().required("forms.generic.required.label"),
    connection: Yup.string().required("forms.generic.required.label"),
    propertymeSupplier: Yup.string().when("connection", {
        is: "propertyme",
        then: Yup.string().required("forms.generic.required.label")
    }),
    propertymeTaxincluded: Yup.string().when("connection", {
        is: "propertyme",
        then: Yup.string().required("forms.generic.required.label")
    }),
    propertymeDuedate: Yup.string().when("connection", {
        is: "propertyme",
        then: Yup.string().required("forms.generic.required.label")
    }),
    propertymeDetails: Yup.string().when("connection", {
        is: "propertyme",
        then: Yup.string().required("forms.generic.required.label")
    }),
});

const PropertyMeDetailsForm = ({options, handleChange, values, errors, touched}) => {
    return (
        <div id="propertyme-settings">
            <div className={styles.secondaryHeadingContainer}>
                <SecondaryHeading text="settings.forwardingRules.create.propertyme.heading"/>
            </div>
            <Select name="propertymeSupplier"
                    label="settings.forwardingRules.create.propertyme.supplier.label"
                    placeholder="settings.forwardingRules.create.propertyme.supplier.placeholder"
                    options={options.propertyme.suppliers}
                    internationalisedOptions={false}
                    value={values.propertymeSupplier}
                    onChange={handleChange}
                    error={errors.propertymeSupplier}
                    touched={touched.propertymeSupplier}
            />

            <Select name="propertymeTaxincluded"
                    label="settings.forwardingRules.create.propertyme.tax.label"
                    placeholder="settings.forwardingRules.create.propertyme.tax.placeholder"
                    options={[{label: "forms.generic.true", value: "true"}, {label: "forms.generic.false", value: "false"}]}
                    value={values.propertymeTaxincluded}
                    onChange={handleChange}
                    error={errors.propertymeTaxincluded}
                    touched={touched.propertymeTaxincluded}
            />

            <Select name="propertymeDuedate"
                    label="settings.forwardingRules.create.propertyme.duedate.label"
                    placeholder="settings.forwardingRules.create.propertyme.duedate.placeholder"
                    options={[{label: "forms.generic.month-before-due-date", value: "month-before-due-date"},
                        {label: "forms.generic.received-date", value: "received-date"}, {label: "forms.generic.due-date", value: "due-date"}]}
                    value={values.propertymeDuedate}
                    onChange={handleChange}
                    error={errors.propertymeDuedate}
                    touched={touched.propertymeDuedate}
            />

            <Select name="propertymeDetails"
                    label="settings.forwardingRules.create.propertyme.details.label"
                    placeholder="settings.forwardingRules.create.propertyme.details.placeholder"
                    options={[{label: "settings.forwardingRules.create.propertyme.details.default.label", value: "default"},
                        {label: "settings.forwardingRules.create.propertyme.details.rates-charges.label", value: "rates-charges"},
                        {label: "settings.forwardingRules.create.propertyme.details.water-charges.label", value: "water-charges"}]}
                    value={values.propertymeDetails}
                    onChange={handleChange}
                    error={errors.propertymeDetails}
                    touched={touched.propertymeDetails}
            />

        </div>
    );
};

const ForwardingRulesForm = ({onSubmit, initialValues, options}) => (
    <Formik initialValues={initialValues || {biller: "", accounts:  "", accountNoVal: "", connection: "", propertymeSupplier: "", propertymeTaxincluded: "", propertymeDuedate: "", propertymeDetails: "default"}}
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

                    <Select name="biller"
                            label="settings.forwardingRules.biller.select.label"
                            placeholder="settings.forwardingRules.biller.select.placeholder"
                            options={options.billers}
                            internationalisedOptions={false}
                            value={values.biller}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.biller}
                            touched={touched.biller}
                    />

                    <Select name="accounts"
                            label="settings.forwardingRules.accounts.select.label"
                            placeholder="settings.forwardingRules.accounts.select.placeholder"
                            options={[{label: "settings.forwardingRules.accounts.all-accounts", value: "all-accounts"},
                                      {label: "settings.forwardingRules.accounts.all-accounts-bills", value: "all-accounts-bills"},
                                      {label: "settings.forwardingRules.accounts.account-no-starting-with", value: "account-no-starting-with"}]}
                            value={values.accounts}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.accounts}
                            touched={touched.accounts}
                    />

                    {values.accounts === "account-no-starting-with" &&
                        <TextInput key="accountNoVal"
                                   name="accountNoVal"
                                   label="settings.forwardingRules.accounts.no.label"
                                   value={values.accountNoVal}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   error={errors.accountNoVal}
                                   touched={touched.accountNoVal}
                        />}

                    <Select name="connection"
                            label="settings.forwardingRules.connection.select.label"
                            placeholder="settings.forwardingRules.connection.select.placeholder"
                            options={options.connections}
                            value={values.connection}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.connection}
                            touched={touched.connection}
                    />

                    {values.connection === "propertyme" &&
                    <PropertyMeDetailsForm options={options}
                                           handleChange={handleChange}
                                           handleBlur={handleBlur}
                                           values={values}
                                           errors={errors}
                                           touched={touched} />}


                    <SubmitButton label="forms.generic.save.button" disabled={isSubmitting}/>
                </form>
        )}
    </Formik>
);

export default ForwardingRulesForm;