import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import {LargeText, PageHeading, SecondaryButton} from "../../common"
import Loading from "../../Loading";
import GatewayDetails from "./GatewayDetails";

const NoGateway = withRouter(
    ({history}) => {
        return (
            <React.Fragment>
                <LargeText text="settings.gateway.notSetup.text" />
                <SecondaryButton label="settings.payments.setup.button" onClick={() => history.push("./create")}/>
            </React.Fragment>
        );
    }
);

const getGateway = (billerId, setIsLoading, setGateway) => {
    axios.get(`/data/settings/payment-gateway/${billerId}`)
        .then(({data}) => {
            setGateway(data);
            setIsLoading(false)
        });
};


const PaymentSettings = ({billerId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [gateway, setGateway] = useState(true);
    useEffect(
        () => getGateway(billerId, setIsLoading, setGateway),
        [billerId, setIsLoading, setGateway]
    );

    if (isLoading) return <Loading/>;
    return (
        <React.Fragment>
            <PageHeading text="settings.payments.heading"/>
            {gateway ? <GatewayDetails gateway={gateway} billerId={billerId} /> : <NoGateway/>}
        </React.Fragment>
    )
};

export default PaymentSettings;