import React, {useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import {withRouter} from "react-router-dom";
import {DefaultButton, PageHeading, Card, PrimaryButton} from "../common";
import axios from "axios";
import FieldGroup from "../common/FieldGroup";
import {formatDesc, formatEndDate, formatStartDate, jobStatus} from "./download-history-constants";
import styles from "./JobCard.module.scss";
import Loading from "../Loading";


const ButtonContainer = ({jobId, setJob}) => (
    <div style={{margin: "2rem 0 2rem 0"}}>
        <span style={{marginRight: "1rem"}}>
                <DefaultButton label="generic.refresh" icon="refresh" onClick={()=>getJob(jobId,setJob)}/>
            </span>
    </div>
);

const getJob = (jobId, setJob) => {
    axios.get(`/data/jobs/${jobId}`)
        .then(({data}) => setJob(data.job));
};

const ErrorDetails = injectIntl(({intl, job}) => (
    <FieldGroup className={styles.detailContainers}>
        <FieldGroup.Field label={intl.formatMessage({id: "downloadHistory.started"})}
                          value={formatStartDate(job.startDate, intl)}/>
        <FieldGroup.Field label={intl.formatMessage({id:"downloadHistory.ended"})}
                          value={formatEndDate(job.endDate, intl)}/>
        <FieldGroup.Field label={intl.formatMessage({id:"downloadHistory.status"})}
                          value={jobStatus(job.status, intl)}/>
        <FieldGroup.Field label={intl.formatMessage({id:"downloadHistory.runBy"})}
                          value={job.updatedBy}
        />
    </FieldGroup>
));

const JobDetails = injectIntl(({intl, job}) => (
    <FieldGroup className={styles.detailContainers}>
        <FieldGroup.Field label={intl.formatMessage({id: "downloadHistory.started"})}
                          value={formatStartDate(job.startDate, intl)}/>
        <FieldGroup.Field label={intl.formatMessage({id:"downloadHistory.ended"})}
                          value={formatEndDate(job.endDate, intl)}/>
        <FieldGroup.Field label={intl.formatMessage({id:"downloadHistory.description"})}
                          value={formatDesc(job.description, intl, job.id)}/>
        <FieldGroup.Field label={intl.formatMessage({id:"downloadHistory.status"})}
                          value={jobStatus(job.status, intl)}/>
        <FieldGroup.Field label={intl.formatMessage({id:"downloadHistory.runBy"})}
                          value={job.updatedBy}/>
        <FieldGroup.Field
            value={<PrimaryButton label={"downloadHistory.download.results"}
                                  disabled={job.status !== "done"}
                                  onClick={() => window.open(`/job-result/${job.id}`)}/>}
        />
    </FieldGroup>
));

function JobCard({match: {params: {jobId}}, intl}){
    const [job,setJob] = useState();

    useEffect(() => getJob(jobId, setJob), [jobId, setJob]);
    if (!job) return <Loading/>;
    return(
        <React.Fragment>
            <PageHeading text="downloadHistory.download" values={{id: jobId}}  />
            <ButtonContainer jobId={jobId} setJob={setJob}/>
            <Card className={styles.card} heading={"downloadHistory.download.details"}>
                {(job.status === 'error') ? <ErrorDetails job={job}/> : <JobDetails job={job}/>}
            </Card>
        </React.Fragment>
    );
}

export default withRouter(injectIntl(JobCard));
