import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import Loading from "../../Loading";
import {getDateAsUTCFormatted} from "../../../utils/date-utils";
import styles from "./ConsentsSettings.module.scss";

export const isActive = (status) => status === "authorised" || status === "pending";
export const isPending = (status) => status === "pending";
export const getColSpan = (allowAgentRegistrationsFromContacts) =>
    allowAgentRegistrationsFromContacts ? 7 : 6;

const ConsentsSettings = ({billerId, biller, intl}) => {
    const isBiller = biller?.systemId !== "incoming-invoice";
    const allowAgentRegistrationsFromContacts = biller?.allowAgentRegistrationsFromContacts;

    const [consents, setConsents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchConsents = (search = "") => {
        setIsLoading(true);
        axios.get("/data/consents", {params: {billerId, searchTerm: search || null}})
            .then(({data}) => {
                setConsents(data.consents || []);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    };

    useEffect(() => {
        if (billerId) fetchConsents();
    }, [billerId]);

    if (isLoading) return <Loading/>;

    return (
        <div className="row">
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            {intl.formatMessage({id: "settings.consents.heading"})}
                        </h4>
                    </div>
                    <div className="panel-body">
                        <div className="col-md-12">
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
                                                            {/* action buttons added in PR 6+ */}
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
        </div>
    );
};

export default injectIntl(ConsentsSettings);
