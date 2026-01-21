import React, {useEffect, useState} from "react";
import BillersView from "./BillersView";
import Loading from "../../Loading";
import axios from "axios";

const getBillersWithActiveRegistrations = (payerId, setBillersWithActiveRegistrations) => {
    axios.get(`/data/payerregistrations/billers/${payerId}`)
        .then(({data}) => {
            setBillersWithActiveRegistrations(data.billers || []);
        });
};

const Billers = ({payerId}) => {
    const [billersWithActiveRegistrations, setBillersWithActiveRegistrations] = useState();
    useEffect(
        () => getBillersWithActiveRegistrations(payerId, setBillersWithActiveRegistrations),
        [payerId, setBillersWithActiveRegistrations]
    );

    if (!billersWithActiveRegistrations) {
        return <Loading/>;
    }

    return <BillersView payerId={payerId} billers={billersWithActiveRegistrations}/>;
};

export default Billers;
