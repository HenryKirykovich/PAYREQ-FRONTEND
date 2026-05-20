import {buildIFrameSrc, formatNumber, formEncode, sumTaxes} from "./AccountingPayment";

describe("AccountingPayment helpers", () => {
    describe("buildIFrameSrc", () => {
        it("builds the PayDock iframe URL for valid gateway details", () => {
            expect(
                buildIFrameSrc({
                    widgetUrl: "https://widget.paydock.com/widget",
                    publicKey: "public-key",
                    configurationToken: "config-token",
                })
            ).toBe(
                "https://widget.paydock.com/widget?public_key=public-key&configuration_token=config-token" +
                    "&background_color=%23ffffff" +
                    "&fields_validation=true" +
                    "&title=Pay%20for%20accounting%20plan" +
                    "&button_color=%23357ebd" +
                    "&supported_card_types=mastercard,visa"
            );
        });

        it("keeps the current undefined field behavior when gateway details are incomplete", () => {
            expect(buildIFrameSrc({})).toBe(
                "undefined?public_key=undefined&configuration_token=undefined" +
                    "&background_color=%23ffffff" +
                    "&fields_validation=true" +
                    "&title=Pay%20for%20accounting%20plan" +
                    "&button_color=%23357ebd" +
                    "&supported_card_types=mastercard,visa"
            );
        });
    });

    describe("formatNumber", () => {
        it("formats finite numeric values with two decimal places", () => {
            expect(formatNumber(12.345)).toBe("12.35");
            expect(formatNumber("7.5")).toBe("7.50");
            expect(formatNumber(0)).toBe("0.00");
            expect(formatNumber(-3.2)).toBe("-3.20");
        });

        it("falls back to zero for nullish or non-finite values", () => {
            expect(formatNumber(null)).toBe("0.00");
            expect(formatNumber(undefined)).toBe("0.00");
            expect(formatNumber(NaN)).toBe("0.00");
            expect(formatNumber(Infinity)).toBe("0.00");
        });
    });

    describe("sumTaxes", () => {
        it("sums numeric tax amounts", () => {
            expect(sumTaxes([{amount: 1.25}, {amount: 2.75}, {amount: 3}])).toBe(7);
        });

        it("returns zero for empty or missing taxes", () => {
            expect(sumTaxes([])).toBe(0);
            expect(sumTaxes(null)).toBe(0);
        });

        it("treats nullish tax amounts as zero", () => {
            expect(sumTaxes([{amount: null}, {amount: undefined}, {}, null])).toBe(0);
        });

        it("coerces string tax amounts before summing", () => {
            expect(sumTaxes([{amount: "2.50"}, {amount: "3"}])).toBe(5.5);
        });
    });

    describe("formEncode", () => {
        it("encodes flat objects", () => {
            expect(formEncode({billerId: 220233, paymentToken: "tok_123"})).toBe(
                "billerId=220233&paymentToken=tok_123"
            );
        });

        it("encodes nested objects with bracket notation", () => {
            expect(formEncode({customer: {id: 10, name: "Acme"}})).toBe(
                "customer%5Bid%5D=10&customer%5Bname%5D=Acme"
            );
        });

        it("encodes arrays of objects with empty bracket notation", () => {
            expect(
                formEncode({
                    taxes: [
                        {id: 1, amount: 2.5},
                        {id: 2, amount: 3},
                    ],
                })
            ).toBe(
                "taxes%5B%5D%5Bid%5D=1&taxes%5B%5D%5Bamount%5D=2.5" +
                    "&taxes%5B%5D%5Bid%5D=2&taxes%5B%5D%5Bamount%5D=3"
            );
        });

        it("skips null and undefined values", () => {
            expect(formEncode({a: null, b: undefined, c: "", d: 0})).toBe("c=&d=0");
        });

        it("encodes special characters", () => {
            expect(formEncode({query: "a b&c=d/e%", symbol: "$"})).toBe(
                "query=a%20b%26c%3Dd%2Fe%25&symbol=%24"
            );
        });

        it("returns an empty string for an empty object", () => {
            expect(formEncode({})).toBe("");
        });
    });
});
