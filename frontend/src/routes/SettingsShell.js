import React, {useEffect, useState} from "react";
import {injectIntl} from "react-intl";
import {Link, Route, Switch} from "react-router-dom";
import axios from "axios";

import PageNotFound from "../components/PageNotFound";
import PaymentSettings from "../components/settings/payments/PaymentSettings";
import GatewayCreationForm from "../components/settings/payments/GatewayCreationForm";
import Loading from "../components/Loading";

import {useAppState} from "../state";
import {buildEmberHref, isBiller, isPayer} from "../utils/route-utils";
import ContactDetailsSettings from "../components/settings/biller/ContactDetailsSettings";
import ContactDetailsCreateForm from "../components/settings/biller/ContactDetailsCreateForm";
import ContactDetailsEditForm from "../components/settings/biller/ContactDetailsEditForm";

import ForwardingRulesSettings from "../components/settings/biller/ForwardingRulesSettings";
import ForwardingRulesCreateForm from "../components/settings/biller/ForwardingRulesCreateForm";
import ForwardingRulesEditForm from "../components/settings/biller/ForwardingRulesEditForm";
import ForwardingRulesDeleteForm from "../components/settings/biller/ForwardingRulesDeleteForm";
import AdhocPaymentForm from "../components/settings/payments/AdhocPaymentForm"
import AdhocPaymentConfirmation from "../components/settings/payments/AdhocPaymentConfirmation";
import AdhocPaymentResult from "../components/settings/payments/AdhocPaymentResult";
import ApiDetails from "../components/settings/biller/ApiDetails";
import ConsentsSettings from "../components/settings/biller/ConsentsSettings";
import BulkDownloadPreferences from "../components/BulkDownloadPreferences";
import BulkDownloadPreferencesEdit from "../components/BulkDownloadPreferences/BulkDownloadPreferencesEdit";
import BulkDownloadPreferencesSaved from "../components/BulkDownloadPreferences/BulkDownloadPreferencesSaved";
import BulkDownloadPreferencesDeleted from "../components/BulkDownloadPreferences/BulkDownloadPreferencesDeleted";

const hasAgent = ({billerChannelPartnerSystem}) => billerChannelPartnerSystem.find(channel => channel.channelPartnerSystemId === "mybillsagent");

const getBillerSettingsTabs = (billerId, billerSettings) => [
    {isEmber: true, linkTo: "biller.settings.biller", name: "biller"},
    {isEmber: true, linkTo: "biller.settings.users", name: "users"},
    {isEmber: true, linkTo: "biller.settings.billTemplates", name: "billTemplates"},
    {isEmber: true, linkTo: "biller.settings.accounting", name: "accounting"},
    {isEmber: true, linkTo: "biller.settings.payments", name: "payments"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/consents/view", name: "consents", hidden: !hasAgent(billerSettings)},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/contactDetails/view", name: "contactDetails"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/apiDetails/view", name: "apiDetails"}
];

const getMyBillsSettingsTabs = (billerId, billerSettings) => [
    {isEmber: true, linkTo: "biller.settings.connections", name: "connections"},
    {isEmber: true, linkTo: "biller.settings.users", name: "users"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/consents/view", name: "consents"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/forwardingRules/view", name: "forwardingRules"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/apiDetails/view", name: "apiDetails", hidden: !billerSettings.showApi},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/bulkDownloadPreference/view", name: "bulkDownloadPreference", hidden: !billerSettings.isCompany},
];

const _SettingsTabs = ({billerId, intl, activeTabName, billerSettings}) => (
    <div className="row margin-bottom-sm">
        <ul className="nav nav-pills">
            {isBiller(billerSettings) &&
            getBillerSettingsTabs(billerId, billerSettings).map(({linkTo, name, isEmber, hidden}) => {
                    if (hidden) return null;
                    const className = activeTabName === name ? "active" : "";
                    const linkText = intl.formatMessage({id: `settings.tab.title.${name}`});
                    return (
                        <li className={className} key={name}>
                            {!isEmber && <Link to={linkTo}>{linkText}</Link>}
                            {isEmber && <a href={buildEmberHref(linkTo, billerId)} className={className}>{linkText}</a>}
                        </li>
                    );
                }
            )}

            {isPayer(billerSettings) &&
            getMyBillsSettingsTabs(billerId, billerSettings).map(({linkTo, name, isEmber, hidden}) => {
                    if (hidden) return null;
                    const className = activeTabName === name ? "active" : "";
                    const linkText = intl.formatMessage({id: `settings.tab.title.${name}`});
                    return (
                        <li className={className} key={name}>
                            {!isEmber && <Link to={linkTo}>{linkText}</Link>}
                            {isEmber && <a href={buildEmberHref(linkTo, billerId)} className={className}>{linkText}</a>}
                        </li>
                    );
                }
            )}
        </ul>
    </div>
);

const SettingsTabs = injectIntl(_SettingsTabs);

const getBillerSettings = (billerId, setBillerSettings) => {
    axios.get("/data/settings/biller", {params: {billerId: billerId}})
        .then(({data: {billerSettings}}) => setBillerSettings(billerSettings));
};

const PaymentSettingRoutes = ({match: {url}, location, biller}) => (
    <React.Fragment>
        <Route path={`${url}/payments/view`}>
            <PaymentSettings billerId={biller.id}/>
        </Route>
        <Route path={`${url}/payments/create`}>
            <GatewayCreationForm billerId={biller.id}/>
        </Route>
        <Route path={`${url}/payments/create-transaction`}>
            <AdhocPaymentForm biller={biller}/>
        </Route>
        <Route path={`${url}/payments/payment-confirmation`}>
            <AdhocPaymentConfirmation location={location}/>
        </Route>
        <Route path={`${url}/payments/payment-result`}>
            <AdhocPaymentResult location={location}/>
        </Route>
    </React.Fragment>
);

const bulkDownloadRoutesList = (match) => [
    {
        path: `${match.url}/bulkDownloadPreference/view`,
        Component: BulkDownloadPreferences
    },
    {
        path: `${match.url}/bulkDownloadPreference/edit`,
        Component: BulkDownloadPreferencesEdit
    },

    {
        path: `${match.url}/bulkDownloadPreference/saved`,
        Component: BulkDownloadPreferencesSaved
    },

    {
        path: `${match.url}/bulkDownloadPreference/deleted`,
        Component: BulkDownloadPreferencesDeleted
    }

]

const SettingsShell = ({match, location}) => {
    const [{biller}] = useAppState();
    const activeTab = location.pathname.split(match.path)[1].split("/")[1];
    const [billerSettings, setBillerSettings] = useState();
    useEffect(() => getBillerSettings(biller.id, setBillerSettings), [biller.id, setBillerSettings]);

    if (!billerSettings) return <Loading/>;

    return (
        <React.Fragment>
            <div style={{paddingTop: "10px"}} className="container">
                <SettingsTabs billerId={biller.id} activeTabName={activeTab} billerSettings={billerSettings}/>
                <Switch>
                    <Route path={`${match.url}/contactDetails/view`}>
                        <ContactDetailsSettings billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/contactDetails/create`}>
                        <ContactDetailsCreateForm billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/contactDetails/edit`}>
                        <ContactDetailsEditForm billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/forwardingRules/view`}>
                        <ForwardingRulesSettings billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/forwardingRules/create`}>
                        <ForwardingRulesCreateForm billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/forwardingRules/:id/edit`}
                           render={(props) => <ForwardingRulesEditForm billerId={biller.id} id={props.match.params.id}/>}/>
                    <Route path={`${match.url}/forwardingRules/:id/delete`}
                           render={(props) => <ForwardingRulesDeleteForm billerId={biller.id} id={props.match.params.id}/>}/>

                    <Route path={`${match.url}/apiDetails/view`}>
                        <ApiDetails billerId={biller.id}/>
                    </Route>

                    <Route path={`${match.url}/consents/view`}>
                        <ConsentsSettings billerId={biller.id}/>
                    </Route>

                    {/*for some reason need to build this from a list rather than a React.Fragment like PaymentSettingRoutes*/}
                    {/*or it stops matching any routes below it.*/}
                    {bulkDownloadRoutesList(match).map(({Component, path}) => (
                      <Route key={`bulk-download-${path}`} path={path}>
                        <Component biller={biller}/>
                      </Route>
                    ))}

                    <PaymentSettingRoutes match={match} location={location} biller={biller}/>

                    <Route component={PageNotFound}/>
                </Switch>

            </div>
        </React.Fragment>
    );
};

export default SettingsShell;
