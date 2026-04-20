import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";
import {getDateAsUTCFormatted} from "../../../utils/date-utils";
import {Modal, DangerButton} from "../../common";
import styles from "./ConsentsSettings.module.scss";

export const isActive = (status) => status === "authorised" || status === "pending";
export const isPending = (status) => status === "pending";
export const getColSpan = (allowAgentRegistrationsFromContacts) =>
    allowAgentRegistrationsFromContacts ? 7 : 6;

export const getResendErrorKey = (error) =>
    error === "max.resends"
        ? "settings.consents.resendErrors.maxResends"
        : "settings.consents.resendErrorMessage";

export const REQUEST_ERROR_KEYS = {
    "invalid.email": "settings.consents.errors.invalidEmail",
    "max.retries":   "settings.consents.errors.maxRetries",
    "no.user":       "settings.consents.errors.noUser",
    "pending.rego":  "settings.consents.errors.pendingRego",
};

const ConsentsSettings = ({billerId, biller, intl}) => {
    const isBiller = biller?.systemId !== "incoming-invoice";
    const allowAgentRegistrationsFromContacts = biller?.allowAgentRegistrationsFromContacts;

    const [consents, setConsents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [agentMyBillsEmail, setAgentMyBillsEmail] = useState("");
    const [noticeId, setNoticeId] = useState("");
    const [requestError, setRequestError] = useState("");
    const [confirmUnauthorise, setConfirmUnauthorise] = useState(null);
    const [tableError, setTableError] = useState("");
    const [editingId] = useState(null);

    const fetchConsents = (search = "") => {
        setIsLoading(true);
        axios.get("/data/consents", {params: {billerId, searchTerm: search || null}})
            .then(({data}) => {
                setConsents(data.consents || []);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchConsents(searchTerm);
    };

    const handleRequestConsent = () => {
        setRequestError("");
        axios.post("/data/consents/request", {
            billerId,
            agentMyBillsEmail,
            noticeId: allowAgentRegistrationsFromContacts ? noticeId : null
        })
            .then(() => {
                setAgentMyBillsEmail("");
                setNoticeId("");
                fetchConsents(searchTerm);
            })
            .catch(error => {
                const errorCode = error?.response?.data?.error;
                const i18nKey = REQUEST_ERROR_KEYS[errorCode] || "settings.consents.setConsentError";
                setRequestError(intl.formatMessage({id: i18nKey}));
            });
    };

    const handleResend = (consent) => {
        setTableError("");
        axios.post(`/data/consents/${consent.id}/resend`, {billerId})
            .then(() => {
                fetchConsents(searchTerm);
            })
            .catch(error => {
                const errorCode = error?.response?.data?.error;
                const i18nKey = getResendErrorKey(errorCode);
                const message = i18nKey === "settings.consents.resendErrors.maxResends"
                    ? intl.formatMessage({id: i18nKey}, {uid: consent.uid})
                    : intl.formatMessage({id: i18nKey});
                setTableError(message);
            });
    };

    const handleRemove = (consent) => {
        setTableError("");
        axios.delete(`/data/consents/${consent.id}`, {params: {billerId}})
            .then(() => {
                setConfirmUnauthorise(null);
                fetchConsents(searchTerm);
            })
            .catch(() => {
                setTableError(intl.formatMessage({id: "settings.consents.removeAuthError"}));
                setConfirmUnauthorise(null);
            });
    };

    useEffect(() => {
        if (billerId) fetchConsents();
    }, [billerId]);

    if (isLoading) return <Loading/>;

    return (
        <div className="row">
            {isBiller && (
                <div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                {intl.formatMessage({id: "settings.consents.billerHeading"})}
                            </h4>
                        </div>
                        <div className="panel-body">
                            <div className="alert alert-info">
                                {intl.formatMessage({id: "settings.consents.billerText"})}
                            </div>
                            <form className="form-login form" id="consent-form">
                                {requestError && (
                                    <div className="alert alert-danger">
                                        {requestError}
                                    </div>
                                )}
                                <div className="form-group col-md-12">
                                    <label htmlFor="agentMyBillsEmail" className="control-label col-md-2">
                                        {intl.formatMessage({id: "settings.consents.billerAgentEmail"})}
                                    </label>
                                    <div className="col-md-10">
                                        <input
                                            className="form-control"
                                            value={agentMyBillsEmail}
                                            onChange={(e) => setAgentMyBillsEmail(e.target.value)}
                                            id="agentMyBillsEmail"
                                        />
                                    </div>
                                </div>
                                {allowAgentRegistrationsFromContacts && (
                                    <div className="form-group col-md-12">
                                        <label htmlFor="noticeId" className="control-label col-md-2">
                                            {intl.formatMessage({id: "settings.consents.noticeIdLabel"})}
                                        </label>
                                        <div className="col-md-10">
                                            <input
                                                className="form-control"
                                                value={noticeId}
                                                onChange={(e) => setNoticeId(e.target.value)}
                                                id="noticeId"
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="col-xs-12 center-items">
                                    <Button bsStyle="primary" type="button" onClick={handleRequestConsent}>
                                        <span className="glyphicon glyphicon-send"></span>
                                        &nbsp;&nbsp;{intl.formatMessage({id: "settings.consents.requestButton"})}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            {intl.formatMessage({id: "settings.consents.heading"})}
                        </h4>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-12">
                            {tableError && (
                                <div className="alert alert-danger">
                                    {tableError}
                                </div>
                            )}
                            <form className="form-horizontal" role="form" onSubmit={handleSearch}>
                                <div className="form-group">
                                    <div className="input-group padding-left-right">
                                        <input
                                            className="form-control"
                                            placeholder={intl.formatMessage({id: "settings.consents.searchPlaceholder"})}
                                            id="searchTerm"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <span className="input-group-btn">
                                            <button
                                                title="Search"
                                                id="mailersearch"
                                                type="submit"
                                                className="btn btn-default"
                                            >
                                                <span className="glyphicon glyphicon-search"></span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <div className="row">
                                <div className="col-md-12">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>{intl.formatMessage({id: "settings.consents.emailLabel"})}</th>
                                                <th>{intl.formatMessage({id: "settings.consents.statusLabel"})}</th>
                                                <th>
                                                    {isBiller ?
                                                        intl.formatMessage({id: "settings.consents.agentLabel"}) :
                                                        intl.formatMessage({id: "settings.consents.billerLabel"})
                                                    }
                                                </th>
                                                {allowAgentRegistrationsFromContacts && (
                                                    <th>{intl.formatMessage({id: "settings.consents.noticeIdLabel"})}</th>
                                                )}
                                                <th>{intl.formatMessage({id: "settings.consents.authorisedOnLabel"})}</th>
                                                <th>{intl.formatMessage({id: "settings.consents.unAuthorisedOnLabel"})}</th>
                                                <th>{intl.formatMessage({id: "settings.consents.actions"})}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {consents.length === 0 ? (
                                                <tr>
                                                    <td colSpan={getColSpan(allowAgentRegistrationsFromContacts)}>
                                                        {intl.formatMessage({id: "settings.consents.noAuthorisations"})}
                                                    </td>
                                                </tr>
                                            ) : (
                                                consents.map(consent => (
                                                    <tr key={consent.id}>
                                                        <td className={styles.consentcells}>{consent.uid}</td>
                                                        <td className={styles.consentcells}>{consent.statusDescription}</td>
                                                        <td className={styles.consentcells}>{consent.tagName}</td>
                                                        {allowAgentRegistrationsFromContacts && (
                                                            <td className={styles.consentcells}>{consent.noticeId}</td>
                                                        )}
                                                        <td className={styles.consentcells}>
                                                            {consent.authorisedOn ? getDateAsUTCFormatted(consent.authorisedOn) : "-"}
                                                        </td>
                                                        <td className={styles.consentcells}>
                                                            {consent.unauthorisedOn ? getDateAsUTCFormatted(consent.unauthorisedOn) : "-"}
                                                        </td>
                                                        <td className={styles.consentcells}>
                                                            <div style={{display: "inline-table"}}>
                                                                <div className="actions-row">
                                                                    <div className="actions btn-group col-xs-12">
                                                                        {isActive(consent.status) && editingId !== consent.id && (
                                                                            <Button
                                                                                bsStyle="danger"
                                                                                onClick={() => setConfirmUnauthorise(consent)}
                                                                                style={{marginRight: "5px"}}
                                                                            >
                                                                                <span className="glyphicon glyphicon-remove"></span>
                                                                                &nbsp;{intl.formatMessage({id: "settings.consents.removeAuth"})}
                                                                            </Button>
                                                                        )}
                                                                        {isBiller && isPending(consent.status) && editingId !== consent.id && (
                                                                            <Button
                                                                                onClick={() => handleResend(consent)}
                                                                                style={{marginRight: "5px"}}
                                                                            >
                                                                                <span className="glyphicon glyphicon-repeat"></span>
                                                                                &nbsp;{intl.formatMessage({id: "settings.consents.resendButton"})}
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={!!confirmUnauthorise}
                title="settings.consents.unauthoriseModalHeading"
                onCancel={() => setConfirmUnauthorise(null)}
                onPrimaryAction={() => handleRemove(confirmUnauthorise)}
                PrimaryButtonComponent={DangerButton}
                buttonLabel="settings.consents.ok"
            >
                <p>
                    {intl.formatMessage(
                        {id: "settings.consents.unauthoriseModalText"},
                        {email: <strong key="e">{confirmUnauthorise?.uid}</strong>}
                    )}
                </p>
            </Modal>
        </div>
    );
};

export default injectIntl(ConsentsSettings);
