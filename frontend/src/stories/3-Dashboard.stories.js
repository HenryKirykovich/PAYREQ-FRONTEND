import React, {useEffect, useState} from 'react';
import DashboardView from "../components/Dashboard/DashboardView";
import Loading from "../components/Loading"
import WelcomeCardView from "../components/Dashboard/WelcomeCard/WelcomeCardView";
import DashboardCard from "../components/Dashboard/DashboardView/DashboardCard";
import RecentBillsCardView from "../components/Dashboard/RecentBillsCard/RecentBillsCardView";
import InvoiceDueCardView from "../components/Dashboard/InvoiceDueCard/InvoiceDueCardView";
import InvoiceDownloadCardView from "../components/Dashboard/InvoiceDownloadCard/InvoiceDownloadCardView";

export default {
    title: 'Dashboard',
};

const getRandomInt = max => Math.floor(Math.random() * Math.floor(max));

const ExampleCardBody = () => {
    //example card with loading state
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => setIsLoading(false), getRandomInt(4000));
    }, [setIsLoading]);
    return (
        <DashboardCard panelHeading={"dashboard.exampleCard.heading"}>
            {isLoading ? <Loading/> : <div>Free Card Content</div>}
        </DashboardCard>
    );
};


const ExampleBannerCard = ({sleep, setIsLoadingCallback}) => {
    //example card with loading state
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            console.log("card useEffect");
            setIsLoadingCallback(false);
            setIsLoading(false);
        }, sleep);
    }, [sleep, setIsLoading, setIsLoadingCallback]);
    if (isLoading) return false;
    return <DashboardCard isBannerCard={true} panelHeading={"dashboard.headerCard.heading"}>Header Card</DashboardCard>;
};

export const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingTwo, setIsLoadingTwo] = useState(true);
    console.log("dashboard render");
    return (
        <DashboardView bodyCards={[ExampleCardBody, ExampleCardBody, ExampleCardBody, ExampleCardBody]}>
            {(isLoading || isLoadingTwo) && <Loading/>}
            <ExampleBannerCard sleep={1000} setIsLoadingCallback={setIsLoading}/>
            <ExampleBannerCard sleep={4000} setIsLoadingCallback={setIsLoadingTwo}/>
        </DashboardView>
    );
};

export const dashboardNoHeaderCards = () => <DashboardView
    bodyCards={[ExampleCardBody, ExampleCardBody, ExampleCardBody, ExampleCardBody]}/>;

export const dashboardNoBodyCards = () => (
    <DashboardView
        headerCards={[ExampleBannerCard]}
    />
);

export const welcomeCard = () => <WelcomeCardView billerId={24}/>;

const addDays = days => {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

export const invoiceDueCard = () => <InvoiceDueCardView invoiceId={1} billerId={24} amount={204.00} billerName="Imaginary Council" dueDate={addDays(2)}/>;

export const recentBillsCard = () => (
    <RecentBillsCardView billerId={24} bills={[
        {billerName: "City of Canterbury Bankstown", amountDue: 123.00, dueDate: addDays(-10)},
        {billerName: "Another Council", amountDue: 123.45, dueDate: addDays(30)},
        {billerName: "Really long name imaginary council", amountDue: 23.45, dueDate: addDays(90)},
        {billerName: "Really long name imaginary council", amountDue: 123.00, dueDate: addDays(130)}
    ]}/>
);

export const recentBillsCardWithShowMore = () => (
    <RecentBillsCardView billerId={24} bills={[
        {billerName: "City of Canterbury Bankstown", amountDue: 123.45, dueDate: addDays(-10)},
        {billerName: "Another Council", amountDue: 23.45, dueDate: addDays(10)},
        {billerName: "Really long name imaginary council", amountDue: 123.00, dueDate: addDays(20)},
        {billerName: "Imaginary Council", amountDue: 123.00, dueDate: addDays(30)},
        {billerName: "Imaginary Council", amountDue: 123.00, dueDate: addDays(30)},
        {billerName: "Imaginary Council", amountDue: 123.00, dueDate: addDays(30)},
        {billerName: "Imaginary Council", amountDue: 123.00, dueDate: addDays(30)},
        {billerName: "Imaginary Council", amountDue: 123.00, dueDate: addDays(30)}
    ]}/>
);

export const recentBillsCardNoContent = () => <RecentBillsCardView billerId={24}/>;

export const downloadsCards = () => (
    <div>
        <InvoiceDownloadCardView count={26} billerName="Canterbury Bankstown Council" receivedDate={"2017-11-28T13:00:00.000Z"} documentType={0}/>
        <InvoiceDownloadCardView count={26} billerName="Canterbury Bankstown Council" receivedDate={"2017-11-28T13:00:00.000Z"} documentType={1}/>
        <InvoiceDownloadCardView count={26} billerName="Canterbury Bankstown Council" receivedDate={"2017-11-28T13:00:00.000Z"} documentType={2}/>
        <InvoiceDownloadCardView count={26} billerName="Canterbury Bankstown Council" receivedDate={"2017-11-28T13:00:00.000Z"} documentType={3}/>
    </div>
);