import React, {useEffect, useState} from "react";
import InboxDownloadResultView, {JOB_STATUSES} from "./InboxDownloadResultView";
import {withRouter} from "react-router-dom";
import Loading from "../../Loading";
import axios from "axios";

const EXECUTION_LIMIT = 55;

export const getWaitPeriod = executionCount => executionCount > 10 ? 10000 : executionCount * 1000;

export const shouldSchedulePoll = (data, executionCount) => data.job.status === JOB_STATUSES.IN_PROGRESS && executionCount < EXECUTION_LIMIT;

const getJob = (jobId, setJob, executionCount) => {
        axios.get(`/data/jobs/${jobId}`)
            .then(({data}) => {
                    setJob(data.job);
                    if (shouldSchedulePoll(data, executionCount)) {
                            setTimeout(() => getJob(jobId, setJob, executionCount + 1), getWaitPeriod(executionCount))
                    }
            });
};

const InboxDownloadResult = ({match: {params: {jobId}}, isMailDownload = false}) => {
        const [job, setJob] = useState();
        useEffect(() => getJob(jobId, setJob, 1), [jobId, setJob])

        if (!job) return <Loading/>
        return <InboxDownloadResultView job={job} onRefresh={() => getJob(jobId, setJob, EXECUTION_LIMIT)} isMailDownload={isMailDownload}/>
    }
;

export default withRouter(InboxDownloadResult);
