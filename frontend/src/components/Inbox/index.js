import React, {useEffect, useState} from "react";
import InboxView from "./InboxView";
import axios from "axios";
import {useAppState} from "../../state";
import Loading from "../Loading";
import {SET_INBOX_SEARCH_PARAMS, SET_INBOX_VIEW} from "../../state/reducers/inboxReducer";
import {getQueryParams} from "../../utils/route-utils";
import {VIEWS} from "./inbox-constants";
import {timeInUTC} from "../../utils/date-utils";

const getInitialPageNumber = pageNumber => pageNumber || 1;

const getInvoices = (billerId,
                     {
                         searchTerm,
                         paymentStatus,
                         downloadStatus,
                         forwardingStatus,
                         documentType,
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
        downloadStatus: downloadStatus || "all",
        forwardingStatus: forwardingStatus || "all",
        documentType: documentType || "all",
        paymentStatus: paymentStatus || "all",
        sortDirection: sortDirection || "desc",
        sortOrder: sortOrder || "receivedTime",
        type: "all"
    };

    dispatch({
        type: SET_INBOX_SEARCH_PARAMS,
        searchParams: params
    });

    axios.get("/data/invoices", {
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
const setInitialSearchParms = (appState, location) => {
    const queryParams = getQueryParams(location);
    if (Object.keys(queryParams).length !== 0) {
        return queryParams;
    }

    return appState.inbox.searchParams;
};

const Inbox = ({biller, location}) => {
    const billerId = biller.id;
    const [results, setResults] = useState();
    const [appState, dispatch] = useAppState();
    const [isInitialSearch, setIsInitialSearch] = useState(true);

    const {
        searchTerm,
        paymentStatus,
        downloadStatus,
        forwardingStatus,
        documentType,
        fromDate,
        toDate,
        pageNumber,
        sortDirection,
        sortOrder
    } = setInitialSearchParms(appState, location)
    useEffect(() => {
            if (isInitialSearch) {
                return getInvoices(
                    billerId,
                    {
                        searchTerm,
                        paymentStatus,
                        downloadStatus,
                        forwardingStatus,
                        documentType,
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
        [billerId, setResults, pageNumber, dispatch, searchTerm, paymentStatus, downloadStatus, forwardingStatus, documentType, fromDate, toDate, isInitialSearch, sortOrder, sortDirection
        ])
    if (!results) return <Loading/>;
    return <InboxView inboxItems={results.invoices}
                      total={results.meta.total}
                      typeCounts={results.meta.typeCounts}
                      downloadLimit={results.meta.downloadLimit}
                      showing={results.meta.showing}
                      searchParams={appState.inbox.searchParams}
                      handleSearch={(values, setSubmitting, pageNumber) => {
                          setIsInitialSearch(false);
                          getInvoices(billerId, values, setSubmitting, setResults, pageNumber, dispatch)
                      }}
                      view={appState.inbox.view || (biller.isCompany ? VIEWS.table : null)}
                      setView={view => dispatch({type: SET_INBOX_VIEW, view})}
                      biller={biller}
    />
}

export default Inbox;
