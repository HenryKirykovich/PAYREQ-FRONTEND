import React, {useEffect, useState} from "react";
import axios from "axios";
import BillsView from "./BillsView";
import {useAppState} from "../../state";

const PAGE_SIZE = 50;

const Bills = ({billerId, match}) => {
    const [{biller}] = useAppState();
    const [bills, setBills] = useState([]);
    const [total, setTotal] = useState(0);
    const [searchParams, setSearchParams] = useState({
        pageNumber: 1,
        sortOrder: "receivedTime",
        sortDirection: "desc",
        searchTerm: "",
        status: "dispatched",
        fromDate: "",
        toDate: "",
        exactSearch: false,
        exactSearchJobId: false
    });
    const [isLoading, setIsLoading] = useState(true);

    const fetchBills = (params, setSubmitting, pageNumber = 1) => {
        setIsLoading(true);
        if (setSubmitting) setSubmitting(true);

        const queryParams = {
            billerId: billerId,
            pageSize: PAGE_SIZE,
            pageNumber: pageNumber,
            sortOrder: params.sortOrder || "receivedTime",
            sortDirection: params.sortDirection || "desc",
            ...params
        };

        // Clean up empty params
        Object.keys(queryParams).forEach(key => {
            if (queryParams[key] === "" || queryParams[key] === null || queryParams[key] === undefined) {
                delete queryParams[key];
            }
        });

        axios.get("/data/bills", { params: queryParams })
            .then(({data}) => {
                setBills(data.bills || []);
                setTotal(data.meta?.total || 0);
                setSearchParams({...params, pageNumber});
                setIsLoading(false);
                if (setSubmitting) setSubmitting(false);
            })
            .catch(error => {
                console.error("Error fetching bills:", error);
                setIsLoading(false);
                if (setSubmitting) setSubmitting(false);
            });
    };

    useEffect(() => {
        if (billerId) {
            fetchBills(searchParams, null, 1);
        }
    }, [billerId]);

    const handleSearch = (values, setSubmitting, pageNumber) => {
        fetchBills(values, setSubmitting, pageNumber);
    };

    const handleUploadClick = () => {
        // TODO: Implement upload modal
        alert("Upload functionality to be implemented");
    };

    const showing = [
        (searchParams.pageNumber - 1) * PAGE_SIZE + 1,
        Math.min(searchParams.pageNumber * PAGE_SIZE, total)
    ];

    if (isLoading && bills.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <BillsView
            bills={bills}
            total={total}
            showing={showing}
            handleSearch={handleSearch}
            searchParams={searchParams}
            biller={biller}
            canUpload={biller?.permissions?.canUploadBills}
            onUploadClick={handleUploadClick}
        />
    );
};

export default Bills;
