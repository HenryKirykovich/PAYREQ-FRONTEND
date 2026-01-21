import React from 'react';
import PaymentResult from "../components/payments/PaymentResult";
import InvoiceDetails from "../components/payments/InvoiceDetails";
import {PaymentConfirmationView} from "../components/payments/PaymentConfirmation";
import GatewayCreationForm from "../components/settings/payments/GatewayCreationForm";
import AdhocPaymentResult from "../components/settings/payments/AdhocPaymentResult";
import SurchargeList from "../components/payments/SurchargeList";
import ReportTable from "../components/payments/BillPaymentsReport/BillPaymentsReportTable";

export default {
    title: 'Payment',
};

export const invoiceDetails = () => (
    <InvoiceDetails details={{
        invoiceNo: "ABC123",
        amountDue: 1234,
        billerName: "Imaginary Council",
        dueDate: "2019-09-29T14:00:00.000Z",
        currencyCode: "aud"
    }}/>
);

export const paymentConfirmation = () => (
    <PaymentConfirmationView oneTimeToken="blah"
                             invoiceId={1}
                             invoiceDetails={{
                                 invoiceNo: "ABC123",
                                 amountDue: 1234,
                                 billerName: "Imaginary Council",
                                 dueDate: "2019-09-29T14:00:00.000Z",
                                 currencyCode: "aud"
                             }}
                             amount={1234.23}
                             cardScheme="visa"
                             last4Digits={1234}
                             surchargePercentage={1.5}
    />
);

export const resultSuccess = () => (
    <PaymentResult location={{
        state: {
            data: {
                success: true,
                invoice: {
                    amountDue: 1234,
                    invoiceNo: "ABC123",
                    billerName: "Imaginary Council",
                    currencyCode: "aud"
                },
                paymentDetails: {
                    gatewayTransactionId: "dakjfwd9234jasdd",
                    paymentDate: "2019-09-29T14:00:00.000Z",
                    currency: "aud",
                    amount: 1234,
                    card: {
                        cardNumberLast4: "0006",
                        cardScheme: "visa"
                    }
                }
            }
        }
    }}/>
);

export const resultSuccessAdhoc = () => (
    <AdhocPaymentResult location={{
        state: {
            data: {
                success: true,
                invoice: {
                    amountDue: 1234,
                    invoiceNo: "ABC123",
                    billerName: "Imaginary Council",
                    currencyCode: "aud"
                },
                paymentDetails: {
                    gatewayTransactionId: "dakjfwd9234jasdd",
                    paymentDate: "2019-09-29T14:00:00.000Z",
                    currency: "aud",
                    amount: 1234,
                    card: {
                        cardNumberLast4: "0006",
                        cardScheme: "visa"
                    }
                }
            }
        }
    }}/>
);

export const resultFailure = () => (
    <PaymentResult location={{
        state: {
            data: {
                success: false,
                error: {
                    code: "unable-to-process-payment",
                    message: "Credit Card Invalid or Expired",
                    contactDetails: {
                        name: "Rates Team",
                        email: "emile.raffoul@payreq.com",
                        phone: "1300 111 222"
                    }
                }
            }
        }
    }}/>
);

export const resultFailureAdhoc = () => (
    <AdhocPaymentResult location={{
        state: {
            data: {
                success: false,
                error: {
                    code: "unable-to-process-payment",
                    message: "Credit Card Invalid or Expired",
                    contactDetails: {
                        name: "Rates Team",
                        email: "emile.raffoul@payreq.com",
                        phone: "1300 111 222"
                    }
                }
            }
        }
    }}/>
);

export const resultFailureNoContactDetails = () => (
    <PaymentResult location={{
        state: {
            data: {
                success: false,
                error: {
                    code: "unable-to-process-payment",
                    message: "Credit Card Invalid or Expired",
                    contactDetails: null
                }
            }
        }
    }}/>
);

export const gatewayCreationForm = () => <GatewayCreationForm/>;

export const surchargeList = () => <SurchargeList cardsAccepted={[
    {scheme: "diners", surchargePercentage: 5.00},
    {scheme: "visa", surchargePercentage: 2.50},
    {scheme: "mastercard", surchargePercentage: 1.50
    }]
}/>;

export const paymentsReportTable = () => <ReportTable reportRows={[
    {
        "gatewayTransactionId": "ch_1FbJoPGwsWu1gFY0WFE6HUC7",
        "surchargeAmount": 1.67,
        "currencyCode": "aud",
        "paymentDate": "2019-11-05T04:38:37Z",
        "invoiceNo": "ZX5121191112",
        "amountDue": 111.00,
        "customerName": "Emile Org",
        "reference": "BVRN 123 Inv ABC",
        "invoiceId": 3,
        "totalInclSurcharge": 112.67
    },
    {
        "gatewayTransactionId": "ch_1FbJoPGwsWu1gFY0WFE6HUC7",
        "surchargeAmount": 1.67,
        "currencyCode": "aud",
        "paymentDate": "2019-11-05T04:38:37Z",
        "invoiceNo": "ZX5121191112",
        "amountDue": 111.00,
        "customerName": "Emile Org",
        "invoiceId": 3,
        "reference": "BVRN 321",
        "totalInclSurcharge": 1222.34
    }
]}/>;
