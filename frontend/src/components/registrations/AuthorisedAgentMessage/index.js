import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import Loading from "../../Loading";
import {DefaultButton, LargeText, LinkButton, PageHeading, RegularText} from "../../common";
import styles from "./AuthorisedAgentMessage.module.scss"
import {injectIntl} from "react-intl";

const getConfig = (payerId, registeringForbillerId, setConfig) => {
    axios.get(`/data/payer/registrations/${payerId}/mailer/${registeringForbillerId}/authorisation/config`)
        .then(({data}) => setConfig(data));
};

const AuthorisedAgentMessageView = ({billerName, logoPath, payerId, intl}) => {
    return (
        <React.Fragment>
            <img src={logoPath} className={styles.logo} alt="Logo"/>

            <PageHeading text="registrations.authorisationActive.heading"/>
            <div className={styles.container}>
                <LargeText text="registrations.authorisationActive.message" values={{billerName: billerName}}/>
                <div className={styles.helpContainer}>
                    <RegularText text="registrations.authorisationActive.help"/>
                    <LinkButton label="registrations.authorisationActive.help.email" href={intl.formatMessage({id: "registrations.authorisationActive.help.email.mailto"})}/>
                </div>
                <div className={styles.buttonContainer}>
                    <DefaultButton label="registrations.authorisationActive.backToHome" linkTo={`/portal/customer/biller/${payerId}/registrations/billers`} icon="chevron-left"/>
                </div>
            </div>

        </React.Fragment>
    );
}

const AuthorisedAgentMessage = ({payerId, match: {params: {registeringForbillerId}}, intl}) => {
    const [config, setConfig] = useState();
    useEffect(() => getConfig(payerId, registeringForbillerId, setConfig), [payerId, registeringForbillerId]);

    if (!config) return <Loading/>;

    return <AuthorisedAgentMessageView billerName={config.tagName} logoPath={config.logoPath} payerId={payerId} intl={intl}/>
};

export default withRouter(injectIntl(AuthorisedAgentMessage));
