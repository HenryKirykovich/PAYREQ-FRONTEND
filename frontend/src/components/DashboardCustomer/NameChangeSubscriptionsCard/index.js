import React, {useEffect, useState} from "react";
import axios from "axios";

import NameChangeConnectionsCardView from "./NameChangeSubscriptionsCardView";

const getRegistrations = (setIsLoading, setHasNameChangeConnections, setCount, billerId) => {
    axios.get("/data/registrations/counts", {params: {billerId: billerId}})
        .then(({data}) => {
            if (data.counts){
                const relevantConnections = (data.counts.contactChanged || 0);
                setHasNameChangeConnections(relevantConnections > 0);
                setCount(relevantConnections);
            }
            setIsLoading(false);
        });
};

const NameChangeConnectionsCard = ({billerId, setIsLoading}) => {
    const [hasNameChangeConnections, setHasNameChangeConnections] = useState(false);
    const [count, setCount] = useState();

    useEffect(() => {
        getRegistrations(setIsLoading, setHasNameChangeConnections, setCount, billerId);
    }, [setIsLoading, setHasNameChangeConnections, setCount, billerId]);

    if (hasNameChangeConnections) return <NameChangeConnectionsCardView billerId={billerId} count={count}/>;

    return null;
};

export default NameChangeConnectionsCard;
