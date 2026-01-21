import {GATEWAY_DETAILS} from "../components/payments/payment-constants";
import {Label} from "../components/common";
import {monthsFromToday} from "./date-utils";

export const calculateSurcharge = (surchargePercentage, invoiceAmount) => {
    if ((typeof surchargePercentage) === "string" || (typeof invoiceAmount) === "string") {
        return NaN;
    }
    const invoiceAmountCents = invoiceAmount * 100;
    const surchargeCents = surchargePercentage / 100 * invoiceAmountCents;
    return Math.round(surchargeCents) / 100
};

const adjustIFrameHeight = ({height}) => {
    let iframe = document.querySelectorAll("iframe")[0];
    if (iframe) {
        iframe.style.height = height + "px";
    }
};

export const setWidgetDefaults = (widget, mode, reference, acceptedCards, formId, onLoadComplete, onSubmit, onValidationError, onMetaChange, onFinish) => {
    widget.setEnv(mode === "live" ? "production" : "sandbox");
    widget.setRefId(reference);
    widget.interceptSubmitForm(formId);
    widget.on("afterLoad", onLoadComplete);
    widget.on("submit", onSubmit);
    widget.on("validationError", onValidationError);
    widget.on("resize", adjustIFrameHeight);
    widget.on("finish", onFinish);
    onMetaChange && widget.on("metaChange", onMetaChange);
    acceptedCards && widget.setSupportedCardIcons(acceptedCards);
};

const EXTRA_PAYMENT_FIELDS_CONFIG = {
    email: user => ({
        field: "email",
        placeholder: "Email",
        label: "Email",
        value: user.email,
    })
};

export const setupExtraWigetFields = (widget, gatewayType, user) => {
  const gwConfig = GATEWAY_DETAILS[gatewayType];
  if (!gwConfig) {
    console.warn("GW type not found:", gatewayType);
    return widget;
  }
  const fields = gwConfig.extraPaymentFields;
  if (!fields) {
    return widget;
  }
  return widget.setFormElements(fields.map(field => EXTRA_PAYMENT_FIELDS_CONFIG[field](user)));
};

export const PAYMENT_STATUS_LABEL = {
    "success": "paymentHistory.statusLabel.success",
    "above-limit": "paymentHistory.statusLabel.above-limit",
    "fail": "paymentHistory.statusLabel.fail",
    "skipped": "paymentHistory.statusLabel.skipped",
    "scheduled": "paymentHistory.statusLabel.scheduled",
    "network-error": "paymentHistory.statusLabel.network-error"
}

export const PAYMENT_STATUS_LABEL_TYPE = {
    "success": Label.SUCCESS,
    "above-limit": Label.DANGER,
    "fail": Label.DANGER,
    "skipped": Label.DEFAULT,
    "scheduled": Label.WARNING,
    "network-error": Label.DANGER
}

const currentBillForPayment = (dueDate, dueDateTotal) => {
    const invoiceDueDate = dueDateTotal ? dueDateTotal : dueDate;
    return monthsFromToday(invoiceDueDate) <= 4;
}

export const showPayNowButton = (payable, status, dueDate, dueDateTotal) => payable && status === "payment-due" && currentBillForPayment(dueDate, dueDateTotal);
