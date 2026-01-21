import React, {useState} from "react";
import * as Yup from "yup";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {AlertDanger, Modal, Select} from "../../common";
import {AMOUNT_PAYABLE_OPTIONS, TAX_OPTIONS} from "./constrants";
import {Formik} from "formik";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {injectIntl} from "react-intl";

const updateRegistration = (registration, values, setServerErrors, setSubmitting, closeModal, history) => {
    setSubmitting(true);

    axios.post(`/data/payerregistrations`,
        {
            id: registration.id,
            "channelref-1": values.tax,
            "channelref-3": values.amountPayable,
            "channelref-2": values.organisation,
        })
        .then(({data}) => {
            setSubmitting(false);
            if (data.success) {
                closeModal();
                history.push({
                    pathname: `./${registration.id}/updated`,
                    state: {registrationId: registration.id}
                })
            } else {
                setServerErrors(data.errors);
            }
        });
};

const schema = Yup.object().shape({
        organisation: Yup.string().required("forms.generic.required.label"),
        tax: Yup.string().required("forms.generic.required.label"),
        amountPayable: Yup.string().required("forms.generic.required.label")
    }
);

const FormErrors = ({errors, biller, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(({name, values}) =>
                    <li key={name}>{intl.formatMessage({id: "registrations.createEmail." + name + ".error"},
                        {
                            ...values,
                            account: biller.registrationContactIdField
                        })}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const UpdateMyobRegistrationModal = ({show, onCancel, registration, intl, history}) => {
    const [serverErrors, setServerErrors] = useState(false);
    const selectedAccount = registration.myobaccounts.find(({id}) => id === registration.channelRef2);
    if (!show) return null;
    return <Formik
        initialValues={{
            organisation: selectedAccount ? registration.channelRef2 : "",
            tax: registration.channelRef1,
            amountPayable: registration.channelRef3,
        }}
        validationSchema={schema}
        onSubmit={(values, {setSubmitting}) => updateRegistration(registration, values, setServerErrors, setSubmitting, onCancel, history)}>
        {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting
          }) => (
            (
                <form onSubmit={handleSubmit}>
                    <Modal show={show}
                           title="registration.view.editXeroDetails.button"
                           buttonLabel="forms.generic.save.button"
                           onCancel={onCancel}
                           onPrimaryAction={handleSubmit}
                           disabled={isSubmitting}>

                        <Select name="organisation"
                                label="registrations.createMyob.business.label"
                                placeholder="registrations.createMyob.business.placeholder"
                                hint="registrations.createMyob.business.hint"
                                options={registration.myobaccounts.map(({name, id}) => ({
                                    value: id,
                                    label: name
                                }))
                                }
                                internationalisedOptions={false}
                                value={values.organisation}
                                onChange={handleChange}
                                error={errors.organisation}
                                touched={touched.organisation}/>

                        <Select name="tax"
                                label="registrations.createMyob.tax.label"
                                placeholder="registrations.createMyob.tax.placeholder"
                                hint="registrations.createMyob.tax.hint"
                                options={TAX_OPTIONS}
                                value={values.tax}
                                onChange={handleChange}
                                error={errors.tax}
                                touched={touched.tax}/>

                        <Select name="amountPayable"
                                label="registrations.createMyob.amountPayable.label"
                                placeholder="registrations.createMyob.amountPayable.placeholder"
                                hint="registrations.createMyob.amountPayable.hint"
                                options={AMOUNT_PAYABLE_OPTIONS}
                                value={values.amountPayable}
                                onChange={handleChange}
                                error={errors.amountPayable}
                                touched={touched.amountPayable}/>

                        {serverErrors &&
                        <FormErrors errors={serverErrors} accountNumber={registration.accountNumber} intl={intl}/>}
                    </Modal>
                </form>
            )
        )}
    </Formik>
}

export default injectIntl(withRouter(UpdateMyobRegistrationModal));
