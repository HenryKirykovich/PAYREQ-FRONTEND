import React, {useState, useEffect} from "react";
import {FormattedMessage, injectIntl} from "react-intl";
import {Glyphicon} from "react-bootstrap";
import axios from "axios";

import ConfirmDisconnectModal from "./ConfirmDisconnectModal";
import reckonConnectImg from "../../../resources/images/oauthButtons/reckon-connect-button.png";

const RECKON_COUNTRIES = [
    {id: "Australia", name: "Australia"},
    {id: "New Zealand", name: "New Zealand"}
];

const ReckonConnection = ({connections, billerId, onReload, intl}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [disconnectId, setDisconnectId] = useState(null);
    // State for new connection form
    const [reckonCountry, setReckonCountry] = useState("Australia");
    const [companyFile, setCompanyFile] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // State for editing existing connection (avoids direct mutation)
    const [editCountry, setEditCountry] = useState("Australia");
    const [editFile, setEditFile] = useState("");
    const [editUser, setEditUser] = useState("");
    const [editPassword, setEditPassword] = useState("");

    const reckonConnections = connections.reckonConnection || [];
    const hasConnection = reckonConnections.length > 0;
    const needsAttention = hasConnection && reckonConnections[0].needsAttention;

    // Initialize edit state from existing connection when panel opens
    useEffect(() => {
        if (isOpen && hasConnection && reckonConnections.length > 0) {
            const conn = reckonConnections[0];
            setEditCountry(conn.country || "Australia");
            setEditFile(conn.company || "");
            setEditUser(conn.name || "");
            setEditPassword("");
        }
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    const connectToReckon = (country, file, user, pass) => {
        axios.get(`/data/settings/reckon/${billerId}/connecttoreckon/1/settings`, {
            params: {
                reckonCountry: country,
                reckonCompanyFile: file,
                reckonApiUsername: user,
                reckonApiPassword: pass
            },
            localErrorHandling: true
        }).then(({data}) => {
            window.top.location.href = data.requesttoken.uri;
        });
    };

    const updateReckonConnection = (id, country, file, user, pass) => {
        axios.post(`/data/settings/reckon/update/${id}`, {
            reckonCountry: country,
            reckonCompanyFile: file,
            reckonApiUsername: user,
            reckonApiPassword: pass
        }, {localErrorHandling: true}).then(() => {
            onReload();
        });
    };

    const disconnectFromReckon = () => {
        axios.post(`/data/settings/reckon/disconnect/${disconnectId}`, {}, {localErrorHandling: true})
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

    const renderReckonForm = (connection) => {
        const currentCountry = connection ? editCountry : reckonCountry;
        const currentFile = connection ? editFile : companyFile;
        const currentUser = connection ? editUser : username;
        const currentPassword = connection ? editPassword : password;
        const setCurrentCountry = connection ? setEditCountry : setReckonCountry;
        const setCurrentFile = connection ? setEditFile : setCompanyFile;
        const setCurrentUser = connection ? setEditUser : setUsername;
        const setCurrentPassword = connection ? setEditPassword : setPassword;

        return (
            <form className="form-login form">
                <div className="form-group">
                    <label><FormattedMessage id="connections.reckon.productCountry"/></label>
                    <select
                        className="form-control"
                        value={currentCountry}
                        onChange={(e) => setCurrentCountry(e.target.value)}>
                        {RECKON_COUNTRIES.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <div className="alert alert-warning" role="alert">
                    <p dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "connections.reckon.message1"})}}/>
                    <p dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "connections.reckon.message2"})}}/>
                    <p dangerouslySetInnerHTML={{__html: intl.formatMessage({id: "connections.reckon.message3"})}}/>
                </div>
                <div className="form-group">
                    <label><FormattedMessage id="connections.reckon.companyFile"/></label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentFile}
                        onChange={(e) => setCurrentFile(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label><FormattedMessage id="connections.reckon.companyFileUsername"/></label>
                    <input
                        type="text"
                        className="form-control"
                        value={currentUser}
                        onChange={(e) => setCurrentUser(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label><FormattedMessage id="connections.reckon.companyFilePassword"/></label>
                    <input
                        type="password"
                        className="form-control"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}/>
                </div>
            </form>
        );
    };

    return (
        <div className="panel panel-default">
            <button onClick={() => setIsOpen(!isOpen)} style={{cursor: "pointer", background: "none", border: "none", width: "100%", padding: 0, textAlign: "left"}}>
                <div className="panel-heading search-panel-heading">
                    <h4 className="panel-title search-panel-title">
                        <span style={{marginLeft: "15px"}}>
                            <FormattedMessage id="connections.reckon.product"/>
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
                            reckonConnections.map((connection) => (
                                <div key={connection.id}>
                                    {connection.connectionError && connection.needsAttention && (
                                        <div className="alert alert-danger">
                                            <p><FormattedMessage id="connections.reckon.authorisationIssue"/></p>
                                        </div>
                                    )}
                                    {connection.connectionError && !connection.needsAttention && (
                                        <div className="alert alert-danger">
                                            <p><FormattedMessage id="connections.reckon.unableToConnect"/></p>
                                        </div>
                                    )}
                                    <p>
                                        <strong><FormattedMessage id="connections.connectionDate"/></strong>{" "}
                                        {connection.connectedDate ? intl.formatDate(connection.connectedDate, {day: "2-digit", month: "short", year: "numeric"}) : ""}
                                    </p>
                                    {connection.needsAttention && (
                                        <React.Fragment>
                                            <img
                                                style={{display: "block", margin: "0 auto", cursor: "pointer"}}
                                                src={reckonConnectImg}
                                                alt="reckon-connect-button"
                                                onClick={() => connectToReckon(editCountry, editFile, editUser, editPassword)}/>
                                            <div className="hr-text-settings">
                                                <span><FormattedMessage id="connections.or"/></span>
                                            </div>
                                        </React.Fragment>
                                    )}
                                    {renderReckonForm(connection)}
                                    <div className="row">
                                        <div className="col-xs-12 col-md-3 col-md-push-3">
                                            <button
                                                type="button"
                                                style={{display: "block", margin: "0 auto"}}
                                                className="btn btn-default"
                                                onClick={() => updateReckonConnection(connection.id, editCountry, editFile, editUser, editPassword)}>
                                                <FormattedMessage id="connections.reckon.updateMessage"/>
                                            </button>
                                        </div>
                                        <div className="col-xs-12 col-md-3 col-md-push-3">
                                            <button
                                                type="button"
                                                style={{display: "block", margin: "0 auto"}}
                                                className="btn btn-danger"
                                                onClick={() => openDisconnectModal(connection.id)}>
                                                <FormattedMessage id="connections.reckon.disconnectMessage"/>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <React.Fragment>
                                <div className="alert alert-info" role="alert">
                                    <h4><FormattedMessage id="connections.reckon.usageHeading"/></h4>
                                    <p><FormattedMessage id="connections.reckon.usageMessage1"/></p>
                                    <ol>
                                        <li><FormattedMessage id="connections.reckon.usageMessage2"/></li>
                                        <li><FormattedMessage id="connections.reckon.usageMessage3"/></li>
                                        <li><FormattedMessage id="connections.reckon.usageMessage4"/></li>
                                    </ol>
                                    <p><FormattedMessage id="connections.reckon.usageMessage5"/></p>
                                    <p><FormattedMessage id="connections.reckon.usageMessage6"/></p>
                                </div>
                                {renderReckonForm(null)}
                                <img
                                    style={{display: "block", margin: "0 auto", cursor: "pointer"}}
                                    src={reckonConnectImg}
                                    alt="reckon-connect-button"
                                    onClick={() => connectToReckon(reckonCountry, companyFile, username, password)}/>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            )}
            <ConfirmDisconnectModal
                show={showModal}
                titleId="connections.reckon.disconnectMessage"
                messageId="connections.reckon.modalMessage"
                onConfirm={disconnectFromReckon}
                onCancel={() => setShowModal(false)}/>
        </div>
    );
};

export default injectIntl(ReckonConnection);
