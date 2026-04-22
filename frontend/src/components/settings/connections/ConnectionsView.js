import React from "react";
import {FormattedMessage} from "react-intl";

import XeroConnection from "./XeroConnection";
import MyobConnection from "./MyobConnection";
import ReckonConnection from "./ReckonConnection";
import PropertyMeConnection from "./PropertyMeConnection";
import styles from "./ConnectionsView.module.scss";

const ConnectionsView = ({connections, billerSettings, billerId, onReload}) => {
    const myobEnabled = billerSettings.myobEnabled || (connections && connections.myobEnabled);

    return (
        <div className={styles.connectionsContainer}>
            <h2 className={styles.sectionHeading}>
                <FormattedMessage id="connections.heading.sme"/>
            </h2>

            <XeroConnection connections={connections} billerId={billerId} onReload={onReload}/>

            {myobEnabled && (
                <MyobConnection connections={connections} billerId={billerId} onReload={onReload}/>
            )}

            <ReckonConnection connections={connections} billerId={billerId} onReload={onReload}/>

            <h2 className={styles.sectionHeading} style={{marginTop: "3rem"}}>
                <FormattedMessage id="connections.heading.agents"/>
            </h2>

            <PropertyMeConnection connections={connections} billerId={billerId} onReload={onReload}/>
        </div>
    );
};

export default ConnectionsView;
