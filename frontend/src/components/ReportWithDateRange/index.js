import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {DateInput, SubmitButton} from "../common";
import styles from "./ReportWithDateRange.module.scss";

//generateReport function will be given 3 parameters: fromDate, toDate, setSubmitting
const ReportWithDateRange = ({children, generateReport}) => (
    <Formik
        initialValues={{
            fromDate: "",
            toDate: ""
        }}
        validationSchema={Yup.object().shape({
            fromDate: Yup.date().typeError("forms.generic.date.validation.label").required("forms.generic.required.label"),
            toDate: Yup.date().typeError("forms.generic.date.validation.label").required("forms.generic.required.label")
        })}
        onSubmit={(values, {setSubmitting}) => generateReport(values.fromDate, values.toDate, setSubmitting)}
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
                                       label="reports.billPayments.fromDate"
                                       value={values.fromDate}
                                       onChange={handleChange}
                                       error={errors.fromDate}
                                       touched={touched.fromDate}/>
                            <DateInput name="toDate"
                                       label="reports.billPayments.toDate"
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
    </Formik>
);

export default ReportWithDateRange;