import React, {useEffect, useState} from "react";
import axios from "axios";

import {useAppState} from "../../../state";
import RecentBillsCardView from "./RecentBillsCardView";

const getRecentBills = (setIsLoading, setRecentBills, billerId) => {
    axios.get("/data/invoices",
        {params: {billerId: billerId, pageNumber: 1, type: "all", documentType: "invoice-and-reminder", sortDirection: "desc", sortOrder:"receivedTime"}})
        .then(({data}) => {
            setRecentBills(data.invoices);
            setIsLoading(false);
        });
};

const RecentBillsCard = ({billerId}) => {
    const [{biller}] = useAppState();
    const [recentBills, setRecentBills] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRecentBills(setIsLoading, setRecentBills, biller.id);
    }, [setIsLoading, setRecentBills, biller.id]);

    if (isLoading) return null;
    return <RecentBillsCardView bills={recentBills} billerId={biller.id}/>
};

export default RecentBillsCard;