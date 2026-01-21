import React, {useState} from "react";
import {Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";

import {AlertDanger, Modal, Select} from "../../common";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {AMOUNT_PAYABLE_OPTIONS, INVOICE_STATUS_OPTIONS, TAX_OPTIONS} from "./CreateXeroRegistrationForm";

const updateRegistration = (registration, values, setServerErrors, setSubmitting, closeModal, history) => {
    setSubmitting(true);

    axios.post(`/data/payerregistrations`,
        {
            id: registration.id,
            "channelref-1": values.tax,
            "channelref-2": values.accountCode,
            "channelref-3": values.invoiceStatus,
            "channelref-4": values.amountPayable,
            "channelref-5": values.organisation
        })
        .then(({data}) => {
            setSubmitting(false);
            if (data.success) {
                closeModal();
                history.push({
                    pathname: `./${registration.id}/updated`,
                    state: {registrationId: registration.id}})
            } else {
                setServerErrors(data.errors);
            }
        });
};

const schema = Yup.object().shape({
    organisation: Yup.string().required("forms.generic.required.label"),
    accountCode: Yup.string().required("forms.generic.required.label"),
    tax: Yup.string().required("forms.generic.required.label"),
    invoiceStatus: Yup.string().required("forms.generic.required.label"),
    amountPayable: Yup.string().required("forms.generic.required.label"),
});

const FormErrors = ({errors, accountNumber, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(({name, values}) =>
                    <li key={name}>{intl.formatMessage({id: "registrations.createEmail." + name + ".error"},
                        {
                            ...values,
                            account: accountNumber
                        })}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const UpdateXeroRegistrationModal =
    ({show, onCancel, registration, intl, history}) => {
        const [serverErrors, setServerErrors] = useState([]);
        const {accountNumber, xeroaccounts} = registration;
        if (!show) {
            return null;
        }

        return (
            <Formik
                initialValues={{
                    organisation: registration.channelRef5,
                    accountCode: registration.channelRef2,
                    tax: registration.channelRef1,
                    invoiceStatus: registration.channelRef3,
                    amountPayable: registration.channelRef4}}
                validationSchema={schema}
                onSubmit={(values, {setSubmitting}) => updateRegistration(registration, values, setServerErrors, setSubmitting, onCancel, history)}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Modal show={show}
                               title="registration.view.editXeroDetails.button"
                               buttonLabel="forms.generic.save.button"
                               onCancel={onCancel}
                               onPrimaryAction={handleSubmit}
                               disabled={isSubmitting}
                        >
                            <Select name="organisation"
                                    label="registrations.createXero.organisation.label"
                                    placeholder="registrations.createXero.organisation.placeholder"
                                    options={xeroaccounts.map(({name, id, accounts}) => ({label: name, value: id, accounts: accounts}))}
                                    internationalisedOptions={false}
                                    value={values.organisation}
                                    onChange={handleChange}
                                    error={errors.organisation}
                                    touched={touched.organisation}
                            />

                            <Select name="accountCode"
                                    label="registrations.createXero.accountCode.label"
                                    placeholder="registrations.createXero.accountCode.placeholder"
                                    options={xeroaccounts.find(({id}) => id === values.organisation).accounts.map(({code, displayName}) => ({
                                        value: code,
                                        label: displayName
                                    }))}
                                    internationalisedOptions={false}
                                    value={values.accountCode}
                                    onChange={handleChange}
                                    error={errors.accountCode}
                                    touched={touched.accountCode}
                            />
                            <Select name="tax"
                                    label="registrations.createXero.tax.label"
                                    placeholder="registrations.createXero.tax.placeholder"
                                    options={TAX_OPTIONS}
                                    value={values.tax}
                                    onChange={handleChange}
                                    error={errors.tax}
                                    touched={touched.tax}
                            />
                            <Select name="invoiceStatus"
                                    label="registrations.createXero.invoiceStatus.label"
                                    placeholder="registrations.createXero.invoiceStatus.placeholder"
                                    options={INVOICE_STATUS_OPTIONS}
                                    value={values.invoiceStatus}
                                    onChange={handleChange}
                                    error={errors.invoiceStatus}
                                    touched={touched.invoiceStatus}
                            />
                            <Select name="amountPayable"
                                    label="registrations.createXero.amountPayable.label"
                                    placeholder="registrations.createXero.amountPayable.placeholder"
                                    options={AMOUNT_PAYABLE_OPTIONS}
                                    value={values.amountPayable}
                                    onChange={handleChange}
                                    error={errors.amountPayable}
                                    touched={touched.amountPayable}
                            />

                            {serverErrors.length > 0 &&
                            <FormErrors errors={serverErrors} accountNumber={accountNumber} intl={intl}/>}
                        </Modal>
                    </form>
                )}
            </Formik>

        )
    };

export default injectIntl(withRouter(UpdateXeroRegistrationModal));