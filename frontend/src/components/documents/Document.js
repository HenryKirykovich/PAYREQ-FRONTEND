import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../Loading";
import PayrollDocumentView from "./PayrollDocumentView";
import {withRouter} from "react-router-dom";
import InvoiceDocumentView from "./InvoiceDocumentView";
import PeppolInvoiceView from "./PeppolInvoiceView";
import {
    INVOICE_DOCUMENT_TYPES
} from "../Inbox/inbox-constants";
import LetterDocumentView from "./LetterDocumentView";
import PeppolCreditNoteView from "./PeppolCreditNoteView";
import DocumentError from "./DocumentError";
import {useAppState} from "../../state";
import {SET_ERROR} from "../../state/reducers/errorReducer";

function errorId(error) {
    if (error && error.response && error.response.data && error.response.data.error) {
        return error.response.data.error;
    }
    return {id: null};
}

const getDocument = (invoiceId, setResponse, dispatch) => {
    axios.get(`/data/invoices/${invoiceId}`, {localErrorHandling: true})
        .then(({data}) => {
            setResponse(data)
        })
        .catch((error) => {
            if (error && error.response && error.response.status === 404) {
                setResponse(404);
            } else {
                dispatch({
                    type: SET_ERROR,
                    error: errorId(error),
                })
            }
        });
};

const Document = ({match: {params: {invoiceId}}}) => {
    const [response, setResponse] = useState();
    const [, dispatch] = useAppState();
    useEffect(
        () => getDocument(invoiceId, setResponse, dispatch),
        [invoiceId, setResponse, dispatch]
    );
    if (!response) return <Loading/>;

    if (response === 404) return <DocumentError/>;

    if (response.invoice.documentType === INVOICE_DOCUMENT_TYPES.invoice ||
        response.invoice.documentType === INVOICE_DOCUMENT_TYPES.invoice_reminder)
        return <InvoiceDocumentView invoice={response.invoice} />

    if (response.invoice.documentType === INVOICE_DOCUMENT_TYPES.peppol_invoice)
        return <PeppolInvoiceView invoice={response.invoice} />

    if (response.invoice.documentType === INVOICE_DOCUMENT_TYPES.peppol_credit_note)
        return <PeppolCreditNoteView invoice={response.invoice} />

    if (response.invoice.documentType === INVOICE_DOCUMENT_TYPES.letter)
        return <LetterDocumentView invoice={response.invoice} />

    return <PayrollDocumentView invoice={response.invoice} />
};

export default withRouter(Document);
