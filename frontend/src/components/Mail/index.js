import React, {useEffect, useState} from "react";
import {useAppState} from "../../state";
import Loading from "../Loading";
import {getQueryParams} from "../../utils/route-utils";
import {timeInUTC} from "../../utils/date-utils";
import axios from "axios";
import MailView from "./MailView";
import {SET_MAIL_SEARCH_PARAMS} from "../../state/reducers/mailReducer";
import {BILL_FORMAT_ALL} from "./mail-constants";
import {SESSION_STORAGE_KEYS} from "../../utils/session-storage-utils";

const getInitialPageNumber = pageNumber => pageNumber || 1;

const getBills = (billerId,
                     {
                         searchTerm,
                         type,
                         exactSearch,
                         exactSearchJobId,
                         billFormat,
                         fromDate,
                         toDate,
                         sortOrder,
                         sortDirection
                     },
                     setSubmitting,
                     setResults,
                     pageNumber,
                     dispatch
) => {
    setSubmitting && setSubmitting(true);
    const params = {
        billerId,
        pageNumber,
        searchTerm: searchTerm || "",
        fromDate: fromDate,
        toDate: toDate,
        sortDirection: sortDirection || "desc",
        sortOrder: sortOrder || "receivedTime",
        type: type || "all",
        exactSearch: exactSearch || false,
        exactSearchJobId: exactSearchJobId || false,
        billFormat: billFormat || BILL_FORMAT_ALL
    };

    //PREQ-3290: sessionStorage is required until mail details page is moved to react.
    sessionStorage.setItem(SESSION_STORAGE_KEYS.mailSearchParams, JSON.stringify(params));
    dispatch({
         type: SET_MAIL_SEARCH_PARAMS,
         searchParams: params
    });

    axios.get("/data/v2/bills", {
        params: {
            ...params,
            fromDate: timeInUTC(fromDate),
            toDate: timeInUTC(toDate),
        }
    })
        .then(({data}) => {
            setResults(data);
            setSubmitting && setSubmitting(false);
        });
};

/**
 * Query params will reinitialise the search. Otherwise it'll load whatever the last search was
 * @param appState
 * @param location
 * @returns {{}|*}
 */
const setInitialSearchParms = (location) => {
    const queryParams = getQueryParams(location);
    if (Object.keys(queryParams).length !== 0) {
        return queryParams;
    }

    const sessionMailSearchParams = sessionStorage.getItem(SESSION_STORAGE_KEYS.mailSearchParams);
    return sessionMailSearchParams !== null ? JSON.parse(sessionMailSearchParams) : {};
};

const Mail = ({biller, location}) => {
    const billerId = biller.id;
    const [results, setResults] = useState();
    const [appState, dispatch] = useAppState();
    const [isInitialSearch, setIsInitialSearch] = useState(true);

    useEffect(() => {
            if (isInitialSearch) {
                const {
                    searchTerm,
                    type,
                    exactSearch,
                    exactSearchJobId,
                    billFormat,
                    fromDate,
                    toDate,
                    pageNumber,
                    sortDirection,
                    sortOrder
                } = setInitialSearchParms(location);

                return getBills(
                    billerId,
                    {
                        searchTerm,
                        type,
                        exactSearch,
                        exactSearchJobId,
                        billFormat,
                        fromDate,
                        toDate,
                        sortDirection,
                        sortOrder
                    },
                    null,
                    setResults,
                    getInitialPageNumber(pageNumber),
                    dispatch)
            }
        },
        [billerId, setResults, dispatch, location, isInitialSearch])
    if (!results) return <Loading/>;

    return <MailView inboxItems={results.bills}
                     total={results.meta.total}
                     typeCounts={results.meta.typeCounts}
                     downloadLimit={results.meta.downloadLimit}
                     showing={results.meta.showing}
                     billFormats={results.meta.billFormats}
                     approvalCount={results.meta.approvalCount}
                     searchParams={appState.mail.searchParams}
                     possibleDeregistrations={results.meta.possibleDeregistrations}
                     handleSearch={(values, setSubmitting, pageNumber) => {
                         setIsInitialSearch(false);
                         getBills(billerId, values, setSubmitting, setResults, pageNumber, dispatch)
                     }}
                     biller={biller}/>
}

export default Mail;
