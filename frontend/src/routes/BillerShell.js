import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import axios from "axios";
import PageNotFound from "../components/PageNotFound";
import Navbar from "../components/Navbar"
import Loading from "../components/Loading";
import {SET_BILLER} from "../state/reducers/billerReducer";
import {UPDATE_USER_CONTEXT} from "../state/reducers/userReducer";
import {useAppState, usePresentation} from "../state";
import SettingsShell from "./SettingsShell";
import InboxShell from "./InboxShell";
import Dashboard from "../components/Dashboard";
import AutoPaymentsShell from "./AutoPaymentsShell";
import CardsShell from "./CardsShell";
import ReportsShell from "./ReportsShell";
import BannerAlert from "../components/BannerAlert";
import RegistrationsShell from "./RegistrationsShell";
import DownloadHistoryShell from "./DownloadHistoryShell";
import PersonalSettingsShell from "./PersonalSettingsShell";
import BrowserUI from "../components/BrowserUI";
import AuthorisedErrorShell from "./AuthorisedErrorShell";
import DashboardCustomer from "../components/DashboardCustomer";
import PaymentHistoryShell from "./PaymentHistoryShell";
import MailShell from "./MailShell";
import {resetSessionStateEmberToReact} from "../utils/session-storage-utils";
import JobView from "../components/Jobs/JobView";
import BillsShell from "./BillsShell";
import ContactsShell from "./ContactsShell";
import BillDetail from "../components/Bills/BillDetail";
import InvoicesShell from "./InvoicesShell";
import IncomingRegistrationsShell from "./IncomingRegistrationsShell";

const getBiller = (dispatch, billerId) => {

    axios.get(`/data/billers/${billerId}`)
        .then(({data: {meta, biller}}) => {
            dispatch({
                type: SET_BILLER,
                biller: biller
            });
            dispatch({
                type: UPDATE_USER_CONTEXT,
                user: {totalLinkedBillers: meta.total}
            });

            resetSessionStateEmberToReact(billerId);

        });
};

const BillerShell = ({match}) => {
    const [{biller, user}, dispatch] = useAppState();
    useEffect(() => getBiller(dispatch, match.params.billerId), [dispatch, match.params.billerId]);
    const { isMobileApp } = usePresentation();
    return (
        <React.Fragment>
            {!biller && <Loading/>}
            {biller && (
                <React.Fragment>
                    <BrowserUI>
                        <Navbar biller={biller} user={user}/>
                    </BrowserUI>
                    <div className="container" role="main" aria-labelledby="pageHeading" style={{marginTop: isMobileApp ? "20px" : "0px"}}>
                        <BannerAlert />
                        <Switch>
                            <Route path={`${match.url}/dashboard`} component={Dashboard}/>
                            <Route path={`${match.url}/admin-dashboard`} component={DashboardCustomer}/>
                            <Route path={`${match.url}/inbox`} component={InboxShell}/>
                            <Route path={`${match.url}/bills`} component={BillsShell}/>
                            <Route path={`${match.url}/bill/:billId`} 
                                   render={(props) => <BillDetail {...props} billerId={biller.id}/>}
                            />
                            <Route path={`${match.url}/contacts`} component={ContactsShell}/>
                            <Route path={`${match.url}/invoices`} component={InvoicesShell}/>
                            <Route path={`${match.url}/incoming`} component={IncomingRegistrationsShell}/>
                            <Route path={`${match.url}/settings`} component={SettingsShell}/>
                            <Route path={`${match.url}/auto-payments`} component={AutoPaymentsShell}/>
                            <Route path={`${match.url}/payments`} component={PaymentHistoryShell}/>
                            <Route path={`${match.url}/cards`} component={CardsShell}/>
                            <Route path={`${match.url}/reports`} component={ReportsShell}/>
                            <Route path={`${match.url}/registrations`} component={RegistrationsShell}/>
                            <Route path={`${match.url}/job/:jobId`} component={JobView}/>
                            <Route path={`${match.url}/jobs`} component={DownloadHistoryShell}/>
                            <Route path={`${match.url}/personal`} component={PersonalSettingsShell}/>
                            <Route path={`${match.url}/error`} component={AuthorisedErrorShell}/>
                            <Route path={`${match.url}/mail`} component={MailShell}/>
                            <Route component={PageNotFound}/>
                        </Switch>
                    </div>
                </React.Fragment>)}
        </React.Fragment>
    );
};

export default BillerShell;
