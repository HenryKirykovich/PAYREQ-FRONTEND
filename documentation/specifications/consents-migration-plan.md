# Migration Plan: Consents Screen (MyBills Agent Authorisations)

**Specification**: `documentation/specifications/consents.md`
**Ember Route**: `customer#/biller/:id/settings/consents`
**React Route**: `/portal/customer/biller/:billerId/settings/consents/view`
**Branch prefix**: `feature/ember-to-react/consents`

---

## Overview

The Consents screen manages Payreq MyBills Agent Authorisations. It allows billers to invite
agents to manage bill registrations on their behalf, and lets both parties view, search, resend,
edit, and revoke those authorisations.

The migration is split into 8 PRs, each under 400 lines of change. The first PR wires up an
empty shell so the React route is active immediately; subsequent PRs layer in features
incrementally. The Ember tab remains functional until PR 1 is merged — after that the tab
permanently routes to React.

### PR Sequence

| PR | Title | Scope |
|----|-------|-------|
| PR 1 | Shell + Routing | Empty component, route wired, tab de-Embered |
| PR 2 | i18n Strings + Data Loading | All i18n keys + `useEffect` fetch |
| PR 3 | Authorisations Table (read-only) | Table structure, rows, empty state, dates |
| PR 4 | Search | Search input + re-fetch on submit |
| PR 5 | Request Consent Panel | Panel 1 (biller-only), send request, error handling |
| PR 6 | Remove Authorisation + Modal | Remove button, confirm modal, delete flow |
| PR 7 | Resend Authorisation | Resend button, resend flow, specific errors |
| PR 8 | Inline Edit (noticeId) | Edit/Save/Cancel buttons, inline input, PATCH |

---

## PR 1 — Shell + Routing

### Goal

Wire up the React route for the Consents screen so the tab no longer points to Ember. The
component itself renders a `<Loading/>` placeholder only — no data fetching, no UI yet.
This unblocks all subsequent PRs by establishing the routing foundation.

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Create | `frontend/src/components/settings/biller/ConsentsSettings.js` | Empty shell component |
| Create | `frontend/src/components/settings/biller/ConsentsSettings.module.scss` | Placeholder stylesheet |
| Modify | `frontend/src/routes/SettingsShell.js` | Remove `isEmber: true`, add `<Route>` |

### Implementation Details

**`ConsentsSettings.js`** — placeholder only:

```jsx
import React from "react";
import {injectIntl} from "react-intl";
import Loading from "../../Loading";

const ConsentsSettings = ({billerId}) => {
    return <Loading/>;
};

export default injectIntl(ConsentsSettings);
```

**`ConsentsSettings.module.scss`** — single rule ported from Ember's `payreq.css` (line 962):

```scss
.consentcells {
    vertical-align: middle;
}
```

**`SettingsShell.js`** — three changes:

1. Import the new component (near top, with other settings imports):
```javascript
import ConsentsSettings from "../components/settings/biller/ConsentsSettings";
```

2. Update the biller settings tab list (line 38) — remove `isEmber: true` and replace `linkTo`
with a full React path:
```javascript
// Before:
{isEmber: true, linkTo: "biller.settings.consents", name: "consents", hidden: !hasAgent(billerSettings)}
// After:
{linkTo: `/portal/customer/biller/${billerId}/settings/consents/view`, name: "consents", hidden: !hasAgent(billerSettings)}
```

3. Update the MyBills/payer settings tab list (line 46) — same pattern:
```javascript
// Before:
{isEmber: true, linkTo: "biller.settings.consents", name: "consents"}
// After:
{linkTo: `/portal/customer/biller/${billerId}/settings/consents/view`, name: "consents"}
```

4. Add a `<Route>` inside the `<Switch>` in `SettingsShell` (place it before the
`<PaymentSettingRoutes>` line to keep route specificity predictable):
```jsx
<Route path={`${match.url}/consents/view`}>
    <ConsentsSettings billerId={biller.id}/>
</Route>
```

### Tests to Include

**`frontend/src/components/settings/biller/ConsentsSettings.test.js`** — minimal smoke test:

```javascript
import React from "react";
import {render} from "@testing-library/react";
import {IntlProvider} from "react-intl";
import {MemoryRouter} from "react-router-dom";
import {StateProvider} from "../../../state";
import ConsentsSettings from "./ConsentsSettings";

const renderConsents = () =>
    render(
        <MemoryRouter>
            <IntlProvider locale="en" messages={{}}>
                <StateProvider initialState={{biller: {id: "biller-1"}}}>
                    <ConsentsSettings billerId="biller-1"/>
                </StateProvider>
            </IntlProvider>
        </MemoryRouter>
    );

it("renders without crashing", () => {
    renderConsents();
});
```

### Testing Checklist

- [ ] Navigate to `customer#/biller/:id/settings/consents` — tab now routes to React (`/portal/customer/biller/:id/settings/consents/view`)
- [ ] Consents tab is visible on biller accounts that have `mybillsagent` channel partner system
- [ ] Consents tab is hidden on biller accounts without `mybillsagent` channel partner system
- [ ] Consents tab is always visible on MyBills/payer accounts (incoming-invoice system)
- [ ] Loading spinner is displayed (placeholder component renders correctly)
- [ ] Other settings tabs (Payments, Contact Details, etc.) still function correctly
- [ ] Smoke test passes

---

## PR 2 — i18n Strings + Data Loading

### Goal

Add all 38 consent-related i18n keys to `en.json` and `fr.json`, then wire up the initial
data fetch so the component loads consents and exposes `meta` (`isBiller`,
`allowAgentRegistrationsFromContacts`) from the API response.

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Modify | `frontend/src/lang/en.json` | Add 38 `settings.consents.*` keys |
| Modify | `frontend/src/lang/fr.json` | Add 38 French translations |
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.js` | Add fetch + loading state |

### Implementation Details

**`en.json`** — add the following keys (alphabetically sorted near existing `settings.*` entries):

```json
"settings.consents.actions": "Actions",
"settings.consents.agentLabel": "Agent",
"settings.consents.authUpdate": "Successfully updated authorisation.",
"settings.consents.authUpdateError": "An error occurred while updating the selected Payreq MyBills Authorisation. Please try again later.",
"settings.consents.authorisedOnLabel": "Authorised On",
"settings.consents.billerAgentEmail": "MyBills Agent Email",
"settings.consents.billerHeading": "MyBills Agent Request Consent",
"settings.consents.billerLabel": "Biller",
"settings.consents.billerText": "To manage registrations on behalf of an Agent please enter their Payreq MyBills account email and click 'Send Request'. The Agent will receive an email request and must verify authorisation before you can use this feature.",
"settings.consents.cancel": "Cancel",
"settings.consents.emailLabel": "Email Address",
"settings.consents.errors.invalidEmail": "Invalid MyBills Agent email address entered.",
"settings.consents.errors.maxRetries": "Maximum number of invalid tries to find a Payreq account reached. Please contact Payreq Support.",
"settings.consents.errors.noUser": "Payreq user doesn't exist for {email}",
"settings.consents.errors.pendingRego": "Pending MyBills Agent Authorisation already exists for {email}. Please see MyBills Agent Authorisations below.",
"settings.consents.getAuthError": "An error occurred while refreshing MyBills Agent Authorisations for this biller. Please try again later.",
"settings.consents.heading": "Payreq MyBills Agent Authorisations",
"settings.consents.noAuthorisations": "No MyBills Agent Authorisations.",
"settings.consents.noticeIdLabel": "Notice Id",
"settings.consents.ok": "OK",
"settings.consents.removeAuth": "Registration management unauthorised ( {uid} )",
"settings.consents.removeAuthBiller": "Registration management unauthorised for Agency {tagName} ( {uid} )",
"settings.consents.removeAuthError": "An error occurred while updating your MyBills Agent Authorisation. Please try again later.",
"settings.consents.requestButton": "Send Request",
"settings.consents.resendErrorMessage": "An error occurred while resending the MyBills Agent Authorisation email. Please try again later.",
"settings.consents.resendErrors.maxResends": "Maximum number of re-sends have been reached for {uid}. Please contact Payreq Support.",
"settings.consents.resendSuccess": "Payreq MyBills Agent authorisation email re-sent to {uid}",
"settings.consents.searchPlaceholder": "Search for an Authorisation by Agent email or name",
"settings.consents.sentConsent": "Email request for consent has been sent to: {email}",
"settings.consents.setConsentError": "An error occurred while sending a consent request. Please try again later.",
"settings.consents.status.authorised": "Authorised",
"settings.consents.status.cancelled": "Cancelled",
"settings.consents.status.deactivated": "Deactivated",
"settings.consents.status.pending": "Pending",
"settings.consents.statusLabel": "Status",
"settings.consents.unauthoriseModalHeading": "MyBills Agent Registration Management Unauthorise",
"settings.consents.unauthoriseModalText": "Are you sure you want to unauthorise MyBills Agent Registration Management for {email}?",
"settings.consents.unAuthorisedOnLabel": "Unauthorised On"
```

**`fr.json`** — add the corresponding French translations (see `consents.md` i18n table for
values; keys match `en.json` exactly).

**`ConsentsSettings.js`** — replace the placeholder body with fetch + state:

```jsx
import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import Loading from "../../Loading";

const getConsents = (billerId, searchTerm, setConsents, setMeta, setIsLoading) => {
    axios.get("/data/api/consents", {params: {billerId, searchTerm}})
        .then(({data}) => {
            setConsents(data.content);
            setMeta(data.meta);
            setIsLoading(false);
        });
};

const ConsentsSettings = ({billerId, intl}) => {
    const [isLoading, setIsLoading]   = useState(true);
    const [consents, setConsents]     = useState([]);
    const [meta, setMeta]             = useState({isBiller: false, allowAgentRegistrationsFromContacts: false});

    useEffect(
        () => getConsents(billerId, null, setConsents, setMeta, setIsLoading),
        [billerId]
    );

    if (isLoading) return <Loading/>;

    return (
        <div className="row">
            {/* panels rendered in subsequent PRs */}
        </div>
    );
};

export default injectIntl(ConsentsSettings);
```

**Notes**:
- API response shape: `{ content: Consent[], meta: { isBiller, allowAgentRegistrationsFromContacts } }`
- `getConsents` is exported as a named export so tests can call it directly (same pattern as `getContactDetails` in `ContactDetailsSettings.js`)
- `searchTerm` is passed as `null` on initial load; PR 4 will add the search UI

### Tests to Include

Expand `ConsentsSettings.test.js`:

```javascript
import axios from "axios";
jest.mock("axios");

const mockConsents = [
    {id: "1", uid: "agent@example.com", status: "authorised", tagName: "Test Agency",
     noticeId: null, authorisedOn: "2024-01-15T10:00:00Z", unauthorisedOn: null},
];
const mockMeta = {isBiller: true, allowAgentRegistrationsFromContacts: false};

beforeEach(() => {
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: mockMeta}});
});

it("fetches consents on mount", async () => {
    renderConsents();
    await wait(); // or waitFor(() => ...) depending on @testing-library version
    expect(axios.get).toHaveBeenCalledWith("/data/api/consents", {params: {billerId: "biller-1", searchTerm: null}});
});

it("shows loading state initially", () => {
    const {container} = renderConsents();
    // Loading component renders during fetch
    expect(container.querySelector(".loading")).toBeTruthy(); // adjust to match Loading component output
});
```

### Testing Checklist

- [ ] Page displays loading spinner while data is fetching
- [ ] `GET /data/api/consents?billerId=X` is called on mount
- [ ] No console errors after data loads
- [ ] All English i18n keys resolve without "missing translation" warnings
- [ ] All French i18n keys present in `fr.json`
- [ ] Tests pass

---

## PR 3 — Authorisations Table (Read-Only)

### Goal

Render the full authorisations table — headers, rows, empty state, and date formatting.
No action buttons yet (search in PR 4, buttons in PR 5–8). Focus is on correct conditional
column display and status label mapping.

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.js` | Add table panel |
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.test.js` | Table render tests |

### Implementation Details

Add a `statusLabel` helper above the component:

```javascript
const statusLabel = (status, intl) =>
    intl.formatMessage({id: `settings.consents.status.${status}`});
```

Replace the `{/* panels */}` comment with Panel 2 (table panel):

```jsx
<div>
    <div className="panel panel-default">
        <div className="panel-heading">
            <h4 className="panel-title">
                {intl.formatMessage({id: "settings.consents.heading"})}
            </h4>
        </div>
        <div className="panel-body">
            <div className="col-md-12">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{intl.formatMessage({id: "settings.consents.emailLabel"})}</th>
                            <th>{intl.formatMessage({id: "settings.consents.statusLabel"})}</th>
                            <th>{intl.formatMessage({id: meta.isBiller
                                ? "settings.consents.agentLabel"
                                : "settings.consents.billerLabel"})}</th>
                            {meta.allowAgentRegistrationsFromContacts &&
                                <th>{intl.formatMessage({id: "settings.consents.noticeIdLabel"})}</th>}
                            <th>{intl.formatMessage({id: "settings.consents.authorisedOnLabel"})}</th>
                            <th>{intl.formatMessage({id: "settings.consents.unAuthorisedOnLabel"})}</th>
                            <th>{intl.formatMessage({id: "settings.consents.actions"})}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consents.length === 0 ? (
                            <tr>
                                <td colSpan={meta.allowAgentRegistrationsFromContacts ? 7 : 6}>
                                    {intl.formatMessage({id: "settings.consents.noAuthorisations"})}
                                </td>
                            </tr>
                        ) : consents.map(consent => (
                            <tr key={consent.id}>
                                <td className={styles.consentcells}>{consent.uid}</td>
                                <td className={styles.consentcells}>{statusLabel(consent.status, intl)}</td>
                                <td className={styles.consentcells}>{consent.tagName}</td>
                                {meta.allowAgentRegistrationsFromContacts &&
                                    <td className={styles.consentcells}>{consent.noticeId}</td>}
                                <td className={styles.consentcells}>
                                    {consent.authorisedOn &&
                                        <FormattedDate value={consent.authorisedOn}
                                            year="numeric" month="short" day="2-digit"
                                            hour="2-digit" minute="2-digit"/>}
                                </td>
                                <td className={styles.consentcells}>
                                    {consent.unauthorisedOn &&
                                        <FormattedDate value={consent.unauthorisedOn}
                                            year="numeric" month="short" day="2-digit"
                                            hour="2-digit" minute="2-digit"/>}
                                </td>
                                <td className={styles.consentcells}>
                                    {/* action buttons added in PR 6–8 */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
```

Add `FormattedDate` to the react-intl import at the top.

**Notes**:
- `colSpan` is computed dynamically (6 or 7) — fixes the Ember hardcoded `colspan="5"` bug
- Status labels use `settings.consents.status.*` i18n keys, not a hardcoded map
- `consent.tagName` can be empty (agent-side row has no agency name)

### Tests to Include

```javascript
it("renders table with consent rows", async () => {
    renderConsents();
    await wait();
    expect(screen.getByText("agent@example.com")).toBeInTheDocument();
    expect(screen.getByText("Authorised")).toBeInTheDocument();
    expect(screen.getByText("Test Agency")).toBeInTheDocument();
});

it("shows empty state when no consents", async () => {
    axios.get.mockResolvedValue({data: {content: [], meta: mockMeta}});
    renderConsents();
    await wait();
    expect(screen.getByText("No MyBills Agent Authorisations.")).toBeInTheDocument();
});

it("shows Agent column header when isBiller", async () => {
    renderConsents();
    await wait();
    expect(screen.getByText("Agent")).toBeInTheDocument();
});

it("shows Biller column header when not isBiller", async () => {
    axios.get.mockResolvedValue({data: {content: [], meta: {isBiller: false, allowAgentRegistrationsFromContacts: false}}});
    renderConsents();
    await wait();
    expect(screen.getByText("Biller")).toBeInTheDocument();
});

it("shows Notice Id column when allowAgentRegistrationsFromContacts", async () => {
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: {isBiller: true, allowAgentRegistrationsFromContacts: true}}});
    renderConsents();
    await wait();
    expect(screen.getByText("Notice Id")).toBeInTheDocument();
});
```

### Testing Checklist

- [ ] Table renders with correct column headers
- [ ] Status values display as human-readable labels ("Authorised", "Pending", etc.)
- [ ] "Agent" column header shown when logged-in user is biller; "Biller" when agent
- [ ] "Notice Id" column only appears when `allowAgentRegistrationsFromContacts` is true
- [ ] Authorised On / Unauthorised On show formatted date + time
- [ ] Empty state "No MyBills Agent Authorisations." shows when no data
- [ ] `colSpan` on empty row accounts for conditional Notice Id column
- [ ] Tests pass

---

## PR 4 — Search

### Goal

Add the search input and search button. Clicking search re-fetches consents with the current
`searchTerm` passed as a query parameter. The initial load uses `searchTerm = null`
(already established in PR 2).

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.js` | Add search UI + handler |
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.test.js` | Search tests |

### Implementation Details

Add `searchTerm` state and a `handleSearch` function, then insert the search form above
the table inside Panel 2:

```javascript
const [searchTerm, setSearchTerm] = useState("");

const handleSearch = () => {
    setIsLoading(true);
    getConsents(billerId, searchTerm || null, setConsents, setMeta, setIsLoading);
};
```

Search form JSX (insert directly inside `<div className="panel-body">`, before the table):

```jsx
<form className="form-horizontal" role="form" onSubmit={e => { e.preventDefault(); handleSearch(); }}>
    <div className="form-group">
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                id="searchTerm"
                placeholder={intl.formatMessage({id: "settings.consents.searchPlaceholder"})}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <span className="input-group-btn">
                <button
                    id="mailersearch"
                    type="submit"
                    className="btn btn-default"
                    title="Search"
                >
                    <span className="glyphicon glyphicon-search"/>
                </button>
            </span>
        </div>
    </div>
</form>
```

**Notes**:
- Empty `searchTerm` is sent as `null` to the API (same as initial load — returns all records)
- Form uses `onSubmit` so pressing Enter in the input also triggers search (matches Ember behaviour)
- The table already re-renders from state, so no additional wiring needed

### Tests to Include

```javascript
it("renders search input", async () => {
    renderConsents();
    await wait();
    expect(screen.getByPlaceholderText("Search for an Authorisation by Agent email or name"))
        .toBeInTheDocument();
});

it("calls API with searchTerm when search submitted", async () => {
    renderConsents();
    await wait();
    const input = screen.getByPlaceholderText(/search for/i);
    fireEvent.change(input, {target: {value: "agent@"}});
    fireEvent.submit(screen.getByRole("form"));
    expect(axios.get).toHaveBeenCalledWith("/data/api/consents",
        {params: {billerId: "biller-1", searchTerm: "agent@"}});
});

it("sends null searchTerm when input is empty", async () => {
    renderConsents();
    await wait();
    fireEvent.submit(screen.getByRole("form"));
    // Second call — first was on mount
    expect(axios.get).toHaveBeenLastCalledWith("/data/api/consents",
        {params: {billerId: "biller-1", searchTerm: null}});
});
```

### Testing Checklist

- [ ] Search input is visible below the panel heading
- [ ] Typing in the input and pressing Enter triggers a new `GET /data/api/consents` request
- [ ] Clicking the search button (magnifier icon) also triggers the request
- [ ] `searchTerm` is passed as a query parameter in the request
- [ ] Empty search input sends `null` (returns all records, same as initial load)
- [ ] Table updates to show filtered results after search
- [ ] Tests pass

---

## PR 5 — Request Consent Panel (Biller-Only)

### Goal

Add Panel 1 (Request Consent), which is only visible when `meta.isBiller` is true. Includes
the agent email input, optional Notice Id input, Send Request button, and server-side error
display. Implements the `requestConsent` action with all error-code handling from the spec.

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.js` | Add Panel 1 + handler |
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.test.js` | Panel 1 tests |

### Implementation Details

Add state variables for the request form:

```javascript
const [agentEmail, setAgentEmail]     = useState("");
const [noticeId, setNoticeId]         = useState("");
const [requestError, setRequestError] = useState(null);
```

Add the `handleRequestConsent` function:

```javascript
const REQUEST_ERRORS = {
    "invalid.email":  "settings.consents.errors.invalidEmail",
    "max.retries":    "settings.consents.errors.maxRetries",
    "no.user":        "settings.consents.errors.noUser",
    "pending.rego":   "settings.consents.errors.pendingRego",
};

const handleRequestConsent = () => {
    setRequestError(null);
    axios.post("/data/settings/consent", {mybillsagentemail: agentEmail, noticeId, billerId})
        .then(({data}) => {
            if (data.success) {
                // Success: reload data (toast handled by backend or parent in a later iteration)
                setAgentEmail("");
                setNoticeId("");
                getConsents(billerId, searchTerm || null, setConsents, setMeta, setIsLoading);
            } else {
                const key = REQUEST_ERRORS[data.error];
                const needsEmail = ["no.user", "pending.rego"].includes(data.error);
                const msg = key
                    ? intl.formatMessage({id: key}, needsEmail ? {email: agentEmail} : {})
                    : intl.formatMessage({id: "settings.consents.setConsentError"});
                setRequestError(msg);
            }
        })
        .catch(() => setRequestError(intl.formatMessage({id: "settings.consents.setConsentError"})));
};
```

Insert Panel 1 JSX above Panel 2, wrapped in `{meta.isBiller && ( ... )}`:

```jsx
{meta.isBiller && (
    <div>
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                    {intl.formatMessage({id: "settings.consents.billerHeading"})}
                </h4>
            </div>
            <div className="panel-body">
                <div className="alert alert-info">
                    {intl.formatMessage({id: "settings.consents.billerText"})}
                </div>
                {requestError && (
                    <div className="alert alert-danger">{requestError}</div>
                )}
                <form className="form-login" id="consent-form"
                      onSubmit={e => { e.preventDefault(); handleRequestConsent(); }}>
                    <div className="form-group col-md-12">
                        <label htmlFor="agentMyBillsEmail" className="control-label col-md-2">
                            {intl.formatMessage({id: "settings.consents.billerAgentEmail"})}
                        </label>
                        <div className="col-md-10">
                            <input id="agentMyBillsEmail" type="email" className="form-control"
                                   value={agentEmail} onChange={e => setAgentEmail(e.target.value)}/>
                        </div>
                    </div>
                    {meta.allowAgentRegistrationsFromContacts && (
                        <div className="form-group col-md-12">
                            <label htmlFor="noticeId" className="control-label col-md-2">
                                {intl.formatMessage({id: "settings.consents.noticeIdLabel"})}
                            </label>
                            <div className="col-md-10">
                                <input id="noticeId" type="text" className="form-control"
                                       value={noticeId} onChange={e => setNoticeId(e.target.value)}/>
                            </div>
                        </div>
                    )}
                    <div className="col-xs-12 text-center">
                        <button type="submit" className="btn btn-primary">
                            <span className="glyphicon glyphicon-send"/>&nbsp;&nbsp;
                            {intl.formatMessage({id: "settings.consents.requestButton"})}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}
```

### Tests to Include

```javascript
it("does not show Panel 1 when not isBiller", async () => {
    axios.get.mockResolvedValue({data: {content: [], meta: {isBiller: false, allowAgentRegistrationsFromContacts: false}}});
    renderConsents();
    await wait();
    expect(screen.queryByText("MyBills Agent Request Consent")).not.toBeInTheDocument();
});

it("shows Panel 1 when isBiller", async () => {
    renderConsents(); // mockMeta has isBiller: true
    await wait();
    expect(screen.getByText("MyBills Agent Request Consent")).toBeInTheDocument();
    expect(screen.getByLabelText("MyBills Agent Email")).toBeInTheDocument();
});

it("shows Notice Id input when allowAgentRegistrationsFromContacts", async () => {
    axios.get.mockResolvedValue({data: {content: [], meta: {isBiller: true, allowAgentRegistrationsFromContacts: true}}});
    renderConsents();
    await wait();
    expect(screen.getByLabelText("Notice Id")).toBeInTheDocument();
});

it("calls POST on Send Request", async () => {
    axios.post.mockResolvedValue({data: {success: true}});
    renderConsents();
    await wait();
    fireEvent.change(screen.getByLabelText("MyBills Agent Email"), {target: {value: "agent@test.com"}});
    fireEvent.submit(screen.getByTestId("consent-form")); // add data-testid="consent-form" to form
    expect(axios.post).toHaveBeenCalledWith("/data/settings/consent",
        {mybillsagentemail: "agent@test.com", noticeId: "", billerId: "biller-1"});
});

it("shows server error message on invalid.email", async () => {
    axios.post.mockResolvedValue({data: {success: false, error: "invalid.email"}});
    renderConsents();
    await wait();
    fireEvent.change(screen.getByLabelText("MyBills Agent Email"), {target: {value: "bad"}});
    fireEvent.submit(screen.getByTestId("consent-form"));
    await wait();
    expect(screen.getByText("Invalid MyBills Agent email address entered.")).toBeInTheDocument();
});

it("shows error with email interpolated for no.user", async () => {
    axios.post.mockResolvedValue({data: {success: false, error: "no.user"}});
    renderConsents();
    await wait();
    fireEvent.change(screen.getByLabelText("MyBills Agent Email"), {target: {value: "x@y.com"}});
    fireEvent.submit(screen.getByTestId("consent-form"));
    await wait();
    expect(screen.getByText(/x@y\.com/)).toBeInTheDocument();
});
```

### Testing Checklist

- [ ] Panel 1 is hidden when `meta.isBiller` is `false`
- [ ] Panel 1 is visible when `meta.isBiller` is `true`
- [ ] Notice Id input is hidden by default; visible when `meta.allowAgentRegistrationsFromContacts` is `true`
- [ ] Info alert ("To manage registrations...") displays correctly
- [ ] "Send Request" button POSTs `{ mybillsagentemail, noticeId, billerId }` to `/data/settings/consent`
- [ ] On success: form fields clear, table reloads
- [ ] On `invalid.email` error: "Invalid MyBills Agent email address entered." appears in panel
- [ ] On `no.user` / `pending.rego` errors: error message includes the email address
- [ ] On `max.retries` error: correct error message shows
- [ ] On network error: generic `setConsentError` message shown
- [ ] Error clears when re-submitting
- [ ] Tests pass

---

## PR 6 — Remove Authorisation + Confirm Modal

### Goal

Add the Remove button (visible for `isActive` consents) and the confirm-unauthorise modal.
Implements the full remove flow with success/error handling, data reload, and the
`tableError` display area in Panel 2.

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.js` | Remove button + modal |
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.test.js` | Remove flow tests |

### Implementation Details

Add state:

```javascript
const [confirmUnauthorise, setConfirmUnauthorise] = useState(null); // consent object | null
const [tableError, setTableError]                 = useState(null);
```

Add `handleRemoveAuthorisation`:

```javascript
const handleRemoveAuthorisation = (consent) => {
    setTableError(null);
    axios.post("/data/settings/consent/unauthorise", {id: consent.id, billerId})
        .then(({data}) => {
            if (data.success) {
                setConfirmUnauthorise(null);
                getConsents(billerId, searchTerm || null, setConsents, setMeta, setIsLoading);
            } else {
                setTableError(intl.formatMessage({id: "settings.consents.removeAuthError"}));
                setConfirmUnauthorise(null);
            }
        })
        .catch(() => setTableError(intl.formatMessage({id: "settings.consents.removeAuthError"})));
};
```

Add the table error alert in Panel 2 (above the search form):

```jsx
{tableError && <div className="alert alert-danger">{tableError}</div>}
```

In the actions `<td>`, add the Remove button before the `{/* action buttons */}` comment:

```jsx
{(consent.status === "authorised" || consent.status === "pending") && editingId !== consent.id && (
    <button type="button" className="btn btn-danger" title="Remove Authorisation"
            onClick={() => setConfirmUnauthorise(consent)}>
        <span className="glyphicon glyphicon-remove"/>
    </button>
)}
```

Add the modal below the panels (before the closing outer `<div>`). Use the `Modal` common component:

```jsx
{confirmUnauthorise && (
    <Modal
        show={true}
        title={intl.formatMessage({id: "settings.consents.unauthoriseModalHeading"})}
        onClose={() => setConfirmUnauthorise(null)}
    >
        <p>
            {intl.formatMessage({id: "settings.consents.unauthoriseModalText"}, {
                email: <strong key="email">{confirmUnauthorise.uid}</strong>
            })}
        </p>
        <div>
            <button className="btn btn-default" onClick={() => setConfirmUnauthorise(null)}>
                {intl.formatMessage({id: "settings.consents.cancel"})}
            </button>
            <button className="btn btn-danger" onClick={() => handleRemoveAuthorisation(confirmUnauthorise)}>
                {intl.formatMessage({id: "settings.consents.ok"})}
            </button>
        </div>
    </Modal>
)}
```

**Note**: Check `Modal` component's prop API in `frontend/src/components/common/Modal.js` before
implementing — the exact props (`show`, `title`, `onClose`) may differ from what is documented
in `consents.md`. Adjust to match the actual component interface.

**Note on modal body**: The Ember template used `{{{email}}}` (unescaped HTML) to bold the email.
In React, pass `<strong>{email}</strong>` as a JSX value in the `intl.formatMessage` values
object instead of using `dangerouslySetInnerHTML`.

### Tests to Include

```javascript
it("shows Remove button for active consent", async () => {
    renderConsents();
    await wait();
    expect(screen.getByTitle("Remove Authorisation")).toBeInTheDocument();
});

it("does not show Remove button for deactivated consent", async () => {
    axios.get.mockResolvedValue({data: {content: [
        {...mockConsents[0], status: "deactivated"}
    ], meta: mockMeta}});
    renderConsents();
    await wait();
    expect(screen.queryByTitle("Remove Authorisation")).not.toBeInTheDocument();
});

it("opens confirm modal when Remove clicked", async () => {
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Remove Authorisation"));
    expect(screen.getByText("MyBills Agent Registration Management Unauthorise")).toBeInTheDocument();
    expect(screen.getByText(/agent@example\.com/)).toBeInTheDocument();
});

it("closes modal on Cancel", async () => {
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Remove Authorisation"));
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("MyBills Agent Registration Management Unauthorise")).not.toBeInTheDocument();
});

it("calls POST on modal OK and reloads data", async () => {
    axios.post.mockResolvedValue({data: {success: true}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Remove Authorisation"));
    fireEvent.click(screen.getByText("OK"));
    expect(axios.post).toHaveBeenCalledWith("/data/settings/consent/unauthorise",
        {id: "1", billerId: "biller-1"});
    await wait();
    expect(axios.get).toHaveBeenCalledTimes(2); // initial load + reload
});

it("shows tableError on remove failure", async () => {
    axios.post.mockResolvedValue({data: {success: false}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Remove Authorisation"));
    fireEvent.click(screen.getByText("OK"));
    await wait();
    expect(screen.getByText(/An error occurred while updating your MyBills Agent Authorisation/))
        .toBeInTheDocument();
});
```

### Testing Checklist

- [ ] Remove button visible for `authorised` and `pending` consents
- [ ] Remove button hidden for `deactivated` and `cancelled` consents
- [ ] Remove button hidden while a row is in inline-edit mode (covered in PR 8)
- [ ] Clicking Remove opens the confirm modal
- [ ] Modal displays the agent email in bold
- [ ] Clicking Cancel closes modal without any API call
- [ ] Clicking OK POSTs `{ id, billerId }` to `/data/settings/consent/unauthorise`
- [ ] On success: modal closes, table reloads
- [ ] On failure: modal closes, `tableError` alert appears in Panel 2
- [ ] Tests pass

---

## PR 7 — Resend Authorisation

### Goal

Add the Resend button (visible for `isBiller` + `pending` consents when not editing).
Implements `resendAuthorisation` with both the generic error and the specific `max.resends`
error code.

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.js` | Resend button + handler |
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.test.js` | Resend tests |

### Implementation Details

Add `handleResend` function:

```javascript
const handleResend = (consent) => {
    setTableError(null);
    axios.post("/data/settings/consent/resend", {id: consent.id, billerId})
        .then(({data}) => {
            if (data.success) {
                // success — Ember showed a toast; in React a future alert/toast PR can handle this
                // For now, show nothing (success is silent)
            } else {
                const msg = data.error === "max.resends"
                    ? intl.formatMessage({id: "settings.consents.resendErrors.maxResends"}, {uid: consent.uid})
                    : intl.formatMessage({id: "settings.consents.resendErrorMessage"});
                setTableError(msg);
            }
        })
        .catch(() => setTableError(intl.formatMessage({id: "settings.consents.resendErrorMessage"})));
};
```

Add the Resend button in the actions `<td>` (after the Remove button):

```jsx
{meta.isBiller && consent.status === "pending" && editingId !== consent.id && (
    <button type="button" className="btn btn-default" title="Resend authorisation"
            onClick={() => handleResend(consent)}>
        <span className="glyphicon glyphicon-repeat"/>
    </button>
)}
```

**Notes**:
- `editingId` is introduced in PR 8 — in this PR use `false` as a placeholder or declare the
  state early with `useState(null)` so it does not break. Coordinate with PR 8 if developing
  sequentially.
- Resend success is intentionally silent in this PR. A future toast/alert system PR can add the
  success message ("`resendSuccess`").

### Tests to Include

```javascript
it("shows Resend button for pending consent when isBiller", async () => {
    axios.get.mockResolvedValue({data: {content: [
        {...mockConsents[0], status: "pending"}
    ], meta: mockMeta}});
    renderConsents();
    await wait();
    expect(screen.getByTitle("Resend authorisation")).toBeInTheDocument();
});

it("does not show Resend button for authorised consent", async () => {
    // mockConsents[0] has status "authorised"
    renderConsents();
    await wait();
    expect(screen.queryByTitle("Resend authorisation")).not.toBeInTheDocument();
});

it("does not show Resend button when not isBiller", async () => {
    axios.get.mockResolvedValue({data: {content: [
        {...mockConsents[0], status: "pending"}
    ], meta: {isBiller: false, allowAgentRegistrationsFromContacts: false}}});
    renderConsents();
    await wait();
    expect(screen.queryByTitle("Resend authorisation")).not.toBeInTheDocument();
});

it("calls POST on Resend click", async () => {
    axios.post.mockResolvedValue({data: {success: true}});
    axios.get.mockResolvedValue({data: {content: [
        {...mockConsents[0], status: "pending"}
    ], meta: mockMeta}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Resend authorisation"));
    expect(axios.post).toHaveBeenCalledWith("/data/settings/consent/resend",
        {id: "1", billerId: "biller-1"});
});

it("shows max.resends error with uid", async () => {
    axios.post.mockResolvedValue({data: {success: false, error: "max.resends"}});
    axios.get.mockResolvedValue({data: {content: [{...mockConsents[0], status: "pending"}], meta: mockMeta}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Resend authorisation"));
    await wait();
    expect(screen.getByText(/Maximum number of re-sends.*agent@example\.com/)).toBeInTheDocument();
});
```

### Testing Checklist

- [ ] Resend button visible only for `pending` consents when `isBiller` is true
- [ ] Resend button hidden for `authorised` consents
- [ ] Resend button hidden when `isBiller` is false
- [ ] Resend button hidden while row is in edit mode (PR 8 integration)
- [ ] Clicking Resend POSTs `{ id, billerId }` to `/data/settings/consent/resend`
- [ ] On `max.resends` error: message includes the agent's email (`uid`)
- [ ] On generic error: "An error occurred while resending..." message in Panel 2
- [ ] Tests pass

---

## PR 8 — Inline Edit (noticeId)

### Goal

Add Edit, Save, and Cancel buttons for `isBiller` + `isActive` + `allowAgentRegistrationsFromContacts`
consents. While a row is editing, the noticeId cell becomes a text input and Save/Cancel buttons
replace Edit. Saving PATCHes `/data/api/consents/:id`. Cancelling discards local changes.

### Files to Create / Modify

| Action | File | Change |
|--------|------|--------|
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.js` | Edit/Save/Cancel + inline input |
| Modify | `frontend/src/components/settings/biller/ConsentsSettings.test.js` | Inline edit tests |

### Implementation Details

Add state:

```javascript
const [editingId, setEditingId]             = useState(null);
const [editingNoticeId, setEditingNoticeId] = useState("");
```

Add `handleSave`:

```javascript
const handleSave = (consent) => {
    setTableError(null);
    axios.patch(`/data/api/consents/${consent.id}`, {noticeId: editingNoticeId, billerId})
        .then(({data}) => {
            if (data.success !== false) {
                setEditingId(null);
                setEditingNoticeId("");
                getConsents(billerId, searchTerm || null, setConsents, setMeta, setIsLoading);
            } else {
                setTableError(intl.formatMessage({id: "settings.consents.authUpdateError"}));
                setEditingId(null);
                setEditingNoticeId("");
            }
        })
        .catch(() => {
            setTableError(intl.formatMessage({id: "settings.consents.authUpdateError"}));
            setEditingId(null);
            setEditingNoticeId("");
        });
};
```

Update the noticeId `<td>` to render an input when editing:

```jsx
{meta.allowAgentRegistrationsFromContacts && (
    <td className={styles.consentcells}>
        {editingId === consent.id
            ? <input type="text" className="form-control" id="consentNoticeId"
                     value={editingNoticeId}
                     onChange={e => setEditingNoticeId(e.target.value)}/>
            : consent.noticeId}
    </td>
)}
```

Add Edit / Save / Cancel buttons in the actions `<td>` (after the Resend button):

```jsx
{meta.isBiller && (consent.status === "authorised" || consent.status === "pending") &&
 meta.allowAgentRegistrationsFromContacts && (
    editingId === consent.id ? (
        <>
            <button type="button" className="btn btn-success" title="Save"
                    onClick={() => handleSave(consent)}>
                <span className="glyphicon glyphicon-ok"/>
            </button>
            <button type="button" className="btn btn-danger" title="Cancel"
                    onClick={() => { setEditingId(null); setEditingNoticeId(""); }}>
                <span className="glyphicon glyphicon-ban-circle"/>
            </button>
        </>
    ) : (
        <button type="button" className="btn btn-default" title="Edit authorisation"
                onClick={() => { setEditingId(consent.id); setEditingNoticeId(consent.noticeId || ""); }}>
            <span className="glyphicon glyphicon-pencil"/>
        </button>
    )
)}
```

Update Remove and Resend button conditions to include `editingId !== consent.id` guard
(they should already be in place from PR 6 and PR 7 with a placeholder).

### Tests to Include

```javascript
const editMeta = {isBiller: true, allowAgentRegistrationsFromContacts: true};

it("shows Edit button when isBiller + isActive + allowAgentRegistrationsFromContacts", async () => {
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: editMeta}});
    renderConsents();
    await wait();
    expect(screen.getByTitle("Edit authorisation")).toBeInTheDocument();
});

it("does not show Edit button when allowAgentRegistrationsFromContacts is false", async () => {
    renderConsents(); // default mockMeta has allowAgentRegistrationsFromContacts: false
    await wait();
    expect(screen.queryByTitle("Edit authorisation")).not.toBeInTheDocument();
});

it("shows inline input after clicking Edit", async () => {
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: editMeta}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Edit authorisation"));
    expect(screen.getByRole("textbox", {name: /noticeId/i})).toBeInTheDocument();
    expect(screen.getByTitle("Save")).toBeInTheDocument();
    expect(screen.getByTitle("Cancel")).toBeInTheDocument();
    expect(screen.queryByTitle("Edit authorisation")).not.toBeInTheDocument();
});

it("discards changes on Cancel", async () => {
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: editMeta}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Edit authorisation"));
    fireEvent.change(screen.getByRole("textbox", {name: /noticeId/i}), {target: {value: "new-notice"}});
    fireEvent.click(screen.getByTitle("Cancel"));
    expect(screen.queryByTitle("Save")).not.toBeInTheDocument();
    expect(axios.patch).not.toHaveBeenCalled();
});

it("PATCHes noticeId on Save", async () => {
    axios.patch.mockResolvedValue({data: {}});
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: editMeta}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Edit authorisation"));
    fireEvent.change(screen.getByRole("textbox", {name: /noticeId/i}), {target: {value: "NID-001"}});
    fireEvent.click(screen.getByTitle("Save"));
    expect(axios.patch).toHaveBeenCalledWith("/data/api/consents/1",
        {noticeId: "NID-001", billerId: "biller-1"});
    await wait();
    expect(screen.queryByTitle("Save")).not.toBeInTheDocument();
});

it("shows authUpdateError on Save failure", async () => {
    axios.patch.mockRejectedValue(new Error("server error"));
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: editMeta}});
    renderConsents();
    await wait();
    fireEvent.click(screen.getByTitle("Edit authorisation"));
    fireEvent.click(screen.getByTitle("Save"));
    await wait();
    expect(screen.getByText(/An error occurred while updating/)).toBeInTheDocument();
});

it("hides Remove button while row is editing", async () => {
    axios.get.mockResolvedValue({data: {content: mockConsents, meta: editMeta}});
    renderConsents();
    await wait();
    expect(screen.getByTitle("Remove Authorisation")).toBeInTheDocument();
    fireEvent.click(screen.getByTitle("Edit authorisation"));
    expect(screen.queryByTitle("Remove Authorisation")).not.toBeInTheDocument();
});
```

### Testing Checklist

- [ ] Edit button visible only when `isBiller` + `isActive` + `allowAgentRegistrationsFromContacts`
- [ ] Edit button hidden when any of those three conditions is false
- [ ] Clicking Edit shows inline noticeId input pre-filled with current value
- [ ] Edit button replaced by Save + Cancel while editing
- [ ] Remove and Resend buttons hidden while a row is editing
- [ ] Only one row can be in edit mode at a time (clicking Edit on one row does not affect others)
- [ ] Clicking Cancel restores the noticeId text, no API call made
- [ ] Clicking Save PATCHes `{ noticeId, billerId }` to `/data/api/consents/:id`
- [ ] On PATCH success: inline input closes, table reloads with updated data
- [ ] On PATCH failure: `tableError` "An error occurred while updating..." appears in Panel 2, edit mode closes
- [ ] Tests pass

---

## Shared Testing Setup

All PRs use the same test wrapper. Define this once at the top of the test file and reuse:

```javascript
import React from "react";
import {render, fireEvent, wait} from "@testing-library/react";
import {IntlProvider} from "react-intl";
import {MemoryRouter} from "react-router-dom";
import {StateProvider} from "../../../state";
import ConsentsSettings from "./ConsentsSettings";
import messages from "../../../lang/en.json";

const renderConsents = (billerId = "biller-1") =>
    render(
        <MemoryRouter>
            <IntlProvider locale="en" messages={messages}>
                <StateProvider initialState={{biller: {id: billerId}}}>
                    <ConsentsSettings billerId={billerId}/>
                </StateProvider>
            </IntlProvider>
        </MemoryRouter>
    );
```

**Library note**: This project uses `@testing-library/react`. Check the installed version:
- v9.x: use `wait()` (no-arg)
- v10+: use `waitFor(() => ...)` with an assertion

Check `package.json` before writing async test helpers.

---

## Final Verification Checklist

After all 8 PRs are merged:

- [ ] Consents tab renders in React for both biller and payer account types
- [ ] `isEmber: true` entries for consents are fully removed from `SettingsShell.js`
- [ ] No Ember JS files were modified (migration is React-only)
- [ ] All 38 i18n keys present in both `en.json` and `fr.json`
- [ ] All 5 API endpoints called correctly: GET consents, POST consent, POST unauthorise, POST resend, PATCH consent
- [ ] Biller-only features (Panel 1, Resend, Edit) hidden on payer accounts
- [ ] `allowAgentRegistrationsFromContacts` features (Notice Id column, Edit/Save/Cancel) toggled correctly
- [ ] Inline edit: only one row editable at a time, Remove/Resend hidden during edit
- [ ] Modal: email appears in bold, Cancel does not make API call
- [ ] Dates render with both date and time (not date-only)
- [ ] Empty state `colSpan` is dynamic (6 or 7 depending on Notice Id column)
- [ ] All tests pass (`npm test`)
- [ ] No TypeScript/lint errors
