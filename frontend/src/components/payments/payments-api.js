import axios from "axios";

export const getInvoice = (handleResponse, invoiceId) => {
    axios.get(`/data/invoices/${invoiceId}`)
        .then(({data: {invoice}}) => handleResponse(invoice));
};

export const getPaymentDetails = (handleResponse, invoiceId, amount, cardScheme) => {
  axios.post(`/data/invoices/${invoiceId}/get-payment-details`, {
               amount: amount.toString(),
               cardScheme
             },{
               localErrorHandling: true
             })
       .then(({data: {paymentDetails}}) => handleResponse(paymentDetails));
};

export const getCard = (handleResponse, invoiceId, cardId) => {
  axios.get(`/data/invoices/${invoiceId}/card/${cardId}`, {
    localErrorHandling: true
  })
       .then(({data: {card}}) => handleResponse(card));
};
