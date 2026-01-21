import React from "react";
import {injectIntl} from "react-intl";
import {Accordion, TextInput} from "../../common";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";

const EmailRegistrationVerificationFormFields = ({biller, values, errors, touched, handleChange,helpImageAuthItem1, helpImageAccountNumber, handleBlur, formErrors, intl, getFieldError, disabled}) => {
    return (
        <React.Fragment>
            <TextInput key="accountNumber"
                       name="accountNumber"
                       label={biller.registrationContactIdField}
                       internationalisedLabel={false}
                       hint={biller.registrationContactIdHelp}
                       value={values.accountNumber}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       error={errors.accountNumber || getFieldError(formErrors, "accountNumber", intl, biller)}
                       touched={touched.accountNumber}
                       disabled={disabled}
            >
                {helpImageAccountNumber &&
                <Accordion title="fastForm.registration.create.help.title"
                           values={{account: biller.registrationContactIdField}}
                           textDecoration={false}>
                    <img className={styles.images}
                         src={helpImageAccountNumber}
                         alt={`Location of ${biller.registrationContactIdField}`}/>
                </Accordion>}
            </TextInput>

            {biller.useAuthItem1 &&
            <TextInput key="auth1"
                       name="auth1"
                       label={biller.authItem1Field}
                       internationalisedLabel={false}
                       hint={biller.authItem1Help}
                       value={values.auth1}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       error={errors.auth1}
                       touched={touched.auth1}
                       disabled={disabled}
            />}

            {helpImageAuthItem1 &&
            <Accordion title="fastForm.registration.create.help.auth1.title"
                       values={{account: biller.authItem1Field}}
                       textDecoration={false}>
                <img className={styles.images}
                     src={helpImageAuthItem1}
                     alt={`Location of ${biller.authItem1Field}`}/>
            </Accordion>}
            {biller.useAuthItem2 &&
            <TextInput key="auth2"
                       name="auth2"
                       label={biller.authItem2Field}
                       internationalisedLabel={false}
                       hint={biller.authItem2Help}
                       value={values.auth2}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       error={errors.auth2}
                       touched={touched.auth2}
                       disabled={disabled}
            />}

            {biller.useAuthItem3 &&
            <TextInput key="auth3"
                       name="auth3"
                       label={biller.authItem3Field}
                       internationalisedLabel={false}
                       hint={biller.authItem3Help}
                       value={values.auth3}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       error={errors.auth3}
                       touched={touched.auth3}
                       disabled={disabled}
            />}

            {biller.useAuthItem4 &&
            <TextInput key="auth4"
                       name="auth4"
                       label={biller.authItem4Field}
                       internationalisedLabel={false}
                       hint={biller.authItem4Help}
                       value={values.auth4}
                       onChange={handleChange}
                       onBlur={handleBlur}
                       error={errors.auth4}
                       touched={touched.auth4}
                       disabled={disabled}
            />}

        </React.Fragment>
    )
};

export default injectIntl(EmailRegistrationVerificationFormFields);
