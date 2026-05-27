import React, {useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Glyphicon} from "react-bootstrap";
import axios from "axios";

import ConfirmDisconnectModal from "./ConfirmDisconnectModal";

const PropertyMeConnection = ({connections, billerId, onReload, intl}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [disconnectId, setDisconnectId] = useState(null);

    const propertymeConnections = connections.propertymeConnection || [];
    const hasConnection = propertymeConnections.length > 0;
    // eslint-disable-next-line no-unused-vars
    const needsAttention = hasConnection && propertymeConnections[0].needsAttention;

    const connectToPropertyMe = () => {
        axios.get(`/data/settings/propertyme/${billerId}/connecttopropertyme/1/settings`, {localErrorHandling: true})
            .then(({data}) => {
                window.top.location.href = data.requesttoken.uri;
            });
    };

    const disconnectFromPropertyMe = () => {
        axios.post(`/data/settings/propertyme/disconnect/${disconnectId}`, {}, {localErrorHandling: true})
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
                            <FormattedMessage id="connections.propertyMe.product"/>
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
                            propertymeConnections.map((connection) => (
                                <div key={connection.id}>
                                    {connection.needsAttention && (
                                        <div className="alert alert-danger">
                                            <p><FormattedMessage id="connections.propertyMe.needsAttention"/></p>
                                        </div>
                                    )}
                                    <p>
                                        <strong><FormattedMessage id="connections.connectionDate"/></strong>{" "}
                                        {connection.connectedDate ? intl.formatDate(connection.connectedDate, {day: "2-digit", month: "short", year: "numeric"}) : ""}
                                    </p>
                                    <div className="connection-button-container">
                                        <button
                                            type="button"
                                            className={`btn ${connection.needsAttention ? "btn-link" : "btn-default"}`}
                                            onClick={() => openDisconnectModal(connection.id)}>
                                            <FormattedMessage id="connections.propertyMe.buttonDisconnect"/>
                                        </button>
                                        {connection.needsAttention && (
                                            <button
                                                className="btn btn-primary"
                                                onClick={connectToPropertyMe}>
                                                <FormattedMessage id="connections.propertyMe.reconnect"/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <React.Fragment>
                                <div className="alert alert-info" role="alert">
                                    <h4><FormattedMessage id="connections.propertyMe.usageHeading"/></h4>
                                    <p><FormattedMessage id="connections.propertyMe.usageLine1"/></p>
                                    <ol>
                                        <li><FormattedMessage id="connections.propertyMe.usageLine2"/></li>
                                        <li><FormattedMessage id="connections.propertyMe.usageLine3"/></li>
                                    </ol>
                                    <p><FormattedMessage id="connections.propertyMe.usageLine4"/></p>
                                    <p><FormattedMessage id="connections.propertyMe.usageLine5"/></p>
                                </div>
                                <form className="form-login form">
                                    <button
                                        type="button"
                                        style={{display: "block", margin: "0 auto"}}
                                        className="btn btn-primary"
                                        onClick={connectToPropertyMe}>
                                        <FormattedMessage id="connections.propertyMe.button"/>
                                    </button>
                                </form>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            )}
            <ConfirmDisconnectModal
                show={showModal}
                titleId="connections.propertyMe.buttonDisconnect"
                messageId="connections.propertyMe.modalMessage"
                onConfirm={disconnectFromPropertyMe}
                onCancel={() => setShowModal(false)}/>
        </div>
    );
};

export default injectIntl(PropertyMeConnection);
