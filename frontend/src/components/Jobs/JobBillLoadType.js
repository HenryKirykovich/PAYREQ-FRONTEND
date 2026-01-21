import {injectIntl} from "react-intl";

const JobBillLoadType = ({billLoadType, intl}) => {
    switch(billLoadType) {
      case 'ARCHIVE':
          return intl.formatMessage({id: "job.details.billLoadType.archive"});
      case 'HISTORICAL':
          return intl.formatMessage({id: "job.details.billLoadType.historical"});
      case 'STANDARD':
          return intl.formatMessage({id: "job.details.billLoadType.standard"});
      default:
          return intl.formatMessage({id: "job.details.billLoadType.standard"});
    };
};

export default injectIntl(JobBillLoadType);
