import React from "react";
import {injectIntl} from "react-intl";

import {DATE_PARTS} from "../inbox-constants";

import {DefaultButton, FieldGroup, LargeText, PageHeading, PrimaryButton} from "../../common";


export const JOB_STATUSES = {
    DONE: "done",
    IN_PROGRESS: "in-progress",
    ERROR: "error"
}

const ButtonContainer = ({children}) => (
    <div style={{marginTop: "2rem"}}>
        {children}
    </div>
)

const BackToInboxButton = () => (
    <span style={{marginRight: "1rem"}}>
        <DefaultButton label="invoice.payroll.view.back.button.label"
                       linkTo={"../../inbox"}
                       icon="menu-left"/>
    </span>
);

const BackToMailButton = () => (
    <span style={{marginRight: "1rem"}}>
        <DefaultButton label="mail.back.button.label"
                       linkTo={"../../mail"}
                       icon="menu-left"/>
    </span>
);

const formatDesc = (descCode, intl, jobId) =>{
    switch (descCode){
        case 'download_one':
            return `${intl.formatMessage({id: "downloadHistory.download.merged"})} ${jobId}.zip`
        case 'download_10mb':
            return `${intl.formatMessage({id: "downloadHistory.download.grouped"})} ${jobId}.zip`
        case 'download_bills':
            return `${intl.formatMessage({id: "downloadHistory.download.bills"})} ${jobId}.zip`
        case 'download':
            return `${intl.formatMessage({id: "downloadHistory.download.downloading"})}`
        case `prepare_download_email`:
            return `${intl.formatMessage({id: "downloadHistory.download.preparingDownloadEmail"})}`
        case 'prepare_download':
            return `${intl.formatMessage({id: "downloadHistory.download.preparingDownload"})}`
        default:
            return descCode;
    }
};

const DownloadComplete = ({job, fields, isMailDownload}) => (
    <React.Fragment>
        <PageHeading text="inbox.download.result.complete.heading"/>

        <FieldGroup fields={fields}/>

        <ButtonContainer>
            {isMailDownload ? <BackToMailButton/> : <BackToInboxButton/>}
            <PrimaryButton label="generic.download" icon="download" onClick={() => window.open(`/job-result/${job.id}`)}/>
        </ButtonContainer>
    </React.Fragment>
);


const DownloadInProgress = ({onRefresh, fields}) => (
    <React.Fragment>
        <PageHeading text="inbox.download.result.heading"/>
        <LargeText text="inbox.download.result.description"/>

        <FieldGroup fields={fields}/>

        <ButtonContainer>
            <span style={{marginRight: "1rem"}}>
                <DefaultButton label="generic.refresh" icon="refresh" onClick={onRefresh}/>
            </span>
            <PrimaryButton label="inbox.download.result.preparing.button" isSubmitting={true}/>
        </ButtonContainer>
    </React.Fragment>
);

const DownloadError = ({job, fields, isMailDownload}) => (
    <React.Fragment>
        <PageHeading text="inbox.download.result.heading.error"/>
        <LargeText text="inbox.download.result.description.error"/>

        <FieldGroup fields={fields}/>

        <ButtonContainer>
            {isMailDownload ? <BackToMailButton/> : <BackToInboxButton/>}
        </ButtonContainer>
    </React.Fragment>
);

const InboxDownloadResultView = ({job, intl, onRefresh, isMailDownload}) => {
        const runningFields = [
            {
                label: "inbox.download.result.job.status",
                value: `${intl.formatMessage({id: "inbox.download.result.job.status." + job.status})} - ${formatDesc(job.description, intl, job.id)}`
            },
            {label: "inbox.download.result.job.startDate", value: intl.formatDate(job.startDate, DATE_PARTS)}
        ]
        const completedFields = [...runningFields,
            {
                label: "inbox.download.result.job.endDate",
                value: job.endDate ? intl.formatDate(job.endDate, DATE_PARTS) : ""
            },]
        return (
            <div>
                {job.status === JOB_STATUSES.DONE && <DownloadComplete job={job} fields={completedFields} isMailDownload={isMailDownload}/>}
                {job.status === JOB_STATUSES.IN_PROGRESS &&
                <DownloadInProgress onRefresh={onRefresh} fields={runningFields}/>}
                {job.status === JOB_STATUSES.ERROR && <DownloadError job={job} fields={completedFields} isMailDownload={isMailDownload}/>}
            </div>
        )
    }
;

export default injectIntl(InboxDownloadResultView);
