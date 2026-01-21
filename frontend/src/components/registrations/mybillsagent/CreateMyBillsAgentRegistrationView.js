import React, {useState} from "react";
import {FieldArray, Formik} from "formik";
import {injectIntl} from "react-intl";
import * as Yup from "yup";

import {
    PageHeading,
    LargeText,
    LinkButton,
    Checkbox,
    SubmitButton,
    TextInput, ArrayInputMulti, AlertDanger
} from "../../common";

import styles from "./CreateMyBillsAgentRegistrationView.module.scss"
import MyBillsAgentExcelLoadModal from "./MyBillsAgentExcelLoadModal";
import CreateRegistrationViewContainer from "../CreateRegistrationViewContainer";
import {DEFAULT_MAX_STRING_LENGTH} from "../../../utils/form-utils";


const RemoveButton = ({onClick}) => <LinkButton icon="remove" onClick={onClick}/>;

const RemoveButtonPlaceholder = () => <div style={{width: "40px"}}/>;

const schema = channel => Yup.object().shape({
    registrations: Yup.array()
        .of(
            Yup.object().shape({
                accountNumber: Yup.string().required("forms.generic.required.label").matches(new RegExp(channel.registrationContactIdFormat || '.+'), channel.registrationContactIdValidationMsg).max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
                authfield1: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            })
        )
        .required('forms.generic.required.label')
        .min(1, 'Enter at least one registration'),

    accept: Yup.boolean().oneOf([true], "forms.generic.required.label"),
});

const AddRegistrationButton = ({arrayHelpers}) => (
    <LinkButton
        label="registrations.createMyBillsAgent.addRegistrationButtonLabel"
        onClick={() => arrayHelpers.push({accountNumber: "", authfield1: ""})}
        icon="plus"/>
);

const FormErrors = ({errors, biller, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: "forms.formLevelErrors"})}
            <ul>
                {errors.map(({name, values}) =>
                    <li key={name}>{intl.formatMessage({id: "registrations.createMyBillsAgent." + name + ".error"},
                        {...values,
                            account: biller.registrationContactIdField})}</li>)}
            </ul>
        </AlertDanger>
    </div>
);

const CreateMyBillsAgentRegistrationView = ({channel, logoPath, billerName, fastformRegistrationAcceptLabel, serverErrors = [], onSubmit, intl}) => {
    const [showModal, setShowModal] = useState(false);
    return (
        <CreateRegistrationViewContainer logoPath={logoPath} billerName={billerName} half={false}>
            <PageHeading text="registrations.createMyBillsAgent.pageHeading"/>
            <div className={styles.instructionContainer}>
                <LargeText text="registrations.createMyBillsAgent.instruction"/>
                <LinkButton onClick={() => setShowModal(true)}>
                    <LargeText text="registrations.createMyBillsAgent.excelButton"/>
                </LinkButton>
            </div>

            <Formik
                initialValues={{registrations: [{accountNumber: "", authfield1: ""}], accept: false}}
                validationSchema={schema(channel)}
                onSubmit={(values, {setSubmitting}) => onSubmit(values, setSubmitting)}>
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <MyBillsAgentExcelLoadModal show={showModal}
                                                    onCancel={() => setShowModal(false)}
                                                    channel={channel}
                                                    setRegistrations={newRegos => setFieldValue("registrations", newRegos)}
                        />
                        <ArrayInputMulti name="registrations">
                            <FieldArray
                                name="registrations"
                                render={arrayHelpers => (
                                    <div>
                                        {values.registrations.map((_, index) => (
                                            <div className={styles.registrationRow}
                                                 key={`registrations.${index}`}>
                                                <span>{index + 1}</span>
                                                <TextInput name={`registrations[${index}].accountNumber`}
                                                           value={values.registrations[index].accountNumber}
                                                           placeholder={channel.registrationContactIdField}
                                                           onChange={handleChange}
                                                           onBlur={handleBlur}
                                                           error={errors.registrations && errors.registrations.length >= index + 1 && errors.registrations[index] && errors.registrations[index].accountNumber}
                                                           touched={touched.registrations && touched.registrations.length >= index + 1 && touched.registrations[index] && touched.registrations[index].accountNumber}
                                                />

                                                {channel.useAuthItem1 &&
                                                    <TextInput name={`registrations[${index}].authfield1`}
                                                               value={values.registrations[index].authfield1}
                                                               placeholder={channel.authItem1Field}
                                                               onChange={handleChange}
                                                               error={errors.registrations && errors.registrations.length >= index + 1 && errors.registrations[index] && errors.registrations[index].authfield1}
                                                               touched={touched.registrations && touched.registrations.length >= index + 1 && touched.registrations[index] && touched.registrations[index].authfield1}
                                                    />}
                                                {index === 0 ? <RemoveButtonPlaceholder/> :
                                                    <RemoveButton onClick={() => arrayHelpers.remove(index)}
                                                                  value={values[index]}
                                                                  index={index} intl={intl}/>}
                                            </div>
                                        ))}
                                        {values.registrations.length < 1000 &&
                                        <AddRegistrationButton arrayHelpers={arrayHelpers}/>
                                        }
                                    </div>
                                )}

                            />
                        </ArrayInputMulti>

                        <Checkbox name="accept"
                                  label={fastformRegistrationAcceptLabel || "fastForm.registration.accept.label"}
                                  value={values.accept}
                                  onChange={() => setFieldValue("accept", !values.accept)}
                                  onBlur={handleBlur}
                                  error={errors.accept}
                                  touched={touched.accept}
                                  disabled={isSubmitting}
                        />
                        <div className={styles.buttonContainer}>
                            <SubmitButton type="submit" label="registrations.createEmail.submitButton.label"
                                          isSubmitting={isSubmitting}/>

                            <LinkButton label="forms.generic.cancel.button" linkTo={"../../billers"}/>
                        </div>
                        {serverErrors.length > 0 && <FormErrors errors={serverErrors} biller={channel} intl={intl}/>}
                    </form>
                )}
            </Formik>

        </CreateRegistrationViewContainer>
    )
};

export default injectIntl(CreateMyBillsAgentRegistrationView);
