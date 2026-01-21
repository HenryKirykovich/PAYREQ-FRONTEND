import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { injectIntl } from "react-intl";
import * as Yup from "yup";

import BrowserUI from "../BrowserUI";
import { Alert, LargeText, LinkButton, TextInput, SubmitButton, RegularText, Icon } from "../common";
import { ALERT_TYPES } from "../common/alerts/Alert";

import styles from "./AuthenticatorAppSetupForm.module.scss";

const schema = () => {
    return Yup.object().shape({
        tokenOne: Yup.string()
            .required("forms.generic.required.label"),
        tokenTwo: Yup.string()
            .required("forms.generic.required.label"),
    })
}

const CodesIncorrect = ({ intl }) => (
    <Alert type={ALERT_TYPES.DANGER} className={styles.errorAlert}>
        <RegularText text="personalSettings.security.mfa.authenticator-app.codesIncorrect" />
    </Alert>
);

const copyCodeToClipBoard = (code, setShowCopied, inputRef) => {
    inputRef.current.select();
    document.execCommand('copy');
    inputRef.current.blur();
    setShowCopied(true);
    setTimeout(function () {
        setShowCopied(false);
    }, 2 * 1000);
}

const ManualCodeView = ({ code }) => {
    const [showKey, setShowKey] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const inputRef = useRef(null);
    return (
        <React.Fragment>
            <div className={styles.manualCode}>
                <RegularText text="personalSettings.security.mfa.manual.code.text" />
                <LinkButton label={showKey ? "personalSettings.security.mfa.manual.code.hide"
                    : "personalSettings.security.mfa.manual.code.show"} onClick={() => setShowKey(!showKey)} />
            </div>
            {showKey &&
                <div className={styles.codeContainer}>
                    <input type="text" ref={inputRef} value={code} className={styles.codeText} readonly />
                    {showKey && <Icon name="duplicate" onClick={() => copyCodeToClipBoard(code, setShowCopied, inputRef)} />}
                    {showCopied && <RegularText className={styles.copyText} text={"personalSettings.security.mfa.manual.code.copied"} />}
                </div>}
        </React.Fragment>
    )
}

const AuthenticatorAppSetupForm = ({ mfaCodeData, onSubmit, codesIncorrect, linkTo, intl }) => {
    const { qrcode, code } = mfaCodeData;
    return (
        <div className={styles.formContainer}>
            <Alert type={ALERT_TYPES.INFO} className={styles.alert}>
                <LargeText text="personalSettings.security.mfa.appAlert.heading" />
                <ul>
                    <li><LargeText text="personalSettings.security.mfa.appAlert.step1" /></li>
                    <li><LargeText text="personalSettings.security.mfa.appAlert.step2" /></li>
                    <li><LargeText text="personalSettings.security.mfa.appAlert.step3" /></li>
                </ul>
            </Alert>
            <img src={qrcode} alt={intl.formatMessage({ id: "personalSettings.security.mfa.qrcode.alt" })} />
            <ManualCodeView code={code} />

            <Formik initialValues={{
                tokenOne: "",
                tokenTwo: "",
            }}
                onSubmit={onSubmit}
                validationSchema={schema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
                        <TextInput name="tokenOne"
                            hint="personalSettings.security.mfa.authenticator-app.tokenOne.hint"
                            label="personalSettings.security.mfa.authenticator-app.tokenOne.label"
                            value={values.tokenOne}
                            onChange={handleChange}
                            error={errors.tokenOne}
                            touched={touched.tokenOne} />
                        <TextInput name="tokenTwo"
                            hint="personalSettings.security.mfa.authenticator-app.tokenTwo.hint"
                            label="personalSettings.security.mfa.authenticator-app.tokenTwo.label"
                            value={values.tokenTwo}
                            onChange={handleChange}
                            error={errors.tokenTwo}
                            touched={touched.tokenTwo} />
                        {codesIncorrect && <CodesIncorrect />}
                        <div className={styles.formButtonContainer}>
                            <SubmitButton label="forms.generic.save.button"
                                disabled={isSubmitting} />
                            <BrowserUI>
                                <LinkButton linkTo={linkTo}
                                    label="forms.generic.cancel.button"
                                    disabled={isSubmitting} />
                            </BrowserUI>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
};

export default injectIntl(AuthenticatorAppSetupForm);
