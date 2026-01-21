import React, {useEffect, useState} from "react";
import axios from "axios";
import AutoPaymentsView from "./AutoPaymentsView";
import Loading from "../Loading";

const getAutoPayments = (billerId, setAutoPayments) => {
    axios.get(`/data/auto-payments/${billerId}`, )
        .then(({data}) => setAutoPayments(data.autoPayments));
};

const AutoPayments = ({billerId}) => {
    const [autoPayments, setAutoPayments] = useState();
    const [billers, setBillers] = useState([]);

    useEffect(
        () => getAutoPayments(billerId, setAutoPayments),
        [billerId, setAutoPayments]
    );

    useEffect(() => {
            axios.get(`/data/auto-payments/${billerId}/billers`, )
                .then(({data}) => setBillers(data.billers));
        },
        [billerId]);

    return autoPayments ? <AutoPaymentsView autoPayments={autoPayments} billers={billers}/> : <Loading/>;
};

export default AutoPayments;