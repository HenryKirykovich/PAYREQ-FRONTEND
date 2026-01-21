import React, {useEffect, useState} from "react";
import {FormattedDate, FormattedNumber, injectIntl} from "react-intl";
import {Formik} from "formik";
import axios from "axios";
import fileDownload from "js-file-download";
import * as Yup from 'yup';
import {withRouter} from "react-router-dom";

import {
    PageHeading,
    SecondaryHeading,
    Select,
    TextInput,
    VerticalLayout,
    RegularText,
    Checkbox, AlertDanger, LinkButton, SubmitButton
} from "../common";
import Loading from "../Loading";
import styles from "./BPayBatchForm.module.scss";
import {FormGroup, HelpBlock} from "react-bootstrap";
import {timeInUTC} from "../../utils/date-utils";
import {useAppState} from "../../state";

export const BANK_OPTIONS = [
    {value: "BWA", label: "Bankwest"},
    {value: "CBA", label: "Commonwealth Bank"},
    {value: "MBL", label: "Macquarie Bank"},
    {value: "NAB", label: "NAB"},
    {value: "WBC", label: "Westpac"}
];

export const PAYMENT_METHOD_OPTIONS = [
    {value: "001", label: "Debit"},
    {value: "101", label: "Visa"},
    {value: "201", label: "MasterCard"},
    {value: "301", label: "Other Credit Card"}
];

const schema = Yup.object().shape({
    bank: Yup.string().required("forms.generic.required.label"),
    bsb: Yup.string().required("forms.generic.required.label"),
    accountNumber: Yup.string().required("forms.generic.required.label"),
    customerShortName: Yup.string().when("bank", {
        is: "NAB",
        then: Yup.string().required("forms.generic.required.label")
    }),
    customerId: Yup.string().when("bank", {
        is: "NAB",
        then: Yup.string().required("forms.generic.required.label")
    }),
    paymentMethod: Yup.string().required("forms.generic.required.label"),
    invoiceIds: Yup.array().required("forms.generic.atLeastOne.label"),
    markPaid: Yup.boolean(),
});

const getDueInvoices = (billerId, params, setInvoices) => {
    axios.get("/data/invoices",
        {
            params: {
                ...params,
                billerId,
                type: "paymentDue",
                documentType: "invoice-and-reminder",
                fromDate: timeInUTC(params.fromDate),
                toDate: timeInUTC(params.toDate),
                numRecords: 100
            }
        })
        .then(({data}) => setInvoices(data.invoices));
};

const downloadFile = (billerId, data, headers, history) => {
    const filename = headers["content-disposition"].split("filename=")[1];
    fileDownload(data, filename);
    history.push(`/portal/customer/biller/${billerId}/inbox`)
};

const onSubmit = (billerId, values, setSubmitting, setServerErrors, history) => {
    setSubmitting(true);
    axios.post(
        `/download/invoices/${billerId}/bpay-batch`,
        values
    )
        .then(({data, headers}) => data.errors ? setServerErrors(data.errors) : downloadFile(billerId, data, headers, history))
        .finally(() => setSubmitting(false));
};

const NabFields = ({values, handleChange, handleBlur, touched, errors}) => (
    <React.Fragment>
        <TextInput key="customerShortName"
                   name="customerShortName"
                   label="bpayBatchFileCreationForm.customerShortName.select.label"
                   value={values.customerShortName}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   error={errors.customerShortName}
                   touched={touched.customerShortName}
        />

        <TextInput key="customerId"
                   name="customerId"
                   label="bpayBatchFileCreationForm.customerId.select.label"
                   value={values.customerId}
                   onChange={handleChange}
                   onBlur={handleBlur}
                   error={errors.customerId}
                   touched={touched.customerId}
        />
    </React.Fragment>
);

const removeBillId = (setFieldValue, values, id) => setFieldValue("invoiceIds", values.invoiceIds.filter(selectedId => selectedId !== id));
const addBillId = (setFieldValue, values, id) => setFieldValue("invoiceIds", values.invoiceIds.concat(id));

const InvoiceSelectionTableRow = ({values, setFieldValue, setFieldTouched, invoice: {id, billerName, dueDate, billRef1, amountDue, currencyCode, billRef2}}) => {
    const updateCheckboxValues = (id) => {
        setFieldTouched("invoiceIds");
        return values.invoiceIds.includes(id) ? removeBillId(setFieldValue, values, id) : addBillId(setFieldValue, values, id)
    };
    return (
        <tr onClick={() => updateCheckboxValues(id)}>
            <td><input type="checkbox" name="invoiceIds" value={values.invoiceIds.includes(id)}
                       checked={values.invoiceIds.includes(id)}
                       onChange={() => updateCheckboxValues(id)}/></td>
            <td>{billerName}</td>
            <td>
                {/*eslint-disable-next-line*/}
                <FormattedNumber value={amountDue} style="currency" currency={currencyCode}/>
            </td>
            <td><FormattedDate value={new Date(dueDate)}/></td>
            <td>{billRef1}</td>
            <td>{billRef2}</td>
        </tr>
    )
};

const InvoiceSelectionTable = injectIntl(({invoices, values, errors, touched, setFieldValue, setFieldTouched, intl}) => {
    const [selectAll, setSelectAll] = useState(false);
    const showError = errors.invoiceIds && touched.invoiceIds;
    const handleSelectAllChange = () => {
        const newState = !selectAll;
        setSelectAll(newState);
        setFieldTouched("invoiceIds");
        return setFieldValue("invoiceIds", newState ? invoices.map(i => i.id) : []);
    };
    return (
        <div className={styles.invoiceContainer}>
            <SecondaryHeading text="bpayBatchFileCreationForm.invoices.heading"/>
            <RegularText text="bpayBatchFileCreationForm.invoices.description"/>
            {showError &&
            <FormGroup
                validationState="error"><HelpBlock>{intl.formatMessage({id: errors.invoiceIds})}</HelpBlock>
            </FormGroup>}
            <table className="table table-hover clickable-rows">
                <thead>
                <tr>
                    <th>
                        <input type="checkbox" checked={selectAll}
                               onChange={handleSelectAllChange}/>
                    </th>
                    {[
                        "bpayBatchFileCreationForm.billerName",
                        "bpayBatchFileCreationForm.invoiceAmount",
                        "bpayBatchFileCreationForm.dueDate",
                        "bpayBatchFileCreationForm.reference",
                        "bpayBatchFileCreationForm.address"
                    ].map(label => <th key={label}>{intl.formatMessage({id: label})}</th>)}
                </tr>
                </thead>
                <tbody>
                {invoices.map(invoice => <InvoiceSelectionTableRow key={invoice.id} invoice={invoice} values={values}
                                                                   setFieldValue={setFieldValue}
                                                                   setFieldTouched={setFieldTouched}/>)}
                </tbody>
            </table>
        </div>
    )
});

const getServerError = (serverErrors, field) => {
    const err = serverErrors.find(se => se.errField === field);
    return err ? err.errMessage : null;
};

const ServerErrors = ({serverErrors}) => (
    <div className={styles.alertError}>
        <AlertDanger>
            There are some errors in the details you entered:
            <ul>
                {serverErrors.map(se => <li>{se.errMessage}</li>)}
            </ul>
        </AlertDanger>
    </div>

);

const BPayBatchForm = ({billerId, history}) => {
    const [invoices, setInvoices] = useState();
    const [{inbox}] = useAppState();
    useEffect(() => getDueInvoices(billerId, inbox.searchParams, setInvoices), [billerId, inbox, setInvoices]);
    const [serverErrors, setServerErrors] = useState([]);
    return (
        <VerticalLayout>
            <Formik
                initialValues={{
                    bank: "",
                    bsb: "",
                    accountNumber: "",
                    customerShortName: "",
                    customerId: "",
                    paymentMethod: "",
                    invoiceIds: [],
                    markPaid: false
                }}
                validationSchema={schema}
                onSubmit={(values, {setSubmitting}) => onSubmit(billerId, values, setSubmitting, setServerErrors, history)}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setFieldValue,
                      setFieldTouched
                  }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <VerticalLayout half>
                            <PageHeading text="bpayBatchFileCreationForm.page.heading"/>
                            <RegularText text="bpayBatchFileCreationForm.page.intro"/>
                            <SecondaryHeading text="bpayBatchFileCreationForm.bankAccount.heading"/>
                            <RegularText text="bpayBatchFileCreationForm.bankAccount.description"/>
                            <Select name="bank"
                                    label="bpayBatchFileCreationForm.bank.select.label"
                                    placeholder="bpayBatchFileCreationForm.bank.select.placeholder"
                                    options={BANK_OPTIONS}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.bank}
                                    touched={touched.bank}
                            />

                            <TextInput key="bsb"
                                       name="bsb"
                                       label="bpayBatchFileCreationForm.bsb.select.label"
                                       value={values.bsb}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={errors.bsb || getServerError(serverErrors, "bsb")}
                                       touched={touched.bsb}
                            />

                            <TextInput key="accountNumber"
                                       name="accountNumber"
                                       label="bpayBatchFileCreationForm.accountNumber.select.label"
                                       value={values.accountNumber}
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       error={errors.accountNumber || getServerError(serverErrors, "accountNumber")}
                                       touched={touched.accountNumber}
                            />

                            {values.bank === "NAB" &&
                            <NabFields values={values} handleChange={handleChange} handleBlur={handleBlur}
                                       touched={touched}
                                       errors={errors}/>}

                            <Select name="paymentMethod"
                                    label="bpayBatchFileCreationForm.paymentMethod.select.label"
                                    placeholder="bpayBatchFileCreationForm.paymentMethod.select.placeholder"
                                    options={PAYMENT_METHOD_OPTIONS}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.paymentMethod}
                                    touched={touched.paymentMethod}
                            />
                            </VerticalLayout>

                            {invoices ?
                                <React.Fragment>
                                    <InvoiceSelectionTable invoices={invoices} values={values}
                                                           setFieldValue={setFieldValue}
                                                           setFieldTouched={setFieldTouched} errors={errors}
                                                           touched={touched}/>
                                    <div className={styles.markPaidCheckboxContainer}>
                                        <Checkbox name="markPaid"
                                                  label="bpayBatchFileCreationForm.markPaid"
                                                  value={values.markPaid}
                                                  onChange={() => setFieldValue("markPaid", !values.markPaid)}
                                                  onBlur={() => setFieldTouched("markPaid")}
                                                  error={errors.markPaid}
                                                  touched={touched.markPaid}/>
                                    </div>
                                </React.Fragment>
                                :
                                <Loading/>}

                            <div className={styles.buttonContainer}>
                                <SubmitButton label="generic.download" disabled={isSubmitting}/>
                                <LinkButton label="forms.generic.cancel.button"
                                            onClick={() => history.push("../inbox")}/>
                            </div>
                        </form>
                    )
                }}
            </Formik>
            {serverErrors.length > 0 && <ServerErrors serverErrors={serverErrors}/>}
        </VerticalLayout>);
};

export default withRouter(BPayBatchForm);