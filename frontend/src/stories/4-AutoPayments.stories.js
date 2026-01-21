import React from 'react';
import AutoPaymentsView from "../components/AutoPayments/AutoPaymentsView";
import CardsView from "../components/cards/CardsView";

export default {
    title: 'Auto Payment',
};

const sampleAutoPaymentsListAPIResponse = [
    {
        accountNumber: "1111111",
        billerActorId: 1,
        billerName: "Payreq Delivery Demo",
        cardId: 3,
        debitLimit: 400,
        id: 25,
        installment: "min",
        scheme: "visa",
        last4Digits: "0006",
        paymentDay: "due-date"
    },
    {
        accountNumber: "2222222",
        billerActorId: 1,
        billerName: "Imaginary Council",
        cardId: 3,
        debitLimit: null,
        id: 25,
        installment: "min",
        scheme: "visa",
        last4Digits: "0006",
        paymentDay: "due-date"
    },
];

const sampleCardsListAPIResponse = [{
    "id": 3,
    "cardHolderName": "Roger Federer",
    "expireMonth": 11,
    "expireYear": 2022,
    "last4Digits": "0006",
    "scheme": "visa"
}, {
    "id": 9,
    "cardHolderName": "Rafael Nadal",
    "expireMonth": 12,
    "expireYear": 2021,
    "last4Digits": "2346",
    "scheme": "mastercard"
}, {
    "id": 10,
    "cardHolderName": "Thierry Henry",
    "expireMonth": 12,
    "expireYear": 2021,
    "last4Digits": "4444",
    "scheme": "amex"
}];

export const NoBillers = () => <AutoPaymentsView autoPayments={[]} billers={[]}/>;

export const NoBillersButLegacyPayments = () => <AutoPaymentsView autoPayments={sampleAutoPaymentsListAPIResponse}
                                                                  billers={[]}/>;

export const AutoPayments = () => <AutoPaymentsView autoPayments={sampleAutoPaymentsListAPIResponse}/>;

export const Cards = () => <CardsView cards={sampleCardsListAPIResponse}/>;
