import React, {useState} from "react";
import DashboardView from "./DashboardView";
import WelcomeCard from "./WelcomeCard";
import ForwardingFailedCard from "./ForwardingFailedCard";
import BillsAwaitingDownloadCard from "./BillsAwaitingDownloadCard";
import Loading from "../Loading";
import {useAppState} from "../../state";
import RecentBillsCard from "./RecentBillsCard";
import InvoiceDueCard from "./InvoiceDueCard";
import RecentPayrollDocumentsCard from "./RecentPayrollDocumentsCard";
import InvoiceDownloadCard from "./InvoiceDownloadCard";
import ForwardingActionRequiredCard from "./ForwardingActionRequiredCard";

const Dashboard = () => {
    //add a Loading State for each banner card
    const [{biller}] = useAppState();
    const [isWelcomeCardLoading, setIsWelcomeCardLoading] = useState(true);
    const [isInvoiceDueCardLoading, setIsInvoiceDueCardLoading] = useState(true);
    const [isForwardingFailedCardLoading, setForwardingFailedCardLoading] = useState(true);
    const [isForwardingActionRequiredCardLoading, setForwardingActionRequiredCardLoading] = useState(true);
    const [isBillsAwaitingDownloadCardLoading, setBillsAwaitingDownloadCardLoading] = useState(true);
    const [isInvoiceDownloadCardLoading, setIsInvoiceDownloadCardLoading] = useState(true);
    return (
        <DashboardView bodyCards={[RecentBillsCard, RecentPayrollDocumentsCard]}>
            {/*this will be a chain of OR statements for each banner card*/}
            {(isWelcomeCardLoading || isForwardingFailedCardLoading || isForwardingActionRequiredCardLoading || isBillsAwaitingDownloadCardLoading ||
                isInvoiceDueCardLoading || isInvoiceDownloadCardLoading)
            && <Loading/>}
            <WelcomeCard billerId={biller.id} setIsLoading={setIsWelcomeCardLoading}/>
            <InvoiceDownloadCard billerId={biller.id} setIsLoading={setIsInvoiceDownloadCardLoading}/>
            <ForwardingFailedCard billerId={biller.id} setIsLoading={setForwardingFailedCardLoading}/>
            <ForwardingActionRequiredCard billerId={biller.id} setIsLoading={setForwardingActionRequiredCardLoading}/>
            <BillsAwaitingDownloadCard billerId={biller.id} setIsLoading={setBillsAwaitingDownloadCardLoading}/>
            <InvoiceDueCard billerId={biller.id} setIsLoading={setIsInvoiceDueCardLoading}/>

        </DashboardView>
    );
};

export default Dashboard;