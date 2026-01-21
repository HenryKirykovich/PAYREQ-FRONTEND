import React, {useState} from "react";
import axios from "axios";
import {PageHeading, RegularText} from "../../common";
import Loading from "../../Loading";
import ReportTable from "./BillPaymentsReportTable";
import ReportWithDateRange from "../../ReportWithDateRange";
import {getTimeZone} from "../../../utils/date-utils";

const generateReport = (billerId, fromDate, toDate, setSubmitting, setReportRows, setTotal, setBillerPaymentProcessor) => {
  axios.post(`/data/reports/${billerId}/billpayments`, {fromDate, toDate, timeZone: getTimeZone()})
       .then(({data}) => {
         setReportRows(data.reportRows);
         setTotal(data.total);
         setBillerPaymentProcessor(data.billerPaymentProcessor);
       })
       .finally(() => setSubmitting(false));
};

const BillPaymentsReport = ({billerId}) => {
  const [reportRows, setReportRows] = useState();
  const [total, setTotal] = useState();
  const [billerPaymentProcessor, setBillerPaymentProcessor] = useState();
  return (
    <div>
      <PageHeading text="reports.billPayments.heading"/>
      <RegularText text="reports.billPayments.description"/>
      <ReportWithDateRange generateReport={(fromDate, toDate, setSubmitting) => generateReport(billerId, fromDate, toDate, setSubmitting, setReportRows, setTotal, setBillerPaymentProcessor)}
      >
        {isSubmitting => (
          <div>
            {!isSubmitting && reportRows && <ReportTable reportRows={reportRows} total={total} billerPaymentProcessor={billerPaymentProcessor} /> }
            {isSubmitting && <Loading/>}
          </div>
        )}
      </ReportWithDateRange>
    </div>
  );
};

export default BillPaymentsReport;
