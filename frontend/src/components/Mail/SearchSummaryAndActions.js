import React, {useEffect, useMemo, useState} from "react";
import {injectIntl} from "react-intl";
import {ButtonGroup, ButtonToolbar, DropdownButton, MenuItem} from "react-bootstrap";
import {DefaultButton, Icon, RegularText} from "../common";
import styles from "./MailView.module.scss";
import axios from "axios";
import {withRouter} from "react-router-dom";
import MailDownloadModal from "./MailDownloadModal";
import {MAIL_STATUS_ALL, MAIL_STATUS_REVIEW} from "./mail-constants";
import ApproveMailModal from "./ApproveMailModal";
import RejectMailModal from "./RejectMailModal";
import DownloadInProgressModal from "../Inbox/DownloadInProgressModal";
import UploadMailModal from "./UploadMailModal";
import {hasPermission, PERMISSIONS} from "../../utils/permission-utils";
import {ACCOUNT_FEATURES, hasFeature} from "../../utils/account-utils"
import UploadConnectionsToActionModal from "./UploadSubscriptionsToActionModal";

const hasMailForApproval = (type, approvalCount) => (type === MAIL_STATUS_REVIEW || (type === MAIL_STATUS_ALL && approvalCount > 0));
const shouldDisplayUploadButton = (billFormats, biller) => (billFormats.length > 0 ||  hasFeature(biller, ACCOUNT_FEATURES.customerCommunications));

const getMailUploadDetails = (billerId, setMailUploadDetails) => {
    axios.get(`/data/v2/bills/${billerId}/upload-details`)
        .then(({data}) => {
            setMailUploadDetails(data);
        })
}

const DownloadAction = ({intl, onClick}) => (
    <MenuItem onClick={onClick} className={styles.showOnMobile}>
        {intl.formatMessage({id: "mail.searchResultActions.tripleDotMenu.downloadBtn"})}
    </MenuItem>
);

const UploadAction = ({intl, onClick, disabled}) => (
    <MenuItem disabled={disabled}
              className={styles.showOnMobile}
              onClick={() => {
                  if (disabled) return null;
                  else onClick()}}>
        {intl.formatMessage({id: "mail.searchResultActions.tripleDotMenu.uploadBtn"})}
    </MenuItem>
);

const ApproveAction = ({intl, onClick, disabled}) => (
    <MenuItem disabled={disabled}
              className={styles.showOnMobile}
              onClick={() => {
                  if (disabled) return null;
                  else onClick()}} >
        {intl.formatMessage({id: "mail.searchResultActions.approveBtn"})}
    </MenuItem>
);

const RejectAction = ({intl, onClick, disabled}) => (
    <MenuItem disabled={disabled}
              className={styles.showOnMobile}
              onClick={() => {
                  if (disabled) return null;
                  else onClick()}}>
        {intl.formatMessage({id: "mail.searchResultActions.rejectBtn"})}
    </MenuItem>
);

const handleUploadMailClick = (possibleDeregistrations, setShowUploadModal, setShowUploadConnectionToActionModal) => {
    if (possibleDeregistrations > 0) {
        setShowUploadConnectionToActionModal(true);
    } else {
        setShowUploadModal(true);
    }
}

const actionDownload = (billerId, setShowModal, setShowInProgressModal, setJob) =>  {
    axios.get(
        `/data/bills/${billerId}/download/in-progress`
    )
        .then(({data}) => {
            if (data.success) {
                if (data.job){
                    setJob(data.job)
                    setShowInProgressModal(true);
                } else {
                    setShowModal(true);
                }
            }});
};

const SearchSummaryAndActions = ({showing, total, searchParams, billFormats, approvalCount, possibleDeregistrations, biller, intl, history, downloadLimit}) => {
    const [mailUploadDetails, setMailUploadDetails] = useState(null);
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showUploadConnectionToActionModal, setShowUploadConnectionToActionModal] = useState(false);
    const [showApproveMailModal, setShowApproveMailModal] = useState(false);
    const [showRejectMailModal, setShowRejectMailModal] = useState(false);
    const [showInProgressModal, setShowInProgressModal] = useState(false)
    const [job, setJob] = useState();

    const {type} = searchParams;

    const shouldDisableUploadButton = useMemo(() => !mailUploadDetails || (billFormats.length === 0 && hasFeature(biller, ACCOUNT_FEATURES.customerCommunications)),
                                             [mailUploadDetails, billFormats, biller]);

    useEffect(() => getMailUploadDetails(biller.id, setMailUploadDetails),
        [biller.id, setMailUploadDetails])

    return (
        <div
            className={`${styles.resultSummaryRow} ${styles.resultSummaryRowTableView}`}>
            {total > 1 ? (
                <RegularText text="pagination.showing.label"
                             values={{first: showing[0], last: showing[1], total}}/>
            ) : <div/>}

            <MailDownloadModal
                biller={biller}
                show={showDownloadModal}
                onCancel={() => setShowDownloadModal(false)}
                count={total}
                downloadLimit={downloadLimit}
            />
            <UploadMailModal
                biller={biller}
                mailUploadDetails={mailUploadDetails}
                show={showUploadModal}
                onCancel={() => setShowUploadModal(false)}
            />
            <ApproveMailModal
                billerId={biller.id}
                show={showApproveMailModal}
                setShowApproveMailModal={setShowApproveMailModal}
                searchParams={searchParams}
                total={approvalCount}
            />
            <RejectMailModal
                billerId={biller.id}
                show={showRejectMailModal}
                setShowRejectMailModal={setShowRejectMailModal}
                searchParams={searchParams}
                total={approvalCount}
            />
            <UploadConnectionsToActionModal
                billerId={biller.id}
                show={showUploadConnectionToActionModal}
                setShowUploadConnectionToActionModal={setShowUploadConnectionToActionModal}
            />
            <DownloadInProgressModal show={showInProgressModal}
                                     job={job}
                                     onCancel={() => setShowInProgressModal(false)}
                                     onPrimaryAction={() => history.push(`./mail/download-result/${job.id}`)}/>
            <ButtonToolbar>
                <ButtonGroup
                    className={`${styles.rightSearchResultActions}  ${styles.tableViewDropdown}`}>

                    {hasMailForApproval(type, approvalCount) && hasPermission(biller, PERMISSIONS.mailApprove) &&
                        <DefaultButton label="mail.searchResultActions.approveBtn" icon="ok-circle" className={styles.approveButton}
                                    onClick={() => setShowApproveMailModal(true)}/>}
                    {hasMailForApproval(type, approvalCount) && hasPermission(biller, PERMISSIONS.mailReject) &&
                        <DefaultButton label="mail.searchResultActions.rejectBtn" icon="remove-circle" className={styles.rejectButton}
                                       onClick={() => setShowRejectMailModal(true)}/>}
                    {shouldDisplayUploadButton(billFormats, biller) && hasPermission(biller, PERMISSIONS.mailUpload) &&
                        <DefaultButton label="mail.searchResultActions.uploadBtn" icon="upload" className={styles.actionButton}
                                       disabled={!mailUploadDetails}
                                       onClick={() => handleUploadMailClick(possibleDeregistrations, setShowUploadModal, setShowUploadConnectionToActionModal)}/>}
                    <DefaultButton label="mail.searchResultActions.downloadBtn" icon="download" className={styles.actionButton}
                                onClick={() => actionDownload(biller.id, setShowDownloadModal, setShowInProgressModal, setJob)}/>
                    {/*todo: PREQ-1967 move to common so component doesn't directly reference bootstrap*/}
                    <DropdownButton
                        id="searchResultActions"
                        className={styles.tripleDotButton}
                        title={<Icon name="option-vertical"/>}
                        noCaret
                        aria-label={intl.formatMessage({id: "inbox.searchResultActions.label"})}
                    >
                        <MenuItem header>{intl.formatMessage({id: "inbox.actions.label"})}</MenuItem>
                        <MenuItem onClick={() => window.open(intl.formatMessage({id: "mail.searchResultActions.helpUrl"}))}>
                            {intl.formatMessage({id: "mail.searchResultActions.helpBtn"})}
                        </MenuItem>
                        <DownloadAction intl={intl} onClick={() => actionDownload(biller.id, setShowDownloadModal, setShowInProgressModal, setJob)}/>
                        {hasPermission(biller, PERMISSIONS.mailUpload) && <UploadAction intl={intl} onClick={() => handleUploadMailClick(possibleDeregistrations, setShowUploadModal, setShowUploadConnectionToActionModal)}
                                                                                        disabled={shouldDisableUploadButton}/>}
                        {hasPermission(biller, PERMISSIONS.mailApprove) && <ApproveAction intl={intl} onClick={() => setShowApproveMailModal(true)} disabled={!hasMailForApproval(type, approvalCount)}/>}
                        {hasPermission(biller, PERMISSIONS.mailReject) && <RejectAction intl={intl} onClick={() => setShowRejectMailModal(true)} disabled={!hasMailForApproval(type, approvalCount)}/>}
                    </DropdownButton>
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    )
};

export default withRouter(injectIntl(SearchSummaryAndActions));
