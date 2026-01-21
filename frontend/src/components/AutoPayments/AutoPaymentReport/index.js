import React, {useEffect, useState} from "react";
import axios from "axios";

import {PageHeading, RegularText} from "../../common";
import Loading from "../../Loading";
import AutoPaymentReportTable from "./AutoPaymentReportTable";
import styles from "./AutoPaymentReport.module.scss";

const generateReport = (billerId, setReportData, setSubmitting) => {
    axios.post(`/data/reports/${billerId}/autopayment`)
        .then(({data}) => setReportData(data))
        .finally(() => setSubmitting(false))
    ;
};

const AutoPaymentBillsReport = ({billerId}) => {
    const [reportData, setReportData] = useState();
    const [isSubmitting, setSubmitting] = useState(true);
    useEffect(() => generateReport(billerId, setReportData, setSubmitting), [billerId, setReportData, setSubmitting]);
    return (
        <div>
            <PageHeading text="reports.autopayment.heading"/>
            <RegularText text="reports.autopayment.description"/>
            <div className={styles.reportTableContainer}>
                {isSubmitting && <Loading/>}
                {!isSubmitting && reportData.autoPayments && reportData.autoPayments.length === 0 && <RegularText text="reports.autopayment.noResults"/>}
                {!isSubmitting && reportData.autoPayments && reportData.autoPayments.length >= 0 && (
                    <AutoPaymentReportTable reportRows={reportData.autoPayments}
                                            currency={reportData.currency}
                                            billerId={billerId}
                    />
                    )}
            </div>
        </div>
    );
};

export default AutoPaymentBillsReport;