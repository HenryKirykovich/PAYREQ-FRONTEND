import ConsentsSettings, {isActive, isPending, getColSpan, REQUEST_ERROR_KEYS, getResendErrorKey, shouldShowEditButton} from "./ConsentsSettings";

it("ConsentsSettings is a function", () => {
    expect(typeof ConsentsSettings).toBe("function");
});

it("isActive returns true for authorised and pending", () => {
    expect(isActive("authorised")).toBe(true);
    expect(isActive("pending")).toBe(true);
    expect(isActive("deactivated")).toBe(false);
    expect(isActive("cancelled")).toBe(false);
});

it("isPending returns true only for pending", () => {
    expect(isPending("pending")).toBe(true);
    expect(isPending("authorised")).toBe(false);
});

it("getColSpan returns 7 when allowAgentRegistrationsFromContacts", () => {
    expect(getColSpan(true)).toBe(7);
    expect(getColSpan(false)).toBe(6);
    expect(getColSpan(undefined)).toBe(6);
});

it("getResendErrorKey returns specific key for max.resends", () => {
    expect(getResendErrorKey("max.resends")).toBe("settings.consents.resendErrors.maxResends");
    expect(getResendErrorKey("other")).toBe("settings.consents.resendErrorMessage");
    expect(getResendErrorKey(undefined)).toBe("settings.consents.resendErrorMessage");
});

it("shouldShowEditButton returns false when editing that row or conditions not met", () => {
    expect(shouldShowEditButton(true, "authorised", true, null, "1")).toBe(true);
    expect(shouldShowEditButton(true, "authorised", true, "1", "1")).toBe(false);
    expect(shouldShowEditButton(false, "authorised", true, null, "1")).toBe(false);
    expect(shouldShowEditButton(true, "deactivated", true, null, "1")).toBe(false);
    expect(shouldShowEditButton(true, "authorised", false, null, "1")).toBe(false);
});

it("REQUEST_ERROR_KEYS maps all four error codes", () => {
    expect(REQUEST_ERROR_KEYS["invalid.email"]).toBe("settings.consents.errors.invalidEmail");
    expect(REQUEST_ERROR_KEYS["max.retries"]).toBe("settings.consents.errors.maxRetries");
    expect(REQUEST_ERROR_KEYS["no.user"]).toBe("settings.consents.errors.noUser");
    expect(REQUEST_ERROR_KEYS["pending.rego"]).toBe("settings.consents.errors.pendingRego");
});
