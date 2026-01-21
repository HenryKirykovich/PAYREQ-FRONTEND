import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {injectIntl} from "react-intl";
import axios from "axios";
import PaymentDetailView from "./PaymentDetailView";
import Loading from "../../Loading";

const getPaymentDetail = (id, setPayment, setIsLoading) => {
    axios.get(`/data/payment-history/detail/${id}`)
        .then(({data}) => setPayment(data.payment))
        .finally(() => setIsLoading(false));
}


const PaymentDetail = ({billerId, match: {params: {id}}, intl}) => {
    const [payment, setPayment] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => getPaymentDetail(id, setPayment, setIsLoading),
        [id, setPayment, setIsLoading]
    )

    if (isLoading) return (
        <Loading/>
    )

    return (
        <PaymentDetailView payment={payment} intl={intl}/>
    )
}

export default withRouter(injectIntl(PaymentDetail));
