export const CARD_SCHEME_LABELS = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  diners: "Diners Club International",
  japcb: "Japanese Credit Bureau",
  laser: "Laser Deposits",
  solo: "Solo"
};

export const SETTLEMENT_STATUSES = {
  failed: 'Failed',
  declined: 'Declined',
  cancelled: 'Cancelled',
  settlementComplete: 'Settlement Complete',
};

const buildUsernameFormInput = (label = "payments.gateways.generic.username") => ({ name: "username", label: label });

const buildPasswordFormInput = (label = "payments.gateways.generic.password") => ({ name: "password", label: label, type: "password" });

const buildMerchantFormInput = (label = "payments.gateways.generic.merchant") => ({ name: "merchant", label: label });

const buildSignatureFormInput = (label = "payments.gateways.generic.signature") => ({ name: "signature", label: label });

function monoovaGateways() {
  return {
    bpoint: {
      label: "Bpoint",
      formInputs: [
        buildMerchantFormInput("payments.gateways.bpoint.merchant"),
        buildUsernameFormInput("payments.gateways.bpoint.username"),
        buildPasswordFormInput("payments.gateways.bpoint.password"),
        { name: "meta.billerCode", label: "payments.gateways.bpoint.billerCode", optional: true }
      ]
    },
    payreq: {
      label: "Managed by Payreq",
      intlLabel: "payments.gateways.payreq.label",
      hiddenFromSetup: true,
    },
  };
}

export const GATEWAY_DETAILS = monoovaGateways();
