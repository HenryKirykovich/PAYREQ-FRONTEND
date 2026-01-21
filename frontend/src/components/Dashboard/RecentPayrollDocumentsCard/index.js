import React, {useEffect, useState} from "react";
import axios from "axios";

import {useAppState} from "../../../state";
import RecentPayrollDocumentsCardView from "./RecentPayrollDocumentsCardView";

const getRecentPayrollDocuments = (setIsLoading, setRecentPayrollDocuments, billerId) => {
    axios.get("/data/invoices",
        {params: {billerId: billerId, pageNumber: 1, type: "all", documentType: "payroll", sortDirection: "desc", sortOrder:"receivedTime"}})
        .then(({data}) => {
            setRecentPayrollDocuments(data.invoices);
            setIsLoading(false);
        });
};

const RecentPayrollDocumentsCard = ({billerId}) => {
    const [{biller}] = useAppState();
    const [recentPayrollDocuments, setRecentPayrollDocuments] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRecentPayrollDocuments(setIsLoading, setRecentPayrollDocuments, biller.id);
    }, [setIsLoading, setRecentPayrollDocuments, biller.id]);

    if (isLoading) return null;
    return <RecentPayrollDocumentsCardView documents={recentPayrollDocuments} billerId={biller.id}/>
};

export default RecentPayrollDocumentsCard;