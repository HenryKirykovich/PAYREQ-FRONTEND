import React, {useCallback, useState} from "react";
import axios from "axios";
import {PageHeading, RegularText} from "../common";
import Loading from "../Loading";
import AgentsDownloadsReportTable from "./AgentsDownloadsReportTable";
import styles from "./AgentsDownloadsReport.module.scss";
import AgentsDownloadsReportDateFilter from "./AgentsDownloadsReportDateFilter"

function AgentsDownloadsReport({billerId}){
    const generateReport = (billerId, fromDate, toDate, setSubmitting, setReportData) => {
        axios.post(`/data/reports/${billerId}/agentsdownloads`, {fromDate, toDate})
            .then(({data}) => setReportData(data))
            .finally(() => setSubmitting(false))
        ;
    };

    const [reportData, setReportData] = useState();
    const toDate = new Date();
    const fromDate = new Date();
    const initialTo = new Date(toDate.setDate(toDate.getDate() + 7)).toISOString().slice(0, 10);
    const initialFrom = new Date(fromDate.setMonth(fromDate.getMonth() - 3)).toISOString().slice(0, 10);
    const handleSubmit = useCallback((fromDate, toDate, setSubmitting) =>
        generateReport(billerId, fromDate, toDate, setSubmitting, setReportData), [billerId]);

    return (
        <div>
            <PageHeading text="reports.agentsdownloads.heading"/>
            <RegularText text="reports.agentsdownloads.description"/>
            <AgentsDownloadsReportDateFilter initialTo={initialTo}
                                             initialFrom={initialFrom}
            generateReport={handleSubmit}>
                {isSubmitting => (
                    <div className={styles.reportTableContainer}>
                    {!isSubmitting && reportData && reportData.length === 0 && <RegularText text="reports.agentsdownloads.noResults"/>}
                    {!isSubmitting && reportData && reportData.length >= 0 && (
                        <AgentsDownloadsReportTable reportRows={reportData}
                                                    billerId={billerId}
                        />
                    )}
                    {isSubmitting && <Loading/>}
                </div>)}
            </AgentsDownloadsReportDateFilter>
        </div>
    );


};

export default AgentsDownloadsReport;
