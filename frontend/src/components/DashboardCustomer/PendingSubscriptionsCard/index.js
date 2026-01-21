import React, {useEffect, useState} from "react";
import axios from "axios";

import PendingSubscriptionsCardView from "./PendingSubscriptionsCardView";

const getRegistrations = (setIsLoading, setHasPendingSubscriptions, setCount, billerId) => {
    axios.get("/data/registrations/counts", {params: {billerId: billerId}})
        .then(({data}) => {
            if (data.counts){
                const relevantSubscriptions = (data.counts.pendingFailed || 0);
                setHasPendingSubscriptions(relevantSubscriptions > 0);
                setCount(relevantSubscriptions);
            }
            setIsLoading(false);
        });
};

const PendingSubscriptionsCard = ({billerId, setIsLoading}) => {
    const [hasPendingSubscriptions, setHasPendingSubscriptions] = useState(false);
    const [count, setCount] = useState();

    useEffect(() => {
        getRegistrations(setIsLoading, setHasPendingSubscriptions, setCount, billerId);
    }, [setIsLoading, setHasPendingSubscriptions, setCount, billerId]);

    if (hasPendingSubscriptions) return <PendingSubscriptionsCardView billerId={billerId} count={count}/>;

    return null;
};

export default PendingSubscriptionsCard;
