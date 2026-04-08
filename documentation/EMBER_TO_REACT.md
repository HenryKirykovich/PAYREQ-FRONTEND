# EmberJS to React Migration Status

> **Last Updated:** 2026-04-08

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
| Mailbox | 27 | 3 | 24 | 89% ✅ |
| Delivery | 39 | 25 | 14 | 36% ✅ |
| **Overall** | **66** | **28** | **38** | **58%** ✅ |

---

## Routing Migration Guide

When migrating a screen from EmberJS to React, you'll need to update the routing configuration. This section explains the key differences and changes required.

### Route Path Changes

EmberJS and React use different routing patterns:

#### EmberJS Routes (Hash-based, Nested Structure)
```javascript
// frontend-ember/src/js/application.js
// URL format: /customer#/biller/:id/...
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
- `customer#/biller/:id/bills`
- `customer#/biller/:id/bill/:billId`
- `customer#/biller/:id/contacts`

#### React Routes (Flat Structure with Full Paths)
```javascript
// frontend/src/routes/BillerShell.js or similar
// URL format: /portal/customer/biller/:billerId/...
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
// Path: customer#/biller/:id/bills
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
// Path: customer#/biller/:id/contact/:contactId
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
// Path: customer#/biller/:id/settings/users
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
  - [ ] Change path from `customer#/biller/:id/...` to `/portal/customer/biller/:billerId/...`
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
   - EmberJS: `customer#/biller/:id/bills`
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

There are **3 screens** still in EmberJS for Mailbox users:

| # | Screen | Route | Access |
|---|--------|-------|--------|
| 1 | Connections | `customer#/biller/:id/settings/connections` | Settings tab → Connections |
| 2 | Users/Permissions | `customer#/biller/:id/settings/users` | Settings tab → Users |
| 3 | Consents | `customer#/biller/:id/settings/consents` | Settings tab → Consents |

#### 1. Connections (Integrations)

**Route:** `customer#/biller/:id/settings/connections`

**Access:** Settings tab → Connections

**Files:**
- Template: `frontend-ember/src/js/templates/settings-connections.html`
- Controller: `frontend-ember/src/js/settings-connections.js`

**Description:** Connect accounting software (Xero, MYOB, Reckon) to automatically sync received bills. Manage OAuth connections and integration settings.

---

#### 2. Users/Permissions

**Route:** `customer#/biller/:id/settings/users`

**Access:** Settings tab → Users

**Files:**
- Template: `frontend-ember/src/js/templates/settings-users.html`
- Controller: `frontend-ember/src/js/settings-users.js`

**Description:** Manage users who have access to the mailbox account. View list of all users with their roles and permissions. Includes sub-routes:
- User Detail: `customer#/biller/:id/settings/users/user/:userId`
- Create User: `customer#/biller/:id/settings/users/create`
- User Notifications: `customer#/biller/:id/settings/users/notification/:userId`

---

#### 3. Consents (Agent Authorizations)

**Route:** `customer#/biller/:id/settings/consents`

**Access:** Settings tab → Consents

**Files:**
- Template: `frontend-ember/src/js/templates/settings-consent.html`
- Controller: `frontend-ember/src/js/settings-consent.js`

**Description:** Manage agent consent authorizations. Approve or revoke access for accountants/agents to manage bills on behalf of customers.

---

### Mailbox Screens - Migrated to React

✅ The following mailbox screens have been successfully migrated to React:

| # | Screen | React Route | Component |
|---|--------|-------------|-----------|
| 1 | Inbox (List) | `/portal/customer/biller/:billerId/inbox` | `frontend/src/components/Inbox/` |
| 2 | Invoice Detail | `/portal/customer/biller/:billerId/inbox/:invoiceId` | `frontend/src/components/documents/` |
| 3 | Payment Flow | `/portal/customer/biller/:billerId/inbox/:invoiceId/pay` | `frontend/src/components/payments/` |
| 4 | Payment Confirmation | `/portal/customer/biller/:billerId/inbox/:invoiceId/payment-confirmation` | `frontend/src/components/payments/` |
| 5 | Payment Result | `/portal/customer/biller/:billerId/inbox/:invoiceId/payment-result` | `frontend/src/components/payments/` |
| 6 | Invoice Forwarding Result | `/portal/customer/biller/:billerId/inbox/:invoiceId/forwarding-result` | `frontend/src/components/documents/` |
| 7 | BPay Batch | `/portal/customer/biller/:billerId/inbox/bpb` | `frontend/src/components/BPayBatchForm/` |
| 8 | Registrations - Billers List | `/portal/customer/biller/:billerId/registrations/billers` | `frontend/src/components/registrations/Billers/` |
| 9 | Registrations - Biller Detail | `/portal/customer/biller/:billerId/registrations/billers/:registrationsForBillerId` | `frontend/src/components/registrations/BillerRegistrations/` |
| 10 | Registration Detail | `/portal/customer/biller/:billerId/registrations/billers/:registrationsForBillerId/:registrationId` | `frontend/src/components/registrations/Registration/` |
| 11 | Create Registration - Biller Selection | `/portal/customer/biller/:billerId/registrations/create` | `frontend/src/components/registrations/BillerSelection/` |
| 12 | Create Registration - Channel Selection | `/portal/customer/biller/:billerId/registrations/create/:registeringForbillerId` | `frontend/src/components/registrations/ChannelSelection/` |
| 13 | Create Email Registration | `/portal/customer/biller/:billerId/registrations/create/:registeringForbillerId/email` | `frontend/src/components/registrations/email/` |
| 14 | Create Xero Registration | `/portal/customer/biller/:billerId/registrations/create/:registeringForbillerId/xero` | `frontend/src/components/registrations/xero/` |
| 15 | Create MYOB Registration | `/portal/customer/biller/:billerId/registrations/create/:registeringForbillerId/myob` | `frontend/src/components/registrations/myob/` |
| 16 | Create Reckon Registration | `/portal/customer/biller/:billerId/registrations/create/:registeringForbillerId/reckon` | `frontend/src/components/registrations/reckon/` |
| 17 | Create MyBillsAgent Registration | `/portal/customer/biller/:billerId/registrations/create/:registeringForbillerId/mybillsagent` | `frontend/src/components/registrations/mybillsagent/` |
| 18 | Create Payreq Registration | `/portal/customer/biller/:billerId/registrations/create/:registeringForbillerId/payreq` | `frontend/src/components/registrations/payreq/` |
| 19 | Admin Subscription Creation | `/portal/customer/biller/:billerId/registrations/admin/create` | `frontend/src/components/registrations/AdminCreate/` |
| 20 | Auto Payments | `/portal/customer/biller/:billerId/auto-payments` | `frontend/src/components/AutoPayments/` |
| 21 | Payment History | `/portal/customer/biller/:billerId/payments` | `frontend/src/components/paymentHistory/` |
| 22 | Saved Cards | `/portal/customer/biller/:billerId/cards` | `frontend/src/components/cards/` |
| 23 | Settings - Forwarding Rules | `/portal/customer/biller/:billerId/settings/forwardingRules/view` | `frontend/src/components/settings/biller/` |
| 24 | Settings - API Details | `/portal/customer/biller/:billerId/settings/apiDetails/view` | `frontend/src/components/settings/biller/` |

---

## Part 2: Delivery Screens (Biller/Mailer Role)

Users in this role send bills to recipients/payers and manage their customer contacts, bill distribution, and incoming registrations.

### Delivery Screens - Still in EmberJS

There are **25 screens** still in EmberJS for Delivery users:

#### Settings

| # | Screen | Route | Access |
|---|--------|-------|--------|
| 1 | Biller Settings | `customer#/biller/:id/settings/biller` | Settings tab |
| 2 | Users (list) | `customer#/biller/:id/settings/users` | Settings tab |
| 3 | User Detail | `customer#/biller/:id/settings/users/user/:userId` | Click from Users list |
| 4 | Create User | `customer#/biller/:id/settings/users/create` | Button from Users list |
| 5 | User Notifications | `customer#/biller/:id/settings/users/notification/:userId` | From User Detail |
| 6 | Bill Templates | `customer#/biller/:id/settings/billTemplates` | Settings tab |
| 7 | Accounting | `customer#/biller/:id/settings/accounting` | Settings tab |
| 8 | Accounting Catalog | `customer#/biller/:id/settings/accounting/catalog` | From Accounting |
| 9 | Accounting Checkout | `customer#/biller/:id/settings/accounting/catalog/checkout` | From Catalog |
| 10 | Accounting Payment | `customer#/biller/:id/settings/accounting/catalog/checkout/payment` | From Checkout |
| 11 | Payments | `customer#/biller/:id/settings/payments` | Settings tab |
| 12 | Consents | `customer#/biller/:id/settings/consents` | Settings tab (if hasAgent) |
| 13 | Channel Partner Settings | `customer#/biller/:id/settings/biller/channel/:channelPartnerSystemId` | From Biller Settings |

#### Core Billing

| # | Screen | Route | Access |
|---|--------|-------|--------|
| 14 | Bills List | `customer#/biller/:id/bills/:type` | Main menu |
| 15 | Bill Detail | `customer#/biller/:id/bill/:billId` | Click from Bills list, also linked from React (`MailTable.js`, `AutoPaymentReportTable.js`) |
| 16 | Import | `customer#/biller/:id/import` | Main menu or link |
| 17 | Registrations (Biller) | `customer#/biller/:id/registrations/:type` | Main menu, also linked from React (`AdminCreate`, `DashboardCustomer`) |
| 18 | Registration Detail (Biller) | `customer#/biller/:id/registration/:registrationId` | Click from Registrations list |

#### Reports

| # | Screen | Route | Access |
|---|--------|-------|--------|
| 19 | Reports Dashboard | `customer#/biller/:id/reports` | Main menu |
| 20 | Generic Report | `customer#/biller/:id/report/:reportId` | From Reports Dashboard |
| 21 | Billing Summary Report | `customer#/biller/:id/reportbillingsummary/:reportId` | From Reports Dashboard |
| 22 | Billing Detail Report | `customer#/biller/:id/reportbillingdetail/:reportId` | From Reports Dashboard |
| 23 | BI Mail Overview | `customer#/biller/:id/reportsbi/mail/overview` | From Reports Dashboard |
| 24 | BI Email Activity | `customer#/biller/:id/reportsbi/email/activity` | From Reports Dashboard |

#### Errors

| # | Screen | Route | Access |
|---|--------|-------|--------|
| 25 | Channel Errors | `customer#/biller/:id/errors/:channel` | From connection error links |

---

### Delivery Screens - Migrated to React

✅ The following delivery screens have been successfully migrated to React:

| # | Screen | React Route | Component |
|---|--------|-------------|-----------|
| 1 | Dashboard | `/portal/customer/biller/:billerId/dashboard` | `frontend/src/components/Dashboard/` |
| 2 | Admin Dashboard | `/portal/customer/biller/:billerId/admin-dashboard` | `frontend/src/components/DashboardCustomer/` |
| 3 | Contacts | `/portal/customer/biller/:billerId/contacts` | `frontend/src/components/Contacts/` |
| 4 | Mail (Outgoing) | `/portal/customer/biller/:billerId/mail` | `frontend/src/components/Mail/` |
| 5 | Download History | `/portal/customer/biller/:billerId/jobs` | `frontend/src/components/Jobs/` |
| 6 | Job View | `/portal/customer/biller/:billerId/job/:jobId` | `frontend/src/components/Jobs/JobView` |
| 7 | Bill Payments Report | `/portal/customer/biller/:billerId/reports/billpayments` | `frontend/src/components/payments/BillPaymentsReport` |
| 8 | Archived Bills Report | `/portal/customer/biller/:billerId/reports/archivedbills` | `frontend/src/components/archive/ArchivedBillsReport` |
| 9 | Auto Payment Report | `/portal/customer/biller/:billerId/reports/autopayment` | `frontend/src/components/AutoPayments/AutoPaymentReport` |
| 10 | Printed Bills Report | `/portal/customer/biller/:billerId/reports/print` | `frontend/src/components/print/PrintedBillsReport` |
| 11 | Registration Summary | `/portal/customer/biller/:billerId/reports/registrationsummary` | `frontend/src/components/RegistrationSummary/` |
| 12 | Agents Downloads Report | `/portal/customer/biller/:billerId/reports/agentsdownloads` | `frontend/src/components/AgentsDownloadsReport` |
| 13 | Settings - Contact Details | `/portal/customer/biller/:billerId/settings/contactDetails/view` | `frontend/src/components/settings/biller/` |
| 14 | Settings - API Details | `/portal/customer/biller/:billerId/settings/apiDetails/view` | `frontend/src/components/settings/biller/ApiDetails` |

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
Total Screens: 66
├── Still in EmberJS: 28 (42%)
└── Migrated to React: 38 (58%)
```

### Breakdown by Role

#### Mailbox (Recipient/Payer) Screens
- **Total:** 27 screens
- **EmberJS:** 3 screens (11%)
- **React:** 24 screens (89%)

#### Delivery (Biller/Mailer) Screens
- **Total:** 39 screens
- **EmberJS:** 25 screens (64%)
- **React:** 14 screens (36%)

### Migration Complexity Assessment

#### 🔴 Highest Complexity (Heavy Business Logic)
1. **Bills Management** - Complex filtering, status management, payment tracking
2. **User Management** - Permission system, role management, notifications
3. **Accounting Settings** - Plan management, checkout flow, payment processing

#### 🟡 Medium Complexity
4. **Reports Dashboard** - Multiple report types, data visualization
5. **Bill Templates** - File upload, validation, rendering
6. **Payment Settings** - Gateway configuration, credential management
7. **Import Functionality** - File parsing, validation, batch processing
8. **Registrations (Biller)** - Status management, filtering

#### 🟢 Lower Complexity
9. **Biller Settings** - Form-based configuration
10. **Consents** - CRUD operations for agent authorizations
11. **Channel Errors** - Error display
12. **Connections (Mailbox)** - OAuth integrations (partially shared with existing React code)

### Key Observations

- ✅ **Mailbox migration nearly complete** - Only 3 settings screens remain in Ember
- ⚠️ **Delivery screens need significant work** - 25 screens still in Ember (64%)
- 🎯 **Priority targets**: Bills List/Detail, Reports Dashboard, Settings screens
- 🔗 **Cross-linking exists**: Some React screens link to Ember screens (e.g., `MailTable.js` → Bill Detail)

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
