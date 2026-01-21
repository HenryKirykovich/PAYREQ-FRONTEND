import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import fileDownload from "js-file-download";
import axios from "axios";
import Loading from "../../Loading";
import BillerRegistrationsView from "./BillerRegistrationsView";
import {SET_REGISTRATION_SEARCH_PARAMS} from "../../../state/reducers/registrationsReducer";
import {useAppState} from "../../../state";

const getInitialPageNumber = pageNumber => pageNumber || 1;

const getRegistrationsForBiller = (payerId,
                                   {searchTerm, fromDate, toDate, status},
                                   setSubmitting,
                                   registrationsForBillerId,
                                   pageNumber,
                                   setResults,
                                   dispatch) => {
    setSubmitting && setSubmitting(true);
    const params = {
        payerId,
        registrationsForBillerId,
        pageNumber,
        status: status === "all" || !status ? "all" : status,
        searchTerm: searchTerm || "",
        fromDate: fromDate || "",
        toDate: toDate || ""
    };

    dispatch({
        type: SET_REGISTRATION_SEARCH_PARAMS,
        searchParams: params
    });

    axios.get("/data/payerregistrations", {params})
        .then(({data}) => {
            setResults(data.results);
            setSubmitting && setSubmitting(false);
        });
};

const downloadRegistrations = (payerId,
                               billerName,
                               {searchTerm, fromDate, toDate, status},
                               registrationsForBillerId,) => {
    axios.get(
        "/download/payerregistrations/download",
        {
            params: {
                payerId,
                registrationsForBillerId,
                status: status === "all" || !status ? "all" : status,
                searchTerm: searchTerm || "",
                fromDate: fromDate || "",
                toDate: toDate || ""
            }
        })
        .then(({data}) => {
            fileDownload(data, `${billerName}-registrations-` + new Date().toLocaleDateString() + ".csv");
        });
};

const BillerRegistrations = ({payerId, match: {params: {registrationsForBillerId}}}) => {
    const [results, setResults] = useState();
    const [appState, dispatch] = useAppState();
    const [isInitialSearch, setIsInitialSearch] = useState(true);
    const {searchTerm, fromDate, toDate, status, pageNumber} = appState.registrations.searchParams;
    useEffect(
        () => {
            if (isInitialSearch) {
                getRegistrationsForBiller(payerId, {searchTerm, fromDate, toDate, status}, null,
                    registrationsForBillerId, getInitialPageNumber(pageNumber),
                    setResults, () => {
                    })
            }
        },
        [payerId, registrationsForBillerId, setResults, searchTerm, fromDate, toDate, status, pageNumber, isInitialSearch]
    );

    if (!results) return <Loading/>;
    return <BillerRegistrationsView registrations={results.registrations}
                                    searchParams={appState.registrations.searchParams}
                                    payerId={payerId}
                                    biller={results.biller}
                                    total={results.total}
                                    showing={results.showing}
                                    handleDownload={values => downloadRegistrations(payerId, results.biller.tagName, values, registrationsForBillerId)}
                                    handleSearch={(values, setSubmitting, pageNumber) => {
                                        setIsInitialSearch(false);
                                        getRegistrationsForBiller(payerId, values, setSubmitting, registrationsForBillerId, pageNumber, setResults, dispatch)}}
    />
};

export default withRouter(BillerRegistrations);