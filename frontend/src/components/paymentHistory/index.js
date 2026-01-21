import React, {useCallback, useEffect, useRef, useState} from "react";
import {withRouter} from "react-router-dom";
import PaymentHistoryView from "./PaymentHistoryView";
import axios from "axios";
import {useDebouncedEffect} from "../../utils/form-utils";
import Loading from "../Loading";
import {SET_PAYMENT_HISTORY_SEARCH_PARAMS} from "../../state/reducers/paymentHistoryReducer";
import {useAppState} from "../../state";

const PAYMENT_HISTORY_PAGE_SIZE = 20;
const FIRST_PAGE = 1;

let currentSearchTerm;

const search = (payments, setPayments, billerId, searchTerm, page, setDoSearch, setHasMore, dispatch) => {
    currentSearchTerm = searchTerm;

    dispatch({
        type: SET_PAYMENT_HISTORY_SEARCH_PARAMS,
        searchParams: {searchTerm: searchTerm}
    });

    axios.get(`/data/payment-history/${billerId}`,
        {params: {search: searchTerm, page: page, limit: PAYMENT_HISTORY_PAGE_SIZE}})
        .then(({data}) => {
            if (page === 1 && data.meta.search === currentSearchTerm){
                setPayments(data.payments);
            } else if (data.meta.search === currentSearchTerm) {
                setPayments([...payments, ...data.payments]);
            }
            setHasMore(data.meta.total === PAYMENT_HISTORY_PAGE_SIZE);
            setDoSearch(false);
        });
}

const getInitialPaymentHistory = (billerId, searchTerm, setPayments, setIsLoading, setHasMore) => {
    axios.get(`/data/payment-history/${billerId}`,
        {params: {search: searchTerm, page: FIRST_PAGE, limit: PAYMENT_HISTORY_PAGE_SIZE}})
        .then(({data}) => {
            setPayments(data.payments);
            setHasMore(data.meta.total === PAYMENT_HISTORY_PAGE_SIZE);
        })
        .finally(() => setIsLoading(false));
}

const PaymentHistory = ({billerId}) => {
    const [{paymentHistory},dispatch] = useAppState();
    const [payments, setPayments] = useState([]);
    const [searchTerm, setSearchTerm] = useState(paymentHistory.searchParams.searchTerm || "");
    const [doSearch, setDoSearch] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [page, setPage] = useState(FIRST_PAGE);
    const [hasMore, setHasMore] = useState(false);



    useEffect( () => {
            if (isInitialLoad) {
                getInitialPaymentHistory(billerId, searchTerm, setPayments, setIsInitialLoad, setHasMore)
            }
        },
        [billerId, searchTerm, setPayments, isInitialLoad, setIsInitialLoad, setHasMore])

    useDebouncedEffect(
        () => {
            if (!isInitialLoad && doSearch) {
                search(payments, setPayments, billerId, searchTerm, page, setDoSearch, setHasMore, dispatch);
            }
        },
        300,
        [isInitialLoad, setPayments, billerId, searchTerm, setDoSearch, setHasMore, doSearch, dispatch]);

    const observer = useRef(); // (*)
    const lastElementRef = useCallback(  // (*)
        (node) => {
            if (isInitialLoad) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                    setDoSearch(true);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isInitialLoad, hasMore, observer]
    );

    if (isInitialLoad) return <Loading/>;

    return (
        <React.Fragment>
            <PaymentHistoryView payments={payments} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                setDoSearch={setDoSearch} setPage={setPage} lastElementRef={lastElementRef}/>
            {!isInitialLoad && doSearch && page > 1 && <Loading/>}
        </React.Fragment>
    )
}

export default withRouter(PaymentHistory);
