import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput, PrimaryButton, Accordion, RegularText, Alert } from "../common";
import { DEFAULT_MAX_STRING_LENGTH } from "../../utils/form-utils";
import styles from "./PayForm.module.scss";
import { validateRegistrationAuthItems } from "../../utils/registration-utils";
import Loading from "../Loading";
import {ALERT_TYPES} from "../common/alerts/Alert";

function getValidationSchema(biller) {
  return Yup.object().shape({
    amount: Yup.number()
               .required("forms.generic.required.label")
               .min(5, "pay.amount.min.label")
               .max(10000, "pay.amount.max.label"),
    accountNumber: Yup.string()
                      .required("forms.generic.required.label")
                      .matches(new RegExp(biller.registrationContactIdFormat || '.+'), biller.registrationContactIdValidationMsg)
                      .max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label")
  });
};

const PayPaymentDetails = ({ onSubmit, initialValues, biller, detailsError, currentStage, isLoading, intl }) => {

  const validateAmount = (intl, amount, values) => {
    if (!(String(amount).match(/^\d+(\.\d{0,2})?$/))) {
      return {
        amount: intl.formatMessage({id: "pay.validation.amount"}, values),
      };
    }
    return {};
  };

  const validateAccountNumber = (intl, accountNumber, values) => {
    if (!accountNumber || accountNumber === 'undefined' || accountNumber === 'null') {
      return {
        accountNumber: biller.registrationContactIdValidationMsg || intl.formatMessage({id: "pay.validation.accountNumber.empty"}, values),
      };
    }
    if (accountNumber.match(/[^a-zA-Z0-9]/)) {
      return {
        accountNumber: biller.registrationContactIdValidationMsg || intl.formatMessage({id: "pay.validation.accountNumber.invalid"}, values),
      };
    }
    return {};
  };

  const validateUserInput = values => {
    const messageValues = {
      accountNumber: biller.registrationContactIdField,
    }
    const authValidation = validateRegistrationAuthItems(intl, biller, values);
    const amountValidation = validateAmount(intl, values.amount, messageValues);
    const accountNumberValidation = validateAccountNumber(intl, values.accountNumber, messageValues);
    return {
      ...authValidation,
      ...amountValidation,
      ...accountNumberValidation,
    }
  };

  const handleInitialFormSubmit = (values, formikBag) => {
    onSubmit(values);
    formikBag.setSubmitting(false);
  };

  const DetailsError = ({error}) => {
    const values = {
      accountNumber: biller.registrationContactIdField,
    }
    return <Alert type={ALERT_TYPES.WARNING} className={styles.alert}>
             <RegularText text={error} values={values}/>
           </Alert>;
  };

  return (
    <Formik
      initialValues={
        initialValues || {
          accountNumber: "",
          amount: ""
        }
      }
      validationSchema={getValidationSchema(biller)}
      validate={validateUserInput}
      onSubmit={handleInitialFormSubmit}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
      }) => (
        <form onSubmit={e => e.preventDefault()}>
          {biller.fastformRegistrationVerificationSubHeading &&
           <RegularText text={biller.fastformRegistrationVerificationSubHeading}
                        data-testid="pay-verification-sub-heading"/>}

          <TextInput key="accountNumber"
                     name="accountNumber"
                     label={biller.registrationContactIdField}
                     internationalisedLabel={false}
                     hint={biller.registrationContactIdHelp}
                     value={values.accountNumber}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     error={errors.accountNumber}
                     touched={touched.accountNumber}
                     disabled={isLoading}
          >
            {biller.helpImageAccountNumber &&
             <Accordion title="fastForm.registration.create.help.title"
                        values={{account: biller.registrationContactIdField}}
                        textDecoration={false}>
               <img className={styles.images}
                    src={biller.helpImageAccountNumber}
                    alt={`Location of ${biller.registrationContactIdField}`}/>
             </Accordion>}
          </TextInput>

          <TextInput
            name="amount"
            addon={!isLoading && biller.currencySymbol}
            label="pay.amount.label"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.amount}
            touched={touched.amount}
            hint="pay.amount.hint"
            disabled={isLoading}
          />
          { isLoading && <Loading /> }
          { detailsError && <DetailsError error={detailsError}/> }
          <PrimaryButton
            type="button"
            label="forms.generic.next.button"
            disabled={isLoading}
            data-testid="pay-continue-button"
            onClick={() => {
              // Manually validate the form
              getValidationSchema(biller).validate(values, { abortEarly: false })
                                         .then(() => {
                                           // If validation passes, call the submit handler
                                           handleInitialFormSubmit(values, { setSubmitting: () => {} });
                                         })
                                         .catch(err => {
                                           // If validation fails, set the errors
                                           const validationErrors = {};
                                           err.inner.forEach(error => {
                                             validationErrors[error.path] = error.message;
                                           });
                                           // Update Formik's errors
                                           Object.keys(validationErrors).forEach(key => {
                                             setFieldValue(key, values[key], false);
                                             touched[key] = true;
                                           });
                                         });
            }}
          />
        </form>
      )}
    </Formik>
  );
};

export default PayPaymentDetails;
