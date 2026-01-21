import {PageHeading, DefaultButton, Card} from "../common";
import {getPayreqDateAsFormatted} from '../../utils/date-utils';
import React, {useEffect, useState, useCallback, useMemo} from "react";
import axios from "axios";
import Loading from "../Loading";
import JobsButtons from './JobsButtons'
import {injectIntl} from "react-intl";
import FieldGroup from "../common/FieldGroup";
import JobDescription from './JobDescription';
import JobStatus from './JobStatus';
import JobBillLoadType from './JobBillLoadType';

const getJob = (jobId, setIsLoading, setJob) => {
    axios.get(`/data/jobs/${jobId}`)
         .then(({data}) => {
             setJob(data.job);
             setIsLoading(false);
         });
};

const DownloadButton = React.memo(DefaultButton);

const Job = ({match, intl}) => {
    const [job, setJob] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const jobId = match.params.jobId;
    useEffect(() => getJob(jobId, setIsLoading, setJob), [jobId]);
    const downloadResult = useCallback(() => window.open(`/job-result/${jobId}`), [jobId])
    const doRefresh = useCallback(() => getJob(jobId, setIsLoading, setJob), [jobId]);
    const canDownloadResult = useMemo(() => job.status === 'done' && job.result, [job.status, job.result]);

    if (isLoading) return <Loading/>

    return (
        <React.Fragment>

            <PageHeading text="job.pageHeading" values={{jobId: jobId, type: job.type}} />

            <JobsButtons doRefresh={doRefresh} />

            <Card heading="job.details.jobDetails">
                <FieldGroup>
                    {job.startDate &&  <FieldGroup.Field label={intl.formatMessage({id: "job.details.started"})}
                                                         value={getPayreqDateAsFormatted(job.startDate)}/>}
                    {job.endDate && <FieldGroup.Field label={intl.formatMessage({id: "job.details.ended"})}
                                                      value={getPayreqDateAsFormatted(job.endDate)}/>}
                    {job.campaignName && <FieldGroup.Field label={intl.formatMessage({id: "job.details.campaignName"})}
                                                           value={job.campaignName}/>}
                    {job.campaignInternalReferenceNumber && <FieldGroup.Field label={intl.formatMessage({id: "job.details.campaignId"})}
                                                                              value={job.campaignInternalReferenceNumber}/>}
                    {job.campaignDocumentType && <FieldGroup.Field label={intl.formatMessage({id: "job.details.documentType"})}
                                                                   value={job.campaignDocumentType}/>}
                    {job.description && <FieldGroup.Field label={intl.formatMessage({id:"job.details.description"})}
                                                          value={<JobDescription id={job.id} description={job.description}/>}/>}
                    {job.status && <FieldGroup.Field label={intl.formatMessage({id: "job.details.status"})}
                                                     value={<JobStatus status={job.status}/>}/>}
                    {job.billLoadType && <FieldGroup.Field label={intl.formatMessage({id: "job.details.billLoadType"})}
                                                           value={<JobBillLoadType billLoadType={job.billLoadType}/>}/>}
                    {job.updatedBy && <FieldGroup.Field label={intl.formatMessage({id: "job.details.runBy"})}
                                                        value={job.updatedBy}/>}
                    {canDownloadResult && <FieldGroup.Field label={intl.formatMessage({id: "generic.download"})}
                                                            value={<DownloadButton className="btn btn-primary"
                                                                                   onClick={downloadResult}
                                                                                   label="job.details.downloadResult"/>}/> }
                </FieldGroup>
            </Card>

        </React.Fragment>
    );
};

export default injectIntl(Job);
