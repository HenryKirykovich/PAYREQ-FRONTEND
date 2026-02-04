export const SORT_DIRECTION = {
    asc: "asc",
    desc: "desc"
};

export const BILL_STATUS = {
    draft: "draft",
    ignored: "ignored",
    pendingRegistration: "pending-registration",
    readyForDispatchAwaitingCredit: "ready-for-dispatch-awaiting-credit",
    reviewByBiller: "review-by-biller",
    contactChanged: "contact-changed",
    readyForDispatch: "readyForDispatch",
    dispatched: "dispatched",
    undelivered: "undelivered",
    rejected: "rejected"
};

export const COLUMN_LABELS = {
    billerInvoiceNumber: "bills.tableView.invoiceNumber",
    payerName: "bills.tableView.payerName",
    billerAccountNumber: "bills.tableView.accountNumber",
    amountDue: "bills.tableView.amountDue",
    dueDate: "bills.tableView.dueDate",
    receivedTime: "bills.tableView.receivedTime",
    sendToPrinter: "bills.tableView.deliveryMethod",
    documentPages: "bills.tableView.pages",
    firstActionedTime: "bills.tableView.sentTime",
    numPayersSentTo: "bills.tableView.recipients",
    numPayersFailed: "bills.tableView.failed",
    jobId: "bills.tableView.jobId",
    status: "bills.tableView.status"
};
