import React from 'react';
import InboxView from "../components/Inbox/InboxView";
import {VIEWS} from "../components/Inbox/inbox-constants";
import InboxDownloadModal from "../components/Inbox/InboxDownloadModal";
import InboxDownloadResultView from "../components/Inbox/InboxDownloadResult/InboxDownloadResultView";
import {INITIAL_VALUES} from "../components/Inbox/SearchForm";
import ReportTable from "../components/archive/ArchivedBillsReport/ArchiveReportTable";

export default {
    title: 'Reports',
};

export const archiveReport = () => <ReportTable reportRows={[{
    "billerActorId": "10841",
    "billerName": "This is a really long name of a biller",
    "archiveBillViews": 3,
    "archivedWithNoStandardDispatches": 15
}]}/>;