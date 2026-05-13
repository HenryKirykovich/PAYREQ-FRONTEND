# Bill Templates Screen — Ember-to-React Migration Specification

**Route:** `biller.settings.billTemplates`  
**URL:** `/customer/biller/:id/settings/billTemplates`  
**Page Title (tab):** "Shared Documents"

---

## 1. Source Files

### Ember (source of truth)

| File | Purpose |
|------|---------|
| `frontend-ember/src/js/settings-bill-templates.js` | Model, Route, Controller, Mixin |
| `frontend-ember/src/js/templates/settings-bill-templates.html` | Main page template |
| `frontend-ember/src/js/templates/bill-template-upload-modal.html` | Upload modal template |
| `frontend-ember/src/js/templates/components/file-upload.html` | File-upload component template |
| `frontend-ember/src/js/file-upload-component.js` | File-upload component logic |
| `frontend-ember/src/js/settings.js` | Base route/controller classes; tab registration |
| `frontend-ember/src/js/nls/root/settings.js` | English i18n strings |
| `frontend-ember/src/js/application.js` (line 117) | Router: `this.route("billTemplates")` |

### React (existing partial implementation)

| File | Status |
|------|--------|
| `frontend/src/components/settings/templates/BillTemplates.js` | Partial — gaps documented in §7 |
| `frontend/src/components/modals/BillTemplateUploadModal.js` | Partial — gaps documented in §7 |
| `frontend/src/routes/SettingsShell.js` (lines 37, 50, 203–204) | Wired and routing correctly |
| `frontend/src/lang/en.json` (lines 1907–1913) | Partial — missing keys listed in §6 |

---

## 2. Data Model

### `App.BillTemplate` (Ember DS.Model)

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Template identifier |
| `name` | String | User-assigned display name |
| `fileName` | String | Original uploaded file name |
| `documentId` | String | Server-side document reference ID |
| `createdBy` | String | Email/name of user who uploaded |
| `createdOn` | Date | Upload timestamp |

---

## 3. State

### Controller (`App.BillerSettingsBillTemplatesController`)

| Property | Type | Initial | Description |
|----------|------|---------|-------------|
| `uploadedInfo` | Object\|null | `null` | Server response after file upload step |
| `templateName` | String\|null | `null` | Value of the name input in the upload modal |
| `uploading` | Boolean | `false` | True while the file is being uploaded |
| `fileName` | String | `""` | Name of the selected file |
| `downloadUrl` | String | `"/download/billTemplate/download?"` | Base URL for file downloads |

### Computed Properties

| Property | Logic |
|----------|-------|
| `billTemplateUploadUrl` | `/data/billTemplates/{biller.id}/upload` |
| `isPrimaryDisabled` | `uploadedInfo == null OR templateName.isBlank()` — disables the Upload confirm button |
| `strings` | Delegated from `billerSettings.strings` (channel-partner-aware i18n map) |

---

## 4. UI Elements and Layout

### 4.1 Main Page (`settings-bill-templates.html`)

```
┌─ .row.actions-row ────────────────────────────────────────────────┐
│  [↑ Upload document]   ← btn-default, glyphicon-upload            │
└───────────────────────────────────────────────────────────────────┘

┌─ .table.table-striped ────────────────────────────────────────────┐
│  Name │ File name │ Created on │ Created by │ Action              │
│ ──────────────────────────────────────────────────────────────── │
│  {name} │ {fileName} │ {createdOn full datetime} │ {createdBy} │ [📄] │
│  ... (one row per template)                                       │
│                                                                   │
│  [empty state] No shared documents found for this mailer.         │
│  (colspan=5, shown when model is empty)                           │
└───────────────────────────────────────────────────────────────────┘
```

**Upload button:**
- Class: `btn btn-default`
- Icon: `glyphicon glyphicon-upload`
- Label: `strings.capitalised.uploadBillTemplateButton` → **"Upload document"**
- Action: `uploadBillTemplate` → opens upload modal

**Table columns (in order):**

| Column key | i18n key | Display |
|------------|----------|---------|
| Name | `templates.name` | `template.name` |
| File name | `templates.filename` | `template.fileName` |
| Created on | `templates.createdOn` | `template.createdOn` formatted with full time |
| Created by | `templates.createdBy` | `template.createdBy` |
| Action | `templates.action` | Download icon button |

**Date display:** Ember uses a `view-date` component with `withFullTime=true`. In React, use `getDateAsUTCFormatted` from `date-utils` (already referenced in `BillTemplates.js`).

**Download button:**
- Class: `btn btn-xs`
- Icon: `glyphicon glyphicon-file`
- `href=""` / `target="_blank"` in Ember (React should use `onClick` with `e.preventDefault()`)
- Action: `downloadBillTemplate(biller.id, template.id)`

### 4.2 Upload Modal (`bill-template-upload-modal.html`)

Modal title: `uploadMailTemplateTitle` → **"Upload new shared document"**

**Buttons:**

| Button | Label key | Label | Style | Action |
|--------|-----------|-------|-------|--------|
| Cancel | `uploadMailTemplateCancel` | "Cancel" | secondary | close modal, clear state |
| Upload | `uploadMailTemplateConfirm` | "Upload" | `btn-primary` | `createBillTemplateAction` |

Upload button is **disabled** when `isPrimaryDisabled` is true (file not uploaded yet OR name is blank).

**Body fields:**

1. **Name field**
   - Label: `uploadMailTemplateNameLabel` → **"Name"**
   - Input: `type="text"`, `id="templateName"`, placeholder = same label
   - Bound to `templateName`
   - Layout: label `col-md-3 control-label`, input `col-md-9`

2. **File upload field**
   - Component: `file-upload` (Ember) / `<input type="file">` (React)
   - Accepted extensions: `.jpeg,.jpg,.gif,.png,.bmp,.heic,.pdf,.csv,.xlsx,.xls,.xml,.html,.json,.tar,.txt,.zip,.7z`
   - Shows upload progress percentage
   - On error from server: displays message from `templateErrors[result.message]`
   - When uploading: hides the file input, shows the file name as text
   - Bound to: `response=uploadedInfo`, `url=billTemplateUploadUrl`, `uploading=uploading`, `fileName=fileName`

---

## 5. User Interactions and Action Handlers

### Flow 1: Upload a new template

```
User clicks "Upload document"
  → action: uploadBillTemplate()
  → opens modal bill-template-upload-modal

User types a name in the Name field
  → templateName updates
  → isPrimaryDisabled re-evaluates

User selects a file
  → file-upload component POSTs file to /data/billTemplates/{billerId}/upload
  → on success: uploadedInfo = server response { fileName, documentId }
  → uploading = false
  → Upload button becomes enabled (if templateName also filled)

User clicks "Upload" (confirm)
  → action: createBillTemplateAction()
  → guard: uploadedInfo != null AND templateName != blank
  → calls createBillTemplate(uploadedInfo, templateName)  [bubbles to route]
  → clears state: templateName = null, uploadedInfo = null

Route.createBillTemplate:
  → POST /data/billTemplates/create
  → on success (results.success === true):
      - refresh route (re-fetch template list)
      - show success message: successfulTemplateUpload
  → on error with results.message:
      - show error: templateErrors[results.message]
  → on error without message:
      - show error: genericTemplateError
  → on catch-all failure:
      - show error: genericTemplateFail
```

### Flow 2: Download a template

```
User clicks the download icon [📄] on a row
  → action: downloadBillTemplate(biller.id, template.id)

Route.downloadBillTemplate:
  → GET /data/billTemplates/download?billerId={billerId}&id={id}
  → on success:
      - window.location.assign(downloadUrl + "downloadFileId" + results.downloadFileId)
      - downloadUrl = "/download/billTemplate/download?"
      - final URL: /download/billTemplate/download?downloadFileId{results.downloadFileId}
      - show success message: "Successful downloaded email template."
  → on failure:
      - show error: "An error occurred downloading an email template. Please try again later."
```

### Modal: Cancel / Close

```
User clicks "Cancel" or closes modal
  → action: cancel → closeModal
  → state cleared: templateName = null, uploadedInfo = null, uploading = false, fileName = ""
```

---

## 6. API Calls

### Fetch template list (on route model load)

| Attribute | Value |
|-----------|-------|
| Method | `GET` |
| Endpoint | `/data/billTemplates` |
| Query params | `billerId={billerId}` |
| Response | Array of BillTemplate objects |

> Note: The React `BillTemplates.js` currently calls `/data/bill-templates` (wrong). Ember uses `/data/billTemplates`.

### Upload file (two-step: first upload file, then create record)

**Step 1 — Upload file**

| Attribute | Value |
|-----------|-------|
| Method | `POST` |
| Endpoint | `/data/billTemplates/{billerId}/upload` |
| Body | `multipart/form-data` with `files[]`, CSRF token, version |
| Response | `{ id, fileName, documentId, message?, success? }` |

**Step 2 — Create bill template record**

| Attribute | Value |
|-----------|-------|
| Method | `POST` |
| Endpoint | `/data/billTemplates/create` |
| Body | `{ billerId, name, fileName, documentId }` |
| Response | `{ success: Boolean, message?: String }` |

> Note: `documentId` comes from the Step 1 response. React's `BillTemplateUploadModal` currently sends `fileDataId` (wrong field name) — must be `documentId`.

### Download template

| Attribute | Value |
|-----------|-------|
| Method | `GET` |
| Endpoint | `/data/billTemplates/download` |
| Query params | `billerId={billerId}&id={templateId}` |
| Response | `{ downloadFileId: String }` |
| Final redirect | `window.location.assign("/download/billTemplate/download?downloadFileId" + downloadFileId)` |

> Note: React's `BillTemplates.js` currently calls `/data/bill-templates/{templateId}/download` (wrong). Ember uses the two-param GET above.

---

## 7. i18n Strings

### Ember NLS keys → React i18n keys mapping

| Ember key (nls/root/settings.js) | Ember value | Recommended React key | en.json status |
|----------------------------------|-------------|----------------------|----------------|
| `all.billTemplates` | "Shared Documents" | `settings.tab.title.billTemplates` | ✅ exists (line 337) |
| `all.uploadBillTemplateButton` | "Upload document" | `settings.templates.uploadButton` | ⚠️ wrong value ("Upload Bill Template") |
| `all.templates.name` | "Name" | `settings.templates.name` | ✅ exists |
| `all.templates.filename` | "File name" | `settings.templates.filename` | ✅ exists |
| `all.templates.createdOn` | "Created on" | `settings.templates.createdOn` | ✅ exists |
| `all.templates.createdBy` | "Created by" | `settings.templates.createdBy` | ✅ exists |
| `all.templates.action` | "Action" | `settings.templates.action` | ✅ exists |
| `all.templates.noTemplatesFound` | "No shared documents found for this mailer." | `settings.templates.noTemplatesFound` | ⚠️ wrong value ("No bill templates found") |
| `all.uploadMailTemplateTitle` | "Upload new shared document" | `settings.templates.uploadModal.title` | ❌ missing |
| `all.uploadMailTemplateNameLabel` | "Name" | `settings.templates.uploadModal.nameLabel` | ❌ missing |
| `all.uploadMailTemplateCancel` | "Cancel" | `settings.templates.uploadModal.cancel` | ❌ missing |
| `all.uploadMailTemplateConfirm` | "Upload" | `settings.templates.uploadModal.confirm` | ❌ missing |
| `all.successfulTemplateUpload` | "We will let you know shortly when you can begin sending the document type to your employees. If you have any queries, contact us at support@payreq.com" | `settings.templates.successUpload` | ❌ missing |
| `all.templateErrors.invalid.filetype` | "The selected file can not be uploaded as it has an unsupported file type. Please upload a file with a valid file type." | `settings.templates.errors.invalidFiletype` | ❌ missing |
| `all.templateErrors.invalid.filetype.csv` | "...Please upload a CSV file..." | `settings.templates.errors.invalidFiletypeCsv` | ❌ missing |
| `all.templateErrors.invalid.filetype.html` | "...Please upload a HTML file." | `settings.templates.errors.invalidFiletypeHtml` | ❌ missing |
| `all.templateErrors.invalid.filetype.pdf` | "...Please upload a PDF file." | `settings.templates.errors.invalidFiletypePdf` | ❌ missing |
| `all.genericTemplateError` | "Unable to create mail template. Please contact Payreq Support." | `settings.templates.genericError` | ❌ missing |
| `all.genericTemplateFail` | "An error occurred while uploading mail template for this mailer. Please try again later." | `settings.templates.genericFail` | ❌ missing |

---

## 8. Navigation / Tab Registration

The `billTemplates` tab appears in the **Biller Settings** tab bar (not in MyBills/incoming-invoice settings). It is tab index 2.

**Tab bar order (Biller settings):**

| idx | `name` | Tab label |
|-----|--------|-----------|
| 0 | `biller` | (Mailer Settings) |
| 1 | `accountPermissions` / `users` | Account Permissions |
| 2 | `billTemplates` | **Shared Documents** |
| 4 | `accounting` | Accounting plans |
| 5 | `payments` | Payments |
| 6 | `consents` | Authorisations (conditional: only if `mybillsagent` channel exists) |
| 7 | `contactDetails` | Contact Details (href link) |
| 8 | `apiDetails` | Payreq API (href link) |

**React SettingsShell wiring (already done):**
- Tab registered at line 50: `{linkTo: "...billTemplates", name: "billTemplates"}`
- Route rendered at lines 203–204: `<Route path="${match.url}/billTemplates"><BillTemplates billerId={biller.id}/></Route>`

---

## 9. Gaps in Current React Implementation

### `BillTemplates.js`

| Gap | Ember behaviour | Current React | Fix required |
|-----|----------------|---------------|-------------|
| List fetch endpoint | `GET /data/billTemplates?billerId=` | `GET /data/bill-templates?billerId=` | Change to `/data/billTemplates` |
| Download endpoint | `GET /data/billTemplates/download?billerId=&id=` then redirect | `window.open(/data/bill-templates/{id}/download?billerId=)` | Call download endpoint, use `downloadFileId` from response |
| Error state | Shows error banner | Silent `console.error` on load failure | Add error state and display |
| Success notification | Route banner/toast system (`showSuccessMessage`) | `alert()` | Use project's `BannerAlert` / dispatch mechanism |
| Upload button label i18n key | `uploadBillTemplateButton` = "Upload document" | `settings.templates.uploadButton` = "Upload Bill Template" | Correct value in en.json |
| Empty state text | "No shared documents found for this mailer." | "No bill templates found" | Correct value in en.json |

### `BillTemplateUploadModal.js`

| Gap | Ember behaviour | Current React | Fix required |
|-----|----------------|---------------|-------------|
| Modal title | i18n "Upload new shared document" | Hardcoded "Upload Bill Template" | Use i18n key `settings.templates.uploadModal.title` |
| Name field label | i18n "Name" | Hardcoded "Template Name" | Use i18n key `settings.templates.uploadModal.nameLabel` |
| Cancel button label | i18n "Cancel" | Hardcoded "Cancel" | Use i18n key `settings.templates.uploadModal.cancel` |
| Confirm button label | i18n "Upload" | Hardcoded "Create" | Use i18n key `settings.templates.uploadModal.confirm` |
| Create POST body field | `documentId` (from upload response) | `fileDataId: uploadedInfo.id` | Change field name to `documentId` |
| File type restriction | `accept=".jpeg,.jpg,.gif,.png,.bmp,.heic,.pdf,.csv,.xlsx,.xls,.xml,.html,.json,.tar,.txt,.zip,.7z"` | No `accept` attribute | Add `accept` to `<input type="file">` |
| Server error mapping | Maps `result.message` → `templateErrors[message]` | Sets generic string on any error | Map response error codes to correct i18n keys |

---

## 10. Established React Patterns (from Settings components)

All settings components follow this pattern:

```js
const ComponentName = ({billerId, intl}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billerId) {
            axios.get("/data/endpoint", {params: {billerId}})
                .then(({data}) => { setData(data.items); setIsLoading(false); })
                .catch(error => { console.error(error); setIsLoading(false); });
        }
    }, [billerId]);

    if (isLoading) return <Loading/>;

    return (/* JSX */);
};

export default injectIntl(ComponentName);
```

**Key conventions:**
- `injectIntl` HOC for i18n, accessed via `intl.formatMessage({id: "key"})`
- `axios` for all API calls (not `fetch`)
- `react-bootstrap` for `Button`, `Modal`, `Alert`, `FormControl`
- `<Loading/>` component shown while fetching
- Modals live in `frontend/src/components/modals/` and are exported via `modals/index.js`
- Date formatting: `getDateAsUTCFormatted(date)` from `../../../utils/date-utils`
- `billerId` passed as prop (not read from route params inside the component)
