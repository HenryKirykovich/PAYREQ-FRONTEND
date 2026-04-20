import ConsentsSettings, {isActive, isPending, getColSpan} from "./ConsentsSettings";

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
