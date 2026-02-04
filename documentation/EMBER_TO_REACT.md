# EmberJS to React Migration Status

> **Last Updated:** 2026-02-04

This document tracks all screens/routes still using EmberJS (`frontend-ember`) that need to be migrated to React (`frontend`).

## 📋 Table of Contents

- [Overview](#overview)
- [Routing Migration Guide](#routing-migration-guide)
  - [Route Path Changes](#route-path-changes)
  - [Parameter Naming](#parameter-naming)
  - [Navigation Updates](#navigation-updates)
  - [Examples](#routing-migration-examples)
- [Part 1: Mailbox Screens (Recipient/Payer)](#part-1-mailbox-screens-recipientpayer-role)
  - [EmberJS Screens](#mailbox-screens---still-in-emberjs)
  - [Migrated to React](#mailbox-screens---migrated-to-react)
- [Part 2: Delivery Screens (Biller/Mailer)](#part-2-delivery-screens-billermailer-role)
  - [EmberJS Screens](#delivery-screens---still-in-emberjs)
  - [Migrated to React](#delivery-screens---migrated-to-react)
- [Shared Screens](#shared-screens-both-roles)
- [Migration Summary](#migration-summary)

---

## Overview

### User Roles

- **MAILBOX SCREENS**: For users who are recipients/payers only (receive bills from others)
- **DELIVERY SCREENS**: For users who are billers/mailers (send bills to others)

### Current Status

| Category | Total Screens | In EmberJS | Migrated to React | Progress |
|----------|--------------|------------|-------------------|----------|
| Mailbox | 27 | 16 | 11 | 41% ✅ |
| Delivery | 36 | 25 | 11 | 31% ✅ |
| **Overall** | **63** | **41** | **22** | **35%** ✅ |

---

## Routing Migration Guide

When migrating a screen from EmberJS to React, you'll need to update the routing configuration. This section explains the key differences and changes required.

### Route Path Changes

EmberJS and React use different routing patterns:

#### EmberJS Routes (Nested Structure)
```javascript
// frontend-ember/src/js/application.js
App.Router.map(function () {
    this.route("biller", {path: "/biller/:id"}, function () {
        this.route("bills");
        this.route("bill", {path: "/bill/:billId"});
        this.route("contacts");
        this.route("contact", {path: "/contact/:contactId"});
        // ...
    });
});
```

Routes are **nested** under `/biller/:id/`, creating paths like:
- `/biller/:id/bills`
- `/biller/:id/bill/:billId`
- `/biller/:id/contacts`

#### React Routes (Flat Structure with Full Paths)
```javascript
// frontend/src/routes/UserShell.js or similar
<Route
  path="/portal/customer/biller/:billerId/inbox"
  component={Inbox}
/>
<Route
  path="/portal/customer/biller/:billerId/inbox/:invoiceId"
  component={InboxDetail}
/>
```

Routes use the **full path** with explicit prefixes:
- `/portal/customer/biller/:billerId/inbox`
- `/portal/customer/biller/:billerId/cards`

---

### Parameter Naming

Parameter names differ between EmberJS and React:

| EmberJS | React | Notes |
|---------|-------|-------|
| `:id` | `:billerId` | Biller/account ID |
| `:billId` | `:billId` | Same (bill ID) |
| `:contactId` | `:contactId` | Same (contact ID) |
| `:invoiceId` | `:invoiceId` | Same (invoice ID) |
| `:userId` | `:userId` | Same (user ID) |

**Key Change:** The main account ID changes from `:id` → `:billerId` for clarity.

---

### Navigation Updates

#### 1. **Transition Between Routes**

**EmberJS** uses `transitionTo`:
```javascript
// In EmberJS controller/route
this.transitionTo('biller.bills', billerId);
this.transitionTo('biller.bill', billerId, billId);
```

**React** uses React Router hooks:
```javascript
// In React component
import { useHistory } from 'react-router-dom';

const history = useHistory();

// Navigate to bills list
history.push(`/portal/customer/biller/${billerId}/bills`);

// Navigate to bill detail
history.push(`/portal/customer/biller/${billerId}/bill/${billId}`);
```

#### 2. **Link Components**

**EmberJS** uses `{{link-to}}`:
```handlebars
{{#link-to "biller.bills" model.id class="btn btn-primary"}}
  View Bills
{{/link-to}}
```

**React** uses `<Link>`:
```jsx
import { Link } from 'react-router-dom';

<Link
  to={`/portal/customer/biller/${billerId}/bills`}
  className="btn btn-primary"
>
  View Bills
</Link>
```

#### 3. **Reading Route Parameters**

**EmberJS** uses `this.modelFor()` or params:
```javascript
// In route
model: function(params) {
    return params.billId;
}

// In controller
billerId: Ember.computed("model", {
    get: function() {
        return this.modelFor("biller").id;
    }
})
```

**React** uses `useParams()` hook:
```javascript
import { useParams } from 'react-router-dom';

const MyComponent = () => {
    const { billerId, billId } = useParams();

    // Use billerId and billId directly
    return <div>Bill ID: {billId}</div>;
};
```

---

### Routing Migration Examples

#### Example 1: Migrating Bills List

**EmberJS Route:**
```javascript
// Path: /biller/:id/bills
this.route("biller", {path: "/biller/:id"}, function () {
    this.route("bills");
});
```

**React Route:**
```javascript
// Path: /portal/customer/biller/:billerId/bills
<Route
  path="/portal/customer/biller/:billerId/bills"
  component={BillsList}
/>
```

**Navigation Change:**
```javascript
// EmberJS
this.transitionTo('biller.bills', billerId);

// React
history.push(`/portal/customer/biller/${billerId}/bills`);
```

---

#### Example 2: Migrating Contact Detail

**EmberJS Route:**
```javascript
// Path: /biller/:id/contact/:contactId
this.route("biller", {path: "/biller/:id"}, function () {
    this.route("contact", {path: "/contact/:contactId"});
});
```

**React Route:**
```javascript
// Path: /portal/customer/biller/:billerId/contact/:contactId
<Route
  path="/portal/customer/biller/:billerId/contact/:contactId"
  component={ContactDetail}
/>
```

**Parameter Access:**
```javascript
// EmberJS Controller
contactId: Ember.computed("model", {
    get: function() {
        return this.get("model.id");
    }
})

// React Component
const { billerId, contactId } = useParams();
```

---

#### Example 3: Migrating Settings Pages

**EmberJS Nested Routes:**
```javascript
// Path: /biller/:id/settings/users
this.route("biller", {path: "/biller/:id"}, function () {
    this.route("settings", function () {
        this.route("users");
        this.route("users", function () {
            this.route("user", {path: "/user/:userId"});
        });
    });
});
```

**React Flat Routes:**
```javascript
// Path: /portal/customer/biller/:billerId/settings/users
<Route
  path="/portal/customer/biller/:billerId/settings/users"
  exact
  component={UsersList}
/>

// Path: /portal/customer/biller/:billerId/settings/users/:userId
<Route
  path="/portal/customer/biller/:billerId/settings/users/:userId"
  component={UserDetail}
/>
```

**Note:** Use `exact` prop when you have overlapping paths.

---

### Migration Checklist

When migrating a screen, update the following:

- [ ] **Route Definition**
  - [ ] Add new React route in `AppRouter.js` or appropriate route file
  - [ ] Change path from `/biller/:id/...` to `/portal/customer/biller/:billerId/...`
  - [ ] Update parameter name from `:id` to `:billerId`

- [ ] **Component Navigation**
  - [ ] Replace `transitionTo()` with `history.push()`
  - [ ] Update all `{{link-to}}` to `<Link>` components
  - [ ] Update all route paths in navigation

- [ ] **Parameter Access**
  - [ ] Replace `this.modelFor()` with `useParams()`
  - [ ] Update parameter names in destructuring

- [ ] **Redirects**
  - [ ] Update any redirects from old EmberJS paths to new React paths
  - [ ] Test that bookmarked URLs redirect correctly

- [ ] **Backend Integration**
  - [ ] Verify API endpoints still work with new routes
  - [ ] Update any backend redirects if necessary

- [ ] **Testing**
  - [ ] Test direct URL access
  - [ ] Test navigation from other screens
  - [ ] Test browser back/forward buttons
  - [ ] Test deep linking

---

### Common Pitfalls

1. **Forgetting to add `/portal/customer` prefix**
   - EmberJS: `/biller/:id/bills`
   - React: `/portal/customer/biller/:billerId/bills` ✅

2. **Using `:id` instead of `:billerId`**
   - Be consistent with React's naming convention

3. **Not using `exact` prop**
   - Can cause multiple routes to match
   - Use `exact` for parent routes when child routes exist

4. **Hardcoding paths**
   - Consider creating route constants to avoid typos
   ```javascript
   // routes/constants.js
   export const ROUTES = {
     BILLS_LIST: (billerId) => `/portal/customer/biller/${billerId}/bills`,
     BILL_DETAIL: (billerId, billId) => `/portal/customer/biller/${billerId}/bill/${billId}`
   };
   ```

---

## Part 1: Mailbox Screens (Recipient/Payer Role)

Users in this role receive bills from billers and manage their incoming invoices, payments, and subscriptions to billers.

### Mailbox Screens - Still in EmberJS

#### 1. Invoices List (MyBills/Inbox)

**Routes:**
- `/biller/:id/invoices`
- `/biller/:id/invoices/:type` (filtered by type: all/pending/paid/etc)

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/invoices.js` (no separate HTML file)
- Controller: `frontend-ember/src/js/invoices.js` (line 13+)

**Description:** View all incoming bills/invoices received from billers. Filter by status (pending, paid, overdue). This is the main inbox for recipients to see bills they need to pay.

---

#### 2. Invoice Detail

**Route:** `/biller/:id/invoice/:invoiceId`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/invoices.js`
- Controller: `frontend-ember/src/js/invoices.js`

**Description:** View details of a specific invoice including amount, due date, biller details, and payment options. Allows recipient to pay or save the invoice.

---

#### 3. Invoice Forwarding

**Route:** `/biller/:id/invoiceForward/:invoiceId`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/invoices.js`
- Controller: `frontend-ember/src/js/invoices.js`

**Description:** Forward an invoice to another email address or contact. Useful when recipient needs someone else to handle payment.

---

#### 4. Invoice Biller Management

**Route:** `/biller/:id/invoiceBiller/:invoiceBillerId`

**Files:**
- Template: `frontend-ember/src/js/templates/invoice-biller.html`
- Controller: `frontend-ember/src/js/invoices.js`

**Description:** View and manage details of a specific biller/mailer that sends invoices. Update the biller's display name and view their email.

---

#### 5. Incoming Email Management

**Route:** `/biller/:id/incomingEmail`

**Files:**
- Template: `frontend-ember/src/js/templates/incoming-email.html`
- Controller: `frontend-ember/src/js/invoices.js`

**Description:** Manage incoming email forwarding settings. Configure how emails from billers are processed and imported into the mailbox.

---

#### 6. Incoming Registrations (Subscriptions List)

**Route:** `/biller/:id/incoming/registrations/:type`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/incoming-registrations.js`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** View and manage subscriptions to billers. See all billers that the user is registered with to receive bills electronically.

---

#### 7. Incoming Registration Detail

**Route:** `/biller/:id/incoming/registration/:registrationId`

**Files:**
- Template: `frontend-ember/src/js/templates/incoming-registration.html`
- Controller: `frontend-ember/src/js/incoming-registrations.js` (line 1251)

**Description:** View and edit a specific subscription to a biller. Update account numbers, authentication details, or unsubscribe from receiving bills.

---

#### 8. Incoming Mailer Configuration

**Route:** `/biller/:id/incoming/mailer`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/incoming-registrations.js`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** Configure how incoming bills are received and processed from various channels (email, accounting software integrations).

---

#### 9. Xero Connect (Recipient)

**Route:** `/biller/:id/incoming/xeroconnect/:mailerId`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/incoming-registrations.js`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** Connect Xero accounting software to automatically import bills into Xero as they arrive in the mailbox.

---

#### 10. Email Registration (Recipient)

**Route:** `/biller/:id/incoming/emailrego/:mailerId`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/incoming-registrations.js`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** Register to receive bills via email forwarding. Set up email addresses that will forward bills into the mailbox.

---

#### 11. MYOB Integration (Recipient)

**Route:** `/biller/:id/incoming/myob/:mailerId`

**Files:**
- Template: `frontend-ember/src/js/templates/incoming-myob.html`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** Connect MYOB accounting software to automatically import received bills into MYOB.

---

#### 12. Reckon Integration (Recipient)

**Route:** `/biller/:id/incoming/reckon/:mailerId`

**Files:**
- Template: `frontend-ember/src/js/templates/incoming-reckon.html`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** Connect Reckon accounting software to automatically import received bills into Reckon.

---

#### 13. MyBills Agent (Recipient)

**Route:** `/biller/:id/incoming/mybillsagent/:mailerId`

**Files:**
- Template: `frontend-ember/src/js/templates/mybillsagent-import-modal.html`
- Controller: `frontend-ember/src/js/incoming-registrations.js` (line 175)

**Description:** Configure MyBills Agent to bulk import subscriptions on behalf of the recipient (used by authorized agents/accountants).

---

#### 14. Import from Text (Recipient)

**Route:** `/biller/:id/incoming/importfromtext/:mailerId`

**Files:**
- Template: `frontend-ember/src/js/templates/import-from-text.html`
- Controller: `frontend-ember/src/js/incoming-registrations.js` (line 986)

**Description:** Import subscription details from text/CSV format to bulk register with multiple billers at once.

---

#### 15. MyBills Configuration (Recipient)

**Route:** `/biller/:id/incoming/mybills/:mailerId`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/incoming-registrations.js`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** Configure general MyBills settings for receiving bills including notification preferences and delivery options.

---

#### 16. Incoming Channels (Recipient)

**Route:** `/biller/:id/incoming/channels/:mailerId`

**Files:**
- Template: Dynamically generated in `frontend-ember/src/js/incoming-registrations.js`
- Controller: `frontend-ember/src/js/incoming-registrations.js`

**Description:** Manage different channels through which bills can be received (email, integrations, API).

---

### Mailbox Screens - Migrated to React

✅ The following mailbox screens have been successfully migrated to React:

1. **Inbox** - Main recipient view (`frontend/src/components/Inbox/`)
2. **Payment Flow** - Payment processing (`frontend/src/components/Pay/`)
3. **BPay Batch** - Batch payment creation
4. **Registrations - Billers List** - Browse billers
5. **Registrations - Biller Detail** - View subscriptions
6. **Registration Detail** - Manage subscription
7. **Create Registration** - Subscribe to billers
8. **Admin Subscription Creation** - Bulk subscription admin
9. **Auto Payments** - Automated payment setup (`frontend/src/components/AutoPayments/`)
10. **Payment History** - View payment history (`frontend/src/components/paymentHistory/`)
11. **Saved Cards** - Manage payment cards (`frontend/src/components/cards/`)

---

## Part 2: Delivery Screens (Biller/Mailer Role)

Users in this role send bills to recipients/payers and manage their customer contacts, bill distribution, and incoming registrations.

### Delivery Screens - Still in EmberJS

#### Core Billing Operations

##### 1. Bills List (Outgoing Bills)

**Routes:**
- `/biller/:id/bills`
- `/biller/:id/bills/:type` (filtered by type)

**Files:**
- Template: `frontend-ember/src/js/templates/bills.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** View and manage all outgoing bills sent to customers. Filter by status (draft, sent, paid, overdue). Upload new bills, approve/reject bills, and download payment files. This is the main dashboard for billers to manage their accounts receivable.

---

##### 2. Bill Detail

**Route:** `/biller/:id/bill/:billId`

**Files:**
- Template: `frontend-ember/src/js/templates/bill.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** View and edit a specific bill including customer details, amounts, due dates, and payment status. Track when bill was sent, viewed, and paid.

---

##### 3. Contacts Management

**Route:** `/biller/:id/contacts`

**Files:**
- Template: `frontend-ember/src/js/templates/contacts.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** Manage customer contact database. View, add, edit, and import contacts. Search by name, email, account number, or custom fields. Export contact lists.

---

##### 4. Contact Detail

**Route:** `/biller/:id/contact/:contactId`

**Files:**
- Template: `frontend-ember/src/js/templates/contact.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** View and edit individual contact details including name, email, address, account numbers, and custom fields. View bill history for the contact.

---

##### 5. Import Bills & Contacts

**Route:** `/biller/:id/import`

**Files:**
- Template: `frontend-ember/src/js/templates/import.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** Bulk import bills and contacts from CSV/Excel files or accounting software. Map columns, validate data, and import in batches. Import deregistration requests.

---

#### Reports

##### 6. Reports Dashboard

**Route:** `/biller/:id/reports`

**Files:**
- Template: `frontend-ember/src/js/templates/reports.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** Main reports dashboard showing available reports and recently generated reports. Access all billing and operational reports.

---

##### 7. Generic Report Viewer

**Route:** `/biller/:id/report/:reportId`

**Files:**
- Template: `frontend-ember/src/js/templates/report.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** View and export generated reports including data tables and charts.

---

##### 8. Billing Summary Report

**Route:** `/biller/:id/reportbillingsummary/:reportId`

**Files:**
- Template: `frontend-ember/src/js/templates/reportbillingsummary.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** Summary report of billing activity including total bills sent, payment rates, outstanding amounts, and revenue by period.

---

##### 9. Billing Detail Report

**Route:** `/biller/:id/reportbillingdetail/:reportId`

**Files:**
- Template: `frontend-ember/src/js/templates/reportbillingdetail.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** Detailed line-by-line report of all bills with customer names, amounts, dates, and payment status.

---

##### 10. BI Mail Overview

**Route:** `/biller/:id/reportsbi/mail/overview`

**Files:**
- Template: `frontend-ember/src/js/templates/reportsbi-mail-overview.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** Business intelligence report showing mail delivery statistics, open rates, and engagement metrics.

---

##### 11. BI Email Activity

**Route:** `/biller/:id/reportsbi/email/activity`

**Files:**
- Template: `frontend-ember/src/js/templates/reportsbi-email-activity.html`
- Controller: `frontend-ember/src/js/billers.js`

**Description:** Detailed email activity report showing which customers opened bills, when, and from what devices/locations.

---

#### Settings

##### 12. Biller Settings

**Route:** `/biller/:id/settings/biller`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-biller.html`
- Controller: `frontend-ember/src/js/settings-biller.js`

**Description:** Configure main biller account settings including business name, contact details, branding, bill delivery preferences, and payment options.

---

##### 13. Channel Partner Settings

**Route:** `/biller/:id/settings/biller/channel/:channelPartnerSystemId`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-biller-channel.html`
- Controller: `frontend-ember/src/js/settings-biller.js`

**Description:** Configure channel partner-specific settings and integrations for white-label deployments.

---

##### 14. User Management

**Route:** `/biller/:id/settings/users`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-users.html`
- Controller: `frontend-ember/src/js/settings-users.js`

**Description:** Manage users who have access to the biller account. View list of all users with their roles and permissions.

---

##### 15. User Detail/Edit

**Route:** `/biller/:id/settings/users/user/:userId`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-users-user.html`
- Controller: `frontend-ember/src/js/settings-users.js`

**Description:** Edit user details including name, email, role, and granular permissions (view bills, upload bills, manage contacts, etc).

---

##### 16. Create User

**Route:** `/biller/:id/settings/users/create`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-users-create.html`
- Controller: `frontend-ember/src/js/settings-users.js`

**Description:** Add new user to the biller account by entering email and assigning role/permissions.

---

##### 17. User Notifications

**Route:** `/biller/:id/settings/users/notification/:userId`

**Files:**
- Template: `frontend-ember/src/js/templates/user-settings-notifications.html`
- Controller: `frontend-ember/src/js/settings-users.js`

**Description:** Configure email notification preferences for a user (daily summaries, payment notifications, etc).

---

##### 18. Accounting Settings

**Route:** `/biller/:id/settings/accounting`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-accounting.html`
- Template: `frontend-ember/src/js/templates/settings-accounting-summary.html`
- Controller: `frontend-ember/src/js/settings-accounting.js`

**Description:** Manage billing plan subscription, view usage, add credits, and configure billing preferences for the biller account.

---

##### 19. Accounting Catalog

**Route:** `/biller/:id/settings/accounting/catalog`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-accounting-catalog.html`
- Controller: `frontend-ember/src/js/settings-accounting.js`

**Description:** Browse available subscription plans and add-ons. Compare features and pricing tiers.

---

##### 20. Accounting Checkout

**Routes:**
- `/biller/:id/settings/accounting/catalog/checkout`
- `/biller/:id/settings/accounting/catalog/checkout/payment`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-accounting-checkout.html`
- Template: `frontend-ember/src/js/templates/settings-accounting-payment.html`
- Controller: `frontend-ember/src/js/settings-accounting.js`

**Description:** Complete checkout process for plan upgrades or add-ons including payment method entry and confirmation.

---

##### 21. Bill Templates

**Route:** `/biller/:id/settings/billTemplates`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-bill-templates.html`
- Controller: `frontend-ember/src/js/settings-bill-templates.js`

**Description:** Upload and manage bill PDF templates with custom branding, logos, and layouts. Set default template for automatic bill generation.

---

##### 22. Connections (Integrations)

**Route:** `/biller/:id/settings/connections`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-connections.html`
- Controller: `frontend-ember/src/js/settings-connections.js`

**Description:** Connect accounting software (Xero, MYOB, Reckon, PropertyMe) to automatically sync bills, contacts, and payments.

---

##### 23. Consents (Agent Authorizations)

**Route:** `/biller/:id/settings/consents`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-consent.html`
- Controller: `frontend-ember/src/js/settings-consent.js`

**Description:** Manage agent consent authorizations. Approve or revoke access for accountants/agents to manage bills on behalf of customers.

---

##### 24. Payment Settings

**Route:** `/biller/:id/settings/payments`

**Files:**
- Template: `frontend-ember/src/js/templates/settings-payments.html`
- Controller: `frontend-ember/src/js/settings-payments.js`

**Description:** Configure payment gateway integrations (Stripe, PayPal, bank accounts) to accept online payments from customers.

---

#### Error Views

##### 25. Channel Errors

**Route:** `/biller/:id/errors/:channel`

**Files:**
- Template: `frontend-ember/src/js/templates/connection-error.html`
- Controller: `frontend-ember/src/js/errors.js` (line 16-17)

**Description:** View and troubleshoot errors that occurred during bill processing, delivery, or payment collection for specific channels.

---

### Delivery Screens - Migrated to React

✅ The following delivery screens have been successfully migrated to React:

1. **Dashboard** - Main biller dashboard (`frontend/src/components/Dashboard/`)
2. **Admin Dashboard** - Enhanced admin view (`frontend/src/components/DashboardCustomer/`)
3. **Mail (Outgoing)** - Physical mail management (`frontend/src/components/Mail/`)
4. **Reports (Partial)** - Several specific reports:
   - Bill payments report
   - Archived bills report
   - Auto payment report
   - Printed bills report
   - Registration summary
   - Agents downloads report
5. **Download History** - File downloads and exports (`frontend/src/components/Jobs/`)
6. **Settings - Contact Details** - Update biller contact info
7. **Settings - Forwarding Rules** - Configure bill forwarding
8. **Settings - API Details** - API keys and documentation
9. **Settings - Bulk Download Preferences** - Configure bulk downloads
10. **Settings - Payment Gateway View** - View payment gateways
11. **Settings - Create Payment Gateway** - Add new gateway

---

## Shared Screens (Both Roles)

The following screens are used by both mailbox and delivery users and have been migrated to React:

### Authentication
- Login (`frontend/src/components/Login/`)
- Sign up (`frontend/src/components/CreateAccount/`)
- Reset password (`frontend/src/components/ResetPassword/`)
- Forgot password
- Email verification (`frontend/src/components/VerifyAccount/`)
- SAML SSO

### Personal Settings
- Personal settings (`frontend/src/components/PersonalSettings/`)
- Change password
- MFA settings (`frontend/src/components/MfaAuthenticatorAppSetup/`)

### Account Selection
- Account selection (`frontend/src/components/AccountSelection/`)

---

## Migration Summary

### Overall Progress

```
Total Screens: 63
├── Still in EmberJS: 41 (65%)
└── Migrated to React: 22 (35%)
```

### Breakdown by Role

#### Mailbox (Recipient/Payer) Screens
- **Total:** 27 screens
- **EmberJS:** 16 screens (59%)
- **React:** 11 screens (41%)

#### Delivery (Biller/Mailer) Screens
- **Total:** 36 screens
- **EmberJS:** 25 screens (69%)
- **React:** 11 screens (31%)

### Migration Complexity Assessment

#### 🔴 Highest Complexity (Heavy Business Logic)
1. **Bills Management** - Complex filtering, status management, payment tracking
2. **Contacts Management** - Import/export, validation, deduplication
3. **User Management** - Permission system, role management, notifications
4. **Accounting Integrations** - Xero/MYOB/Reckon OAuth flows and sync

#### 🟡 Medium Complexity
5. **Reports** - Data display with complex filtering and exports
6. **Bill Templates** - File upload, validation, rendering
7. **Payment Settings** - Gateway configuration, credential management
8. **Import Functionality** - File parsing, validation, batch processing

#### 🟢 Lower Complexity
9. **Biller Settings** - Form-based configuration
10. **Consents** - CRUD operations for agent authorizations
11. **Channels** - Configuration management

### Key Observations

- ✅ React has primarily covered **payer-facing features** (inbox, payments, auto-payments)
- ⚠️ EmberJS still handles the majority of **biller management functionality** (bills, contacts, settings)
- 🎯 Core biller operations and advanced settings remain the primary migration targets

---

## Contributing

When migrating a screen from EmberJS to React:

1. Update this document to move the screen from "Still in EmberJS" to "Migrated to React"
2. Update the progress percentages
3. Add the new React component location
4. Document any breaking changes or migration notes

---

## Related Documentation

- [EmberJS Application Structure](../frontend-ember/README.md)
- [React Application Structure](../frontend/README.md)
