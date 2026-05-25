const CURRENCY_SYMBOLS = {
    'AUD': '$',
    'CAD': '$',
    'GBP': '£',
    'EUR': '€',
    'USD': '$'
};

const COUNTRY_CODE_TO_CURRENCY_CODE = {
    AU: 'AUD',
    AUS: 'AUD',
    CA: 'CAD',
    CAN: 'CAD',
    GB: 'GBP',
    GBR: 'GBP',
    UK: 'GBP',
    US: 'USD',
    USA: 'USD'
};

const COUNTRY_ID_TO_CURRENCY = {
    1: {currencyCode: 'AUD', currencySymbol: '$'},
    2: {currencyCode: 'CAD', currencySymbol: '$'}
};

export const getCurrencySymbol = currencyCode => CURRENCY_SYMBOLS[currencyCode.toUpperCase()] || currencyCode;

const normaliseCurrencyCode = currencyCode => currencyCode && currencyCode.toUpperCase();

const getCountryCurrencyCode = biller => {
    const country = biller && biller.country;
    if (country && country.currencyCode) return normaliseCurrencyCode(country.currencyCode);

    if (biller && biller.countryId && COUNTRY_ID_TO_CURRENCY[biller.countryId]) {
        return COUNTRY_ID_TO_CURRENCY[biller.countryId].currencyCode;
    }

    const countryCode = biller && (
        biller.countryCode ||
        (country && (country.countryCode || country.code || country.alpha2 || country.alpha3))
    );

    if (!countryCode) return null;

    return COUNTRY_CODE_TO_CURRENCY_CODE[String(countryCode).toUpperCase()] || null;
};

export const getBillerCurrencyCode = biller =>
    getCountryCurrencyCode(biller) ||
    normaliseCurrencyCode(biller && biller.currencyCode) ||
    normaliseCurrencyCode(biller && biller.countryCurrencyCode) ||
    normaliseCurrencyCode(biller && biller.accountCurrencyCode) ||
    'AUD';

export const getBillerCurrencySymbol = biller =>
    (biller && biller.country && biller.country.currencySymbol) ||
    (biller && biller.countryId && COUNTRY_ID_TO_CURRENCY[biller.countryId] && COUNTRY_ID_TO_CURRENCY[biller.countryId].currencySymbol) ||
    getCurrencySymbol(getBillerCurrencyCode(biller));

export const getCurrencyFormatted = (amount, currencyCode = 'USD') => {
    if (amount === null || amount === undefined) return '';
    const symbol = getCurrencySymbol(currencyCode);
    const formatted = parseFloat(amount).toFixed(2);
    return `${symbol}${formatted}`;
};
