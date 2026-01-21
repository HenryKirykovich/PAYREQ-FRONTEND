import React, {useState} from "react";
import {Formik} from 'formik';
import axios from "axios";

import {PageHeading, Select, SubmitButton, TextInput, VerticalLayout} from "../../common";
import {GATEWAY_DETAILS} from "../../payments/payment-constants";
import AcceptedCardsAndSurcharges from "./AcceptedCardsAndSurcharges";
import GenericError from "../../GenericError";
import {withRouter} from "react-router-dom";

const handleGatewayCreationFormSubmit = (billerId, values, setCreationError, history, {setSubmitting}) => {
    setSubmitting(true);
    setCreationError(false);
    axios.post(`/data/settings/payment-gateway/${billerId}`, values, {localErrorHandling: true})
        .then(({data}) => {
            history.push({pathname: "./view"})
        })
        .catch(error => {
            setCreationError(true);
        })
        .finally(() => setSubmitting(false));
};

const handleGatewaySelection = (handleChange, setFieldValue, e) => {
    setFieldValue("merchant", "");
    setFieldValue("username", "");
    setFieldValue("password", "");
    setFieldValue("meta.billerCode", "");
    handleChange(e);
};

const checkScheme = (checkedSchemes, scheme) => {
    let msg = "";
    if (checkedSchemes.indexOf(scheme) !== -1) {
        msg = "payments.gateways.cardScheme.duplicate";
    }
    checkedSchemes.push(scheme);
    return msg;
};

const validateAcceptedCardFields = values => {
    let checkedSchemes = [];
    const validationResults = values.acceptedCards.map(
        ({scheme, surcharge}) => {
            return {
                scheme: scheme === "" ? "forms.generic.required.label" : checkScheme(checkedSchemes, scheme),
                surcharge: surcharge === "" ? "forms.generic.required.label" : ""
            }
        });

    const invalidResults = validationResults.filter(({scheme, surcharge}) => scheme !== "" || surcharge !== "");

    return invalidResults.length === 0 ? null : {acceptedCards: validationResults};
};

const validateGatewayFields = values => {
    let gatewayErrors = {};
    if (values.gateway) {
        GATEWAY_DETAILS[values.gateway].formInputs
            .filter(({optional}) => !optional)
            .map(({name}) => !values[name] ? gatewayErrors[name] = "forms.generic.required.label" : null);
    } else {
        gatewayErrors.gateway = "payments.gateways.select.required";
    }
    return gatewayErrors;
};

//don't know how to do this using Yup/validationSchema so doing it manually
const validate = values => (
    {
        ...validateGatewayFields(values),
        ...validateAcceptedCardFields(values)
    }
);

const GatewayCreationForm = ({ billerId, history }) => {
  const [creationError, setCreationError] = useState(false);
  const gatewayOptions =
    Object
      .entries(GATEWAY_DETAILS)
      .filter(([_k, { hiddenFromSetup }]) => !hiddenFromSetup)
      .map(([k, { label }]) => ({ value: k, label: label }));
  return (
    <VerticalLayout half>
      <Formik
        initialValues={{
          gateway: "",
          merchant: "",
          username: "",
          password: "",
          meta: { billerCode: "" },
          acceptedCards: [{ scheme: "", surcharge: 0 }]
        }}
        validate={validate}
        onSubmit={(values, opts) => handleGatewayCreationFormSubmit(billerId, values, setCreationError, history, opts)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <PageHeading text="payments.gateways.create.heading" />
            <Select name="gateway"
              label="payments.gateways.select.label"
              placeholder="payments.gateways.select.placeholder"
              options={gatewayOptions}
              onChange={e => handleGatewaySelection(handleChange, setFieldValue, e)}
              onBlur={handleBlur}
              error={errors.gateway}
              touched={touched.gateway}
            />

            {values.gateway && GATEWAY_DETAILS[values.gateway].formInputs.map(({ name, label, type }) =>
              <TextInput key={name}
                name={name}
                label={label}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors[name]}
                touched={touched[name]}
                type={type}
              />
            )}

            <AcceptedCardsAndSurcharges handleBlur={handleBlur}
              handleChange={handleChange}
              errors={errors}
              touched={touched}
              values={values} />

            {creationError && <GenericError />}
            <SubmitButton label="payments.gateways.create" disabled={isSubmitting} />
          </form>
        )}
      </Formik>
    </VerticalLayout>
  );
};

export default withRouter(GatewayCreationForm);
