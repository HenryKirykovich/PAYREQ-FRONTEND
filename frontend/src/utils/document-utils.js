import {INVOICE_DOCUMENT_TYPES} from "../components/Inbox/inbox-constants";

const MONETARY_DOCUMENT_TYPES = [INVOICE_DOCUMENT_TYPES.invoice, INVOICE_DOCUMENT_TYPES.invoice_reminder, INVOICE_DOCUMENT_TYPES.peppol_invoice, INVOICE_DOCUMENT_TYPES.peppol_credit_note]
export const isMonetaryDocument = documentType => MONETARY_DOCUMENT_TYPES.indexOf(documentType) !== -1;
