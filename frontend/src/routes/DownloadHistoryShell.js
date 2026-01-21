import React from "react"
import {Route, Switch} from "react-router-dom";

import {useAppState} from "../state";

import PageNotFound from "../components/PageNotFound";
import DownloadHistory from "../components/DownloadHistory";
import jobCard from "../components/DownloadHistory/JobCard";
import Jobs from "../components/Jobs";

function DownlaodHistoryShell({match}){
    const [{biller}] = useAppState();
    return(
        <Switch>
            <Route path={`${match.url}`} exact>
                { biller.isBiller ?
                    <Jobs billerId={biller.id}/> :
                    <DownloadHistory billerId={biller.id} /> }
            </Route>
            <Route path={`${match.url}/:jobId`} component={jobCard}/>
            <Route component={PageNotFound}/>
        </Switch>
    );
}
export default DownlaodHistoryShell;
