import {injectIntl} from "react-intl";

const JobStatus = ({status, intl}) => {
    switch(status) {
      case 'done':
          return intl.formatMessage({id: "job.details.done"});
      case 'in-progress':
          return intl.formatMessage({id: "job.details.inProgress"});
      case 'pending-file':
          return intl.formatMessage({id: "job.details.pendingFile"});
      default:
          return intl.formatMessage({id: "job.details.error"});
    };
};

export default injectIntl(JobStatus);
