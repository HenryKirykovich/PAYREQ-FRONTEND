import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";

import Loading from "../Loading";
import {useDebouncedEffect} from "../../utils/form-utils";
import {AccountSelectionView} from "./AccountSelectionView";

const ACCOUNT_PAGE_SIZE = 20;

const getInitialBillers = (setIsLoading, setBillers, setHasMore) => {
    setIsLoading(true);
    axios.get("/data/billers",
        {params: {search: '', status: 'active', page: 1, product: 'all'}})
        .then(({data}) => {
            setBillers(data.billers);
            setHasMore(data.meta.total === ACCOUNT_PAGE_SIZE);
            setIsLoading(false);
        });
};

let currentSearchTerm;

const search = (billers, setBillers, searchTerm, page, setDoSearch, setHasMore) => {
    currentSearchTerm = searchTerm;
    axios.get("/data/billers",
        {params: {search: searchTerm, status: 'active', page: page,  product: 'all'}})
        .then(({data}) => {
            if (page === 1 && data.meta.search === currentSearchTerm){
                setBillers(data.billers);
            } else if (data.meta.search === currentSearchTerm) {
                setBillers([...billers, ...data.billers]);
            }
            setHasMore(data.meta.total === ACCOUNT_PAGE_SIZE)
            setDoSearch(false);
        });
};

const AccountSelection = () => {
    const [billers, setBillers] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [doSearch, setDoSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => getInitialBillers(setIsLoading, setBillers, setHasMore), []);

    useDebouncedEffect(
        () => {
            if (!isLoading && doSearch) {
                search(billers, setBillers, searchTerm, page, setDoSearch, setHasMore);
            }
        },
        300,
        [isLoading, setBillers, searchTerm, setDoSearch, setHasMore, doSearch]);

    const observer = useRef(); // (*)
    const lastElementRef = useCallback(  // (*)
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1);
                    setDoSearch(true);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    if (!billers) return <Loading/>;

    return (
        <React.Fragment>
            <AccountSelectionView accounts={billers}
                                  searchTerm={searchTerm}
                                  setSearchTerm={setSearchTerm}
                                  setDoSearch={setDoSearch}
                                  setPage={setPage}
                                  lastElementRef={lastElementRef}
            />
            {!isLoading && doSearch && page > 1 && <Loading/>}
        </React.Fragment>
    );
};

export default withRouter(AccountSelection);
