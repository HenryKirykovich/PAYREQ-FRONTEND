import {getCurrencySymbol} from './currency-utils';

it('currency symbol retrieval should be case insentitive', () => {
    expect(getCurrencySymbol("AUD")).toEqual("$");
    expect(getCurrencySymbol("aud")).toEqual("$");
});