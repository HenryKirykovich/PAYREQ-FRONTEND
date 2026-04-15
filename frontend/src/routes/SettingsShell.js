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
import BulkDownloadPreferences from "../components/BulkDownloadPreferences";
import BulkDownloadPreferencesEdit from "../components/BulkDownloadPreferences/BulkDownloadPreferencesEdit";
import BulkDownloadPreferencesSaved from "../components/BulkDownloadPreferences/BulkDownloadPreferencesSaved";
import BulkDownloadPreferencesDeleted from "../components/BulkDownloadPreferences/BulkDownloadPreferencesDeleted";
import BillerSettings from "../components/settings/biller/BillerSettings";
import BillerChannelSettings from "../components/settings/biller/BillerChannelSettings";
import BillerManualSettings from "../components/settings/biller/BillerManualSettings";
import BillerQboPayrollSettings from "../components/settings/biller/BillerQboPayrollSettings";
import BillerSaasuSettings from "../components/settings/biller/BillerSaasuSettings";
import UsersManagement from "../components/settings/users/UsersManagement";
import UserDetail from "../components/settings/users/UserDetail";
import CreateUser from "../components/settings/users/CreateUser";
import BillTemplates from "../components/settings/templates/BillTemplates";
import AccountingSettings from "../components/settings/accounting/AccountingSettings";
import AccountingCatalog from "../components/Accounting/AccountingCatalog";
import AccountingCheckout from "../components/Accounting/AccountingCheckout";
import ConnectionsSettings from "../components/settings/connections/ConnectionsSettings";
import ConsentsSettings from "../components/settings/consents/ConsentsSettings";
import PaymentsSettings from "../components/settings/payments/PaymentsSettings";

const hasAgent = ({billerChannelPartnerSystem}) => billerChannelPartnerSystem.find(channel => channel.channelPartnerSystemId === "mybillsagent");

const getBillerSettingsTabs = (billerId, billerSettings) => [
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/biller", name: "biller"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/users", name: "users"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/billTemplates", name: "billTemplates"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/accounting", name: "accounting"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/payments", name: "payments"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/consents", name: "consents", hidden: !hasAgent(billerSettings)},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/contactDetails/view", name: "contactDetails"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/apiDetails/view", name: "apiDetails"}
];

const getMyBillsSettingsTabs = (billerId, billerSettings) => [
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/connections", name: "connections"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/users", name: "users"},
    {linkTo: "/portal/customer/biller/" + billerId + "/settings/consents", name: "consents"},
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
                    {/* Biller Settings */}
                    <Route path={`${match.url}/biller/channel/:channelId`} exact>
                        <BillerChannelSettings billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/biller/manual`} exact>
                        <BillerManualSettings billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/biller/qbo-payroll`} exact>
                        <BillerQboPayrollSettings billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/biller/saasu`} exact>
                        <BillerSaasuSettings billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/biller`}>
                        <BillerSettings billerId={biller.id}/>
                    </Route>

                    {/* Users Management */}
                    <Route path={`${match.url}/users/create`}>
                        <UsersManagement billerId={biller.id}>
                            <CreateUser billerId={biller.id}/>
                        </UsersManagement>
                    </Route>
                    <Route path={`${match.url}/users/:userId`}
                           render={(props) => (
                               <UsersManagement billerId={biller.id}>
                                   <UserDetail userId={props.match.params.userId} billerId={biller.id}/>
                               </UsersManagement>
                           )}/>
                    <Route path={`${match.url}/users`}>
                        <UsersManagement billerId={biller.id}>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <p>Select a user to view details</p>
                                </div>
                            </div>
                        </UsersManagement>
                    </Route>

                    {/* Bill Templates */}
                    <Route path={`${match.url}/billTemplates`}>
                        <BillTemplates billerId={biller.id}/>
                    </Route>

                    {/* Accounting */}
                    <Route path={`${match.url}/accounting/catalog`} exact>
                        <AccountingCatalog billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/accounting/checkout/:productId`} exact>
                        <AccountingCheckout billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/accounting`}>
                        <AccountingSettings billerId={biller.id}/>
                    </Route>

                    {/* Connections */}
                    <Route path={`${match.url}/connections`}>
                        <ConnectionsSettings billerId={biller.id}/>
                    </Route>

                    {/* Consents */}
                    <Route path={`${match.url}/consents`}>
                        <ConsentsSettings billerId={biller.id} biller={biller}/>
                    </Route>

                    {/* Payments */}
                    <Route path={`${match.url}/payments`} exact>
                        <PaymentsSettings billerId={biller.id} biller={biller}/>
                    </Route>

                    {/* Contact Details */}
                    <Route path={`${match.url}/contactDetails/view`}>
                        <ContactDetailsSettings billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/contactDetails/create`}>
                        <ContactDetailsCreateForm billerId={biller.id}/>
                    </Route>
                    <Route path={`${match.url}/contactDetails/edit`}>
                        <ContactDetailsEditForm billerId={biller.id}/>
                    </Route>

                    {/* Forwarding Rules */}
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

                    {/* API Details */}
                    <Route path={`${match.url}/apiDetails/view`}>
                        <ApiDetails billerId={biller.id}/>
                    </Route>

                    {/* Bulk Download Preferences */}
                    {bulkDownloadRoutesList(match).map(({Component, path}) => (
                      <Route key={`bulk-download-${path}`} path={path}>
                        <Component biller={biller}/>
                      </Route>
                    ))}

                    {/* Payment Settings */}
                    <PaymentSettingRoutes match={match} location={location} biller={biller}/>

                    <Route component={PageNotFound}/>
                </Switch>

            </div>
        </React.Fragment>
    );
};

export default SettingsShell;
