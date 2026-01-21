import React, {useState} from "react";
import {Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";

import {AlertDanger, Modal, Select} from "../../common";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {AMOUNT_PAYABLE_OPTIONS, formatSelectOptions} from "./CreateReckonRegistrationForm";

const updateRegistration = (registration, values, setServerErrors, setSubmitting, closeModal, history) => {
    setSubmitting(true);

    axios.post(`/data/payerregistrations`,
        {
            id: registration.id,
            "channelref-1": values.supplier,
            "channelref-2": values.accountCode,
            "channelref-3": values.taxCode,
            "channelref-4": values.amountPayable,
            "channelref-5": null
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
    supplier: Yup.string().required("forms.generic.required.label"),
    taxCode: Yup.string().required("forms.generic.required.label"),
    accountCode: Yup.string().required("forms.generic.required.label"),
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

const UpdateReckonRegistrationModal =
    ({show, onCancel, registration, intl, history}) => {
        const [serverErrors, setServerErrors] = useState([]);
        const {channelRef1, channelRef2, channelRef3, channelRef4, accountNumber, reckonvendors, reckontaxcodes, reckonaccounts} = registration;

        if (!show) {
            return null;
        }

        return (
            <Formik
                initialValues={{
                    supplier: channelRef1,
                    accountCode: channelRef2,
                    taxCode: channelRef3,
                    amountPayable: channelRef4}}
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
                            <Select name="supplier"
                                    label="registrations.createReckon.supplier.label"
                                    placeholder="registrations.createReckon.supplier.placeholder"
                                    hint="registrations.createReckon.supplier.hint"
                                    options={formatSelectOptions(reckonvendors)}
                                    internationalisedOptions={false}
                                    value={values.supplier}
                                    onChange={handleChange}
                                    error={errors.supplier}
                                    touched={touched.supplier}
                            />

                            <Select name="taxCode"
                                    label="registrations.createReckon.taxCode.label"
                                    placeholder="registrations.createReckon.taxCode.placeholder"
                                    hint="registrations.createReckon.taxCode.hint"
                                    options={formatSelectOptions(reckontaxcodes)}
                                    internationalisedOptions={false}
                                    value={values.taxCode}
                                    onChange={handleChange}
                                    error={errors.taxCode}
                                    touched={touched.taxCode}
                            />

                            <Select name="accountCode"
                                    label="registrations.createReckon.accountCode.label"
                                    placeholder="registrations.createReckon.accountCode.placeholder"
                                    hint="registrations.createReckon.accountCode.hint"
                                    options={formatSelectOptions(reckonaccounts)}
                                    internationalisedOptions={false}
                                    value={values.accountCode}
                                    onChange={handleChange}
                                    error={errors.accountCode}
                                    touched={touched.accountCode}
                            />

                            <Select name="amountPayable"
                                    label="registrations.createReckon.amount.label"
                                    placeholder="registrations.createReckon.amount.placeholder"
                                    hint="registrations.createReckon.amount.hint"
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

export default injectIntl(withRouter(UpdateReckonRegistrationModal));
