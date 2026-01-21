import {injectIntl} from "react-intl";

const JobDescription = ({id, description, intl}) => {
    const values = {filename: `${id}.zip`}
    switch(description) {
      case 'download_one':
          return intl.formatMessage({id: 'job.description.download_one'}, values);
      case 'download_10mb':
          return intl.formatMessage({id: 'job.description.download_10mb'}, values);
      case 'download_bills':
          return intl.formatMessage({id: 'job.description.download_bills'}, values);
      case 'download':
          return intl.formatMessage({id: 'job.description.download'}, values);
      case 'prepare_download_email':
          return intl.formatMessage({id: 'job.description.prepare_download_email'}, values);
      case 'prepare_download':
          return intl.formatMessage({id: 'job.description.prepare_download'}, values);
      default:
          return description;
    };
};

export default injectIntl(JobDescription);
