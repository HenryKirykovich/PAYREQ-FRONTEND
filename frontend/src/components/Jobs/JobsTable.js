import React from "react";
import {injectIntl} from "react-intl";
import {Table, Label, LinkButton} from "../common";
import styles from "./JobsTable.module.scss";
import JobDescription from './JobDescription';
import {getPayreqDateAsFormatted} from '../../utils/date-utils'

const JobStatusLabel = ({status}) => {
    switch (status){
      case 'in-progress':
          return <Label type={Label.WARNING} text="job.details.inProgress"></Label>;
      case 'done':
            return <Label type={Label.SUCCESS} text="job.details.done"></Label>;
      case 'pending-file':
          return <Label type={Label.WARNING} text="job.details.pendingFile"></Label>;
      default:
          return <Label type={Label.DANGER} text="job.details.error"></Label>;
    }
};

const JobsTable = ({jobs, intl}) => {
    return <Table>
               <thead>
                   <tr className="small">
                       <th>ID</th>
                       <th>{intl.formatMessage({id: "job.details.type"})}</th>
                       <th>{intl.formatMessage({id: "job.details.started"})}</th>
                       <th>{intl.formatMessage({id: "job.details.ended"})}</th>
                       <th>{intl.formatMessage({id: "job.details.campaignName"})}</th>
                       <th>{intl.formatMessage({id: "job.details.documentType"})}</th>
                       <th>{intl.formatMessage({id: "job.details.description"})}</th>
                       <th>{intl.formatMessage({id: "job.details.status"})}</th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   {jobs.map((job, idx) => (
                       <tr key={idx}
                           className={styles.row}
                           onClick={event => window.open(`/portal/customer/biller/${job.billerActorId}/job/${job.id}`, (event.metaKey || event.ctrlKey) ? "_blank" : "_self")}
                           aria-label={job.billerCustomerNumber}>
                           <td>{job.id}</td>
                           <td>{job.type}</td>
                           <td>{job.startDate && getPayreqDateAsFormatted(job.startDate)}</td>
                           <td>{job.endDate && getPayreqDateAsFormatted(job.endDate)}</td>
                           <td>{job.campaignName}</td>
                           <td>{job.campaignDocumentType}</td>
                           <td><JobDescription id={job.id} description={job.description}/></td>
                           <td><JobStatusLabel status={job.status}/></td>
                           <td><LinkButton icon="glyphicon glyphicon-file"
                                           linkTo={`./job-result/${job.id}`}/></td>
                       </tr>
                   ))}
               </tbody>
           </Table>;
};

export default injectIntl(JobsTable);
