import axios from "axios";

export const getCards = (billerId, setCards) => {
    axios.get(`/data/cards/${billerId}`)
        .then(({data}) => setCards(data.cards));
};

const DEFAULT_CARD_NUMBER_PADDING = "**** **** **** ";

const CARD_NUMBER_PADDING = {
    amex: "**** ****** *"
};

export const buildMaskedNumber = (scheme, last4Digits) => {
    const cardNumberPadding = CARD_NUMBER_PADDING[scheme] || DEFAULT_CARD_NUMBER_PADDING;
    return cardNumberPadding + last4Digits;
};

export const expireMonth = expireMonth => {
    if (("" + expireMonth).length === 1) {
        return "0" + expireMonth;
    }
    return expireMonth;
};
