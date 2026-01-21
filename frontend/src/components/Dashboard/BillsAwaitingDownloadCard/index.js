import React, {useEffect, useState} from "react";
import axios from "axios";

import BillsAwaitingDownloadCardView from "./BillsAwaitingDownloadCardView";


const getInvoicesAwaitingDownload = (setIsLoading, setCount, billerId) => {
    axios.get("/data/invoices/" + billerId +"/download/count")
        .then(
            ({data}) => setCount(data.success ? data.count : 0)
        )
        .finally(
            () => setIsLoading(false)
        );
};

const BillsAwaitingDownloadCard = ({billerId, setIsLoading}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        getInvoicesAwaitingDownload(setIsLoading, setCount, billerId);
    }, [setIsLoading, setCount, billerId]);

    if (count === 0) return null;
    return <BillsAwaitingDownloadCardView billerId={billerId} count={count}/>;

};

export default BillsAwaitingDownloadCard;