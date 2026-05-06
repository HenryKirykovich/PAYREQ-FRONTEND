import React, {useState} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Glyphicon} from "react-bootstrap";
import axios from "axios";

import ConfirmDisconnectModal from "./ConfirmDisconnectModal";

const MYOB_PRODUCTS = [
    {id: "3", name: "MYOB AccountRight"},
    {id: "1", name: "MYOB Essentials AU"},
    {id: "2", name: "MYOB Essentials NZ"}
];

const MyobConnection = ({connections, billerId, onReload, intl}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [disconnectId, setDisconnectId] = useState(null);
    const [myobProduct, setMyobProduct] = useState("3");

    const myobConnections = connections.myobConnection || [];
    const hasConnection = myobConnections.length > 0;
    const needsAttention = hasConnection && myobConnections[0].needsAttention;

    const connectToMyob = (productId) => {
        axios.get(`/data/settings/myob/${billerId}/connecttomyob/1/settings`, {
            params: {product: productId},
            localErrorHandling: true
        }).then(({data}) => {
            window.top.location.href = data.requesttoken.uri;
        });
    };

    const disconnectFromMyob = () => {
        axios.post(`/data/settings/myob/disconnect/${disconnectId}`, {}, {localErrorHandling: true})
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
                            <FormattedMessage id="connections.myob.product"/>
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
                            myobConnections.map((connection) => (
                                <div key={connection.id}>
                                    {connection.needsAttention && (
                                        <div className="alert alert-danger">
                                            <p><FormattedMessage id="connections.myob.authorisationIssue"/></p>
                                        </div>
                                    )}
                                    <p>
                                        <strong><FormattedMessage id="connections.myob.usernameDetailLabel"/></strong>{" "}
                                        {connection.name}
                                    </p>
                                    <p>
                                        <strong><FormattedMessage id="connections.myob.productDetailLabel"/></strong>{" "}
                                        {connection.extraInfo1}
                                    </p>
                                    <p>
                                        <strong><FormattedMessage id="connections.connectionDate"/></strong>{" "}
                                        {connection.connectedDate ? intl.formatDate(connection.connectedDate, {day: "2-digit", month: "short", year: "numeric"}) : ""}
                                    </p>
                                    <div className="connection-button-container">
                                        <button
                                            type="button"
                                            className={`btn ${connection.needsAttention ? "btn-link" : "btn-default"}`}
                                            onClick={() => openDisconnectModal(connection.id)}>
                                            <FormattedMessage id="connections.myob.disconnectMessage"/>
                                        </button>
                                        {connection.needsAttention && (
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => connectToMyob(connection.extraInfo2)}>
                                                <FormattedMessage id="connections.myob.reconnectButton"/>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <React.Fragment>
                                <div className="alert alert-info" role="alert">
                                    <h4><FormattedMessage id="connections.myob.usageHeading"/></h4>
                                    <p><FormattedMessage id="connections.myob.usageMessage1"/></p>
                                    <ol>
                                        <li><FormattedMessage id="connections.myob.usageMessage2"/></li>
                                        <li><FormattedMessage id="connections.myob.usageMessage3"/></li>
                                    </ol>
                                    <p><FormattedMessage id="connections.myob.usageMessage4"/></p>
                                    <p><FormattedMessage id="connections.myob.usageMessage5"/></p>
                                </div>
                                <form className="form-login form">
                                    <div className="form-group">
                                        <label>
                                            <FormattedMessage id="connections.myob.productLabel"/>
                                        </label>
                                        <select
                                            className="form-control"
                                            value={myobProduct}
                                            onChange={(e) => setMyobProduct(e.target.value)}>
                                            {MYOB_PRODUCTS.map((p) => (
                                                <option key={p.id} value={p.id}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        type="button"
                                        style={{display: "block", margin: "0 auto"}}
                                        className="btn btn-primary"
                                        onClick={() => connectToMyob(myobProduct)}>
                                        <FormattedMessage id="connections.myob.connectButton"/>
                                    </button>
                                </form>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            )}
            <ConfirmDisconnectModal
                show={showModal}
                titleId="connections.myob.disconnectMessage"
                messageId="connections.myob.modalMessage"
                onConfirm={disconnectFromMyob}
                onCancel={() => setShowModal(false)}/>
        </div>
    );
};

export default injectIntl(MyobConnection);
