import React, {useEffect, useState} from "react";
import axios from "axios";

import FailedForwardingCardView from "./ForwardingFailedCardView";


const getInvoicesFailedForwarding = (setIsLoading, setHasNoInvoicesFailedForwarding, setCount, billerId) => {
    axios.get("/data/invoices/" + billerId +"/forwarding/count-failed")
        .then(({data}) => {
            var count = data.success ? data.count : 0;
            setCount(count);
            setHasNoInvoicesFailedForwarding(count === 0);
            setIsLoading(false);
        });
};

const ForwardingFailedCard = ({billerId, setIsLoading}) => {
    const [hasNoInvoicesFailedForwarding, setHasNoInvoicesFailedForwarding] = useState(true);
    const [count, setCount] = useState(true);

    useEffect(() => {
        getInvoicesFailedForwarding(setIsLoading, setHasNoInvoicesFailedForwarding, setCount, billerId);
    }, [setIsLoading, setHasNoInvoicesFailedForwarding, setCount, billerId]);

    if (hasNoInvoicesFailedForwarding) return null;
    return <FailedForwardingCardView billerId={billerId} count={count}/>;

};

export default ForwardingFailedCard;