import React from "react";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";
import {Card, Label, LargeText, RegularText} from "../common";
import styles from "./DownloadHistoryJobCards.module.scss";
import {formatEndDate, formatDesc} from "./download-history-constants";


function HistoryDownloadCards({rows, intl}){
    const getStatus = (status) => {
        switch (status){
            case 'in-progress':
                return <Label type={Label.WARNING} text="downloadHistory.status.inProgress"></Label>;
            case 'done':
                return <Label type={Label.SUCCESS} text="downloadHistory.status.fileReadyForDownload"></Label>;
            case 'pending-file':
                return <Label type={Label.WARNING} text="downloadHistory.status.pendingFile"></Label>;
            default:
                return <Label type={Label.DANGER} text="downloadHistory.status.error"></Label>;
        }
    };
    return(
        <React.Fragment>
                {rows.jobs.map(({id, endDate, description, status}) =>(
                    <Link to={`./jobs/${id}`}
                          key={id}>
                        <Card hover className={styles.card} >
                            <div className={styles.mainBody}>
                                <LargeText><strong>{intl.formatMessage({id: "downloadHistory.download"},{id: id})} </strong></LargeText>
                                <LargeText>
                                    {getStatus(status)}
                                </LargeText>
                            </div>
                            <div>
                                {(status === 'error') &&
                                    <div>
                                        <RegularText>{intl.formatMessage({id: "downloadHistory.downloadFailed"})} {formatEndDate(endDate,intl)}</RegularText>
                                        <RegularText text="downloadHistory.tryAgain"/>
                                    </div>
                                }
                                {(status !== 'error') &&
                                    <div>
                                        <RegularText>{formatDesc(description, intl, id)}</RegularText>
                                        <RegularText>{intl.formatMessage({id: "downloadHistory.preparedOn"})} {formatEndDate(endDate,intl)}</RegularText>
                                    </div>
                                }
                            </div>
                        </Card>
                    </Link>))}
        </React.Fragment>
    );
}

export default injectIntl(HistoryDownloadCards);