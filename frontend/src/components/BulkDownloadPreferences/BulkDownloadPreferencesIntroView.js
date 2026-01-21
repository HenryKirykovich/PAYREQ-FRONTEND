import {LargeText, PageHeading, PrimaryButton, SecondaryHeading, Table} from "../common";
import React from "react";
import {injectIntl} from "react-intl";
import {Link} from "react-router-dom";

const Section = ({children}) => (
    <div style={{marginBottom: "3em"}}>
        {children}
    </div>
);

const Row = ({values}) => (
    <tr>
        <td>{values[0]}</td>
        <td>{values[1]}</td>
    </tr>
);

const PropertyMeRecommendation = injectIntl(({intl}) => (
        <span>Individual PDFs or for automatic upload create <Link
            to={"../forwardingRules/view"}>{intl.formatMessage({id: "settings.tab.title.forwardingRules"})}</Link></span>
    )
)

const BulkDownloadPreferencesIntroView = ({intl}) => (
    <div style={{maxWidth: "900px"}}>
        <Section>
            <PageHeading text="settings.bulkDownloadPreferences.pageHeading"/>
            <LargeText text="settings.bulkDownloadPreferences.intro"/>
        </Section>
        <Section>
            <SecondaryHeading text="settings.bulkDownloadPreferences.howItWorks.heading"/>
            <LargeText text="settings.bulkDownloadPreferences.howItWorks.body"/>
        </Section>
        <Section>
            <SecondaryHeading text="settings.bulkDownloadPreferences.optionRecommendations.heading"/>
            <LargeText text="settings.bulkDownloadPreferences.optionRecommendations.body"/>
            <Table>
                <thead>
                <tr>
                    <th>{intl.formatMessage({id: "settings.bulkDownloadPreferences.optionRecommendations.software"})}</th>
                    <th>{intl.formatMessage({id: "settings.bulkDownloadPreferences.optionRecommendations.downloadType"})}</th>
                </tr>
                </thead>
                <tbody>
                <Row values={["Rockend PropertyTree (Invoice Genius)", "Individual PDFs"]}/>
                <Row values={["Rockend REST with Filesmart", "Merged PDF"]}/>
                <Row values={["PropertyMe", <PropertyMeRecommendation/>]}/>
                <Row values={["Console Cloud", "Individual PDFs"]}/>
                <Row values={["Console Gateway", "Merged PDF"]}/>
                </tbody>
            </Table>
        </Section>
        <PrimaryButton label="generic.getStarted" linkTo={{
            pathname: "./edit",
        }}/>
    </div>
);

export default injectIntl(BulkDownloadPreferencesIntroView);