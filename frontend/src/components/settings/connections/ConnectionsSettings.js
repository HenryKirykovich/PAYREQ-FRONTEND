import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";
import {getDateAsUTCFormatted} from "../../../utils/date-utils";

const ConnectionsSettings = ({billerId, intl}) => {
    const [connections, setConnections] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billerId) {
            axios.get("/data/settings/connections", {params: {billerId}})
                .then(({data}) => {
                    setConnections(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching connections:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId]);

    const handleConnectXero = () => {
        window.location.href = `/data/connections/xero/auth?billerId=${billerId}`;
    };

    const handleDisconnectXero = (connectionId) => {
        if (window.confirm(intl.formatMessage({id: "settings.connections.xero.confirmDisconnect"}))) {
            axios.delete(`/data/connections/xero/${connectionId}`, {params: {billerId}})
                .then(() => {
                    alert(intl.formatMessage({id: "settings.connections.xero.disconnected"}));
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Error disconnecting Xero:", error);
                    alert(intl.formatMessage({id: "settings.connections.xero.disconnectFailed"}));
                });
        }
    };

    const handleConnectMyob = () => {
        window.location.href = `/data/connections/myob/auth?billerId=${billerId}`;
    };

    const handleDisconnectMyob = (connectionId) => {
        if (window.confirm(intl.formatMessage({id: "settings.connections.myob.confirmDisconnect"}))) {
            axios.delete(`/data/connections/myob/${connectionId}`, {params: {billerId}})
                .then(() => {
                    alert(intl.formatMessage({id: "settings.connections.myob.disconnected"}));
                    window.location.reload();
                })
                .catch(error => {
                    console.error("Error disconnecting MYOB:", error);
                    alert(intl.formatMessage({id: "settings.connections.myob.disconnectFailed"}));
                });
        }
    };

    if (isLoading) {
        return <Loading/>;
    }

    const hasXeroConnection = connections.xeroConnection && connections.xeroConnection.length > 0;
    const xeroNeedsAttention = hasXeroConnection && connections.xeroConnection[0].needsAttention;
    const hasMyobConnection = connections.myobConnection && connections.myobConnection.length > 0;
    const myobNeedsAttention = hasMyobConnection && connections.myobConnection[0].needsAttention;

    return (
        <div className="row">
            <div>
                <h2>{intl.formatMessage({id: "settings.connections.headingSme"})}</h2>

                {/* Xero Connection */}
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <span style={{marginLeft: "15px"}}>
                                {intl.formatMessage({id: "settings.connections.xero.product"})}
                            </span>
                            <span style={{float: "right"}}>
                                {hasXeroConnection ? (
                                    xeroNeedsAttention ? (
                                        <span className="text-warning">
                                            {intl.formatMessage({id: "settings.connections.reconnect"})}
                                            {" "}<span className="glyphicon glyphicon-remove-circle"/>
                                        </span>
                                    ) : (
                                        <span className="text-success">
                                            {intl.formatMessage({id: "settings.connections.connected"})}
                                            {" "}<span className="glyphicon glyphicon-ok-circle"/>
                                        </span>
                                    )
                                ) : (
                                    <span className="text-danger">
                                        {intl.formatMessage({id: "settings.connections.disconnected"})}
                                        {" "}<span className="glyphicon glyphicon-remove-circle"/>
                                    </span>
                                )}
                            </span>
                        </h4>
                    </div>
                    <div className="panel-body">
                        {hasXeroConnection ? (
                            connections.xeroConnection.map(connection => (
                                <div key={connection.id}>
                                    {connection.connectionError && (
                                        <div className="alert alert-danger">
                                            <p>
                                                {connection.needsAttention ? 
                                                    intl.formatMessage({id: "settings.connections.xero.authorisationIssue"}) :
                                                    intl.formatMessage({id: "settings.connections.xero.connectionIssue"})
                                                }
                                            </p>
                                        </div>
                                    )}
                                    <p>
                                        <strong>{intl.formatMessage({id: "settings.connections.connectionDate"})} </strong>
                                        {getDateAsUTCFormatted(connection.connectedDate)}
                                    </p>
                                    <p>
                                        <strong>{intl.formatMessage({id: "settings.connections.xero.partnerStatus"})}</strong>
                                        {" "}{connection.partnerStatus}
                                    </p>
                                    <div className="connection-button-container">
                                        <Button onClick={() => handleDisconnectXero(connection.id)}>
                                            {intl.formatMessage({id: "settings.connections.xero.disconnectMessage"})}
                                        </Button>
                                        {connection.needsAttention && (
                                            <img 
                                                style={{cursor: "pointer", marginLeft: "10px"}} 
                                                src="./images/xero-connect-blue.svg" 
                                                alt="xero-connect-blue"
                                                onClick={handleConnectXero}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <div className="alert alert-info" role="alert">
                                    <h4>{intl.formatMessage({id: "settings.connections.xero.usageHeader"})}</h4>
                                    <p>{intl.formatMessage({id: "settings.connections.xero.usageMessage1"})}</p>
                                    <ol>
                                        <li>{intl.formatMessage({id: "settings.connections.xero.usageMessage2"})}</li>
                                        <li>{intl.formatMessage({id: "settings.connections.xero.usageMessage3"})}</li>
                                    </ol>
                                    <p>{intl.formatMessage({id: "settings.connections.xero.usageMessage4"})}</p>
                                    <p>{intl.formatMessage({id: "settings.connections.xero.usageMessage5"})}</p>
                                </div>
                                <img 
                                    style={{display: "block", margin: "0 auto", cursor: "pointer"}} 
                                    src="./images/xero-connect-blue.svg" 
                                    alt="xero-connect-blue"
                                    onClick={handleConnectXero}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* MYOB Connection */}
                {connections.myobEnabled && (
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <span style={{marginLeft: "15px"}}>
                                    {intl.formatMessage({id: "settings.connections.myob.product"})}
                                </span>
                                <span style={{float: "right"}}>
                                    {hasMyobConnection ? (
                                        myobNeedsAttention ? (
                                            <span className="text-warning">
                                                {intl.formatMessage({id: "settings.connections.reconnect"})}
                                                {" "}<span className="glyphicon glyphicon-remove-circle"/>
                                            </span>
                                        ) : (
                                            <span className="text-success">
                                                {intl.formatMessage({id: "settings.connections.connected"})}
                                                {" "}<span className="glyphicon glyphicon-ok-circle"/>
                                            </span>
                                        )
                                    ) : (
                                        <span className="text-danger">
                                            {intl.formatMessage({id: "settings.connections.disconnected"})}
                                            {" "}<span className="glyphicon glyphicon-remove-circle"/>
                                        </span>
                                    )}
                                </span>
                            </h4>
                        </div>
                        <div className="panel-body">
                            {hasMyobConnection ? (
                                connections.myobConnection.map(connection => (
                                    <div key={connection.id}>
                                        {connection.connectionError && (
                                            <div className="alert alert-danger">
                                                <p>{intl.formatMessage({id: "settings.connections.myob.connectionIssue"})}</p>
                                            </div>
                                        )}
                                        <p>
                                            <strong>{intl.formatMessage({id: "settings.connections.connectionDate"})} </strong>
                                            {getDateAsUTCFormatted(connection.connectedDate)}
                                        </p>
                                        <div className="connection-button-container">
                                            <Button onClick={() => handleDisconnectMyob(connection.id)}>
                                                {intl.formatMessage({id: "settings.connections.myob.disconnectMessage"})}
                                            </Button>
                                            {connection.needsAttention && (
                                                <Button onClick={handleConnectMyob} style={{marginLeft: "10px"}}>
                                                    {intl.formatMessage({id: "settings.connections.reconnect"})}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <div className="alert alert-info" role="alert">
                                        <h4>{intl.formatMessage({id: "settings.connections.myob.usageHeader"})}</h4>
                                        <p>{intl.formatMessage({id: "settings.connections.myob.usageMessage"})}</p>
                                    </div>
                                    <Button onClick={handleConnectMyob}>
                                        {intl.formatMessage({id: "settings.connections.myob.connectButton"})}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default injectIntl(ConnectionsSettings);
