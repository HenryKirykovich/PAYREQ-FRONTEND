import React from "react";
import {FormattedMessage} from "react-intl";

const ConnectionsView = ({connections, billerSettings, billerId, onReload}) => {
    const myobEnabled = billerSettings.myobEnabled || (connections && connections.myobEnabled);

    return (
        <React.Fragment>
            <h2>
                <FormattedMessage id="connections.heading.sme"/>
            </h2>

            <div className="panel panel-default">
                <div className="panel-heading">Xero</div>
                <div className="panel-body">Xero connection placeholder — PR 2</div>
            </div>

            {myobEnabled && (
                <div className="panel panel-default">
                    <div className="panel-heading">MYOB</div>
                    <div className="panel-body">MYOB connection placeholder — PR 3</div>
                </div>
            )}

            <div className="panel panel-default">
                <div className="panel-heading">Reckon Accounts Hosted</div>
                <div className="panel-body">Reckon connection placeholder — PR 4</div>
            </div>

            <h2>
                <FormattedMessage id="connections.heading.agents"/>
            </h2>

            <div className="panel panel-default">
                <div className="panel-heading">PropertyMe</div>
                <div className="panel-body">PropertyMe connection placeholder — PR 5</div>
            </div>
        </React.Fragment>
    );
};

export default ConnectionsView;
