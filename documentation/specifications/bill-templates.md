# Bill Templates Screen Specification

## Overview

The Bill Templates screen allows users to upload and manage shared document templates for a biller. Templates can be uploaded, named, and downloaded.

## Source Files

### Ember Source Files
- **Controller/Route**: `frontend-ember/src/js/settings-bill-templates.js`
- **Template**: `frontend-ember/src/js/templates/settings-bill-templates.html`
- **Modal Template**: `frontend-ember/src/js/templates/bill-template-upload-modal.html`
- **i18n Strings**: `frontend-ember/src/js/nls/root/settings.js`

### Existing React Implementation
- **Component**: `frontend/src/components/settings/templates/BillTemplates.js`
- **Modal**: `frontend/src/components/modals/BillTemplateUploadModal.js`

---

## UI Elements

### Element: Upload Button
- **Type**: button
- **Display condition**: Always visible
- **Content/Label**: `strings.capitalised.uploadBillTemplateButton` ("Upload document")
- **CSS classes**: `btn btn-default`
- **Icon**: `glyphicon glyphicon-upload`
- **Action**: Opens upload modal

### Element: Templates Table
- **Type**: table
- **Display condition**: Always visible
- **CSS classes**: `table table-striped`
- **Columns**:
  | Column | i18n Key | Description |
  |--------|----------|-------------|
  | Name | `settingsStrings.all.templates.name` | Template display name |
  | File name | `settingsStrings.all.templates.filename` | Original uploaded filename |
  | Created on | `settingsStrings.all.templates.createdOn` | Date with full time via `{{view-date}}` |
  | Created by | `settingsStrings.all.templates.createdBy` | User who uploaded |
  | Action | `settingsStrings.all.templates.action` | Download button |

### Element: Empty State
- **Type**: table row
- **Display condition**: When `templates.length === 0`
- **Content**: `settingsStrings.all.templates.noTemplatesFound` ("No shared documents found for this mailer.")
- **Colspan**: 5

### Element: Download Button (per row)
- **Type**: link/button
- **Display condition**: For each template row
- **CSS classes**: `btn btn-xs`
- **Icon**: `glyphicon glyphicon-file`
- **Action**: `downloadBillTemplate biller.id template.id`

### Element: Upload Modal
- **Type**: modal dialog
- **Display condition**: When `showUploadModal` is true
- **Title**: `strings.capitalised.uploadMailTemplateTitle` ("Upload new shared document")
- **Components**:
  - Template Name input field
  - File upload component
  - Cancel button
  - Upload/Confirm button (primary, disabled until valid)

### Element: Template Name Input (in modal)
- **Type**: text input
- **Display condition**: Always (in modal)
- **Label**: `strings.uploadMailTemplateNameLabel` ("Name")
- **CSS classes**: `form-control`
- **Validation**: Required (disables submit if blank)

### Element: File Upload (in modal)
- **Type**: file-upload component
- **Display condition**: Always (in modal)
- **Properties**:
  - `url`: `/data/billTemplates/{billerId}/upload`
  - `response`: bound to `uploadedInfo`
  - `uploading`: bound to `uploading` state
  - `fileName`: bound to `fileName` state

---

## Interactions

### Action: uploadBillTemplate
- **Trigger**: Click on upload button
- **Element**: Upload button in actions row
- **Condition**: Always available
- **Handler**: `uploadBillTemplate` action in mixin
- **Behavior**: Opens `bill-template-upload-modal` modal
- **Side effects**: Sets modal visibility to true

### Action: createBillTemplateAction
- **Trigger**: Click confirm button in modal
- **Element**: Modal confirm button
- **Condition**: `uploadedInfo !== null && templateName is not blank`
- **Handler**: `createBillTemplateAction` → `createBillTemplate`
- **Behavior**:
  1. Sends POST to create template
  2. On success: refreshes template list, shows success message
  3. On error: shows localized error message
- **Side effects**: Clears modal state, closes modal

### Action: downloadBillTemplate
- **Trigger**: Click on download icon in table row
- **Element**: Download link/button
- **Condition**: Always available for each row
- **Handler**: `downloadBillTemplate(billerId, templateId)`
- **Behavior**:
  1. GET `/data/billTemplates/download?billerId={billerId}&id={templateId}`
  2. On success: redirects to download URL with `downloadFileId`
  3. Shows success message
- **Side effects**: Opens file download

### Action: closeModal / cancel
- **Trigger**: Click cancel button or modal close
- **Element**: Cancel button, modal X button
- **Condition**: When modal is open
- **Handler**: `closeModal` action
- **Behavior**: Closes modal, clears form state
- **Side effects**: Resets `templateName`, `uploadedInfo`, `uploading`, `fileName`

---

## API Calls

### Endpoint: GET /data/bill-templates
- **When called**: On component mount (via route model hook)
- **Request data**: `{ billerId: string }`
- **Success handling**: Populates templates array in model
- **Error handling**: Console error, sets loading false
- **Loading state**: `isLoading` state variable
- **Response usage**: Rendered in templates table

### Endpoint: POST /data/billTemplates/{billerId}/upload
- **When called**: When user selects a file in upload modal
- **Request data**: `FormData` with `files[]` multipart
- **Success handling**: Sets `uploadedInfo` with response (includes `fileName`, `documentId`)
- **Error handling**: Sets error in `uploadedInfo`
- **Loading state**: `uploading` boolean, progress percentage
- **Response usage**: Stored for subsequent create call

### Endpoint: POST /data/billTemplates/create
- **When called**: When user clicks confirm in upload modal
- **Request data**:
  ```json
  {
    "billerId": "string",
    "name": "string (template name)",
    "fileName": "string (from upload response)",
    "documentId": "string (from upload response)"
  }
  ```
- **Success handling**:
  - If `results.success`: refresh templates, show success message
  - Else: show localized error from `templateErrors`
- **Error handling**: Shows `genericTemplateFail` message
- **Loading state**: Implicit (button disabled during upload)
- **Response usage**: Triggers list refresh

### Endpoint: GET /data/billTemplates/download
- **When called**: When user clicks download button
- **Request data**: `{ billerId: string, id: string }`
- **Success handling**: Redirects to `downloadUrl + "downloadFileId" + results.downloadFileId`
- **Error handling**: Shows generic error message
- **Loading state**: None
- **Response usage**: Used for redirect URL construction

---

## State

### Property: templates (model)
- **Type**: array of BillTemplate objects
- **Initial value**: `[]`
- **Source**: API response from model hook
- **Usage**: Rendered in table via `{{#each model}}`

### Property: biller
- **Type**: object
- **Initial value**: null
- **Source**: Route model (`this.modelFor("biller")`)
- **Usage**: Used for billerId in API calls

### Property: uploadedInfo
- **Type**: object | null
- **Initial value**: `null`
- **Source**: Response from file upload API
- **Usage**: Contains `fileName`, `documentId` for create call; enables confirm button

### Property: templateName
- **Type**: string
- **Initial value**: `null`
- **Source**: User input in modal
- **Usage**: Sent to create API, validates confirm button

### Property: uploading
- **Type**: boolean
- **Initial value**: `false`
- **Source**: Set during file upload
- **Usage**: Shows upload progress, disables inputs

### Property: fileName
- **Type**: string
- **Initial value**: `""`
- **Source**: Set from uploaded file
- **Usage**: Displayed to user in modal

### Property: isLoading
- **Type**: boolean
- **Initial value**: `true`
- **Source**: Set based on API call status
- **Usage**: Shows Loading component

### Property: showUploadModal
- **Type**: boolean
- **Initial value**: `false`
- **Source**: Set by upload button click
- **Usage**: Controls modal visibility

### Computed Property: billTemplateUploadUrl
- **Type**: string
- **Dependencies**: `biller`
- **Formula**: `/data/billTemplates/{biller.id}/upload`
- **Usage**: URL for file upload component

### Computed Property: isPrimaryDisabled
- **Type**: boolean
- **Dependencies**: `uploadedInfo`, `templateName`
- **Formula**: `uploadedInfo === null || String.isBlank(templateName)`
- **Usage**: Disables modal confirm button

### Computed Property: downloadUrl
- **Type**: string
- **Value**: `/download/billTemplate/download?`
- **Usage**: Base URL for file downloads

---

## Data Model

### BillTemplate Model
```javascript
{
  id: string,
  name: string,           // User-provided template name
  fileName: string,       // Original uploaded filename
  documentId: string,     // Reference to stored document
  createdBy: string,      // Username who uploaded
  createdOn: Date         // Upload timestamp
}
```

---

## Navigation

### Route: biller.settings.billTemplates
- **Path**: `/biller/{billerId}/settings/bill-templates` (inferred)
- **Trigger**: Tab navigation in settings
- **Parameters**: `billerId` from parent route
- **Parent**: `biller.settings` route

---

## Validation

### Field: templateName (in modal)
- **Type**: text
- **Required**: Yes
- **Format**: Non-blank string
- **Custom rules**: `String.isBlank()` check
- **Error messages**: N/A (button simply disabled)

### Field: file (in modal)
- **Type**: file
- **Required**: Yes (implicitly - must upload before create)
- **Format**: Validated server-side
- **Error messages**:
  - `templateErrors.invalid.filetype`: "unsupported file type"
  - `templateErrors.invalid.filetype.csv`: CSV format required
  - `templateErrors.invalid.filetype.html`: HTML format required
  - `templateErrors.invalid.filetype.pdf`: PDF format required

---

## i18n Strings

| Key | Default (EN) | Usage |
|-----|--------------|-------|
| `settings.templates.name` | "Name" | Table header |
| `settings.templates.filename` | "File name" | Table header |
| `settings.templates.createdOn` | "Created on" | Table header |
| `settings.templates.createdBy` | "Created by" | Table header |
| `settings.templates.action` | "Action" | Table header |
| `settings.templates.noTemplatesFound` | "No shared documents found for this mailer." | Empty state |
| `settings.templates.uploadButton` | "Upload document" | Upload button text |
| `uploadMailTemplateTitle` | "Upload new shared document" | Modal title |
| `uploadMailTemplateNameLabel` | "Name" | Modal input label |
| `uploadMailTemplateCancel` | "Cancel" | Modal cancel button |
| `uploadMailTemplateConfirm` | "Upload" | Modal confirm button |
| `successfulTemplateUpload` | "We will let you know shortly..." | Success message |
| `genericTemplateError` | "Unable to create mail template..." | Generic error |
| `genericTemplateFail` | "An error occurred while uploading..." | Upload failure |
| `templateErrors.invalid.filetype` | "unsupported file type" | File type error |
| `templateErrors.invalid.filetype.csv` | "Please upload a CSV file..." | CSV error |
| `templateErrors.invalid.filetype.html` | "Please upload a HTML file." | HTML error |
| `templateErrors.invalid.filetype.pdf` | "Please upload a PDF file." | PDF error |

---

## React Codebase Patterns

Based on analysis of existing React components in `frontend/src/components/`:

### i18n Approach
- **Pattern**: `injectIntl` HOC with `intl.formatMessage({id: "key"})`
- **Example**: All settings components use this pattern
- **Keys**: Use dot notation like `settings.templates.name`

### State Management
- **Pattern**: React hooks (`useState`, `useEffect`)
- **Loading**: `isLoading` state with `<Loading/>` component
- **API calls**: `axios` with `.then()/.catch()` pattern

### Component Structure
```javascript
import React, {useEffect, useState} from "react";
import axios from "axios";
import {injectIntl} from "react-intl";
import {Button} from "react-bootstrap";
import Loading from "../../Loading";

const ComponentName = ({billerId, intl}) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (billerId) {
            axios.get("/api/endpoint", {params: {billerId}})
                .then(({data}) => {
                    setData(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error:", error);
                    setIsLoading(false);
                });
        }
    }, [billerId]);

    if (isLoading) {
        return <Loading/>;
    }

    return (/* JSX */);
};

export default injectIntl(ComponentName);
```

### Modal Pattern
- **Import**: `import {Modal, Button} from "react-bootstrap";`
- **Props**: `show`, `onClose`, `onComplete`, `billerId`
- **State**: Internal state for form fields
- **Structure**:
  - `<Modal.Header closeButton>`
  - `<Modal.Body>` with form
  - `<Modal.Footer>` with Cancel/Confirm buttons

### File Upload Pattern
- **Common component**: `frontend/src/components/common/form/FileUpload`
- **Direct usage**: `<input type="file">` with axios multipart POST
- **Progress**: `onUploadProgress` callback with percentage calculation
- **Headers**: `'Content-Type': 'multipart/form-data'`

### Date Formatting
- **Utility**: `getDateAsUTCFormatted` from `../../../utils/date-utils`
- **Usage**: `{getDateAsUTCFormatted(template.createdOn)}`

### Table Pattern
- **CSS classes**: `table table-striped`
- **Empty state**: Conditional row with `colSpan`
- **Iteration**: `{items.map(item => <tr key={item.id}>...)}`

### Button Icons
- **Pattern**: Bootstrap glyphicons
- **Usage**: `<span className="glyphicon glyphicon-upload"></span>`

### Error Handling
- **Console**: `console.error("Error message:", error)`
- **User feedback**: `alert()` for simple messages (should migrate to toast)
- **Inline errors**: `<Alert bsStyle="danger">` in modals

### Confirmation Dialogs
- **Pattern**: `window.confirm()` for destructive actions
- **Example**: See `ConnectionsSettings.js` for disconnect confirmation

---

## Migration Notes

### Current React Implementation Status
The React implementation exists but has some differences from Ember:

1. **API Endpoints**: React uses `/data/bill-templates` (hyphenated) vs Ember's `/data/billTemplates` (camelCase)
2. **Download Approach**: React opens URL directly vs Ember's two-step GET then redirect
3. **Error Messages**: React modal has hardcoded English strings vs Ember's localized `templateErrors`
4. **Success Handling**: React uses `alert()` vs Ember's proper success message display

### Recommended Improvements
1. Add proper i18n keys to `BillTemplateUploadModal.js`
2. Implement consistent error handling with localized messages
3. Consider using common `FileUpload` component instead of raw `<input type="file">`
4. Add toast notifications instead of `alert()` calls
5. Verify API endpoint consistency between frontend and backend
