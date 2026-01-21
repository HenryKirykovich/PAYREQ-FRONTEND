import React, {useState} from "react";

import {DefaultButton, PageHeading, Pager} from "../common";
import Loading from "../Loading";
import HistoryDownloadCards from "./HistoryDownloadCards";
import styles from "./DownloadHistoryView.module.scss"
import LargeText from "../common/text/LargeText";

const ButtonContainer = ({children}) => (
    <div style={{marginTop: "2rem"}}>
        {children}
    </div>
);

function DownloadHistoryView({historyData, total, handleData, showing, isSubmitting, onRefresh}) {
    const [pageNumber, setPageNumber] = useState(1);
    const [isPaging, setIsPaging] = useState(false);
    if(isSubmitting || isPaging) return <Loading/>;
    return (
        <React.Fragment>
            <PageHeading text="downloadHistory.pageHeading"/>
            {total !== 0 &&
                <React.Fragment>
                    <ButtonContainer>
                    <span style={{marginRight: "1rem"}}>
                        <DefaultButton label="generic.refresh" icon="refresh" onClick={onRefresh}/>
                    </span>
                    </ButtonContainer>
                    <br/>
                </React.Fragment>}

            {!isSubmitting && !isPaging && total === 0 &&
            <LargeText text="downloadHistory.noResults"/>}

            {!isSubmitting && !isPaging && total > 0 && (
                <React.Fragment>
                    <div className={styles.links}>
                        <HistoryDownloadCards rows={historyData}/>
                    </div>
                    <Pager className={styles.pagerContainer}
                           first={showing[0]}
                           last={showing[1]}
                           total={total}
                           onClickPrevious={() => {
                               setPageNumber(pageNumber - 1);
                               handleData(setIsPaging, pageNumber - 1);
                           }}
                           onClickNext={() => {
                               setPageNumber(pageNumber + 1);
                               handleData(setIsPaging, pageNumber + 1);

                           }}
                           pageNumber={pageNumber}
                    />
                </React.Fragment>)}
        </React.Fragment>
    );
}

export default DownloadHistoryView;
