import React, {useEffect, useState} from "react";
import FastFormView from "./FastFormView";
import Loading from "../Loading";
import axios from "axios/index";
import {getQueryParams} from "../../utils/route-utils";

// Parse string parameter - return empty string if undefined/null, otherwise return as string with whitespace trimmed
const parseStringParam = (param) => {
    if (!param || param === 'undefined' || param === 'null') {
        return '';
    }
    return String(param).trim();
};


export const getBiller = (billerId, setBiller) => {
    const language = localStorage.getItem("language");
    axios.get(`/ff/biller/${billerId}/create`, {params: {language: language}})
        .then(({data}) => {
            setBiller(data.biller);
        });
};

const FastForm = ({billerId, location}) => {
    const [biller, setBiller] = useState();
    useEffect(
        () => getBiller(billerId, setBiller),
        [billerId, setBiller]
    );

    const urlParams = getQueryParams(location);
    const params = {
      accountNumber: parseStringParam(urlParams['aN']),
      auth1: parseStringParam(urlParams['a1']),
      auth2: parseStringParam(urlParams['a2']),
      auth3: parseStringParam(urlParams['a3']),
      auth4: parseStringParam(urlParams['a4']),
    };

    return biller ? <FastFormView billerId={billerId} biller={biller} params={params}/> : <Loading/>;
};

export default FastForm;
