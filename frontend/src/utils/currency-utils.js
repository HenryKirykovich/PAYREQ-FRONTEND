const CURRENCY_SYMBOLS = {
    'AUD': '$',
    'CAD': '$',
    'GBP': '£',
    'EUR': '€',
    'USD': '$'
};


export const getCurrencySymbol = currencyCode => CURRENCY_SYMBOLS[currencyCode.toUpperCase()] || currencyCode;

export const getCurrencyFormatted = (amount, currencyCode = 'USD') => {
    if (amount === null || amount === undefined) return '';
    const symbol = getCurrencySymbol(currencyCode);
    const formatted = parseFloat(amount).toFixed(2);
    return `${symbol}${formatted}`;
};