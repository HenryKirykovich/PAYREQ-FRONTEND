
export const formatStartDate = (startDate, intl) => {
    return intl.formatDate(startDate, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',

    })};

export const formatEndDate = (endDate, intl) => {
    return intl.formatDate(endDate, {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',

    })};

export const formatDesc = (descCode, intl, jobId) =>{
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
}

export const jobStatus = (job, intl) =>{
    switch (job){
        case 'in-progress':
            return intl.formatMessage({id: "downloadHistory.status.inProgress"});
        case 'done':
            return intl.formatMessage({id: "downloadHistory.status.done"});
        case 'pending-file':
            return intl.formatMessage({id: "downloadHistory.status.pendingFile"});
        default:
            return intl.formatMessage({id: "downloadHistory.status.error"});
    }
};