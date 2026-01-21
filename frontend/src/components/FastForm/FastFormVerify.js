import React, {useEffect, useState} from "react";
import FastFormVerifyView from "./FastFormVerifyView";
import Loading from "../Loading";
import axios from "axios/index";


export const getBiller = (billerId, code, setBiller, setEmail) => {
    axios.get(`/ff/biller/${billerId}/verify/${code}`)
        .then(({data}) => {
            setBiller(data.biller);
            setEmail(data.email);
        });
};


const FastFormVerify = ({billerId, code}) => {
    const [biller, setBiller] = useState();
    const [email, setEmail] = useState();

    useEffect(
        () => getBiller(billerId, code, setBiller, setEmail),
        [billerId, code, setBiller, setEmail]
    );

    return biller ? <FastFormVerifyView billerId={billerId}
                                        biller={biller}
                                        code={code}
                                        email={email}/> :
        <Loading/>;
};

export default FastFormVerify;