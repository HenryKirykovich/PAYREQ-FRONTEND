import React, {useState} from "react";
import {injectIntl} from "react-intl";
import {DropdownButton, MenuItem} from "react-bootstrap";
import {Link} from "react-router-dom";
import {Icon, LinkButton, RegularText} from "../common";
import styles from "./InboxView.module.scss";
import {VIEWS} from "./inbox-constants";
import InboxDownloadModal from "./InboxDownloadModal";
import {useAppState} from "../../state";
import axios from "axios";
import {withRouter} from "react-router-dom";
import DownloadInProgressModal from "./DownloadInProgressModal";

;

const BPayBatchAction = ({intl}) => (
    <li role="presentation">
        <Link to={`./inbox/bpb`}
              className={styles.bpayBatchLink}>{intl.formatMessage({id: "inbox.actions.bpayBatch"})}</Link>
    </li>
);

const DownloadAction = ({intl, onClick}) => (
    <MenuItem onClick={onClick}>
        {intl.formatMessage({id: "inbox.searchResultActions.tripleDotMenu.downloadBtn"})}
    </MenuItem>
);

const actionDownload = (billerId, setShowModal, setShowInProgressModal, setJob) =>  {
    axios.get(
        `/data/invoices/${billerId}/download/in-progress`
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

const SearchSummaryAndActions = ({showing, total, typeCounts, downloadLimit, biller, setView, view, intl, history}) => {
    const [showModal, setShowModal] = useState(false);
    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [job, setJob] = useState();
    const [{user}] = useAppState();
    return (
        <div
            className={`${styles.resultSummaryRow} ${view !== VIEWS.table ? styles.resultSummaryRowCardsView : styles.resultSummaryRowTableView}`}>
            {total > 1 ? (
                <RegularText text="pagination.showing.label"
                             values={{first: showing[0], last: showing[1], total}}/>
            ) : <div/>}
            <div
                className={`${styles.rightSearchResultActions}  ${view === VIEWS.table ? styles.tableViewDropdown : ""}`}>
                <LinkButton label="inbox.searchResultActions.downloadBtn" icon="download"
                            onClick={() => actionDownload(biller.id, setShowModal, setShowInProgressModal, setJob)}/>
                {/*todo: PREQ-1967 move to common so component doesn't directly reference bootstrap*/}
                <DropdownButton
                    id="searchResultActions"
                    className={styles.tripleDotButton}
                    title={<Icon name="option-vertical"/>}
                    noCaret
                    aria-label={intl.formatMessage({id: "inbox.searchResultActions.label"})}
                >
                    <MenuItem header>{intl.formatMessage({id: "inbox.actions.label"})}</MenuItem>
                    {user.countryCode === "AU" && <BPayBatchAction intl={intl}/>}
                    <DownloadAction intl={intl} onClick={() => actionDownload(biller.id, setShowModal, setShowInProgressModal, setJob)}/>
                    <MenuItem divider/>
                    <MenuItem header>{intl.formatMessage({id: "inbox.view.options.label"})}</MenuItem>
                    <MenuItem disabled={view === VIEWS.table}
                              onClick={() => setView(VIEWS.table)}>{intl.formatMessage({id: "inbox.view.table"})}</MenuItem>
                    <MenuItem disabled={view !== VIEWS.table}
                              onClick={() => setView(VIEWS.cards)}>{intl.formatMessage({id: "inbox.view.list"})}</MenuItem>
                </DropdownButton>
            </div>
            <InboxDownloadModal
                biller={biller}
                show={showModal}
                onCancel={() => setShowModal(false)}
                showWarning={biller.isCompany && typeCounts.downloaded > 0}
                count={typeCounts.all}
                downloadLimit={downloadLimit}
            />
            <DownloadInProgressModal show={showInProgressModal}
                                     job={job}
                                     onCancel={() => setShowInProgressModal(false)}
                                     onPrimaryAction={() => history.push(`./inbox/download-result/${job.id}`)}/>
        </div>
    )
};

export default withRouter(injectIntl(SearchSummaryAndActions));
