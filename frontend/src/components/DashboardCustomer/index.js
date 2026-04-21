import React, {useState} from "react";
import DashboardView from "../Dashboard/DashboardView";
import Loading from "../Loading";
import {useAppState} from "../../state";
import PendingConnectionsCard from "./PendingSubscriptionsCard";
import NameChangeConnectionsCard from "./NameChangeSubscriptionsCard";
import UndeliveredDocumentsCard from "./DocumentStatusActionCards";
import SupportDetailsCard from "./SupportDetailsCard";
import StatsCard from "./StatsCard";

const DashboardCustomer = () => {
    //add a Loading State for each banner card
    const [{biller}] = useAppState();
    const [isPendingConnectionCardLoading, setIsPendingConnectionCardLoading] = useState(true);
    const [isNameChangeConnectionCardLoading, setIsNameChangeConnectionCardLoading] = useState(true);
    const [isDocumentsCardsLoading, setIsDocumentsCardsLoading] = useState(true);

    const isAnyCardLoading = (isPendingConnectionCardLoading || isNameChangeConnectionCardLoading || isDocumentsCardsLoading);
    return (
        <DashboardView bodyCards={[StatsCard, SupportDetailsCard]}>
            {isAnyCardLoading && <Loading/>}
            <PendingConnectionsCard billerId={biller.id} setIsLoading={setIsPendingConnectionCardLoading}/>
            <NameChangeConnectionsCard billerId={biller.id} setIsLoading={setIsNameChangeConnectionCardLoading}/>
            <UndeliveredDocumentsCard billerId={biller.id} setIsLoading={setIsDocumentsCardsLoading}/>

        </DashboardView>
    );
};

export default DashboardCustomer;
