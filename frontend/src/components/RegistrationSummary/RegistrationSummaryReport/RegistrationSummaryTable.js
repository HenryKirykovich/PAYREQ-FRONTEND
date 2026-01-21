import React from "react";
import {injectIntl} from "react-intl";
import {Table, SecondaryButton} from "../../common";
import {CSVLink} from "react-csv";

const knownChannels = [
  'bpv',
  'epost',
  'email',
  'fastformemail',
  'manualemail',
  'xeroconnect',
  'myob',
  'mybillsagent',
  'mybills',
  'reckon',
  'einvoicing',
  'archive'
];

function getChannel(intl, channel){
  if (knownChannels.includes(channel)) {
    return intl.formatMessage({id: "registrations.delivery.channel." + channel});
  }
  return intl.formatMessage({id: "registrations.delivery.channel.other"});
};

function RegistrationSummaryTable({reportRows, intl}){
    if (reportRows.length === 0) return null;
    const displayReportRows = reportRows.map(e => ({
      ...e,
      displayChannel: getChannel(intl, e['channelPartnerSystemId'])
    }));
    const displayReportRowsValues = displayReportRows.map(({displayChannel, pending, active, deregister, deregistered, failed, total}) => {
      return [
        displayChannel, pending, active, deregister, deregistered, failed, total
      ];
    })
    return (
        <React.Fragment>
            <Table
                headerLabels={[
                    "reports.registrationsummary.channel",
                    "reports.registrationsummary.pending",
                    "reports.registrationsummary.active",
                    "reports.registrationsummary.deregister",
                    "reports.registrationsummary.deregistered",
                    "reports.registrationsummary.failed",
                    "reports.registrationsummary.total",
                ]}
                rows={displayReportRowsValues}
                footer={
                    [" Total",
                        displayReportRows.reduce((a, {pending}) => a + pending, 0),
                        displayReportRows.reduce((a, {active}) => a + active, 0),
                        displayReportRows.reduce((a, {deregister}) => a + deregister, 0),
                        displayReportRows.reduce((a, {deregistered}) => a + deregistered, 0),
                        displayReportRows.reduce((a, {failed}) => a + failed, 0),
                        displayReportRows.reduce((a, {total}) => a + total, 0)
                    ]}
            >
            </Table>
            <CSVLink
                filename={`registration-summary-report-${new Date().getTime()}.csv`}
                data={displayReportRows}
                headers={[
                    {label: intl.formatMessage({id: "reports.registrationsummary.channel"}), key: "displayChannel"},
                    {label: intl.formatMessage({id: "reports.registrationsummary.pending"}), key: "pending"},
                    {label: intl.formatMessage({id: "reports.registrationsummary.active"}), key: "active"},
                    {label: intl.formatMessage({id: "reports.registrationsummary.deregister"}), key: "deregister"},
                    {label: intl.formatMessage({id: "reports.registrationsummary.deregistered"}), key: "deregistered"},
                    {label: intl.formatMessage({id: "reports.registrationsummary.failed"}), key: "failed"},
                    {label: intl.formatMessage({id: "reports.registrationsummary.total"}), key: "total"}
                ]}>
                <SecondaryButton label="generic.download" icon="download"/>
            </CSVLink>
        </React.Fragment>
    )
};


export default injectIntl(RegistrationSummaryTable);

