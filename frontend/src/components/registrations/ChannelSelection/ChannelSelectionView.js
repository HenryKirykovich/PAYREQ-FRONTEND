import React from "react";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";

import payreqLogo from "../../../resources/images/channels/payreq_symbol.svg"
import myobLogo from "../../../resources/images/channels/myob-logo.png"
import xeroLogo from "../../../resources/images/channels/xero-logo.png"
import reckonLogo from "../../../resources/images/channels/Reckon_Logo_Red_Vertical_Small_RGB.png"
import bpvLogo from "../../../resources/images/channels/BPAYVIEW_2015_STACKED_BLUE_SMALL.PNG"
import {Card, Icon, PageHeading, SecondaryHeading, LargeText, RegularText} from "../../common"
import styles from "./ChannelSelectionView.module.scss";

const EmailChannel = ({registeringForbillerId, channel, intl}) => {
    if (!channel) return null;
    return (
        <Link to={`./${registeringForbillerId}/email`}
              aria-label={intl.formatMessage({id: "registrations.channelSelection.email.link"})}>
            <Card hover>
                <div className={styles.channelCard}>
                    <div className={styles.iconContainer}>
                        <Icon name="envelope" className={styles.emailIcon}/>
                    </div>
                    <div className={styles.channelDetails}>
                        <SecondaryHeading text={"fastForm.registration.email.label"}/>
                        <RegularText text={"registrations.channelSelection.email.description"}/>
                    </div>
                </div>
            </Card>
        </Link>
    )
};

const AgentsChannel = ({payerId, registeringForbillerId, channel, intl}) => {
    if (!channel) return null;
    return (
        <Link to={`./${registeringForbillerId}/mybillsagent`}
              aria-label={intl.formatMessage({id: "registrations.channelSelection.agent.link"})}>
            <Card hover>
                <div className={styles.channelCard}>
                    <div className={styles.iconContainer}>
                        <img src={payreqLogo} className={styles.imagePayreq} alt="Payreq Logo"/>
                    </div>
                    <div className={styles.channelDetails}>
                        <SecondaryHeading text={"registrations.channelSelection.agent.label"}/>
                        <RegularText text={"registrations.channelSelection.agent.description"}/>
                    </div>
                </div>
            </Card>
        </Link>
    )
};

const MyobChannel = ({registeringForbillerId, channel, intl}) => {
    if (!channel) return null;
    return (
        <a href={`./${registeringForbillerId}/myob`}
           aria-label={intl.formatMessage({id: "registrations.channelSelection.myob.link"})}>
            <Card hover>
                <div className={styles.channelCard}>
                    <div className={styles.iconContainer}>
                        <img src={myobLogo} className={styles.imageMyob} alt="MYOB Logo"/>
                    </div>
                    <div className={styles.channelDetails}>
                        <SecondaryHeading text={"registrations.channelSelection.myob.label"}/>
                        <RegularText text={"registrations.channelSelection.myob.description"}/>
                    </div>
                </div>
            </Card>
        </a>
    )
};

const XeroChannel = ({registeringForbillerId, channel, intl}) => {
    if (!channel) return null;
    return (
        <Link to={`./${registeringForbillerId}/xero`}
              aria-label={intl.formatMessage({id: "registrations.channelSelection.xero.link"})}>
            <Card hover>
                <div className={styles.channelCard}>
                    <div className={styles.iconContainer}>
                        <img src={xeroLogo} className={styles.imageXero} alt="Xero Logo"/>
                    </div>
                    <div className={styles.channelDetails}>
                        <SecondaryHeading text={"registrations.channelSelection.xero.label"}/>
                        <RegularText text={"registrations.channelSelection.xero.description"}/>
                    </div>
                </div>
            </Card>
        </Link>
    )
};

const ReckonChannel = ({registeringForbillerId, channel, intl}) => {
    if (!channel) return null;
    return (
        <Link to={`./${registeringForbillerId}/reckon`}
              aria-label={intl.formatMessage({id: "registrations.channelSelection.reckon.link"})}>
            <Card hover>
                <div className={styles.channelCard}>
                    <div className={styles.iconContainer}>
                        <img src={reckonLogo} className={styles.imageReckon} alt="Reckon Accounts Hosted Logo"/>
                    </div>
                    <div className={styles.channelDetails}>
                        <SecondaryHeading text={"registrations.channelSelection.reckon.label"}/>
                        <RegularText text={"registrations.channelSelection.reckon.description"}/>
                    </div>
                </div>
            </Card>
        </Link>
    )
};

const BpayViewChannel = ({channel, intl}) => {
    if (!channel) return null;
    return (
        <Card>
            <div className={styles.channelCard}>
                <div className={styles.iconContainer}>
                    <img src={bpvLogo} className={styles.imageBpv} alt="BPAY View Logo"/>
                </div>
                <div className={styles.channelDetails}>
                    <SecondaryHeading text={"registrations.channelSelection.bpv.label"}/>
                    <RegularText text={"registrations.channelSelection.bpv.description"}/>
                    <a href="https://bpay.com.au/BPAY-for-you#receive-bills"
                       rel="noopener noreferrer" target="_blank">
                        {intl.formatMessage({id: "registrations.channelSelection.bpv.externalLink"})}
                    </a>
                </div>
            </div>
        </Card>
    )
};

const PayreqChannel = ({payerId, registeringForbillerId, channel, intl}) => {
    if (!channel) return null;
    return (
        <Link to={`./${registeringForbillerId}/payreq`}
              aria-label={intl.formatMessage({id: "registrations.channelSelection.payreq.link"})}>
            <Card hover>
                <div className={styles.channelCard}>
                    <div className={styles.iconContainer}>
                        <img src={payreqLogo} className={styles.imagePayreq} alt="Payreq Logo"/>
                    </div>
                    <div className={styles.channelDetails}>
                        <SecondaryHeading text={"registrations.channelSelection.payreq.label"}/>
                        <RegularText text={"registrations.channelSelection.payreq.description"}/>
                    </div>
                </div>
            </Card>
        </Link>
    )
};

const PayreqBillsChannel = ({payerId, registeringForbillerId, channel, intl}) => {
    if (!channel) return null;
    return (
        <Link to={`./${registeringForbillerId}/payreq-bills`}
              aria-label={intl.formatMessage({id: "registrations.channelSelection.payreq.link"})}>
            <Card hover>
                <div className={styles.channelCard}>
                    <div className={styles.iconContainer}>
                        <img src={payreqLogo} className={styles.imagePayreq} alt="Payreq Logo"/>
                    </div>
                    <div className={styles.channelDetails}>
                        <SecondaryHeading text={"registrations.channelSelection.payreq.label"}/>
                        <RegularText text={"registrations.channelSelection.payreq.description"}/>
                    </div>
                </div>
            </Card>
        </Link>
    )
};

const KNOWN_CHANNELS = ["email", "mybillsagent", "myob", "reckon", "xeroconnect", "mybills", "mybills-bills", "bpv"];
const getChannel = (channels, channelPartnerSystemId) => channels.find(c => c.channelPartnerSystemId === channelPartnerSystemId);
const hasKnownChannels = (channels) => channels.some(c => KNOWN_CHANNELS.includes(c.channelPartnerSystemId));

const ChannelSelectionView = ({payerId, registeringForbillerId, logoPath, channels, billerName, intl}) => (
    (
        <React.Fragment>
            <img src={logoPath} className={styles.logo} alt="Logo"/>

            <PageHeading text="registrations.channelSelection.pageHeading"/>
            <LargeText text="registrations.channelSelection.directive" values={{billerName: billerName}}/>

            {!hasKnownChannels(channels) ? (
                <div className={styles.channelsContainer}>
                    <LargeText text="registrations.channelSelection.noChannels" values={{billerName: billerName}}/>
                </div>
            ) : (
                <div className={styles.channelsContainer}>
                    <div className={styles.links}>
                        <EmailChannel registeringForbillerId={registeringForbillerId} channel={getChannel(channels, "email")}
                                      intl={intl}/>
                        <AgentsChannel payerId={payerId}
                                       registeringForbillerId={registeringForbillerId}
                                       channel={getChannel(channels, "mybillsagent")} intl={intl}/>
                        <MyobChannel payerId={payerId}
                                     registeringForbillerId={registeringForbillerId}
                                     channel={getChannel(channels, "myob")} intl={intl}/>
                        <ReckonChannel registeringForbillerId={registeringForbillerId}
                                       channel={getChannel(channels, "reckon")} intl={intl}/>
                        <XeroChannel registeringForbillerId={registeringForbillerId}
                                     channel={getChannel(channels, "xeroconnect")} intl={intl}/>
                        <PayreqChannel registeringForbillerId={registeringForbillerId}
                                     channel={getChannel(channels, "mybills")} intl={intl}/>
                        <PayreqBillsChannel registeringForbillerId={registeringForbillerId}
                                            channel={getChannel(channels, "mybills-bills")} intl={intl}/>
                    </div>
                    <BpayViewChannel channel={getChannel(channels, "bpv")} intl={intl}/>
                </div>
            )}
        </React.Fragment>

    )

);

export default injectIntl(ChannelSelectionView);
