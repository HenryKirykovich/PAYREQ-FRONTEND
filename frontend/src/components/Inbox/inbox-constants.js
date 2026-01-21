import {Label} from "../common";

export const INVOICE_PAYMENT_STATUS = {
    paid: "paid",
    noPaymentDue: "no-payment-due",
    paymentDue: "payment-due"
};

export const INVOICE_DOWNLOAD_STATUS = {
    downloaded: "downloaded",
    awaitingDownload: "awaiting-download"
};

export const INVOICE_FORWARDING_STATUS = {
    awaitingSent: "awaiting-send",
    failed: "failed",
    awaitingInformation: "awaiting-information",
    sent: "sent",
};

export const DOCUMENT_TYPE = {
    bill: "invoice",
    billReminder: "invoice-reminder",
    letter: "letter",
    peppolInvoice: "peppol-invoice",
    payroll: "payroll"
};

export const INVOICE_AUTO_PAYMENT_STATUS = {
    scheduled: "scheduled",
    aboveLimit: "above-limit",
    failed: "failed"
};

export const INVOICE_DOCUMENT_TYPES = {
    invoice: "invoice",
    payroll: "payroll",
    peppol_invoice: "peppol-invoice",
    peppol_credit_note: "peppol-credit-note",
    letter: "letter",
    invoice_reminder:  "invoice-reminder"
};

export const LABEL_TYPE_BY_STATUS = {
    "payment-due": Label.WARNING,
    "paid": Label.SUCCESS,
    "no-payment-due": Label.DEFAULT,
    "scheduled": Label.INFO,
    "aboveDebitLimit": Label.DANGER,
    "failedAutoPayment": Label.DANGER,
};

export const VIEWS = {cards: "CARDS", table: "TABLE"};

export const SORT_DIRECTION = {asc: "asc", desc: "desc"}

export const getBillStatusText = bill => {
    if (bill.documentType === INVOICE_DOCUMENT_TYPES.invoice && bill.status === 'no-payment-due' && (bill.minAmountDue || bill.amountDue) > 0) {
        return "bill.status." + bill.status + ".directDebit";
    }

    if (bill.status === "paid") {
        return "bill.status.paid";
    }

    if (bill.autoPaymentStatus) {
        return "bill.autoPaymentStatus." + bill.autoPaymentStatus
    }

    return "bill.status." + bill.status;
};

export const DATE_PARTS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};
