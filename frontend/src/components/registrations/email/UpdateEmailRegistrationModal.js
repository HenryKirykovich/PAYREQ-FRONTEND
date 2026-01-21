import React, {useState} from "react";
import {Formik} from "formik";
import axios from "axios";
import * as Yup from "yup";

import {AlertDanger, ArrayInput, Modal} from "../../common";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import {useAppState} from "../../../state";

const eqSet = (as, bs) => {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
};

const updateRegistration = (registration, newEmails, setServerErrors, setSubmitting, closeModal, history, userEmail) => {
    setSubmitting(true);
    const details = registration.details;
    const currentEmails = details.map(d => d.registrationValue);
    if (eqSet(new Set(currentEmails), new Set(newEmails))) {
        return closeModal();
    }

    const deletedEmails = details.filter(d => newEmails.indexOf(d.registrationValue) === -1).map(d => d.registrationValue);
    const addedEmails = newEmails.filter(email => currentEmails.indexOf(email) === -1);

    axios.post(`/data/payerregistrations/email`,
        {
            id: registration.id,
            details: [
                ...details.filter(d => deletedEmails.indexOf(d.registrationValue) === -1),
                ...addedEmails.map(email => ({registrationValue: email, accept: true}))
            ],
            deleteddetails: details.filter(d => deletedEmails.indexOf(d.registrationValue) !== -1)
        })
        .then(({data}) => {
            setSubmitting(false);
            if (data.success) {
                closeModal();
                history.push({
                    pathname: `./${registration.id}/updated`,
                    state: {emailsToVerify: addedEmails.filter(email => email !== userEmail), registrationId: registration.id}})
            } else {
                setServerErrors(data.errors);
            }
        });
};

const schema = Yup.object().shape({
    emails: Yup.array()
        .of(Yup.string().email("forms.generic.email.validation.label").required("forms.generic.required.label"))
        .required('forms.generic.required.label')
        .min(1, 'Enter at least one email address')
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

const UpdateEmailRegistrationModal =
    ({show, onCancel, registration, intl, history}) => {
        const [serverErrors, setServerErrors] = useState([]);
        const [{user}] = useAppState();
        const {maxNoDetails, accountNumber, details} = registration;
        if (!show) {
            return null;
        }

        return (
            <Formik
                initialValues={{emails: details.map(d => d.registrationValue)}}
                validationSchema={schema}
                onSubmit={(values, {setSubmitting}) => updateRegistration(registration, values.emails, setServerErrors, setSubmitting, onCancel, history, user.email)}
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
                               title="registration.view.addRemoveEmail.button"
                               buttonLabel="forms.generic.save.button"
                               onCancel={onCancel}
                               onPrimaryAction={handleSubmit}
                               disabled={isSubmitting}
                        >
                            <ArrayInput name="emails"
                                        errors={errors.emails}
                                // groupErrors={getEmailErrors(serverErrors, "email", intl, channel)}
                                        values={values.emails}
                                        touched={touched.emails}
                                        hint="registrations.createEmail.emailsInputHint"
                                        label="registrations.createEmail.emaislInputLabel"
                                        ariaLabelIntlPrefix="registrations.createEmail"
                                        addLinkLabel="registrations.createEmail.addEmailButtonLabel"
                                        handleChange={handleChange}
                                        maxInputs={maxNoDetails}
                                        disabled={isSubmitting}
                            />
                            {serverErrors.length > 0 &&
                            <FormErrors errors={serverErrors} accountNumber={accountNumber} intl={intl}/>}
                        </Modal>
                    </form>
                )}
            </Formik>

        )
    };

export default injectIntl(withRouter(UpdateEmailRegistrationModal));