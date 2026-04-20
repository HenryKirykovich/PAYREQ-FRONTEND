import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import Loading from "../../Loading";

export const isActive = (status) => status === "authorised" || status === "pending";
export const isPending = (status) => status === "pending";

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
            {/* panels added in PR 3+ */}
        </div>
    );
};

export default injectIntl(ConsentsSettings);
