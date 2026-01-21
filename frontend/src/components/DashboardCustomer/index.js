import React, {useState} from "react";
import DashboardView from "../Dashboard/DashboardView";
import Loading from "../Loading";
import {useAppState} from "../../state";
import PendingSubscriptionsCard from "./PendingSubscriptionsCard";
import NameChangeSubscriptionsCard from "./NameChangeSubscriptionsCard";
import UndeliveredDocumentsCard from "./DocumentStatusActionCards";
import SupportDetailsCard from "./SupportDetailsCard";
import StatsCard from "./StatsCard";

const DashboardCustomer = () => {
    //add a Loading State for each banner card
    const [{biller}] = useAppState();
    const [isPendingSubscriptionCardLoading, setIsPendingSubscriptionCardLoading] = useState(true);
    const [isNameChangeSubscriptionCardLoading, setIsNameChangeSubscriptionCardLoading] = useState(true);
    const [isDocumentsCardsLoading, setIsDocumentsCardsLoading] = useState(true);

    const isAnyCardLoading = (isPendingSubscriptionCardLoading || isNameChangeSubscriptionCardLoading || isDocumentsCardsLoading);
    return (
        <DashboardView bodyCards={[StatsCard, SupportDetailsCard]}>
            {isAnyCardLoading && <Loading/>}
            <PendingSubscriptionsCard billerId={biller.id} setIsLoading={setIsPendingSubscriptionCardLoading}/>
            <NameChangeSubscriptionsCard billerId={biller.id} setIsLoading={setIsNameChangeSubscriptionCardLoading}/>
            <UndeliveredDocumentsCard billerId={biller.id} setIsLoading={setIsDocumentsCardsLoading}/>

        </DashboardView>
    );
};

export default DashboardCustomer;
