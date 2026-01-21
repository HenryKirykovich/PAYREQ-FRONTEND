import React, {useEffect, useState} from "react";
import axios from "axios";
import {PageHeading, RegularText} from "../../common";
import Loading from "../../Loading";
import RegistrationSummaryTable from "./RegistrationSummaryTable";
import styles from "./RegistrationSummaryReport.module.scss";

function RegistrationSummaryReport({billerId}){
    const generateReport = (billerId, setReportData, setSubmitting) => {
        axios.post(`/data/reports/${billerId}/registrationreport`)
            .then(({data}) => setReportData(data))
            .finally(() => setSubmitting(false))
        ;
    };

    const [reportData, setReportData] = useState();

    const [isSubmitting, setSubmitting] = useState(true);
    useEffect(() => generateReport(billerId, setReportData, setSubmitting), [billerId, setReportData, setSubmitting])
    return (
        <div>
            <PageHeading text="reports.registrationsummary.heading"/>
            <RegularText text="reports.registrationsummary.description"/>

            <div className={styles.reportTableContainer}>
                {isSubmitting && <Loading/>}
                {!isSubmitting && reportData && reportData.length === 0 && <RegularText text="reports.registrationsummary.noResults"/>}
                {!isSubmitting && reportData && reportData.length >= 0 && (
                    <RegistrationSummaryTable reportRows={reportData}
                                              billerId={billerId}
                    />
                )}
            </div>
        </div>
    );


};

export default RegistrationSummaryReport;