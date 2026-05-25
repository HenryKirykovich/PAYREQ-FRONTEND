/**
 * Maps Ember route names to React routes
 * This allows the backend to continue sending Ember route names
 * while the frontend transparently converts them to React routes
 */

export const emberToReactRouteMap = {
    // Bills
    "biller.bill": "/customer/biller/{billerId}/bill/{billId}",
    
    // Contacts
    "biller.contact": "/customer/biller/{billerId}/contacts/{id}",
    
    // Reports
    "biller.reports": "/customer/biller/{billerId}/reports",
    "biller.report": "/customer/biller/{billerId}/reports/report/{reportId}",
    "biller.reportbillingsummary": "/customer/biller/{billerId}/reports/billingsummary/{reportId}",
    "biller.reportbillingdetail": "/customer/biller/{billerId}/reports/billingdetail/{reportId}",
    "biller.reportsbi.mail.overview": "/customer/biller/{billerId}/reportsbi/mail/overview",
    "biller.reportsbi.email.activity": "/customer/biller/{billerId}/reportsbi/email/activity",
    
    // Settings
    "biller.settings": "/customer/biller/{billerId}/settings",
    "biller.settings.biller": "/customer/biller/{billerId}/settings/biller",
    "biller.settings.biller.channel": "/customer/biller/{billerId}/settings/biller/channel/{channelId}",
    "biller.settings.biller.manual": "/customer/biller/{billerId}/settings/biller/manual",
    "biller.settings.biller.qbo-payroll": "/customer/biller/{billerId}/settings/biller/qbo-payroll",
    "biller.settings.biller.saasu": "/customer/biller/{billerId}/settings/biller/saasu",
    "biller.settings.users": "/customer/biller/{billerId}/settings/users",
    "biller.settings.users.user": "/customer/biller/{billerId}/settings/users/{userId}",
    "biller.settings.users.create": "/customer/biller/{billerId}/settings/users/create",
    "biller.settings.billTemplates": "/customer/biller/{billerId}/settings/billTemplates",
    "biller.settings.accounting": "/customer/biller/{billerId}/settings/accounting",
    "biller.settings.accounting.catalog": "/customer/biller/{billerId}/settings/accounting/catalog",
    "biller.settings.accounting.catalog.checkout": "/customer/biller/{billerId}/settings/accounting/catalog/checkout",
    "biller.settings.accounting.catalog.checkout.payment": "/customer/biller/{billerId}/settings/accounting/catalog/checkout/payment",
    "biller.settings.payments": "/customer/biller/{billerId}/settings/payments",
    "biller.settings.connections": "/customer/biller/{billerId}/settings/connections",
    "biller.settings.consents": "/customer/biller/{billerId}/settings/consents",
    "biller.settings.contactDetails": "/customer/biller/{billerId}/settings/contactDetails/view",
    "biller.settings.apiDetails": "/customer/biller/{billerId}/settings/apiDetails/view",
    "biller.settings.forwardingRules": "/customer/biller/{billerId}/settings/forwardingRules/view",
    "biller.settings.bulkDownloadPreference": "/customer/biller/{billerId}/settings/bulkDownloadPreference/view",
    
    // Registrations (already React)
    "biller.registration": "/customer/biller/{billerId}/registrations/billers/{registrationsForBillerId}/{registrationId}",
    "biller.import": "/customer/biller/{billerId}/registrations/import",
    "biller.import-from-text": "/customer/biller/{billerId}/registrations/import-from-text",
    
    // Incoming Registrations
    "biller.incoming.registration": "/customer/biller/{billerId}/incoming/registration/{registrationId}",
    "biller.incoming.myob": "/customer/biller/{billerId}/incoming/myob/{mailerId}",
    "biller.incoming.reckon": "/customer/biller/{billerId}/incoming/reckon/{mailerId}",
    "biller.incoming.email": "/customer/biller/{billerId}/incoming/email/{mailerId}",
    
    // Verification/Consent
    "agent-authorisation": "/verify/agent-authorisation/{code}/{id}",
    
    // Inbox (already React)
    "biller.inbox": "/customer/biller/{billerId}/inbox",
    
    // Dashboard (already React)
    "biller.dashboard": "/customer/biller/{billerId}/dashboard",
    "biller.admin-dashboard": "/customer/biller/{billerId}/admin-dashboard",
    
    // Auto Payments (already React)
    "biller.auto-payments": "/customer/biller/{billerId}/auto-payments",
    
    // Payment History (already React)
    "biller.payments": "/customer/biller/{billerId}/payments",
    
    // Cards (already React)
    "biller.cards": "/customer/biller/{billerId}/cards",
    
    // Jobs/Download History (already React)
    "biller.jobs": "/customer/biller/{billerId}/jobs",
    
    // Personal Settings (already React)
    "biller.personal": "/customer/biller/{billerId}/personal",
    
    // Mail (already React)
    "biller.mail": "/customer/biller/{billerId}/mail",
};

/**
 * Check if an Ember route has been converted to React
 * @param {string} emberRoute - The Ember route name (e.g., "biller.bills")
 * @returns {boolean} - True if converted to React
 */
export const isConvertedToReact = (emberRoute) => {
    return emberRoute in emberToReactRouteMap;
};

/**
 * Convert an Ember route to a React route
 * @param {string} emberRoute - The Ember route name (e.g., "biller.bills")
 * @param {object} params - Route parameters (e.g., {billerId: "123", id: "456"})
 * @returns {string} - The React route path
 */
export const convertEmberRouteToReact = (emberRoute, params = {}) => {
    const reactRoute = emberToReactRouteMap[emberRoute];
    
    if (!reactRoute) {
        // Route not converted yet, return null
        return null;
    }
    
    // Replace placeholders with actual values
    let result = reactRoute;
    Object.keys(params).forEach(key => {
        result = result.replace(`{${key}}`, params[key]);
    });
    
    return result;
};

/**
 * Build an Ember hash URL (for routes not yet converted)
 * @param {string} emberRoute - The Ember route (e.g., "biller.settings.payments")
 * @param {string} billerId - The biller ID
 * @returns {string} - The Ember hash URL
 */
export const buildEmberHashUrl = (emberRoute, billerId) => {
    const path = emberRoute.replace("biller.", "").replace(/\./g, "/");
    return `/customer#/biller/${billerId}/${path}`;
};

/**
 * Get URL for a route (React if converted, Ember hash if not)
 * @param {string} route - The route name (can be Ember or React format)
 * @param {object} params - Route parameters
 * @returns {string} - The URL
 */
export const getRouteUrl = (route, params = {}) => {
    // If it's already a full path, return it
    if (route.startsWith('/')) {
        return route;
    }
    
    // Try to convert from Ember to React
    const reactRoute = convertEmberRouteToReact(route, params);
    if (reactRoute) {
        return reactRoute;
    }
    
    // Fall back to Ember hash URL
    if (params.billerId) {
        return buildEmberHashUrl(route, params.billerId);
    }
    
    return route;
};

/**
 * Get all Ember routes that still need conversion
 * @returns {string[]} - Array of Ember route names
 */
export const getUnconvertedRoutes = () => {
    // Routes that are still in Ember and need conversion:
    return [
        "biller.incoming.registration",  // Incoming registration detail
        "biller.incoming.myob",          // MYOB incoming
        "biller.incoming.reckon",        // Reckon incoming
        "biller.registrations.registered", // Registered registrations list
        "biller.registrations.pendingFailed", // Pending/failed registrations
        "biller.registrations.contactChanged", // Contact changed registrations
        "biller.registrationsinit",      // Registrations init
        "biller.bill",                   // Bill detail (if not covered by bills route)
        "biller.job",                    // Job detail (if not in React)
    ];
};
