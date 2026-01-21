import React, {useEffect, useState} from "react";
import axios from "axios";

import ForwardingActionRequiredCardView from "./ForwardingActionRequiredCardView";


const getInvoicesRequiringActionForForwarding = (setIsLoading, setHasNoInvoicesRequiringActionForForwarding, setCount, billerId) => {
    axios.get("/data/invoices/" + billerId +"/forwarding/count-action-required")
        .then(({data}) => {
            const count = data.success ? data.count : 0;
            setCount(count);
            setHasNoInvoicesRequiringActionForForwarding(count === 0);
            setIsLoading(false);
        });
};

const ForwardingActionRequiredCard = ({billerId, setIsLoading}) => {
    const [hasNoInvoicesRequiringActionForForwarding, setHasNoInvoicesRequiringActionForForwarding] = useState(true);
    const [count, setCount] = useState(true);

    useEffect(() => {
        getInvoicesRequiringActionForForwarding(setIsLoading, setHasNoInvoicesRequiringActionForForwarding, setCount, billerId);
    }, [setIsLoading, setHasNoInvoicesRequiringActionForForwarding, setCount, billerId]);

    if (hasNoInvoicesRequiringActionForForwarding) return null;
    return <ForwardingActionRequiredCardView billerId={billerId} count={count}/>;

};

export default ForwardingActionRequiredCard;