import React, {useEffect, useState} from "react";
import axios from "axios";

import PendingConnectionsCardView from "./PendingSubscriptionsCardView";

const getRegistrations = (setIsLoading, setHasPendingConnections, setCount, billerId) => {
    axios.get("/data/registrations/counts", {params: {billerId: billerId}})
        .then(({data}) => {
            if (data.counts){
                const relevantConnections = (data.counts.pendingFailed || 0);
                setHasPendingConnections(relevantConnections > 0);
                setCount(relevantConnections);
            }
            setIsLoading(false);
        });
};

const PendingConnectionsCard = ({billerId, setIsLoading}) => {
    const [hasPendingConnections, setHasPendingConnections] = useState(false);
    const [count, setCount] = useState();

    useEffect(() => {
        getRegistrations(setIsLoading, setHasPendingConnections, setCount, billerId);
    }, [setIsLoading, setHasPendingConnections, setCount, billerId]);

    if (hasPendingConnections) return <PendingConnectionsCardView billerId={billerId} count={count}/>;

    return null;
};

export default PendingConnectionsCard;
