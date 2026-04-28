# Screen Specification: Consents (MyBills Agent Authorisations)

**Ember Route**: `customer#/biller/:id/settings/consents`
**React Route (target)**: `/portal/customer/biller/:billerId/settings/consents/view`

**Files Analyzed**:
- Template: `frontend-ember/src/js/templates/settings-consent.html`
- Controller/Route: `frontend-ember/src/js/settings-consent.js`
- Route definition: `frontend-ember/src/js/application.js` (line 119)
- Tab visibility logic: `frontend-ember/src/js/settings.js` (lines 124–205)
- i18n (EN): `frontend-ember/src/js/nls/root/settings.js` (lines 51–104)
- i18n (FR): `frontend-ember/src/js/nls/fr/settings.js` (lines 49–102)
- React shell: `frontend/src/routes/SettingsShell.js`
- React common components: `frontend/src/components/common/index.js`
- React state: `frontend/src/state/index.js`

---

## Summary

The Consents screen manages **Payreq MyBills Agent Authorisations** — a consent system that lets
a biller authorise an agent to manage bill registrations on their behalf.

The screen has two panels:
1. **Request Consent** (biller-only): Send a consent request email to an agent's MyBills email address.
2. **Authorisations Table** (always visible): Search, view, resend, edit, and remove existing consent authorisations.

A confirmation modal is shown before removing an authorisation.

### Data Model

`App.Consent` (Ember Data model) maps to consent records with these fields:

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | Record ID (used for API calls) |
| `userId` | string | User ID of the agent |
| `billerId` | string | Biller ID |
| `uid` | string | Agent's email address (displayed in Email column) |
| `status` | string | `pending` \| `authorised` \| `deactivated` \| `cancelled` |
| `tagName` | string | Agent or biller name (displayed in Agent/Biller column) |
| `noticeId` | string | Optional notice reference (editable inline when `allowAgentRegistrationsFromContacts`) |
| `authorisedOn` | date | When authorised |
| `unauthorisedOn` | date | When unauthorised |
| `isEditing` | boolean | Local UI flag — not persisted to server independently |

**Computed properties**:
- `statusDescription`: Looks up `status` key in the status string map (e.g., `"pending"` → `"Pending"`)
- `isActive`: `status === "authorised" || status === "pending"`
- `isPending`: `status === "pending"`

---

## UI Elements

### Element: Page Container
- **Type**: div
- **Display condition**: Always
- **CSS classes**: `row`

---

### Element: Panel 1 — Request Consent
- **Type**: panel
- **Display condition**: `{{#if isBiller}}` — only shown when the logged-in user is the biller
- **CSS classes**: `panel panel-default`

#### Sub-element: Panel heading
- **Type**: heading
- **Content**: `settingsStrings.consentSettings.billerHeading` → `"MyBills Agent Request Consent"`
- **CSS classes**: `panel-title` (h4)

#### Sub-element: Info alert
- **Type**: alert
- **Content**: `settingsStrings.consentSettings.billerText` → `"To manage registrations on behalf of an Agent please enter their Payreq MyBills account email and click 'Send Request'. The Agent will receive an email request and must verify authorisation before you can use this feature."`
- **CSS classes**: `alert alert-info`

#### Sub-element: Error alert (request consent form)
- **Type**: alert
- **Display condition**: `{{#if this.errormessage}}`
- **Content**: `{{this.errormessage}}` — dynamic error text from API response
- **CSS classes**: `alert alert-danger`

#### Sub-element: Agent email input
- **Type**: text input
- **Label**: `settingsStrings.consentSettings.billerAgentEmail` → `"MyBills Agent Email"`
- **Bound to**: `this.agentMyBillsEmail`
- **id**: `agentMyBillsEmail`
- **CSS classes**: `form-control`

#### Sub-element: Notice ID input
- **Type**: text input
- **Display condition**: `{{#if allowAgentRegistrationsFromContacts}}`
- **Label**: `settingsStrings.consentSettings.noticeIdLabel` → `"Notice Id"`
- **Bound to**: `this.noticeId`
- **id**: `noticeId`
- **CSS classes**: `form-control`

#### Sub-element: Send Request button
- **Type**: button
- **Content**: glyphicon-send icon + `settingsStrings.consentSettings.requestButton` → `"Send Request"`
- **CSS classes**: `btn btn-primary`
- **Action**: `{{action 'requestConsent' this.agentMyBillsEmail this.noticeId}}`

---

### Element: Panel 2 — Authorisations Table
- **Type**: panel
- **Display condition**: Always (not conditional)
- **CSS classes**: `panel panel-default`

#### Sub-element: Panel heading
- **Type**: heading
- **Content**: `settingsStrings.consentSettings.heading` → `"Payreq MyBills Agent Authorisations"`
- **CSS classes**: `panel-title` (h4)

#### Sub-element: Error alert (table area)
- **Type**: alert
- **Display condition**: `{{#if this.resenderrormessage}}`
- **Content**: `{{this.resenderrormessage}}` — dynamic error text
- **CSS classes**: `alert alert-danger`

#### Sub-element: Search input
- **Type**: text input
- **Placeholder**: `settingsStrings.consentSettings.searchPlaceholder` → `"Search for an Authoristion by Agent email or name"`
- **Bound to**: `this.searchTerm`
- **id**: `searchTerm`
- **CSS classes**: `ember-text-field form-control ember-view`

#### Sub-element: Search button
- **Type**: button
- **id**: `mailersearch`
- **Content**: glyphicon-search icon
- **CSS classes**: `btn btn-default`
- **Action**: `{{action 'getAuthorisations' this.searchTerm}}`

#### Sub-element: Authorisations table
- **Type**: table
- **CSS classes**: `table table-striped`

**Table header columns**:
| Column | Label key | Display condition |
|--------|-----------|------------------|
| Email | `emailLabel` → "Email Address" | Always |
| Status | `statusLabel` → "Status" | Always |
| Agent or Biller | `agentLabel` ("Agent") if `isBiller`, else `billerLabel` ("Biller") | Always (label changes) |
| Notice Id | `noticeIdLabel` → "Notice Id" | `{{#if allowAgentRegistrationsFromContacts}}` |
| Authorised On | `authorisedOnLabel` → "Authorised On" | Always |
| Unauthorised On | `unAuthorisedOnLabel` → "Unauthorised On" | Always |
| Actions | `actions` → "Actions" | Always |

**Table body** — for each consent in model:

| Column | Content | CSS |
|--------|---------|-----|
| Email | `consent.uid` | `consentcells` |
| Status | `consent.statusDescription` | `consentcells` |
| Agent/Biller | `consent.tagName` | `consentcells` |
| Notice Id | Text input (when `isEditing`) or `consent.noticeId` (when not) | `consentcells` |
| Authorised On | `view-date` component with `withTime=true` | `consentcells` |
| Unauthorised On | `view-date` component with `withTime=true` | `consentcells` |
| Actions | Button group (see below) | `consentcells` |

**Empty state** (when model is empty — Handlebars `{{else}}` block):
- Single row, `colspan="5"`: `settingsStrings.consentSettings.noAuthorisations` → `"No MyBills Agent Authorisations."`

---

### Element: Per-row Action Buttons

All buttons share container: `div.actions-row > div.actions.btn-group.col-xs-12` inside `div[style="display: inline-table;"]`

| Button | Icon | CSS | Visible when | Action |
|--------|------|-----|-------------|--------|
| Remove Authorisation | `glyphicon-remove` | `btn btn-danger` | `isActive && !isEditing` | `removeAuthorisationModal(consent)` |
| Resend Authorisation | `glyphicon-repeat` | `btn btn-default` | `isBiller && isPending && !isEditing` | `resendAuthorisation(consent)` |
| Edit Authorisation | `glyphicon-pencil` | `btn btn-default` | `isBiller && isActive && allowAgentRegistrationsFromContacts && !isEditing` | `editAuthorisation(consent)` |
| Save | `glyphicon-ok` | `btn btn-success` | `isBiller && isActive && allowAgentRegistrationsFromContacts && isEditing` | `saveAuthorisation(consent)` |
| Cancel | `glyphicon-ban-circle` | `btn btn-danger` | `isBiller && isActive && allowAgentRegistrationsFromContacts && isEditing` | `cancelAuthorisation(consent)` |

**Visibility logic nesting** (exact from template):
```
if !isEditing:
  if isActive → show Remove button
if isBiller:
  if isPending:
    if !isEditing → show Resend button
  if isActive:
    if allowAgentRegistrationsFromContacts:
      if isEditing → show Save + Cancel buttons
      else → show Edit button
```

---

### Element: Confirm-Unauthorise Modal

This modal is dynamically compiled as an Ember template (`Ember.TEMPLATES['confirm-unauthorise']`) using `modal-dialog` component.

- **Type**: modal dialog
- **Display condition**: Shown via `this.showModal("confirm-unauthorise")` when Remove is clicked
- **Title**: `translations.all.consentSettings.unauthoriseModalHeading` → `"MyBills Agent Registration Management Unauthorise"`
- **Body**: `translations.all.consentSettings.unauthoriseModalText` → `"Are you sure you want to unauthorise MyBills Agent Registration Management for <strong>{{{email}}}</strong>?"`
  - Note: `{{{email}}}` is a Handlebars triple-mustache (unescaped HTML) — the email is pre-populated with `consent.uid`
- **Buttons**:
  - Cancel (label: `"Cancel"`, actionName: `"cancel"`) — closes modal, no action
  - OK (label: `"OK"`, bsType: `"btn-danger"`, actionName: `"confirm"`) — triggers `removeAuthorisation` action

---

## Interactions

### Action: getAuthorisations (Search)
- **Trigger**: click on Search button
- **Handler**: `{{action 'getAuthorisations' this.searchTerm}}`
- **Behavior**:
  1. Sets `searchTerm` on controller
  2. Calls `this.store.query("consent", {billerId, searchTerm})` via `doRemoteAction`
  3. On success: replaces `model` with results
  4. On error: generic error displayed via `showErrorMessage(strings.consentSettings.getAuthError)`
- **Loading state**: Handled internally by `doRemoteAction` (spinner via `RouteWithRemoteActionsMixin`)

### Action: requestConsent
- **Trigger**: click on "Send Request" button (Panel 1, biller-only)
- **Handler**: `{{action 'requestConsent' this.agentMyBillsEmail this.noticeId}}`
- **Behavior**:
  1. Clears both error messages
  2. POSTs to `/data/settings/consent`
  3. On `resp.success`: shows success toast with `sentConsent.fmt(email)`, reloads data
  4. On `!resp.success`: looks up `errors[resp.error]` string; for `"pending.rego"` and `"no.user"` errors, formats with email; sets `errormessage` on controller and calls `showErrorMessage`
  5. On network error: shows `sentConsentError` generic message

### Action: removeAuthorisationModal
- **Trigger**: click Remove button in table row
- **Handler**: `{{action "removeAuthorisationModal" consent}}`
- **Behavior**:
  1. Stores `consent` as `removeAuthorisation` on controller
  2. Stores `consent.uid` as `email` on route (used in modal template)
  3. Calls `this.showModal("confirm-unauthorise")` to display modal

### Action: removeAuthorisation (confirm)
- **Trigger**: clicking OK in confirm-unauthorise modal
- **Handler**: actionName `"confirm"` on modal → calls `removeAuthorisation` action
- **Behavior**:
  1. Clears both error messages
  2. POSTs to `/data/settings/consent/unauthorise` with `{id: consent.id, billerId}`
  3. On `resp.success`:
     - If `consent.tagName` exists: success msg = `removeAuthBiller.fmt(tagName, uid)`
     - Otherwise: success msg = `removeAuth.fmt(uid)`
     - Shows toast, reloads data
  4. On `!resp.success`: sets `resenderrormessage` and calls `showErrorMessage`

### Action: resendAuthorisation
- **Trigger**: click Resend button in table row
- **Handler**: `{{action "resendAuthorisation" consent}}`
- **Behavior**:
  1. Clears both error messages
  2. POSTs to `/data/settings/consent/resend` with `{id: consent.id, billerId}`
  3. On `resp.success`: shows `resendSuccess.fmt(consent.uid)` toast
  4. On `!resp.success`:
     - If `resp.error` exists: looks up `resendErrors[resp.error].fmt(uid)`, sets `resenderrormessage`
     - Otherwise: sets `resenderrormessage` to generic `resendErrorMessage`

### Action: editAuthorisation
- **Trigger**: click Edit button in table row
- **Handler**: `{{action "editAuthorisation" consent}}`
- **Behavior**: Calls `store.findRecord('consent', consent.id)` then sets `isEditing = true` on the record
- **Side effect**: Causes template to show inline text input for noticeId and swap buttons to Save/Cancel

### Action: cancelAuthorisation
- **Trigger**: click Cancel button in table row (while editing)
- **Handler**: `{{action "cancelAuthorisation" consent}}`
- **Behavior**: Calls `consent.rollbackAttributes()` (discards changes), then sets `isEditing = false`

### Action: saveAuthorisation
- **Trigger**: click Save button in table row (while editing)
- **Handler**: `{{action "saveAuthorisation" consent}}`
- **Behavior**:
  1. Calls `consent.save()` (Ember Data PATCH to `/data/api/consents/:id`)
  2. On success: shows `authUpdate` toast
  3. On error: shows `authUpdateError` error toast, calls `consent.rollbackAttributes()`
  4. Sets `isEditing = false` regardless

---

## API Calls

### Endpoint: GET /data/api/consents
- **When called**: On route model load, on `reloadData`, and on `getAuthorisations`
- **Request params**: `{ billerId: biller.id, searchTerm: string|null }`
- **Success handling**: Returns array of consent objects + `meta` object
- **Meta response shape**:
  ```json
  {
    "meta": {
      "isBiller": true,
      "allowAgentRegistrationsFromContacts": false
    }
  }
  ```
- **Error handling**: Shows `strings.consentSettings.getAuthError` toast
- **Loading state**: `doRemoteAction` handles (spinner via mixin)
- **Response usage**: `model` set to consent array; `isBiller` and `allowAgentRegistrationsFromContacts` computed from meta

### Endpoint: POST /data/settings/consent
- **When called**: On `requestConsent` action
- **Request body**: `{ mybillsagentemail: string, noticeId: string|null, billerId: string }`
- **Success handling**: `resp.success === true` → toast `sentConsent.fmt(email)`, reload data
- **Error handling**:
  - `resp.error === "invalid.email"` → "Invalid MyBills Agent email address entered."
  - `resp.error === "max.retries"` → "Maximum number of invalid tries..."
  - `resp.error === "no.user"` → `"Payreq user doesn't exist for {email}"`
  - `resp.error === "pending.rego"` → `"Pending MyBills Agent Authorisation already exists for {email}..."`
  - Network/unknown error: `sentConsentError` generic message
- **Loading state**: `doRemoteAction` handles

### Endpoint: POST /data/settings/consent/unauthorise
- **When called**: On `removeAuthorisation` action (after modal confirm)
- **Request body**: `{ id: consent.id, billerId: string }`
- **Success handling**: Success toast (with tagName or just uid), reload data
- **Error handling**: Sets `resenderrormessage`, shows `removeAuthError` generic toast

### Endpoint: POST /data/settings/consent/resend
- **When called**: On `resendAuthorisation` action
- **Request body**: `{ id: consent.id, billerId: string }`
- **Success handling**: Toast `resendSuccess.fmt(consent.uid)`
- **Error handling**:
  - `resp.error === "max.resends"` → "Maxmium number of re-sends have been reached for {uid}. Please contact Payreq Support"
  - Generic: `resendErrorMessage`

### Endpoint: PATCH /data/api/consents/:id
- **When called**: On `saveAuthorisation` action (via `consent.save()` Ember Data)
- **Request body**: Updated consent fields (primarily `noticeId`)
- **Success handling**: Toast `authUpdate`
- **Error handling**: Toast `authUpdateError`, rollback attributes

---

## State

### Property: `isBiller`
- **Type**: boolean
- **Source**: `model.meta.isBiller` (from API response meta)
- **Usage**: Controls Panel 1 visibility; controls "Agent" vs "Biller" column header; controls Resend/Edit/Save/Cancel button visibility

### Property: `allowAgentRegistrationsFromContacts`
- **Type**: boolean
- **Source**: `model.meta.allowAgentRegistrationsFromContacts` (from API response meta)
- **Usage**: Controls Notice Id column and input visibility; controls Edit/Save/Cancel button visibility

### Property: `errormessage`
- **Type**: string | null
- **Initial value**: `null` (reset in `setupController`)
- **Source**: Set by `requestConsent` action on error; cleared at start of `requestConsent` and `removeAuthorisation`
- **Usage**: Displayed as danger alert inside Panel 1 form

### Property: `resenderrormessage`
- **Type**: string | null
- **Initial value**: `null` (reset in `setupController`)
- **Source**: Set by `removeAuthorisation` and `resendAuthorisation` actions on error
- **Usage**: Displayed as danger alert inside Panel 2

### Property: `searchTerm`
- **Type**: string | null
- **Initial value**: `null`
- **Source**: Bound to search input, updated by `getAuthorisations`
- **Usage**: Passed to API when searching

### Property: `agentMyBillsEmail`
- **Type**: string
- **Initial value**: `""` (empty)
- **Source**: Bound to agent email input in Panel 1
- **Usage**: Passed to `requestConsent` action

### Property: `noticeId` (controller-level, for request form)
- **Type**: string
- **Initial value**: `""` (empty)
- **Source**: Bound to Notice Id input in Panel 1 (only when `allowAgentRegistrationsFromContacts`)
- **Usage**: Passed to `requestConsent` action

### Property: `removeAuthorisation` (controller-level)
- **Type**: Consent record
- **Source**: Set by `removeAuthorisationModal` action when Remove button clicked
- **Usage**: Referenced in `removeAuthorisation` action to get `id` and `uid`

### Property: `consent.isEditing` (per-record)
- **Type**: boolean
- **Initial value**: `false`
- **Source**: Set by `editAuthorisation`, cleared by `cancelAuthorisation` / `saveAuthorisation`
- **Usage**: Controls inline edit mode for individual table rows

---

## Navigation

### Tab navigation
- **Trigger**: User clicks another settings tab in `SettingsShell.js`
- **Type**: Ember hash routing (currently `isEmber: true`) → React route after migration
- **No transitionTo calls** within this controller; the screen does not navigate away

### External links
- None

---

## Validation

### Field: agentMyBillsEmail (Panel 1)
- **Type**: text (email)
- **Required**: yes (server-side)
- **Format**: Valid email — validated server-side only
- **Client-side validation**: None in Ember
- **Error messages**: Set from `errors` map in i18n based on `resp.error` key:
  - `"invalid.email"`: "Invalid MyBills Agent email address entered."
  - `"no.user"`: "Payreq user doesn't exist for {email}"
  - `"pending.rego"`: "Pending MyBills Agent Authorisation already exists for {email}..."
  - `"max.retries"`: "Maximum number of invalid tries..."

### Field: noticeId (Panel 1 — optional)
- **Type**: text
- **Required**: no
- **Validation**: None (server-side only)

### Field: consent.noticeId (inline edit in table)
- **Type**: text
- **Required**: no
- **Validation**: None client-side

---

## i18n Strings

All strings sourced from `frontend-ember/src/js/nls/root/settings.js` under key `consentSettings`.

| Key | English | French | Usage |
|-----|---------|--------|-------|
| `consentSettings.status.pending` | "Pending" | "En attente" | Status display |
| `consentSettings.status.authorised` | "Authorised" | "Autorisé" | Status display |
| `consentSettings.status.deactivated` | "Deactivated" | "Désactivé" | Status display |
| `consentSettings.status.cancelled` | "Cancelled" | "Annulé" | Status display |
| `consentSettings.heading` | "Payreq MyBills Agent Authorisations" | "Autorisations Payreq MyBills Agent" | Panel 2 heading |
| `consentSettings.searchPlaceholder` | "Search for an Authoristion by Agent email or name" | "Rechercher une autorisation par adresse courriel ou nom d'agent" | Search input placeholder |
| `consentSettings.billerLabel` | "Biller" | "Biller" | Table column when not isBiller |
| `consentSettings.agentLabel` | "Agent" | "Agent" | Table column when isBiller |
| `consentSettings.emailLabel` | "Email Address" | "Adresse courriel" | Table column |
| `consentSettings.statusLabel` | "Status" | "Statut" | Table column |
| `consentSettings.noticeIdLabel` | "Notice Id" | "Identifiant de l'avis" | Table column + Panel 1 label |
| `consentSettings.authorisedOnLabel` | "Authorised On" | "Autorisé le" | Table column |
| `consentSettings.unAuthorisedOnLabel` | "Unauthorised On" | "Non autorisé sur" | Table column |
| `consentSettings.actions` | "Actions" | "Actions" | Table column |
| `consentSettings.noAuthorisations` | "No MyBills Agent Authorisations." | "Aucune autorisation Payreq MyBills Agent." | Table empty state |
| `consentSettings.billerHeading` | "MyBills Agent Request Consent" | "Demande de consentement MyBills Agent" | Panel 1 heading |
| `consentSettings.billerText` | "To manage registrations on behalf of an Agent..." | "Pour gérer les inscriptions au nom d'un Agent..." | Panel 1 info alert |
| `consentSettings.billerAgentEmail` | "MyBills Agent Email" | "Adresse Courriel" | Panel 1 email label |
| `consentSettings.requestButton` | "Send Request" | "Envoyer une demande" | Panel 1 submit button |
| `consentSettings.errors.invalid.email` | "Invalid MyBills Agent email address entered." | "Adresse courriel saisie incorrecte." | Request consent error |
| `consentSettings.errors.max.retries` | "Maximum number of invalid tries to find a Payreq account reached. Please contact Payreq Support." | "Nombre maximum d'essais invalides..." | Request consent error |
| `consentSettings.errors.no.user` | "Payreq user doesn't exist for %@" | "L'utilisateur Payreq n'existe pas pour %@" | Request consent error (with email) |
| `consentSettings.errors.pending.rego` | "Pending MyBills Agent Authorisation already exists for %@. Please see MyBills Agent Authorisations below." | "L'autorisation MyBills Agent en attente existe déjà pour %@..." | Request consent error (with email) |
| `consentSettings.resendSuccess` | "Payreq MyBills Agent authorisation email re-sent to %@" | "Courriel d'autorisation MyBills Agent renvoyé à %@" | Resend success toast |
| `consentSettings.resendErrorMessage` | "An error occurred while resending the MyBills Agent Authorisation email. Please try again later." | "Une erreur s'est produite lors de l'envoi de l'e-mail..." | Resend generic error |
| `consentSettings.resendErrors.max.resends` | "Maxmium number of re-sends have been reached for %@. Please contact Payreq Support" | "Le nombre maximal de renvois a été atteint..." | Resend specific error (with uid) |
| `consentSettings.authUpdate` | "Successfully updated authorisation." | "Autorisation mise à jour avec succès." | Save success toast |
| `consentSettings.authUpdateError` | "An error occured while updating the selected Payreq MyBills Authorisation. Please try again later." | "Une erreur s'est produite lors de la mise à jour de l'autorisation..." | Save error toast |
| `consentSettings.cancel` | "Cancel" | "Annuler" | Modal cancel button |
| `consentSettings.ok` | "OK" | "D'accord" | Modal confirm button |
| `consentSettings.unauthoriseModalHeading` | "MyBills Agent Registration Management Unauthorise" | "Gestion des inscriptions Payreq MyBills Agent non autorisée" | Modal title |
| `consentSettings.unauthoriseModalText` | "Are you sure you want to unauthorise MyBills Agent Registration Management for **{email}**?" | "Êtes-vous sûr de vouloir autoriser la gestion des inscriptions MyBills Agent pour **{email}**?" | Modal body (HTML, email is bold) |
| `consentSettings.removeAuth` | "Registration management unauthorised ( %@ )" | "Gestion des inscriptions non autorisée ( %@ )" | Remove success toast (no tagName, with uid) |
| `consentSettings.removeAuthBiller` | "Registration management unauthorised for Agency %@ ( %@ )" | "Gestion des inscriptions non autorisée pour l'agence %@ ( %@ )" | Remove success toast (with tagName + uid) |
| `consentSettings.removeAuthError` | "An error occurred while updating your MyBills Agent Authorisation. Please try again later." | "Une erreur s'est produite lors de la mise à jour de votre autorisation MyBills Agent..." | Remove error |
| `consentSettings.sentConsent` | "Email request for consent has been sent to: %@" | "Une demande de consentement par courriel a été envoyée à %@" | Request consent success toast (with email) |
| `consentSettings.setConsentError` | "An error occurred while sending a consent request. Please try again later." | "Une erreur s'est produite lors de l'envoi d'une demande de consentement..." | Request consent network error |
| `consentSettings.getAuthError` | "An error occurred while refreshing MyBills Agent Authorisations for this biller. Please try again later." | "Une erreur s'est produite lors de l'actualisation des autorisations MyBills Agent..." | Load/search error |

**Note**: `%@` is Ember's string format placeholder (like `%s`). In React use template literals or `intl.formatMessage` with `values`.

---

## React Implementation Patterns

### Common Components to Use

From `frontend/src/components/common/index.js`:

| Component | Import Path | Usage in this screen |
|-----------|-------------|----------------------|
| `PageHeading` | `../../common` | Not used (panels use `panel-title` heading, no top-level page heading in Ember) |
| `DefaultButton` | `../../common` | Resend, Edit, Search buttons |
| `DangerButton` | `../../common` | Remove, Cancel buttons |
| `PrimaryButton` or `SubmitButton` | `../../common` | Send Request button |
| `Modal` | `../../common` | Confirm-unauthorise modal |
| `AlertDanger` | `../../common` | `errormessage` and `resenderrormessage` alerts |
| `TextInput` | `../../common` | Email input, Notice Id input, inline edit input |
| `Table` | `../../common` | Authorisations table (verify it supports striped styling) |

**Note**: The info alert in Panel 1 uses `alert alert-info` — check if there is an `Alert` (non-danger) common component; if so use it, otherwise use Bootstrap class directly.

### State Management

```javascript
const [{biller}] = useAppState();
// biller.id → billerId for all API calls
```

**Local state needed** (`useState`):

| State var | Type | Purpose |
|-----------|------|---------|
| `isLoading` | boolean | Initial data load |
| `consents` | array | List of consent records from API |
| `meta` | object | `{ isBiller, allowAgentRegistrationsFromContacts }` from API |
| `searchTerm` | string | Controlled search input |
| `agentEmail` | string | Controlled email input (Panel 1) |
| `noticeId` | string | Controlled notice ID input (Panel 1) |
| `requestError` | string\|null | Error message for Panel 1 form |
| `tableError` | string\|null | Error message for Panel 2 (resend/remove errors) |
| `editingId` | string\|null | ID of the consent currently being edited inline |
| `editingNoticeId` | string | Controlled value for inline noticeId edit |
| `confirmUnauthorise` | object\|null | Consent selected for removal (drives modal open state) |

**Note**: Replace Ember's per-record `isEditing` flag with a single `editingId` state variable.

### i18n Approach

**Pattern**: `injectIntl` HOC (used consistently across the React codebase)

```javascript
import {injectIntl, FormattedDate} from "react-intl";

const ConsentsSettings = ({intl}) => {
    // For labels:
    intl.formatMessage({id: "settings.consents.heading"})
    // For parameterised strings:
    intl.formatMessage({id: "settings.consents.sentConsent"}, {email: agentEmail})
    // For dates (replaces view-date helper):
    <FormattedDate value={consent.authorisedOn} year="numeric" month="short" day="2-digit"
                   hour="2-digit" minute="2-digit"/>
};

export default injectIntl(ConsentsSettings);
```

**i18n key convention in React**: Use dot-separated flat keys in `en.json` / `fr.json`.
Suggested key prefix: `settings.consents.*`

Add to `frontend/src/lang/en.json`:
```json
"settings.consents.status.pending": "Pending",
"settings.consents.status.authorised": "Authorised",
"settings.consents.status.deactivated": "Deactivated",
"settings.consents.status.cancelled": "Cancelled",
"settings.consents.heading": "Payreq MyBills Agent Authorisations",
"settings.consents.searchPlaceholder": "Search for an Authorisation by Agent email or name",
"settings.consents.billerLabel": "Biller",
"settings.consents.agentLabel": "Agent",
"settings.consents.emailLabel": "Email Address",
"settings.consents.statusLabel": "Status",
"settings.consents.noticeIdLabel": "Notice Id",
"settings.consents.authorisedOnLabel": "Authorised On",
"settings.consents.unAuthorisedOnLabel": "Unauthorised On",
"settings.consents.actions": "Actions",
"settings.consents.noAuthorisations": "No MyBills Agent Authorisations.",
"settings.consents.billerHeading": "MyBills Agent Request Consent",
"settings.consents.billerText": "To manage registrations on behalf of an Agent please enter their Payreq MyBills account email and click 'Send Request'. The Agent will receive an email request and must verify authorisation before you can use this feature.",
"settings.consents.billerAgentEmail": "MyBills Agent Email",
"settings.consents.requestButton": "Send Request",
"settings.consents.errors.invalidEmail": "Invalid MyBills Agent email address entered.",
"settings.consents.errors.maxRetries": "Maximum number of invalid tries to find a Payreq account reached. Please contact Payreq Support.",
"settings.consents.errors.noUser": "Payreq user doesn't exist for {email}",
"settings.consents.errors.pendingRego": "Pending MyBills Agent Authorisation already exists for {email}. Please see MyBills Agent Authorisations below.",
"settings.consents.resendSuccess": "Payreq MyBills Agent authorisation email re-sent to {uid}",
"settings.consents.resendErrorMessage": "An error occurred while resending the MyBills Agent Authorisation email. Please try again later.",
"settings.consents.resendErrors.maxResends": "Maximum number of re-sends have been reached for {uid}. Please contact Payreq Support.",
"settings.consents.authUpdate": "Successfully updated authorisation.",
"settings.consents.authUpdateError": "An error occurred while updating the selected Payreq MyBills Authorisation. Please try again later.",
"settings.consents.cancel": "Cancel",
"settings.consents.ok": "OK",
"settings.consents.unauthoriseModalHeading": "MyBills Agent Registration Management Unauthorise",
"settings.consents.unauthoriseModalText": "Are you sure you want to unauthorise MyBills Agent Registration Management for {email}?",
"settings.consents.removeAuth": "Registration management unauthorised ( {uid} )",
"settings.consents.removeAuthBiller": "Registration management unauthorised for Agency {tagName} ( {uid} )",
"settings.consents.removeAuthError": "An error occurred while updating your MyBills Agent Authorisation. Please try again later.",
"settings.consents.sentConsent": "Email request for consent has been sent to: {email}",
"settings.consents.setConsentError": "An error occurred while sending a consent request. Please try again later.",
"settings.consents.getAuthError": "An error occurred while refreshing MyBills Agent Authorisations for this biller. Please try again later."
```

### Permissions Required

No permission constants needed. All feature visibility is driven by API meta response:
- `meta.isBiller` — controls Panel 1 and Resend/Edit/Save/Cancel buttons
- `meta.allowAgentRegistrationsFromContacts` — controls Notice Id column and Edit/Save/Cancel buttons

### Tab Visibility (in SettingsShell.js)

The tab is already declared in `SettingsShell.js` with `isEmber: true`. After migration:

**For biller settings** (line 38 of `SettingsShell.js`):
```javascript
// Before:
{isEmber: true, linkTo: "biller.settings.consents", name: "consents", hidden: !hasAgent(billerSettings)}
// After:
{linkTo: `/portal/customer/biller/${billerId}/settings/consents/view`, name: "consents", hidden: !hasAgent(billerSettings)}
```

**For MyBills/payer settings** (line 46 of `SettingsShell.js`):
```javascript
// Before:
{isEmber: true, linkTo: "biller.settings.consents", name: "consents"}
// After:
{linkTo: `/portal/customer/biller/${billerId}/settings/consents/view`, name: "consents"}
```

Add Route to `SettingsShell.js` `<Switch>`:
```jsx
<Route path={`${match.url}/consents/view`}>
    <ConsentsSettings billerId={biller.id}/>
</Route>
```

### Files to Create / Modify

| Action | File |
|--------|------|
| Create | `frontend/src/components/settings/biller/ConsentsSettings.js` |
| Create | `frontend/src/components/settings/biller/ConsentsSettings.module.scss` |
| Update | `frontend/src/routes/SettingsShell.js` |
| Update | `frontend/src/lang/en.json` |
| Update | `frontend/src/lang/fr.json` |

### Testing Requirements

Follow patterns from existing settings component tests:

- **Library**: `@testing-library/react`
- **Required providers**: `StateProvider` (for `useAppState()`), `IntlProvider` (for `injectIntl`), `MemoryRouter` (for routing)
- **Mock setup**: Mock `axios.get` and `axios.post` using `jest.mock('axios')`
- **Mock API response shape**:
  ```javascript
  axios.get.mockResolvedValue({
    data: {
      content: [...consents],
      meta: { isBiller: true, allowAgentRegistrationsFromContacts: false }
    }
  });
  ```

### Styling Conventions

- **Approach**: CSS Modules (`*.module.scss`) + Bootstrap 3 classes
- **Bootstrap version**: 3 (react-bootstrap 0.33.1)
- **CSS to port**:
  ```scss
  // from frontend-ember/src/css/payreq.css (line 962)
  .consentcells {
    vertical-align: middle;
  }
  ```
- **Bootstrap classes used**: `panel`, `panel-default`, `panel-heading`, `panel-body`, `panel-title`, `alert`, `alert-info`, `alert-danger`, `form-group`, `form-horizontal`, `form-control`, `col-md-*`, `input-group`, `input-group-btn`, `table`, `table-striped`, `btn`, `btn-primary`, `btn-default`, `btn-danger`, `btn-success`, `btn-group`, `glyphicon`, `glyphicon-send`, `glyphicon-search`, `glyphicon-remove`, `glyphicon-repeat`, `glyphicon-pencil`, `glyphicon-ok`, `glyphicon-ban-circle`

---

## Edge Cases & Notes

1. **`%@` format specifiers**: Ember uses `String.fmt()` with `%@` as placeholders. In React, use `intl.formatMessage` `values` parameter with named placeholders (`{email}`, `{uid}`, `{tagName}`).

2. **Triple-mustache HTML in modal**: The Ember modal body uses `{{{email}}}` (unescaped HTML). In React, the modal should render the email as a `<strong>` element directly in JSX — do not use `dangerouslySetInnerHTML`.

3. **isEditing as per-record flag**: Ember stores `isEditing` on the DS.Model record, which triggers reactivity. In React, use a single `editingId` state variable (the consent's ID) and `editingNoticeId` for the current edit value. When saving, pass both to the PATCH call.

4. **searchTerm typo in Ember**: The search placeholder in Ember has a typo — `"Authoristion"` (missing 'a'). The i18n spec shows the corrected spelling `"Authorisation"`. Use the corrected version in React.

5. **Empty state colspan**: The Ember empty state row uses `colspan="5"` hardcoded. In React, calculate the colspan dynamically based on how many columns are rendered (depends on `allowAgentRegistrationsFromContacts`).

6. **Date display**: Ember's `view-date` component uses moment.js. React uses `FormattedDate` from react-intl. The dates should show both date and time (`withTime=true`).

7. **Tab visibility — `hasAgent` check**: Already implemented in `SettingsShell.js` at line 30:
   ```javascript
   const hasAgent = ({billerChannelPartnerSystem}) =>
     billerChannelPartnerSystem.find(channel => channel.channelPartnerSystemId === "mybillsagent");
   ```
   This logic does not need to change — only the `isEmber` flag and route path need updating.

8. **`sentConsentError` vs `setConsentError`**: The Ember controller references `strings.consentSettings.sentConsentError` in the `requestConsent` doRemoteAction fallback, but the NLS file defines this key as `setConsentError`. Use `setConsentError` in React as that is the actual defined key.

9. **Inline edit cancellation**: `cancelAuthorisation` calls `consent.rollbackAttributes()` in Ember (discards unsaved Ember Data changes). In React, simply reset `editingId` to `null` and `editingNoticeId` to `""` — no need to re-fetch from server since the local state was never committed.

10. **No client-side validation**: The Ember screen has no client-side form validation. React implementation should add at minimum an email format check for `agentMyBillsEmail` before submitting, to improve UX.
