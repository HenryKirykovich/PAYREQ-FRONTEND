import React, {useState} from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {injectIntl} from "react-intl";
import {AlertDanger, Checkbox, LargeText, LinkButton, RegularText, Select, SubmitButton} from "../../common";
import EmailRegistrationVerificationFormFields from "../email/EmailRegistrationVerificationFormFields";
import styles from "../../FastForm/FastFormRegistrationForm.module.scss";
import {validateRegistrationAuthItems} from "../../../utils/registration-utils";
import {DEFAULT_MAX_STRING_LENGTH} from "../../../utils/form-utils";
import axios from "axios";
import {withRouter} from "react-router-dom";

const yesValue = "Y";
const noValue = "N";

const CREATE_SUPPLIER_VALUES = [
    {value: noValue, label: "forms.generic.false"},
    {value: yesValue, label: "forms.generic.true"},
]

export const AMOUNT_PAYABLE_OPTIONS = [
    {value: "TOTAL", label: "registrations.createXero.amountPayable.total"},
    {value: "MINIMUM", label: "registrations.createXero.amountPayable.minimum"}
];

export const formatSelectOptions = (value) => {
    return value.map(({name, id, accounts}) => ({label: name, value: id, accounts: accounts}));
}

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

const ErrorMessage = ({errorId, billerName, intl}) => (
    <div className={styles.formErrors}>
        <AlertDanger>
            {intl.formatMessage({id: errorId}, {billerName: billerName})}
        </AlertDanger>
    </div>
)

const getFieldError = (errors, fld, intl, biller) => {
    const err = errors && errors.find(({field}) => field === fld);
    return err ? intl.formatMessage({id: "registrations.createEmail." + err.name + ".error"}, {
        ...err.values,
        account: biller.registrationContactIdField
    }) : null;
};

const getValidationSchema = (channel) => (
    Yup.object().shape({
            accountNumber: Yup.string().required("forms.generic.required.label").matches(new RegExp(channel.registrationContactIdFormat || '.+'), channel.registrationContactIdValidationMsg).max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth1: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth2: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth3: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            auth4: Yup.string().max(DEFAULT_MAX_STRING_LENGTH, "forms.generic.max.length.label"),
            supplierCreate: Yup.string().required("forms.generic.required.label"),
            supplier: Yup.string().when("supplierCreate", {
                is: noValue,
                then: Yup.string().required("forms.generic.required.label")
            }),
            supplierTerms: Yup.string().when("supplierCreate", {
                is: yesValue,
                then: Yup.string().required("forms.generic.required.label")
            }),
            accountCode: Yup.string().required("forms.generic.required.label"),
            taxCode: Yup.string().required("forms.generic.required.label"),
            amountPayable: Yup.string().required("forms.generic.required.label"),
            accept: Yup.boolean().oneOf([true], "forms.generic.required.label")
        }
    )
);

const getReckonSupplierTerms = (payerId, registeringForbillerId, supplierId, setSupplierTerm, setLoadingSupplierTerm) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/reckon/supplier/${supplierId}`)
        .then(({data}) => setSupplierTerm(data))
        .finally(() => setLoadingSupplierTerm(false));
};

const handleCreateReckonSupplierChange = (createSupplierSelection, setSupplierTerm, setFieldValue) => {
    if (createSupplierSelection === yesValue){
        setSupplierTerm({});
        setFieldValue("supplier", "");
    } else {
        setFieldValue("supplierTerms", "");
    }
}

const submitRegistration = (values, setSubmitting, payerId, registeringForbillerId, setServerErrors, setCreateSupplierError, history, hasPaymentGateway) => {
    setSubmitting(true);
    axios.post(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/channels/selfservice/reckon`, values)
        .then(({data}) => {
            if (data.success) {
                return history.push({
                    pathname: "./email/saved",
                    state: {
                        registeringForbillerId: registeringForbillerId,
                        accountNumber: values.accountNumber,
                        hasPaymentGateway: hasPaymentGateway
                    }});
                ;
            }
            setServerErrors(data.errors);
            setCreateSupplierError(data.createSupplierError);
            setSubmitting(false);
        });
};

const CreateReckonRegistrationForm = ({config, payerId, registeringForbillerId, intl, history}) => {
    const [supplierTerm, setSupplierTerm] = useState({});
    const [loadingSupplierTerm, setLoadingSupplierTerm] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);
    const [createSupplierError, setCreateSupplierError] = useState();

    const {tagName, channel, reckonvendors, reckontaxcodes, reckonaccounts, reckonterms, hasPaymentGateway, fastformRegistrationAcceptLabel} = config;

    return (
        <Formik initialValues={{
                    accountNumber: "", auth1: "", auth2: "", auth3: "", auth4: "", accept: false,
                    supplierCreate: noValue, supplier: "", supplierTerms: "", accountCode: "", taxCode: "supplier", amountPayable: ""
                    }}
                validationSchema={getValidationSchema(channel)}
                validate={values => validateRegistrationAuthItems(intl, channel, values)}
                onSubmit={(values, {setSubmitting}) => submitRegistration(values, setSubmitting, payerId, registeringForbillerId, setServerErrors, setCreateSupplierError, history, hasPaymentGateway)}>
            {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting
              }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <EmailRegistrationVerificationFormFields biller={channel}
                                                                 values={values}
                                                                 errors={errors}
                                                                 touched={touched}
                                                                 handleChange={handleChange}
                                                                 formErrors={serverErrors}
                                                                 getFieldError={getFieldError}
                                                                 disabled={isSubmitting}
                        />
                        <LargeText text="registrations.createReckon.reckonDetailsHeading" className={styles.newInputSection}/>
                        <Select name="supplierCreate"
                                label={intl.formatMessage({id: "registrations.createReckon.supplierCreate.label"}, {billerName: tagName})}
                                placeholder="registrations.createReckon.supplierCreate.placeholder"
                                hint="registrations.createReckon.supplierCreate.hint"
                                options={CREATE_SUPPLIER_VALUES}
                                value={values.supplierCreate}
                                onChange={e => {
                                    handleChange(e);
                                    handleCreateReckonSupplierChange(e.target.value, setSupplierTerm, setFieldValue);
                                }}
                                error={errors.supplierCreate}
                                touched={touched.supplierCreate}
                        />
                        {values.supplierCreate === noValue &&
                            <React.Fragment>
                                <Select name="supplier"
                                        label="registrations.createReckon.supplier.label"
                                        placeholder="registrations.createReckon.supplier.placeholder"
                                        hint="registrations.createReckon.supplier.hint"
                                        options={formatSelectOptions(reckonvendors)}
                                        internationalisedOptions={false}
                                        value={values.supplier}
                                        onChange={e => {
                                            handleChange(e);
                                            setLoadingSupplierTerm(true)
                                            getReckonSupplierTerms(payerId, registeringForbillerId, e.target.value, setSupplierTerm, setLoadingSupplierTerm);
                                        }}
                                        error={errors.supplier}
                                        touched={touched.supplier}
                                />
                                {loadingSupplierTerm && <RegularText text="registrations.createReckon.supplierTermsValues.loading"/>}
                                {!loadingSupplierTerm && supplierTerm && supplierTerm.terms && <RegularText text="registrations.createReckon.supplierTermsValues.label" values={supplierTerm}/>}
                            </React.Fragment>}

                        {values.supplierCreate === yesValue &&
                            <React.Fragment>
                                <Select name="supplierTerms"
                                        label="registrations.createReckon.supplierTerms.label"
                                        placeholder="registrations.createReckon.supplierTerms.placeholder"
                                        hint="registrations.createReckon.supplierTerms.hint"
                                        options={formatSelectOptions(reckonterms)}
                                        internationalisedOptions={false}
                                        value={values.supplierTerms}
                                        onChange={handleChange}
                                        error={errors.supplierTerms}
                                        touched={touched.supplierTerms}
                                />
                            </React.Fragment>}

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


                        <RegularText text="fastForm.registration.accept.text"/>
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
                        {createSupplierError && <ErrorMessage errorId="registrations.createReckon.createReckonSupplier.error" billerName={tagName} intl={intl}/>}
                        {serverErrors && serverErrors.length > 0 && <FormErrors errors={serverErrors} biller={channel} intl={intl}/>}
                    </form>
                )}}
        </Formik>
    );
};

export default withRouter(injectIntl(CreateReckonRegistrationForm));
