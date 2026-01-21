import React, {useEffect, useState} from "react";
import FastFormConfirmationView from "./FastFormConfirmationView";
import Loading from "../Loading";
import axios from "axios/index";

export const getBiller = (billerId, setBiller) => {
    axios.get(`/ff/biller/${billerId}/create`)
        .then(({data}) => {
            setBiller(data.biller);
        });
};

const FastFormConfirmation = ({billerId, code, hasMyBills}) => {
    const [biller, setBiller] = useState();
    useEffect(
        () => getBiller(billerId, setBiller),
        [billerId, setBiller]
    );

    return biller ? <FastFormConfirmationView billerId={billerId} biller={biller} hasMyBills={hasMyBills}
                                                code={code}/> : <Loading/>;
};

export default FastFormConfirmation;