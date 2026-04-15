# Connections Settings — Migration Specification

> **Source:** `customer#/biller/:id/settings/connections` (EmberJS)
> **Target:** `/portal/customer/biller/:billerId/settings/connections` (React)
> **Extracted:** 2026-04-14

---

## 1. Screen Overview

The Connections settings page allows **payer/recipient** users (`incoming-invoice` system type) to manage integrations with external accounting and property management software. It appears as the **first tab** in Settings for these users.

### Visibility Rule
- **Shown for:** `incoming-invoice` billers only (payer/recipient role)
- **Tab position:** First tab (index 0) in Settings nav pills
- **Tab label:** "Connections" (`settings.tab.title.connections`)

### Current React Integration
The tab is already registered in `SettingsShell.js` → `getMyBillsSettingsTabs()` as:
```js
{isEmber: true, linkTo: "biller.settings.connections", name: "connections"}
```
This needs to change to `{isEmber: false, linkTo: "...", name: "connections"}` once migrated.

---

## 2. Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Settings Tab Bar (nav-pills)                   │
│  [Connections] [Users] [Consents] [Forwarding]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  <h2> Accounting Software Connections </h2>     │
│                                                 │
│  ┌─ Xero (Collapsible Panel) ──────────────┐   │
│  │  Header: "Xero" + Status Badge          │   │
│  │  Body: Connected info OR Connect form   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─ MYOB (Collapsible Panel) ──────────────┐   │
│  │  (only if model.myobEnabled)             │   │
│  │  Header: "MYOB" + Status Badge          │   │
│  │  Body: Connected info OR Connect form   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  ┌─ Reckon (Collapsible Panel) ────────────┐   │
│  │  Header: "Reckon Accounts Hosted" + Badge│   │
│  │  Body: Connected info OR Connect form   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  <h2> Property Management Software </h2>       │
│                                                 │
│  ┌─ PropertyMe (Collapsible Panel) ────────┐   │
│  │  Header: "PropertyMe" + Status Badge    │   │
│  │  Body: Connected info OR Connect form   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 3. Data Model

### API: Load Connections
```
GET /data/settings/biller?billerId={billerId}   → billerSettings (includes myobEnabled)
GET /connections?billerId={billerId}             → Connection model
```

### Connection Model Fields
```typescript
interface ConnectionsData {
  xeroConnection: ConnectionDetail[];
  myobConnection: ConnectionDetail[];
  myobEnabled: boolean;
  reckonConnection: ConnectionDetail[];
  propertymeConnection: ConnectionDetail[];
}

interface ConnectionDetail {
  id: string;
  connectedDate: string;          // ISO date
  needsAttention: boolean;        // true if reconnection required
  connectionError: string | null; // "authorisation" | other | null
  partnerStatus: string;
  name: string;                   // e.g. MYOB username
  extraInfo1: string;             // e.g. MYOB product name
  extraInfo2: string;
  country: string;                // Reckon only
  company: string;                // Reckon only — company file name
}
```

---

## 4. Provider Specifications

### 4.1 Xero

**Status Badges:**
| State | Badge | Color |
|-------|-------|-------|
| Connected, no issues | "Connected ✓" | Green (`label-success`) |
| Connected, needs attention | "Reconnection required ✗" | Yellow (`label-warning`) |
| Not connected | "Disconnected ✗" | Red (`label-danger`) |

**Connected State:**
- If `connectionError === "authorisation"`: Alert danger — "There is an authorisation issue..."
- If `connectionError` (other): Alert danger — "There is an issue..."
- Display: Connected Since (`connectedDate`), Partner Status (`partnerStatus`)
- Disconnect button (btn-danger) → opens confirm modal
- If `needsAttention`: Show reconnect image button (`xero-connect-blue.svg`)

**Disconnected State:**
- Info alert with usage description (5 messages in ordered list)
- Centered Xero Connect image button (`xero-connect-blue.svg`) → triggers OAuth

**Connect Action:**
```
GET /data/settings/xero/{billerId}/connecttoxero/1/settings
→ response: { requesttoken: { uri: "https://..." } }
→ window.top.location.href = uri    (full page redirect to Xero OAuth)
```

**Disconnect Action:**
```
POST /data/settings/xero/disconnect/{connectionId}
→ on success: reload connections data
```

**Disconnect Modal:**
- Title: "Disconnect from Xero"
- Body: "Are you sure you want disconnect from **Xero**? All Xero Connect subscriptions will be de-activated."
- Buttons: [Cancel] [Disconnect (danger)]

---

### 4.2 MYOB

**Visibility:** Only shown when `myobEnabled === true`

**Connected State:**
- If `needsAttention`: Alert warning — "There is an issue..."
- Display: MYOB User Name (`name`), MYOB Product (`extraInfo1`), Connected Since (`connectedDate`)
- Disconnect button → confirm modal
- If `needsAttention`: Reconnect button → `connectToMyob()`

**Disconnected State:**
- Info alert with usage description (5 messages)
- Product dropdown with options:
  - `{id: "3", name: "MYOB AccountRight"}` (default)
  - `{id: "1", name: "MYOB Essentials AU"}`
  - `{id: "2", name: "MYOB Essentials NZ"}`
- "Connect to MYOB" primary button → triggers OAuth

**Connect Action:**
```
GET /data/settings/myob/{billerId}/connecttomyob/1/settings?product={productId}
→ response: { requesttoken: { uri: "https://..." } }
→ window.top.location.href = uri
```

**Disconnect Action:**
```
POST /data/settings/myob/disconnect/{connectionId}
→ on success: reload connections data
```

**Disconnect Modal:**
- Title: "Disconnect from MYOB"
- Body: "Are you sure you want disconnect from **MYOB**? All MYOB subscriptions will be de-activated."
- Buttons: [Cancel] [Disconnect (danger)]

---

### 4.3 Reckon Accounts Hosted

**Connected State:**
- If `connectionError === "authorisation"`: Alert danger — authorization issue
- If `connectionError` (other): Alert danger — connection issue
- Display: Connected Since (`connectedDate`)
- If `needsAttention`: Reconnect image button (`reckon-connect-button.png`) + "OR" divider
- **Inline Update Form** (unique to Reckon):
  - Country dropdown: `[{id: "Australia", name: "Australia"}, {id: "New Zealand", name: "New Zealand"}]`
  - Warning messages (HTML content with links):
    - AU: "For Australian accounts, you need to open your firewall..."
    - NZ: "For New Zealand accounts, you need Hosted by Reckon..."
  - Company File input (text)
  - Username input (text)
  - Password input (password)
  - Buttons: [Update Reckon Connection (primary)] [Disconnect (danger)]

**Disconnected State:**
- Info alert with usage description (6 messages)
- Form: Country dropdown, warning messages, Company File, Username, Password
- Reckon Connect image button (`reckon-connect-button.png`) → triggers connection

**Connect Action:**
```
GET /data/settings/reckon/{billerId}/connecttoreckon/1/settings?reckonCountry={country}&reckonCompanyFile={file}&reckonApiUsername={user}&reckonApiPassword={pass}
→ response: { requesttoken: { uri: "https://..." } }
→ window.top.location.href = uri
```

**Update Action (connected only):**
```
POST /data/settings/reckon/update/{connectionId}
body: { country, companyFile, username, password }
→ on success: reload connections data
```

**Disconnect Action:**
```
POST /data/settings/reckon/disconnect/{connectionId}
→ on success: reload connections data
```

**Disconnect Modal:**
- Title: "Disconnect from Reckon"
- Body: "Are you sure you want disconnect from **Reckon**? All Reckon subscriptions will be de-activated."
- Buttons: [Cancel] [Disconnect (danger)]

---

### 4.4 PropertyMe

**Connected State:**
- If `needsAttention`: Alert warning — needs attention message
- Display: Connected Since (`connectedDate`)
- Disconnect button → confirm modal
- If `needsAttention`: Reconnect button → `connectToPropertyMe()`

**Disconnected State:**
- Info alert with usage description (5 lines)
- "Connect to PropertyMe" primary button → triggers OAuth

**Connect Action:**
```
GET /data/settings/propertyme/{billerId}/connecttopropertyme/1/settings
→ response: { requesttoken: { uri: "https://..." } }
→ window.top.location.href = uri
```

**Disconnect Action:**
```
POST /data/settings/propertyme/disconnect/{connectionId}
→ on success: reload connections data
```

**Disconnect Modal:**
- Title: "Disconnect from PropertyMe"
- Body: "Are you sure you want disconnect from **PropertyMe**? All PropertyMe forwarding rules will be removed."
- Buttons: [Cancel] [Disconnect (danger)]

---

## 5. API Summary

| Action | Method | Endpoint |
|--------|--------|----------|
| Load settings | GET | `/data/settings/biller?billerId={id}` |
| Load connections | GET | `/connections?billerId={id}` |
| Connect Xero | GET | `/data/settings/xero/{billerId}/connecttoxero/1/settings` |
| Connect MYOB | GET | `/data/settings/myob/{billerId}/connecttomyob/1/settings?product={id}` |
| Connect Reckon | GET | `/data/settings/reckon/{billerId}/connecttoreckon/1/settings?reckonCountry=...&reckonCompanyFile=...&reckonApiUsername=...&reckonApiPassword=...` |
| Connect PropertyMe | GET | `/data/settings/propertyme/{billerId}/connecttopropertyme/1/settings` |
| Disconnect Xero | POST | `/data/settings/xero/disconnect/{id}` |
| Disconnect MYOB | POST | `/data/settings/myob/disconnect/{id}` |
| Disconnect Reckon | POST | `/data/settings/reckon/disconnect/{id}` |
| Disconnect PropertyMe | POST | `/data/settings/propertyme/disconnect/{id}` |
| Update Reckon | POST | `/data/settings/reckon/update/{id}` |

---

## 6. i18n Keys Required

### English (en.json additions needed)
```json
"connections.heading.sme": "Accounting Software Connections",
"connections.heading.agents": "Property Management Software Connections",
"connections.status.connected": "Connected",
"connections.status.reconnect": "Reconnection required",
"connections.status.disconnected": "Disconnected",
"connections.disconnect": "Disconnect",
"connections.cancel": "Cancel",
"connections.or": "OR",
"connections.connectionDate": "Connected Since",

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
"connections.xero.modalMessage": "Are you sure you want disconnect from <strong>Xero</strong>? All Xero Connect subscriptions will be de-activated.",

"connections.myob.product": "MYOB",
"connections.myob.authorisationIssue": "There is an issue with this MYOB connection.",
"connections.myob.usernameDetailLabel": "MYOB User Name",
"connections.myob.productDetailLabel": "MYOB Product",
"connections.myob.reconnectButton": "Reconnect to MYOB",
"connections.myob.usageHeading": "How to use MYOB Integration",
"connections.myob.usageMessage1": "Connect your MYOB account using the button below.",
"connections.myob.usageMessage2": "Subscribe your accounts to receive bills via MYOB.",
"connections.myob.usageMessage3": "Bills will be sent to your MYOB account.",
"connections.myob.usageMessage4": "Approve the bills in MYOB to complete the process.",
"connections.myob.usageMessage5": "For more information, see the Help Guide.",
"connections.myob.productLabel": "MYOB Product",
"connections.myob.connectButton": "Connect to MYOB",
"connections.myob.disconnectMessage": "Disconnect from MYOB",
"connections.myob.modalMessage": "Are you sure you want disconnect from <strong>MYOB</strong>? All MYOB subscriptions will be de-activated.",

"connections.reckon.product": "Reckon Accounts Hosted",
"connections.reckon.authorisationIssue": "There is an authorisation issue with this Reckon connection. Please reconnect.",
"connections.reckon.unableToConnect": "Unable to connect to Reckon.",
"connections.reckon.disconnectMessage": "Disconnect from Reckon",
"connections.reckon.usageHeading": "How to use Reckon Accounts Hosted Integration",
"connections.reckon.usageMessage1": "Connect your Reckon account using the form below.",
"connections.reckon.usageMessage2": "Subscribe your accounts to receive bills via Reckon.",
"connections.reckon.usageMessage3": "Bills will be sent to your Reckon account as supplier invoices.",
"connections.reckon.usageMessage4": "Approve the invoices in Reckon.",
"connections.reckon.usageMessage5": "For more information, see the Help Guide.",
"connections.reckon.usageMessage6": "Note: Your company file must be accessible online.",
"connections.reckon.productCountry": "Country",
"connections.reckon.companyFile": "Company File",
"connections.reckon.companyFileUsername": "Username",
"connections.reckon.companyFilePassword": "Password",
"connections.reckon.modalMessage": "Are you sure you want disconnect from <strong>Reckon</strong>? All Reckon subscriptions will be de-activated.",
"connections.reckon.updateMessage": "Update Reckon Connection",

"connections.propertyMe.product": "PropertyMe",
"connections.propertyMe.reconnect": "Reconnect to PropertyMe",
"connections.propertyMe.needsAttention": "This PropertyMe connection needs attention.",
"connections.propertyMe.usageHeading": "How to use PropertyMe Integration",
"connections.propertyMe.usageLine1": "Connect your PropertyMe account using the button below.",
"connections.propertyMe.usageLine2": "Set up forwarding rules to receive property documents.",
"connections.propertyMe.usageLine3": "Documents will be sent to PropertyMe automatically.",
"connections.propertyMe.usageLine4": "Manage your rules in the Forwarding Rules tab.",
"connections.propertyMe.usageLine5": "For more information, see the Help Guide.",
"connections.propertyMe.button": "Connect to PropertyMe",
"connections.propertyMe.buttonDisconnect": "Disconnect from PropertyMe",
"connections.propertyMe.modalMessage": "Are you sure you want disconnect from <strong>PropertyMe</strong>? All PropertyMe forwarding rules will be removed."
```

---

## 7. Assets Available in React

| Asset | Path |
|-------|------|
| Xero Connect button | `frontend/src/resources/images/oauthButtons/xero-connect-blue.svg` |
| Reckon Connect button | `frontend/src/resources/images/oauthButtons/reckon-connect-button.png` |
| MYOB Connect button | `frontend/src/resources/images/oauthButtons/MYOB-connect-purple.png` |

No image for PropertyMe — uses text button.

---

## 8. React Component Plan

```
frontend/src/components/settings/connections/
├── index.js                          # Data fetcher (API calls, state)
├── ConnectionsView.js                # Main layout with 2 sections
├── ConnectionsView.module.scss       # Styles
├── ConnectionPanel.js                # Reusable collapsible panel wrapper
├── XeroConnection.js                 # Xero-specific content
├── MyobConnection.js                 # MYOB-specific content
├── ReckonConnection.js               # Reckon-specific content (with form)
├── PropertyMeConnection.js           # PropertyMe-specific content
└── ConfirmDisconnectModal.js         # Reusable disconnect confirmation modal
```

### Key Patterns
- Use `<Accordion>` from `../../common` for collapsible panels
- Use `<Label>` for status badges (SUCCESS/WARNING/DANGER)
- Reuse `ConfirmDisconnectModal` with props: `provider`, `message`, `onConfirm`, `onCancel`
- OAuth connect: GET endpoint → redirect `window.top.location.href`
- All disconnect: POST → reload data via state setter

### SettingsShell.js Changes Required
1. Add route: `<Route path={\`${match.url}/connections/view\`}><ConnectionsSettings billerId={biller.id}/></Route>`
2. Update `getMyBillsSettingsTabs`: change `isEmber: true` → `isEmber: false`, update `linkTo` path

---

## 9. CSS Specifications

```scss
// Panel header with status badge
.panelHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1.8rem;
}

// Connection button container (centered OAuth buttons)
.connectionButtonContainer {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

// OR divider between reconnect and update form
.orDivider {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid black;
  line-height: 0.1em;
  margin: 10px 0 20px;
  span {
    color: black;
    padding: 0 10px;
    background: white;
  }
}

// Detail row
.detailRow {
  margin-bottom: 0.5rem;
}
```

---

## 10. Migration Checklist

- [ ] Create `frontend/src/components/settings/connections/` directory
- [ ] Create `index.js` — data fetcher with `useEffect` for connections API
- [ ] Create `ConnectionsView.js` — main layout with sections
- [ ] Create `XeroConnection.js` — connected/disconnected states
- [ ] Create `MyobConnection.js` — with product dropdown
- [ ] Create `ReckonConnection.js` — with inline form (country, file, user, pass)
- [ ] Create `PropertyMeConnection.js` — connect/disconnect
- [ ] Create `ConfirmDisconnectModal.js` — reusable modal
- [ ] Create `ConnectionsView.module.scss` — styles
- [ ] Add i18n keys to `en.json` and `fr.json`
- [ ] Add route in `SettingsShell.js`
- [ ] Update tab config: `isEmber: false` in `getMyBillsSettingsTabs()`
- [ ] Copy exact i18n strings from Ember `nls/root/settings.js` and `nls/fr/settings.js`
- [ ] Test all 4 connect flows (OAuth redirect)
- [ ] Test all 4 disconnect flows (modal + API)
- [ ] Test Reckon update connection flow
- [ ] Verify conditional MYOB panel (myobEnabled)
- [ ] Verify status badges (connected/reconnect/disconnected)
- [ ] WCAG 2.1 AA: keyboard navigation, aria labels, focus management on modal

---

# Extract Specifications Template

> **Purpose:** Use this template to extract complete migration specifications from any EmberJS screen before converting to React. Copy and fill in all sections.

---

## Screen: [NAME]

> **Source URL:** `customer#/biller/:id/...` (EmberJS)
> **Target URL:** `/portal/customer/biller/:billerId/...` (React)
> **Extracted:** [DATE]

---

### 1. Overview
- **What does this screen do?** [Brief description]
- **Who sees it?** [User role: payer, biller, both]
- **How is it accessed?** [Tab, link, direct URL]
- **Visibility rules:** [Conditional display logic]

---

### 2. Source Files (Ember)
| File | Purpose |
|------|---------|
| `frontend-ember/src/js/[name].js` | Route, controller, model |
| `frontend-ember/src/js/templates/[name].html` | Template |
| `frontend-ember/src/js/nls/root/[name].js` | English i18n |
| `frontend-ember/src/js/nls/fr/[name].js` | French i18n |
| `frontend-ember/src/css/payreq.css` | Styles |

---

### 3. Data Model
```typescript
interface ScreenData {
  // Define all fields from Ember model
}
```

---

### 4. API Endpoints
| Action | Method | Endpoint | Request | Response |
|--------|--------|----------|---------|----------|
| Load | GET | `/data/...` | params | shape |
| Submit | POST | `/data/...` | body | shape |

---

### 5. UI Layout
```
[ASCII diagram of the screen structure]
```

---

### 6. Component States
For each distinct state the screen can be in:

**State: [name]**
- Condition: [when this state is shown]
- Elements: [what is rendered]
- Actions: [user interactions available]

---

### 7. User Interactions
| Interaction | Trigger | API Call | Result |
|-------------|---------|----------|--------|
| Click button | onClick | POST /... | Navigate to / Show modal / Reload |

---

### 8. i18n Keys
List ALL translation keys used, with English values:
```json
{
  "key": "English value"
}
```

---

### 9. Styles / CSS
- List key CSS classes from Ember
- Note any Bootstrap classes used
- Describe responsive behavior

---

### 10. Assets
| Asset | Source path | Already in React? |
|-------|-----------|-------------------|

---

### 11. Existing React Components to Reuse
| Component | Path | Usage |
|-----------|------|-------|
| `<Accordion>` | `common/` | Collapsible sections |
| `<Label>` | `common/` | Status badges |

---

### 12. Edge Cases & Business Logic
- [Special conditions, error handling, computed properties]

---

### 13. Proposed React Structure
```
frontend/src/components/[area]/
├── index.js
├── [Name]View.js
├── [Name]View.module.scss
└── [SubComponent].js
```

---

### 14. Migration Checklist
- [ ] Create component files
- [ ] Add API calls
- [ ] Add i18n keys (en.json + fr.json)
- [ ] Add route in Shell
- [ ] Update tab/nav config (isEmber → false)
- [ ] Test all user flows
- [ ] WCAG 2.1 AA compliance
