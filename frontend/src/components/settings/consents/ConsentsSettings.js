import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import {TextInput} from "../../common";
import Loading from "../../Loading";
import {getDateAsUTCFormatted} from "../../../utils/date-utils";

const ConsentsSettings = ({billerId, biller, intl}) => {
    const [consents, setConsents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [agentMyBillsEmail, setAgentMyBillsEmail] = useState("");
    const [noticeId, setNoticeId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [resendErrorMessage, setResendErrorMessage] = useState("");

    const isBiller = biller?.systemId !== "incoming-invoice";
    const allowAgentRegistrationsFromContacts = biller?.allowAgentRegistrationsFromContacts;

    useEffect(() => {
        if (billerId) {
            fetchConsents();
        }
    }, [billerId]);

    const fetchConsents = (search = "") => {
        setIsLoading(true);
        axios.get("/data/consents", {params: {billerId, searchTerm: search}})
            .then(({data}) => {
                setConsents(data.consents || []);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching consents:", error);
                setIsLoading(false);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchConsents(searchTerm);
    };

    const handleRequestConsent = () => {
        setErrorMessage("");
        
        if (!agentMyBillsEmail) {
            setErrorMessage(intl.formatMessage({id: "settings.consents.emailRequired"}));
            return;
        }

        axios.post("/data/consents/request", {
            billerId,
            agentMyBillsEmail,
            noticeId: allowAgentRegistrationsFromContacts ? noticeId : null
        })
            .then(() => {
                alert(intl.formatMessage({id: "settings.consents.requestSent"}));
                setAgentMyBillsEmail("");
                setNoticeId("");
                fetchConsents();
            })
            .catch(error => {
                console.error("Error requesting consent:", error);
                setErrorMessage(intl.formatMessage({id: "settings.consents.requestFailed"}));
            });
    };

    const handleResend = (consentId) => {
        setResendErrorMessage("");
        axios.post(`/data/consents/${consentId}/resend`, {billerId})
            .then(() => {
                alert(intl.formatMessage({id: "settings.consents.resendSuccess"}));
                fetchConsents();
            })
            .catch(error => {
                console.error("Error resending consent:", error);
                setResendErrorMessage(intl.formatMessage({id: "settings.consents.resendFailed"}));
            });
    };

    const handleRevoke = (consentId) => {
        if (window.confirm(intl.formatMessage({id: "settings.consents.confirmRevoke"}))) {
            axios.delete(`/data/consents/${consentId}`, {params: {billerId}})
                .then(() => {
                    alert(intl.formatMessage({id: "settings.consents.revokeSuccess"}));
                    fetchConsents();
                })
                .catch(error => {
                    console.error("Error revoking consent:", error);
                    alert(intl.formatMessage({id: "settings.consents.revokeFailed"}));
                });
        }
    };

    if (isLoading) {
        return <Loading/>;
    }

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
                                {errorMessage && (
                                    <div className="alert alert-danger">
                                        {errorMessage}
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
                            {resendErrorMessage && (
                                <div className="alert alert-danger">
                                    {resendErrorMessage}
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
                                                        <td colSpan={allowAgentRegistrationsFromContacts ? "7" : "6"}>
                                                            {intl.formatMessage({id: "settings.consents.noConsentsFound"})}
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    consents.map(consent => (
                                                        <tr key={consent.id}>
                                                            <td className="consentcells">{consent.uid}</td>
                                                            <td className="consentcells">{consent.statusDescription}</td>
                                                            <td className="consentcells">{consent.tagName}</td>
                                                            {allowAgentRegistrationsFromContacts && (
                                                                <td className="consentcells">{consent.noticeId}</td>
                                                            )}
                                                            <td className="consentcells">
                                                                {consent.authorisedOn ? getDateAsUTCFormatted(consent.authorisedOn) : "-"}
                                                            </td>
                                                            <td className="consentcells">
                                                                {consent.unauthorisedOn ? getDateAsUTCFormatted(consent.unauthorisedOn) : "-"}
                                                            </td>
                                                            <td className="consentcells">
                                                                <div style={{display: "inline-table"}}>
                                                                    <div className="actions-row">
                                                                        <div className="actions btn-group col-xs-12">
                                                                            {consent.canResend && (
                                                                                <Button 
                                                                                    onClick={() => handleResend(consent.id)}
                                                                                    style={{marginRight: "5px"}}
                                                                                >
                                                                                    {intl.formatMessage({id: "settings.consents.resendButton"})}
                                                                                </Button>
                                                                            )}
                                                                            {consent.canRevoke && (
                                                                                <Button onClick={() => handleRevoke(consent.id)}>
                                                                                    {intl.formatMessage({id: "settings.consents.revokeButton"})}
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
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default injectIntl(ConsentsSettings);
