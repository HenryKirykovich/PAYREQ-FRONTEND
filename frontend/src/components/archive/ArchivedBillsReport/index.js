import React, {useState} from "react";
import axios from "axios";

import {PageHeading, RegularText} from "../../common";
import Loading from "../../Loading";
import ReportTable from "./ArchiveReportTable";
import ReportWithDateRange from "../../ReportWithDateRange";
import {getTimeZone} from "../../../utils/date-utils";

const generateReport = (billerId, fromDate, toDate, setSubmitting, setReportRows) => {
    axios.post(`/data/reports/${billerId}/archivedbills`, {fromDate, toDate, timeZone: getTimeZone()})
        .then(({data}) => setReportRows(data))
        .finally(() => setSubmitting(false))
    ;
};

const ArchivedBillsReport = ({billerId}) => {
    const [reportRows, setReportRows] = useState();
    return (
        <div>
            <PageHeading text="reports.archive.heading"/>
            <RegularText text="reports.archive.description"/>
            <ReportWithDateRange generateReport={(fromDate, toDate, setSubmitting) => generateReport(billerId, fromDate, toDate, setSubmitting, setReportRows)}
            >
                {isSubmitting => (
                    <div>
                        {!isSubmitting && reportRows && <ReportTable reportRows={reportRows}/>}
                        {!isSubmitting && reportRows && reportRows.length === 0 && <RegularText text="reports.archive.noResults"/>}
                        {isSubmitting && <Loading/>}
                    </div>
                )}
            </ReportWithDateRange>
        </div>
    );
};

export default ArchivedBillsReport;