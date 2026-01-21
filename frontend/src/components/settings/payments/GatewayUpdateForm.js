import React, {useState} from "react";
import {Formik} from 'formik';
import axios from "axios";
import {SubmitButton, TextInput, VerticalLayout} from "../../common";
import {GATEWAY_DETAILS} from "../../payments/payment-constants";
import GenericError from "../../GenericError";
import {withRouter} from "react-router-dom";
import Loading from "../../Loading";

const handleGatewayUpdateFormSubmit = (billerId, gatewayId, values, setUpdateError, setRequiresUpdate, history, {setSubmitting}) => {
  setSubmitting(true);
  setUpdateError(false);
  const params = {
    gatewayId,
    ...values
  };
  axios.post(`/data/settings/payment-gateway/${billerId}/update`, params, {localErrorHandling: true})
       .then(({data}) => {
         if (data.success) {
           setRequiresUpdate(false);
         } else {
           setUpdateError(true);
         }
       })
       .catch(error => {
         setUpdateError(true);
       })
       .finally(() => setSubmitting(false));
};

const validateGatewayFields = (gatewayType, values) => {
  let gatewayErrors = {};
  if (gatewayType) {
    GATEWAY_DETAILS[gatewayType].formInputs
                                .filter(({optional}) => !optional)
                                .map(({name}) => !values[name] ? gatewayErrors[name] = "forms.generic.required.label" : null);
  } else {
    gatewayErrors.gateway = "payments.gateways.select.required";
  }
  return gatewayErrors;
};

//don't know how to do this using Yup/validationSchema so doing it manually
const validateForGatewayType = gatewayType => {
  return values => ({
    ...validateGatewayFields(gatewayType, values),
  });
};

const GatewayUpdateForm = ({ billerId, history, gateway, setRequiresUpdate}) => {
  const [updateError, setUpdateError] = useState(false);
  const gatewayType = gateway.processorGatewayType;
  return (
    <VerticalLayout half>
      <Formik
        initialValues={{
          merchant: "",
          username: "",
          password: "",
          meta: { billerCode: "" },
        }}
        validate={validateForGatewayType(gatewayType)}
        onSubmit={(values, opts) => handleGatewayUpdateFormSubmit(billerId, gateway.id, values, setUpdateError, setRequiresUpdate, history, opts)}
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
        }) =>
         isSubmitting ?
         <Loading/>
         :
         <form onSubmit={handleSubmit}>

           {gatewayType && GATEWAY_DETAILS[gatewayType].formInputs.map(({ name, label, type }) =>
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

           {updateError && <GenericError />}
           <SubmitButton label="payments.gateways.update" disabled={isSubmitting} />
         </form>
        }
      </Formik>
    </VerticalLayout>
  );
};

export default withRouter(GatewayUpdateForm);
