import React, {useState} from "react";
import axios from "axios";

import {PageHeading, RegularText} from "../../common";
import Loading from "../../Loading";
import ReportTable from "./PrintReportTable";
import ReportWithDateRange from "../../ReportWithDateRange";
import {getTimeZone} from "../../../utils/date-utils";

import styles from "./PrintReport.module.scss";

const generateReport = (billerId, fromDate, toDate, setSubmitting, setReportRows) => {
    axios.post(`/data/reports/${billerId}/print`, {fromDate, toDate, timeZone: getTimeZone()})
        .then(({data}) => setReportRows(data))
        .finally(() => setSubmitting(false))
    ;
};

const PrintedBillsReport = ({billerId}) => {
    const [reportRows, setReportRows] = useState();
    return (
        <div>
            <PageHeading text="reports.print.heading"/>
            <RegularText text="reports.print.description"/>
            <ReportWithDateRange generateReport={(fromDate, toDate, setSubmitting) => generateReport(billerId, fromDate, toDate, setSubmitting, setReportRows)}
            >
                {isSubmitting => (
                    <div className={styles.reportTableContainer}>
                        {!isSubmitting && reportRows && <ReportTable reportRows={reportRows}/>}
                        {!isSubmitting && reportRows && reportRows.length === 0 && <RegularText text="reports.print.noResults"/>}
                        {isSubmitting && <Loading/>}
                    </div>
                )}
            </ReportWithDateRange>
        </div>
    );
};

export default PrintedBillsReport;