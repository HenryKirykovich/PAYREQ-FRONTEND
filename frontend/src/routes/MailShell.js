import React from "react";
import {Route, Switch} from "react-router-dom";

import PageNotFound from "../components/PageNotFound";

import {useAppState} from "../state";
import Mail from "../components/Mail";
import InboxDownloadResult from "../components/Inbox/InboxDownloadResult";
import MailUploaded from "../components/MailUploaded";
import MailDetail from "../components/MailDetail";

const MailShell = ({match, location}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/download-result/:jobId`}>
                <InboxDownloadResult match={match} isMailDownload={true}/>
            </Route>
            <Route path={`${match.url}/uploaded`} component={MailUploaded}/>
            <Route path={`${match.url}/:billId`} component={MailDetail}/>
            <Route path={`${match.url}`} exact>
                <Mail biller={biller} location={location}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default MailShell;
