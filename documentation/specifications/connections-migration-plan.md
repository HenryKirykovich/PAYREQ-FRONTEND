# Connections Settings — Migration Plan

> **Spec:** [connections.md](connections.md)
> **Source:** `customer#/biller/:id/settings/connections` (EmberJS)
> **Target:** `/portal/customer/biller/:billerId/settings/connections/view` (React)
> **Created:** 2026-04-14

---

## Overview

This migration is split into **5 small PRs**, each under 400 lines changed. Each PR is independently testable and builds on the previous one.

| PR | Title | Estimated Lines | Dependencies |
|----|-------|-----------------|-------------|
| PR 1 | Scaffold + routing + data fetching | ~200 | None |
| PR 2 | Xero connection panel | ~250 | PR 1 |
| PR 3 | MYOB connection panel | ~250 | PR 1 |
| PR 4 | Reckon connection panel (with form) | ~350 | PR 1 |
| PR 5 | PropertyMe panel + disconnect modal + cleanup | ~300 | PR 1 |

---

## PR 1: Scaffold, Routing & Data Fetching

**Goal:** Create the skeleton component, wire up routing, fetch connections data, render section headings with empty panels.

### Files to Create
| File | Purpose | ~Lines |
|------|---------|--------|
| `components/settings/connections/index.js` | Data fetcher (useEffect + axios) | ~40 |
| `components/settings/connections/ConnectionsView.js` | Layout with 2 section headings, accordion placeholders | ~60 |
| `components/settings/connections/ConnectionsView.module.scss` | Base styles | ~40 |

### Files to Modify
| File | Change | ~Lines |
|------|--------|--------|
| `routes/SettingsShell.js` | Add import + route `connections/view` | +10 |
| `routes/SettingsShell.js` | Update `getMyBillsSettingsTabs`: `isEmber: false`, update `linkTo` | ~5 |
| `lang/en.json` | Add base i18n keys (headings, status labels) | +15 |
| `lang/fr.json` | Add French equivalents | +15 |

### Implementation Details

**`index.js`** — Data fetcher:
```jsx
// API calls:
// 1. GET /data/settings/biller?billerId={id}  → billerSettings (for myobEnabled)
// 2. GET /connections?billerId={id}            → connections data
// Note: billerSettings is already loaded in SettingsShell and passed as context.
//       Only /connections needs a new call.
// Pattern: same as ContactDetailsSettings.js

const ConnectionsSettings = ({billerId}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [connections, setConnections] = useState();
    // useEffect → axios.get("/connections", {params: {billerId}})
    // Pass connections + reload function to view
};
```

**`ConnectionsView.js`** — Layout:
```jsx
// Two sections:
// <h2>Accounting Software Connections</h2>
//   - Xero placeholder
//   - MYOB placeholder (conditional on myobEnabled)
//   - Reckon placeholder
// <h2>Property Management Software Connections</h2>
//   - PropertyMe placeholder
```

**`SettingsShell.js`** — Route + tab:
```jsx
// In getMyBillsSettingsTabs, change:
{isEmber: true, linkTo: "biller.settings.connections", name: "connections"}
// To:
{isEmber: false, linkTo: "/portal/customer/biller/" + billerId + "/settings/connections/view", name: "connections"}

// Add route:
<Route path={`${match.url}/connections/view`}>
    <ConnectionsSettings billerId={biller.id}/>
</Route>
```

### i18n Keys (PR 1)
```json
"connections.heading.sme": "Accounting Software Connections",
"connections.heading.agents": "Property Management Software Connections",
"connections.status.connected": "Connected",
"connections.status.reconnect": "Reconnection required",
"connections.status.disconnected": "Disconnected",
"connections.disconnect": "Disconnect",
"connections.cancel": "Cancel",
"connections.or": "OR",
"connections.connectionDate": "Connected Since"
```

### Testing
- [ ] Navigate to Settings → Connections tab renders React page (not Ember)
- [ ] Section headings visible
- [ ] Loading spinner while data fetches
- [ ] No console errors

### Estimated Total: ~185 lines

---

## PR 2: Xero Connection Panel

**Goal:** Implement full Xero panel — connected state, disconnected state, status badges, connect (OAuth redirect), disconnect (with modal).

### Files to Create
| File | Purpose | ~Lines |
|------|---------|--------|
| `components/settings/connections/XeroConnection.js` | Xero panel with both states | ~120 |
| `components/settings/connections/ConfirmDisconnectModal.js` | Reusable disconnect modal | ~50 |

### Files to Modify
| File | Change | ~Lines |
|------|--------|--------|
| `ConnectionsView.js` | Import + render XeroConnection | +5 |
| `lang/en.json` | Xero i18n keys | +15 |
| `lang/fr.json` | French Xero keys | +15 |

### Implementation Details

**`XeroConnection.js`** — Two states:

**Connected:**
```
┌─ Accordion: "Xero" + [Connected ✓] badge ──────────┐
│  ⚠ Alert (if connectionError)                       │
│  Connected Since: {date}                             │
│  Partner Status: {status}                            │
│  [Disconnect] (danger button → opens modal)          │
│  [Reconnect image] (if needsAttention)               │
└──────────────────────────────────────────────────────┘
```

**Disconnected:**
```
┌─ Accordion: "Xero" + [Disconnected ✗] badge ───────┐
│  ℹ Usage info (ordered list, 5 items)                │
│  [xero-connect-blue.svg button → OAuth]              │
└──────────────────────────────────────────────────────┘
```

**`ConfirmDisconnectModal.js`** — Reusable across all 4 providers:
```jsx
// Props: show, provider, message, onConfirm, onCancel
// Uses react-bootstrap Modal
// Buttons: [Cancel] [Disconnect (bsStyle="danger")]
```

**API calls in XeroConnection:**
```
Connect:    GET /data/settings/xero/{billerId}/connecttoxero/1/settings
            → window.top.location.href = response.requesttoken.uri

Disconnect: POST /data/settings/xero/disconnect/{id}
            → call onReload() prop to refresh data
```

### i18n Keys (PR 2)
```json
"connections.xero.product": "Xero",
"connections.xero.authorisationIssue": "There is an authorisation issue with this Xero connection. Please reconnect.",
"connections.xero.connectionIssue": "There is an issue with this Xero connection.",
"connections.xero.partnerStatus": "Partner Status",
"connections.xero.usageHeader": "How to use Xero Connect",
"connections.xero.usageMessage1": "Connect your Xero account using the button below.",
"connections.xero.usageMessage2": "Subscribe your accounts to receive bills via Xero.",
"connections.xero.usageMessage3": "Bills will be sent to Xero as draft invoices.",
"connections.xero.usageMessage4": "Approve the invoices in Xero to complete the process.",
"connections.xero.usageMessage5": "For more information, see the Help Guide.",
"connections.xero.disconnectMessage": "Disconnect from Xero",
"connections.xero.modalMessage": "Are you sure you want disconnect from <strong>Xero</strong>? All Xero Connect subscriptions will be de-activated."
```

### Testing
- [ ] Xero panel shows with correct status badge
- [ ] Connect button redirects to Xero OAuth
- [ ] Disconnect opens modal → confirm → API call → panel refreshes
- [ ] Error alerts show when connectionError present
- [ ] Reconnect button appears when needsAttention

### Estimated Total: ~205 lines

---

## PR 3: MYOB Connection Panel

**Goal:** Implement MYOB panel — conditional visibility (myobEnabled), product dropdown, connected/disconnected states.

### Files to Create
| File | Purpose | ~Lines |
|------|---------|--------|
| `components/settings/connections/MyobConnection.js` | MYOB panel with product select | ~130 |

### Files to Modify
| File | Change | ~Lines |
|------|--------|--------|
| `ConnectionsView.js` | Import + conditional render MyobConnection | +5 |
| `lang/en.json` | MYOB i18n keys | +15 |
| `lang/fr.json` | French MYOB keys | +15 |

### Implementation Details

**`MyobConnection.js`** — Two states:

**Connected:**
```
┌─ Accordion: "MYOB" + [Connected ✓] badge ──────────┐
│  ⚠ Alert (if needsAttention)                        │
│  MYOB User Name: {name}                             │
│  MYOB Product: {extraInfo1}                          │
│  Connected Since: {date}                             │
│  [Disconnect] (danger) [Reconnect] (if needsAttention)│
└──────────────────────────────────────────────────────┘
```

**Disconnected:**
```
┌─ Accordion: "MYOB" + [Disconnected ✗] badge ───────┐
│  ℹ Usage info (5 items)                              │
│  Product dropdown: [AccountRight | Essentials AU/NZ] │
│  [Connect to MYOB] (primary button)                  │
└──────────────────────────────────────────────────────┘
```

**Product options (constant):**
```js
const MYOB_PRODUCTS = [
    {id: "3", name: "MYOB AccountRight"},
    {id: "1", name: "MYOB Essentials AU"},
    {id: "2", name: "MYOB Essentials NZ"}
];
```

**Conditional visibility:**
```jsx
// In ConnectionsView.js:
{myobEnabled && <MyobConnection ... />}
```

**API calls:**
```
Connect:    GET /data/settings/myob/{billerId}/connecttomyob/1/settings?product={productId}
            → window.top.location.href = response.requesttoken.uri

Disconnect: POST /data/settings/myob/disconnect/{id}
            → call onReload()
```

### Testing
- [ ] Panel hidden when myobEnabled is false
- [ ] Product dropdown defaults to "MYOB AccountRight" (id: "3")
- [ ] Connect with each product option
- [ ] Disconnect flow with modal
- [ ] Reconnect button when needsAttention

### Estimated Total: ~165 lines

---

## PR 4: Reckon Connection Panel (with inline form)

**Goal:** Implement Reckon panel — the most complex provider with inline country/file/user/pass form for both connect and update.

### Files to Create
| File | Purpose | ~Lines |
|------|---------|--------|
| `components/settings/connections/ReckonConnection.js` | Reckon panel with inline form | ~220 |

### Files to Modify
| File | Change | ~Lines |
|------|--------|--------|
| `ConnectionsView.js` | Import + render ReckonConnection | +3 |
| `lang/en.json` | Reckon i18n keys | +20 |
| `lang/fr.json` | French Reckon keys | +20 |

### Implementation Details

**`ReckonConnection.js`** — Two states with shared form:

**Connected:**
```
┌─ Accordion: "Reckon Accounts Hosted" + badge ───────┐
│  ⚠ Alert (if connectionError)                        │
│  Connected Since: {date}                             │
│  [Reconnect image] (if needsAttention)               │
│  ────────── OR ──────────                            │
│  Country:      [Australia ▼]                         │
│  ℹ Warning message (HTML, country-dependent)         │
│  Company File: [_______________]                     │
│  Username:     [_______________]                     │
│  Password:     [_______________]                     │
│  [Update Reckon Connection] [Disconnect (danger)]    │
└──────────────────────────────────────────────────────┘
```

**Disconnected:**
```
┌─ Accordion: "Reckon" + [Disconnected ✗] badge ─────┐
│  ℹ Usage info (6 items)                              │
│  Country:      [Australia ▼]                         │
│  ℹ Warning message                                   │
│  Company File: [_______________]                     │
│  Username:     [_______________]                     │
│  Password:     [_______________]                     │
│  [reckon-connect-button.png → connect]               │
└──────────────────────────────────────────────────────┘
```

**Country options:**
```js
const RECKON_COUNTRIES = [
    {id: "Australia", name: "Australia"},
    {id: "New Zealand", name: "New Zealand"}
];
```

**Form state:** `useState` for `country`, `companyFile`, `username`, `password`

**API calls:**
```
Connect:    GET /data/settings/reckon/{billerId}/connecttoreckon/1/settings
              ?reckonCountry={country}
              &reckonCompanyFile={file}
              &reckonApiUsername={user}
              &reckonApiPassword={pass}
            → window.top.location.href = response.requesttoken.uri

Update:     POST /data/settings/reckon/update/{id}
            body: {country, companyFile, username, password}
            → call onReload()

Disconnect: POST /data/settings/reckon/disconnect/{id}
            → call onReload()
```

**Country-dependent warnings:** Rendered as HTML (dangerouslySetInnerHTML) per Ember pattern. Contains links to external Reckon docs.

### Testing
- [ ] Form renders with default country "Australia"
- [ ] Warning messages change when switching country
- [ ] Connect with all form fields filled
- [ ] Update existing connection (connected state)
- [ ] Disconnect flow with modal
- [ ] OR divider shows between reconnect image and form (needsAttention)
- [ ] Error alerts display correctly

### Estimated Total: ~263 lines

---

## PR 5: PropertyMe Panel + Final Cleanup

**Goal:** Implement PropertyMe panel, verify all 4 providers work together, remove Ember route fallback.

### Files to Create
| File | Purpose | ~Lines |
|------|---------|--------|
| `components/settings/connections/PropertyMeConnection.js` | PropertyMe panel | ~90 |

### Files to Modify
| File | Change | ~Lines |
|------|--------|--------|
| `ConnectionsView.js` | Import + render PropertyMeConnection in agents section | +3 |
| `lang/en.json` | PropertyMe i18n keys | +15 |
| `lang/fr.json` | French PropertyMe keys | +15 |

### Implementation Details

**`PropertyMeConnection.js`** — Two states:

**Connected:**
```
┌─ Accordion: "PropertyMe" + [Connected ✓] badge ────┐
│  ⚠ Alert (if needsAttention)                        │
│  Connected Since: {date}                             │
│  [Disconnect] [Reconnect] (if needsAttention)        │
└──────────────────────────────────────────────────────┘
```

**Disconnected:**
```
┌─ Accordion: "PropertyMe" + [Disconnected ✗] badge ─┐
│  ℹ Usage info (5 lines)                             │
│  [Connect to PropertyMe] (primary button)            │
└──────────────────────────────────────────────────────┘
```

**API calls:**
```
Connect:    GET /data/settings/propertyme/{billerId}/connecttopropertyme/1/settings
            → window.top.location.href = response.requesttoken.uri

Disconnect: POST /data/settings/propertyme/disconnect/{id}
            → call onReload()
```

### Final Cleanup
- [ ] Verify all 4 panels render correctly together
- [ ] Verify accordion expand/collapse for each panel
- [ ] Verify status badges update after connect/disconnect
- [ ] Remove any `TODO` comments from previous PRs
- [ ] Run through complete WCAG 2.1 AA check:
  - Keyboard navigation (Tab through all panels, buttons, form fields)
  - Aria labels on connect/disconnect buttons
  - Focus returns to trigger after modal close
  - Color contrast on status badges

### Testing (full integration)
- [ ] All 4 panels visible (MYOB conditional on myobEnabled)
- [ ] Each provider: connect → redirect → return → shows connected
- [ ] Each provider: disconnect → modal → confirm → shows disconnected
- [ ] Reckon: update connection with new credentials
- [ ] Tab navigation works (Connections tab active, click others → Ember)
- [ ] Mobile responsive (panels stack, form fields full width)

### Estimated Total: ~123 lines (+ testing overhead)

---

## Dependency Graph

```
PR 1 (scaffold + routing)
 ├── PR 2 (Xero + modal)
 ├── PR 3 (MYOB)
 ├── PR 4 (Reckon + form)
 └── PR 5 (PropertyMe + cleanup)
```

PRs 2–5 each depend on PR 1 but are **independent of each other**. They can be developed in parallel after PR 1 merges, or sequentially stacked.

---

## Total Estimated Lines

| PR | New Files | Modified Files | Total ~Lines |
|----|-----------|---------------|-------------|
| PR 1 | 3 | 4 | ~185 |
| PR 2 | 2 | 3 | ~205 |
| PR 3 | 1 | 3 | ~165 |
| PR 4 | 1 | 3 | ~263 |
| PR 5 | 1 | 3 | ~123 |
| **Total** | **8** | **—** | **~941** |

---

## Git Branch Strategy

```
main
 └── feature/incoming-channels
      └── feature/ember-to-react/connections
           ├── PR 1: connections-scaffold
           ├── PR 2: connections-xero
           ├── PR 3: connections-myob
           ├── PR 4: connections-reckon
           └── PR 5: connections-propertyme
```

Each PR merges into `feature/ember-to-react/connections`. When all 5 are merged, the feature branch merges into `feature/incoming-channels` → then into `main`.
