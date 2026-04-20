import ConsentsSettings, {isActive, isPending} from "./ConsentsSettings";

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
