import React, {useEffect, useState} from "react";
import axios from "axios";

import NameChangeSubscriptionsCardView from "./NameChangeSubscriptionsCardView";

const getRegistrations = (setIsLoading, setHasNameChangeSubscriptions, setCount, billerId) => {
    axios.get("/data/registrations/counts", {params: {billerId: billerId}})
        .then(({data}) => {
            if (data.counts){
                const relevantSubscriptions = (data.counts.contactChanged || 0);
                setHasNameChangeSubscriptions(relevantSubscriptions > 0);
                setCount(relevantSubscriptions);
            }
            setIsLoading(false);
        });
};

const NameChangeSubscriptionsCard = ({billerId, setIsLoading}) => {
    const [hasNameChangeSubscriptions, setHasNameChangeSubscriptions] = useState(false);
    const [count, setCount] = useState();

    useEffect(() => {
        getRegistrations(setIsLoading, setHasNameChangeSubscriptions, setCount, billerId);
    }, [setIsLoading, setHasNameChangeSubscriptions, setCount, billerId]);

    if (hasNameChangeSubscriptions) return <NameChangeSubscriptionsCardView billerId={billerId} count={count}/>;

    return null;
};

export default NameChangeSubscriptionsCard;
