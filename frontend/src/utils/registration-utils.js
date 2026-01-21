export const validateRegistrationAuthItems = (intl, biller, values) => {
    if (biller.useAuthItem1 && !values.auth1) {
        return {auth1: intl.formatMessage({id: "forms.generic.required.label"})}
    }
    if (biller.useAuthItem2 && !values.auth2) {
        return {auth2: intl.formatMessage({id: "forms.generic.required.label"})}
    }
    if (biller.useAuthItem3 && !values.auth3) {
        return {auth3: intl.formatMessage({id: "forms.generic.required.label"})}
    }
    if (biller.useAuthItem4 && !values.auth4) {
        return {auth4: intl.formatMessage({id: "forms.generic.required.label"})}
    }
    return {};

}