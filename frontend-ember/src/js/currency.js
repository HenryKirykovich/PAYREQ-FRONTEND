define([], function () {
    return {
        toCurrency: function (currencyCode, amount) {
            const options = currencyCode ? {style: 'currency', currency: currencyCode} : {};
            return new Intl.NumberFormat(navigator && navigator.language ? navigator.language : "en",
                options)
                .format(
                    amount ? amount.toFixed(2) : 0
                );
        }
    };
});