import React, {useEffect, useState} from "react";
import axios from "axios";

import WelcomeCardView from "./WelcomeCardView";
import {useAppState} from "../../../state";
import XeroWelcomeCardView from "./XeroWelcomeCardView";

const getRegistrations = (setIsLoading, setHasRegistrations, billerId) => {
    axios.get("/data/payerregistrations/counts", {params: {billerId: billerId}})
        .then(({data}) => {
            const relevantRegistrations = (data.pending || 0) + (data.active || 0);
            setHasRegistrations(relevantRegistrations > 0);
            setIsLoading(false);
        });
};

const WelcomeCard = ({billerId, setIsLoading}) => {
    const [hasRegistrations, setHasRegistrations] = useState(true);
    const [{user}] = useAppState();

    useEffect(() => {
        getRegistrations(setIsLoading, setHasRegistrations, billerId);
    }, [setIsLoading, setHasRegistrations, billerId]);

    if (hasRegistrations) return null;
    if (user.ssoXero ===true) return <XeroWelcomeCardView billerId={billerId}/>;
    return <WelcomeCardView billerId={billerId}/>
};

export default WelcomeCard;
