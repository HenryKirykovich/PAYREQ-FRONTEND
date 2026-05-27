# Reports Dashboard Specification

## Overview

The Reports Dashboard is a screen that allows users to generate three types of reports:
- Monthly Summary Report
- Billing Summary Report
- Billing Detail Report

Each report type has configurable biller and time period options.

## Source Files

### Ember Files
- **Template**: `frontend-ember/src/js/templates/reports.html`
- **Controller/Route**: `frontend-ember/src/js/reports.js`
- **i18n**: `frontend-ember/src/js/nls/root/reports.js`
- **Route Definition**: `frontend-ember/src/js/application.js` (line 85)

### Existing React Implementation
- **Component**: `frontend/src/components/Reports/ReportsDashboard.js`
- **Related Components**:
  - `frontend/src/components/Reports/MonthlySummaryReport.js`
  - `frontend/src/components/Reports/BillingSummaryReport.js`
  - `frontend/src/components/Reports/BillingDetailReport.js`

---

## UI Elements

### Element: Page Heading
- **Type**: h2 heading
- **Display condition**: Always
- **Content/Label**: `{{strings.reports}}` / `reports.title` ("Reports")
- **CSS classes**: `page-heading`

### Element: Monthly Summary Section Header
- **Type**: h4 heading
- **Display condition**: Always
- **Content/Label**: `{{strings.monthlySummary}}` / `reports.monthlySummary` ("Monthly Summary")

### Element: Monthly Summary Form
- **Type**: form
- **Display condition**: Always
- **CSS classes**: `form-inline`
- **Attributes**: `role="form"`, `id="monthly-summary-form"`
- **Contains**:
  - Biller select dropdown
  - Period select dropdown
  - Run button

### Element: Biller Select Dropdown (Monthly Summary)
- **Type**: select (custom `item-select` component in Ember)
- **Display condition**: Always
- **Label**: `{{strings.billerLabel}}` / `reports.billerLabel` ("Billers" / "Biller")
- **CSS classes**: `form-control`
- **Options**:
  | Value | Label |
  |-------|-------|
  | `me` | "This mailer" / "This Mailer" |
  | `all` | "All mailers" / "All Mailers" |
- **Bound to**: `reportBillerOption` (default: "me")

### Element: Period Select Dropdown (Monthly Summary)
- **Type**: select (custom `item-select` component in Ember)
- **Display condition**: Always
- **Label**: `{{strings.periodLabel}}` / `reports.periodLabel` ("Period")
- **CSS classes**: `form-control`
- **Options**:
  | Value | Label |
  |-------|-------|
  | `current` | "Current" / "Current Month" |
  | `previous` | "Previous" / "Previous Month" |
  | `last3` | "Last 3" / "Last 3 Months" |
  | `last6` | "Last 6" / "Last 6 Months" |
  | `all` | "All" / "All Time" |
- **Bound to**: `reportTimeOption` (default: "current")

### Element: Run Button (Monthly Summary)
- **Type**: button
- **Display condition**: Always
- **Content/Label**: `{{strings.run}}` / `reports.run` ("Run")
- **CSS classes**: `btn btn-primary`
- **Attributes**: `type="submit"`, `style="margin-left: 30px;"`
- **Action**: `monthlySummary`

### Element: Horizontal Rule (Separator)
- **Type**: hr
- **Display condition**: Always (appears between each report section)

### Element: Billing Summary Section Header
- **Type**: h4 heading
- **Display condition**: Always
- **Content/Label**: `{{strings.billingSummary}}` / `reports.billingSummary` ("Billing Summary Report" / "Billing Summary")

### Element: Billing Summary Form
- **Type**: form
- **Display condition**: Always
- **CSS classes**: `form-inline`
- **Attributes**: `role="form"`, `id="monthly-summary-form"` (Note: duplicate ID in Ember)
- **Contains**: Same structure as Monthly Summary Form but with separate state

### Element: Biller Select Dropdown (Billing Summary)
- **Type**: select
- **Bound to**: `reportBillerOption2` (default: "me")
- **Same options as Monthly Summary biller dropdown**

### Element: Period Select Dropdown (Billing Summary)
- **Type**: select
- **Bound to**: `reportTimeOption2` (default: "current")
- **Same options as Monthly Summary period dropdown**

### Element: Run Button (Billing Summary)
- **Type**: button
- **Action**: `billingReportSummary`
- **Same styling as Monthly Summary run button**

### Element: Billing Detail Section Header
- **Type**: h4 heading
- **Display condition**: Always
- **Content/Label**: `{{strings.billingDetail}}` / `reports.billingDetail` ("Billing Detail Report" / "Billing Detail")

### Element: Billing Detail Form
- **Type**: form
- **Display condition**: Always
- **CSS classes**: `form-inline`
- **Attributes**: `role="form"`, `id="monthly-summary-form"` (Note: duplicate ID in Ember)
- **Contains**: Same structure as other forms but with separate state

### Element: Biller Select Dropdown (Billing Detail)
- **Type**: select
- **Bound to**: `reportBillerOption3` (default: "me")
- **Same options as other biller dropdowns**

### Element: Period Select Dropdown (Billing Detail)
- **Type**: select
- **Bound to**: `reportTimeOption3` (default: "current")
- **Same options as other period dropdowns**

### Element: Run Button (Billing Detail)
- **Type**: button
- **Action**: `billingReportDetail`
- **Same styling as other run buttons**

---

## Interactions

### Action: monthlySummary
- **Trigger**: click / form submit
- **Element**: Run button in Monthly Summary form
- **Condition**: Always available
- **Handler**: `monthlySummary` action → calls `doReport("monthlySummary", reportBillerOption, reportTimeOption)`
- **Behavior**: Prepares a Monthly Summary report and navigates to the report view
- **Side effects**:
  - API call to prepare report
  - Navigation to `biller.report` route with `reportKey`

### Action: billingReportSummary
- **Trigger**: click / form submit
- **Element**: Run button in Billing Summary form
- **Condition**: Always available
- **Handler**: `billingReportSummary` action → calls `doReport("billingReportSummary", reportBillerOption2, reportTimeOption2)`
- **Behavior**: Prepares a Billing Summary report and navigates to the report view
- **Side effects**:
  - API call to prepare report
  - Navigation to `biller.reportbillingsummary` route with `reportKey`

### Action: billingReportDetail
- **Trigger**: click / form submit
- **Element**: Run button in Billing Detail form
- **Condition**: Always available
- **Handler**: `billingReportDetail` action → calls `doReport("billingReportDetail", reportBillerOption3, reportTimeOption3)`
- **Behavior**: Prepares a Billing Detail report and navigates to the report view
- **Side effects**:
  - API call to prepare report
  - Navigation to `biller.reportbillingdetail` route with `reportKey`

---

## API Calls

### Endpoint: POST /data/reports/{billerId}/prepare
- **When called**: When user clicks any "Run" button
- **Request data**:
  ```json
  {
    "reportType": "monthlySummary" | "billingReportSummary" | "billingReportDetail",
    "billerOption": "me" | "all",
    "timeOption": "current" | "previous" | "last3" | "last6" | "all",
    "tz": "<timezone string from moment.tz.guess()>"
  }
  ```
- **Success handling**:
  - Receives `{ reportKey: "<key>" }` in response
  - Navigates to appropriate report view route:
    - `monthlySummary` → `/portal/customer/biller/{billerId}/reports/report/{reportKey}`
    - `billingReportSummary` → `/portal/customer/biller/{billerId}/reports/billingsummary/{reportKey}`
    - `billingReportDetail` → `/portal/customer/biller/{billerId}/reports/billingdetail/{reportKey}`
- **Error handling**:
  - Ember: Shows error message "An error occurred while creating the report. Please try again later."
  - React: Uses `alert()` with `intl.formatMessage({id: "reports.error.createFailed"})`
- **Loading state**: Not explicitly shown (immediate navigation on success)

---

## State & Computed Properties

### Property: reportBillerOptions
- **Type**: array of objects
- **Initial value**:
  ```javascript
  [
    {id: "me", name: "This mailer"},
    {id: "all", name: "All mailers"}
  ]
  ```
- **Source**: Static constant in controller
- **Usage**: Options for all three biller select dropdowns

### Property: reportBillerOption
- **Type**: string
- **Initial value**: `"me"`
- **Source**: Controller property (bound to select)
- **Usage**: Selected biller option for Monthly Summary form

### Property: reportBillerOption2
- **Type**: string
- **Initial value**: `"me"`
- **Source**: Controller property (bound to select)
- **Usage**: Selected biller option for Billing Summary form

### Property: reportBillerOption3
- **Type**: string
- **Initial value**: `"me"`
- **Source**: Controller property (bound to select)
- **Usage**: Selected biller option for Billing Detail form

### Property: reportTimeOptions
- **Type**: array of objects
- **Initial value**:
  ```javascript
  [
    {id: "current", name: "Current"},
    {id: "previous", name: "Previous"},
    {id: "last3", name: "Last 3"},
    {id: "last6", name: "Last 6"},
    {id: "all", name: "All"}
  ]
  ```
- **Source**: Static constant in controller
- **Usage**: Options for all three time period select dropdowns

### Property: reportTimeOption
- **Type**: string
- **Initial value**: `"current"`
- **Source**: Controller property (bound to select)
- **Usage**: Selected time period for Monthly Summary form

### Property: reportTimeOption2
- **Type**: string
- **Initial value**: `"current"`
- **Source**: Controller property (bound to select)
- **Usage**: Selected time period for Billing Summary form

### Property: reportTimeOption3
- **Type**: string
- **Initial value**: `"current"`
- **Source**: Controller property (bound to select)
- **Usage**: Selected time period for Billing Detail form

### Property: strings (Ember Mixin)
- **Type**: object (StringsMap)
- **Source**: Computed property based on `biller.channelPartnerSystemId` and `biller.extBillerId`
- **Usage**: Internationalized strings, allows for channel-partner specific overrides
- **Dependencies**: `biller.channelPartnerSystemId`, `biller.extBillerId`, `biller.masterBiller`

---

## Navigation

### Route: biller.reports (Dashboard)
- **Path**: `/portal/customer/biller/{billerId}/reports`
- **Trigger**: Navigation from menu
- **Parameters**: `billerId` from parent route

### Route: biller.report (Monthly Summary Results)
- **Path**: `/portal/customer/biller/{billerId}/reports/report/{reportKey}`
- **Trigger**: After successful Monthly Summary report preparation
- **Parameters**: `reportKey` from API response

### Route: biller.reportbillingsummary (Billing Summary Results)
- **Path**: `/portal/customer/biller/{billerId}/reports/billingsummary/{reportKey}`
- **Trigger**: After successful Billing Summary report preparation
- **Parameters**: `reportKey` from API response

### Route: biller.reportbillingdetail (Billing Detail Results)
- **Path**: `/portal/customer/biller/{billerId}/reports/billingdetail/{reportKey}`
- **Trigger**: After successful Billing Detail report preparation
- **Parameters**: `reportKey` from API response

---

## Validation Rules

No form validation is required for this screen. All fields have default values selected.

---

## i18n Strings

| Key | Default (EN) | Usage |
|-----|--------------|-------|
| `reports.title` | Reports | Page heading |
| `reports.monthlySummary` | Monthly Summary | Section header for first report |
| `reports.billingSummary` | Billing Summary | Section header for second report |
| `reports.billingDetail` | Billing Detail | Section header for third report |
| `reports.billerLabel` | Biller | Label for biller dropdown |
| `reports.periodLabel` | Period | Label for period dropdown |
| `reports.run` | Run | Button text |
| `reports.billers.thisMailer` | This Mailer | Biller option - current mailer only |
| `reports.billers.allMailers` | All Mailers | Biller option - all mailers |
| `reports.period.current` | Current Month | Period option |
| `reports.period.previous` | Previous Month | Period option |
| `reports.period.last3` | Last 3 Months | Period option |
| `reports.period.last6` | Last 6 Months | Period option |
| `reports.period.all` | All Time | Period option |
| `reports.error.createFailed` | An error occurred while creating the report. Please try again later. | Error message |

### Note on Ember i18n
The Ember implementation uses a `StringsMap` that supports channel-partner specific overrides. The base translations are in `nls/root/reports.js` with structure like:
- `translations.all.billers.thisMailer`
- `translations.all.period.current`

These are flattened in the React implementation to `reports.billers.thisMailer`, `reports.period.current`, etc.

---

## React Codebase Patterns

### i18n Approach
- Uses `injectIntl` HOC from `react-intl`
- Access translations via `intl.formatMessage({id: "key"})`
- Messages stored in `/frontend/src/lang/en.json`

### Common Components Available
- `Select` from `../common` - Provides labeled select dropdown with i18n support
- `PageHeading` - Standard page heading component
- `Button` from `react-bootstrap` - Standard button component

### State Management
- Uses React hooks (`useState`)
- Each form section maintains its own state
- No global state management needed for this component

### Navigation
- Uses `useHistory` from `react-router-dom`
- Navigation via `history.push(path)`

### API Calls
- Uses `axios` for HTTP requests
- `moment-timezone` for timezone detection (`moment.tz.guess()`)

### Styling Conventions
- Bootstrap classes: `row`, `col-md-12`, `form-control`, `form-inline`, `btn`, `btn-primary`
- Custom class: `page-heading`
- Inline styles for margin adjustments

---

## Differences Between Ember and React Implementations

### React Implementation Notes
1. Uses native `<select>` elements instead of Ember's `item-select` component
2. Uses `react-bootstrap` Button instead of plain HTML button
3. Uses `useHistory` for navigation instead of `transitionTo`
4. Error handling uses browser `alert()` - could be improved with proper error UI

### Potential Improvements for React
1. Replace native `<select>` with the common `Select` component for consistency
2. Add proper error handling UI instead of using `alert()`
3. Add loading state during API call
4. Use `PageHeading` component instead of inline h2

---

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│ Reports (page-heading)                               │
├─────────────────────────────────────────────────────┤
│                                                      │
│ Monthly Summary (h4)                                 │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Billers [This Mailer ▼] Period [Current ▼] [Run]│ │
│ └─────────────────────────────────────────────────┘ │
│ ─────────────────────────────────────────────────── │
│                                                      │
│ Billing Summary Report (h4)                          │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Billers [This Mailer ▼] Period [Current ▼] [Run]│ │
│ └─────────────────────────────────────────────────┘ │
│ ─────────────────────────────────────────────────── │
│                                                      │
│ Billing Detail Report (h4)                           │
│ ┌─────────────────────────────────────────────────┐ │
│ │ Billers [This Mailer ▼] Period [Current ▼] [Run]│ │
│ └─────────────────────────────────────────────────┘ │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Related Report View Routes

The Reports Dashboard navigates to these report view components after preparation:

### Monthly Summary Report View
- **Route**: `biller.report`
- **API**: `GET /data/reports/{billerId}/get/{reportKey}`
- **Download**: `GET /download/reports/download/{reportKey}/monthlySummary`

### Billing Summary Report View
- **Route**: `biller.reportbillingsummary`
- **API**: `GET /data/reports/{billerId}/get/{reportKey}`
- **Download**: `GET /download/reports/download/{reportKey}/billingReportSummary`

### Billing Detail Report View
- **Route**: `biller.reportbillingdetail`
- **API**: `GET /data/reports/{billerId}/get/{reportKey}`
- **Download**: `GET /download/reports/download/{reportKey}/billingReportDetail`
