import React, {useCallback} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {DateInput, SubmitButton} from "../common";
import styles from "./AgentsDownloadsReport.module.scss";


const AgentsDownloadsReportDateFilter = ({children, generateReport, initialFrom, initialTo}) => {
const handleSubmit = useCallback((values, {setSubmitting}) => generateReport(values.fromDate, values.toDate, setSubmitting), [generateReport]);

    return (
    <Formik
        initialValues={{
            fromDate: initialFrom,
            toDate: initialTo
        }}
        validationSchema={Yup.object().shape({
            fromDate: Yup.date().typeError("forms.generic.date.validation.label").required("forms.generic.required.label"),
            toDate: Yup.date().typeError("forms.generic.date.validation.label").required("forms.generic.required.label")
        })}
        onSubmit={handleSubmit}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
        }) => (
            <React.Fragment>
                <div className={styles.paramsContainer}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.dateParams}>
                            <DateInput name="fromDate"
                                       label="reports.agentsdownloads.fromDate"
                                       value={values.fromDate}
                                       onChange={handleChange}
                                       error={errors.fromDate}
                                       touched={touched.fromDate}/>
                            <DateInput name="toDate"
                                       label="reports.agentsdownloads.toDate"
                                       value={values.toDate}
                                       onChange={handleChange}
                                       error={errors.toDate}
                                       touched={touched.toDate}/>
                        </div>
                        <SubmitButton label="forms.generic.generateReport.button"
                                      disabled={isSubmitting}/>
                    </form>
                </div>
                {children(isSubmitting)}
            </React.Fragment>
        )}
    </Formik>);
};

export default AgentsDownloadsReportDateFilter;
