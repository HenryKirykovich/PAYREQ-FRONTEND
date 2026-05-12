import React, {useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Glyphicon} from "react-bootstrap";
import axios from "axios";

import ConfirmDisconnectModal from "./ConfirmDisconnectModal";
import xeroConnectImg from "../../../resources/images/oauthButtons/xero-connect-blue.svg";

const XeroConnection = ({connections, billerId, onReload, intl}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [disconnectId, setDisconnectId] = useState(null);

    const xeroConnections = connections.xeroConnection || [];
    const hasConnection = xeroConnections.length > 0;
    const needsAttention = hasConnection && xeroConnections[0].needsAttention;

    const connectToXero = () => {
        axios.get(`/data/settings/xero/${billerId}/connecttoxero/1/settings`, {localErrorHandling: true})
            .then(({data}) => {
                window.top.location.href = data.requesttoken.uri;
            });
    };

    const disconnectFromXero = () => {
        axios.post(`/data/settings/xero/disconnect/${disconnectId}`, {}, {localErrorHandling: true})
            .then(() => {
                setShowModal(false);
                onReload();
            });
    };

    const openDisconnectModal = (id) => {
        setDisconnectId(id);
        setShowModal(true);
    };

    const getStatusBadge = () => {
        if (!hasConnection) {
            return (
                <span className="text-danger">
                    {intl.formatMessage({id: "connections.status.disconnected"})}{" "}
                    <Glyphicon glyph="remove-circle"/>
                </span>
            );
        }
        if (needsAttention) {
            return (
                <span className="text-warning">
                    {intl.formatMessage({id: "connections.status.reconnect"})}{" "}
                    <Glyphicon glyph="remove-circle"/>
                </span>
            );
        }
        return (
            <span className="text-success">
                {intl.formatMessage({id: "connections.status.connected"})}{" "}
                <Glyphicon glyph="ok-circle"/>
            </span>
        );
    };

    return (
        <div className="panel panel-default">
            <button onClick={() => setIsOpen(!isOpen)} style={{cursor: "pointer", background: "none", border: "none", width: "100%", padding: 0, textAlign: "left"}}>
                <div className="panel-heading search-panel-heading">
                    <h4 className="panel-title search-panel-title">
                        <span style={{marginLeft: "15px"}}>
                            <FormattedMessage id="connections.xero.product"/>
                        </span>
                        <span style={{float: "right"}}>
                            {getStatusBadge()}
                            <span style={{marginLeft: "10px"}}>
                                <Glyphicon glyph={isOpen ? "chevron-up" : "chevron-down"}/>
                            </span>
                        </span>
                    </h4>
                </div>
            </button>
            {isOpen && (
                <div className="panel-body">
                    <div className="panel-body">
                        {hasConnection ? (
                            xeroConnections.map((connection) => (
                                <div key={connection.id}>
                                    {connection.connectionError && connection.needsAttention && (
                                        <div className="alert alert-danger">
                                            <p><FormattedMessage id="connections.xero.authorisationIssue"/></p>
                                        </div>
                                    )}
                                    {connection.connectionError && !connection.needsAttention && (
                                        <div className="alert alert-danger">
                                            <p><FormattedMessage id="connections.xero.connectionIssue"/></p>
                                        </div>
                                    )}
                                    <p>
                                        <strong><FormattedMessage id="connections.connectionDate"/></strong>{" "}
                                        {connection.connectedDate ? intl.formatDate(connection.connectedDate, {day: "2-digit", month: "short", year: "numeric"}) : ""}
                                    </p>
                                    <p>
                                        <strong><FormattedMessage id="connections.xero.partnerStatus"/></strong>{" "}
                                        {connection.partnerStatus}
                                    </p>
                                    <div className="connection-button-container">
                                        <button
                                            type="button"
                                            className={`btn ${connection.needsAttention ? "btn-link" : "btn-default"}`}
                                            onClick={() => openDisconnectModal(connection.id)}>
                                            <FormattedMessage id="connections.xero.disconnectMessage"/>
                                        </button>
                                        {connection.needsAttention && (
                                            <img
                                                style={{cursor: "pointer"}}
                                                src={xeroConnectImg}
                                                alt="xero-connect-blue"
                                                onClick={connectToXero}/>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <React.Fragment>
                                <div className="alert alert-info" role="alert">
                                    <h4><FormattedMessage id="connections.xero.usageHeader"/></h4>
                                    <p><FormattedMessage id="connections.xero.usageMessage1"/></p>
                                    <ol>
                                        <li><FormattedMessage id="connections.xero.usageMessage2"/></li>
                                        <li><FormattedMessage id="connections.xero.usageMessage3"/></li>
                                    </ol>
                                    <p><FormattedMessage id="connections.xero.usageMessage4"/></p>
                                    <p><FormattedMessage id="connections.xero.usageMessage5"/></p>
                                </div>
                                <img
                                    style={{display: "block", margin: "0 auto", cursor: "pointer"}}
                                    src={xeroConnectImg}
                                    alt="xero-connect-blue"
                                    onClick={connectToXero}/>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            )}
            <ConfirmDisconnectModal
                show={showModal}
                titleId="connections.xero.disconnectMessage"
                messageId="connections.xero.modalMessage"
                onConfirm={disconnectFromXero}
                onCancel={() => setShowModal(false)}/>
        </div>
    );
};

export default injectIntl(XeroConnection);
