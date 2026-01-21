const ACCOUNT_TYPES = {
    billing: "billing",
    payroll: "payroll",
    accessing: "accessing"
}

export const isBillingAccount = accountType => ACCOUNT_TYPES.billing === accountType;

export const ACCOUNT_FEATURES = {
    customerCommunications: "customer.communications",
}

export const hasFeature = (biller, feature) => {
    return biller.feature && biller.feature.includes(feature);
}

