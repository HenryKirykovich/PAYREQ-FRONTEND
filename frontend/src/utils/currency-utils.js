const CURRENCY_SYMBOLS = {
    'AUD': '$',
    'CAD': '$',
    'GBP': '£',
    'EUR': '€'
};


export const getCurrencySymbol = currencyCode => CURRENCY_SYMBOLS[currencyCode.toUpperCase()] || currencyCode;