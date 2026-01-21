import React from "react";
import {Route, Switch} from "react-router-dom";

import PageNotFound from "../components/PageNotFound";

import {useAppState} from "../state";
import BPayBatchForm from "../components/BPayBatchForm";
import PaymentForm from "../components/payments/PaymentForm";
import PaymentConfirmation from "../components/payments/PaymentConfirmation";
import PaymentResult from "../components/payments/PaymentResult";

import Document from "../components/documents/Document";
import InvoiceForwardedResult from "../components/documents/InvoiceDocumentView/InvoiceForwardedResult";
import Inbox from "../components/Inbox";
import InboxDownloadResult from "../components/Inbox/InboxDownloadResult";
import MobileAppUIWithZoom from "../components/MobileAppUIWithZoom";
import BrowserUI from "../components/BrowserUI";

const InboxShell = ({match, location}) => {
    const [{biller}] = useAppState();
    return (
        <Switch>
            <Route path={`${match.url}/bpb`}>
                <BPayBatchForm billerId={biller.id}/>
            </Route>
            <Route path={`${match.url}/download-result/:jobId`} component={InboxDownloadResult}/>
            <Route path={`${match.url}/:invoiceId`} exact>
                <MobileAppUIWithZoom>
                    <Document/>
                </MobileAppUIWithZoom>
                <BrowserUI>
                    <Document/>
                </BrowserUI>
            </Route>
            <Route path={`${match.url}/:invoiceId/pay`} component={PaymentForm}/>
            <Route path={`${match.url}/:invoiceId/payment-confirmation`} component={PaymentConfirmation}/>
            <Route path={`${match.url}/:invoiceId/payment-result`} component={PaymentResult}/>
            <Route path={`${match.url}/:invoiceId/forwarding-result`} component={InvoiceForwardedResult}/>
            <Route path={`${match.url}`} exact>
                <Inbox biller={biller} location={location}/>
            </Route>
            <Route component={PageNotFound}/>
        </Switch>
    );
};

export default InboxShell;
