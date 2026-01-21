import React, {useEffect, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import BillerSelectionView from "./BillerSelectionView";
import Loading from "../../Loading";
import {useDebouncedEffect} from "../../../utils/form-utils";

const getInitialBillers = (setIsLoading, payerId, setBillers, setCountry) => {
    setIsLoading(true);
    axios.get(`/data/payer/registrations/${payerId}/selfservice-mailers/ /all`)
        .then(({data}) => {
            setBillers(data.mailers);
            setIsLoading(false);
            setCountry(data.country)
        });
};

let currentSearchTerm;

const search = (payerId, setBillers, searchTerm, country) => {
    currentSearchTerm = searchTerm;
    axios.get(`/data/payer/registrations/${payerId}/selfservice-mailers/${searchTerm || " "}/all`,
        {params: {country: country}})
        .then(({data}) => {
            if (data.searchTerm === currentSearchTerm) {
                setBillers(data.mailers);
            }
        });
};

const BillerSelection = ({payerId}) => {
    const [billers, setBillers] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [doSearch, setDoSearch] = useState(false);
    const [country, setCountry] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => getInitialBillers(setIsLoading, payerId, setBillers, setCountry), [setIsLoading, payerId, setBillers, setCountry]);
    useDebouncedEffect(
        () => {
            if (!isLoading && doSearch) {
                search(payerId, setBillers, searchTerm, country);
                setDoSearch(false);
            }
        },
        300,
        [isLoading, payerId, setBillers, searchTerm, country, setDoSearch, doSearch]);

    if (!billers) return <Loading/>;

    return (
        <BillerSelectionView billers={billers}
                             searchTerm={searchTerm}
                             country={country}
                             setCountry={setCountry}
                             setSearchTerm={setSearchTerm}
                             setDoSearch={setDoSearch}
        />
    );
};

export default withRouter(BillerSelection);
