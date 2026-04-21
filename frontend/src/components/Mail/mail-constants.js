
export const MAIL_STATUS_ALL = "all";
export const MAIL_STATUS_ERROR = "draft"; //Error status is draft to match existing backend map bill-status in codes.clj
export const MAIL_STATUS_REVIEW = "review-by-biller";
export const MAIL_STATUS_AWAITING_CREDITS = "ready-for-dispatch-awaiting-credit";
export const MAIL_STATUS_CONTACT_CHANGED = "contact-changed";
export const MAIL_STATUS_QUEUED = "ready-for-dispatch";
export const MAIL_STATUS_SENT = "dispatched";
export const MAIL_STATUS_NOT_DELIVERED = "undelivered";
export const MAIL_STATUS_NOT_DELIVERED_ACTIONED = "undelivered-actioned";
export const MAIL_STATUS_ARCHIVED = "ready-for-dispatch-archived";
export const MAIL_STATUS_PENDING_CONNECTION = "pending-registration";
export const MAIL_STATUS_IGNORED = "ignored";

export const MAIL_STATUS_OPTIONS = [
    {value: MAIL_STATUS_ALL, label: "generic.allStatuses"},
    {value: MAIL_STATUS_ARCHIVED, label: "mail.view.mailStatus.status.archived"},
    {value: MAIL_STATUS_AWAITING_CREDITS, label: "mail.view.mailStatus.status.awaitingCredits"},
    {value: MAIL_STATUS_REVIEW, label: "mail.view.mailStatus.status.awaitingReview"},
    {value: MAIL_STATUS_ERROR, label: "mail.view.mailStatus.status.error"},
    {value: MAIL_STATUS_CONTACT_CHANGED, label: "mail.view.mailStatus.status.contactChanged"},
    {value: MAIL_STATUS_PENDING_CONNECTION, label: "mail.view.mailStatus.status.pendingRegistration"},
    {value: MAIL_STATUS_QUEUED, label: "mail.view.mailStatus.status.readyForDispatch"},
    {value: MAIL_STATUS_SENT, label: "mail.view.mailStatus.status.sent"},
    {value: MAIL_STATUS_NOT_DELIVERED, label: "mail.view.mailStatus.status.undelivered"},
    {value: MAIL_STATUS_NOT_DELIVERED_ACTIONED, label: "mail.view.mailStatus.status.undeliveredActioned"},
];

export const BILL_FORMAT_ALL = "-1";

export const PAYROLL_MAIL_FORMAT_TYPE_PAYSTUB = "paystatement";
export const PAYROLL_MAIL_FORMAT_TYPE_NON_PAYSTUB = "payt4";

export const MAIL_UPLOAD_CONTACT_ADD = "add";
export const MAIL_UPLOAD_CONTACT_IGNORE = "ignore";
export const MAIL_UPLOAD_CONTACT_OPTIONS = [
    {value: MAIL_UPLOAD_CONTACT_ADD, label: "mail.uploadMail.contactOption.add"},
    {value: "replace", label:"mail.uploadMail.contactOption.replace"},
    {value: MAIL_UPLOAD_CONTACT_IGNORE, label:"mail.uploadMail.contactOption.ignore"},
    {value: "add-no-bills", label:"mail.uploadMail.contactOption.addNoBills"},
    {value: "replace-no-bills", label:"mail.uploadMail.contactOption.replaceNoBills"}];

export const MAIL_UPLOAD_BILL_LOAD_TYPE_HISTORICAL = "HISTORICAL";
export const MAIL_UPLOAD_BILL_LOAD_TYPE_STANDARD = "STANDARD";
export const MAIL_UPLOAD_BILL_LOAD_TYPE_OPTIONS = [
    {value: MAIL_UPLOAD_BILL_LOAD_TYPE_STANDARD, label: "mail.uploadMail.billLoadTypeOption.standard"},
    {value: "ARCHIVE", label: "mail.uploadMail.billLoadTypeOption.archive"},
    {value: MAIL_UPLOAD_BILL_LOAD_TYPE_HISTORICAL, label: "mail.uploadMail.billLoadTypeOption.historical"}];

export const CONSUMER_COMMUNICATION_MAIL_TEMPLATE = "consumer_comms";
