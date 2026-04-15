/**
 * Navigation utility for React routes
 * Use this for all navigation instead of window.location.href or buildEmberHref
 */

import {emberToReactRouteMap, isConvertedToReact, convertEmberRouteToReact} from './ember-to-react-route-map';

/**
 * Navigate to a route (either React or Ember)
 * @param {object} history - React Router history object
 * @param {string} routeName - Ember route name (e.g., 'biller.bills') or React path
 * @param {object} params - Route parameters (e.g., {billerId: 123, billId: 456})
 */
export const navigateTo = (history, routeName, params = {}) => {
    // Check if it's already a full path (starts with /)
    if (routeName.startsWith('/')) {
        history.push(routeName);
        return;
    }

    // Check if it's converted to React
    if (isConvertedToReact(routeName)) {
        const reactPath = convertEmberRouteToReact(routeName, params);
        history.push(reactPath);
    } else {
        // Fall back to Ember hash URL
        const emberPath = buildEmberHashPath(routeName, params);
        window.location.href = emberPath;
    }
};

/**
 * Build Ember hash URL for unconverted routes
 */
const buildEmberHashPath = (routeName, params = {}) => {
    const {billerId, ...otherParams} = params;
    const routePath = routeName.replace(/\./g, '/');
    let path = `/customer#/${routePath}`;
    
    // Replace route parameters
    if (billerId) {
        path = path.replace('{billerId}', billerId);
    }
    
    Object.keys(otherParams).forEach(key => {
        path = path.replace(`{${key}}`, otherParams[key]);
    });
    
    return path;
};

/**
 * Get the proper URL for a route (for link href attributes)
 */
export const getRouteUrl = (routeName, params = {}) => {
    if (routeName.startsWith('/')) {
        return routeName;
    }
    
    if (isConvertedToReact(routeName)) {
        return convertEmberRouteToReact(routeName, params);
    } else {
        return buildEmberHashPath(routeName, params);
    }
};

/**
 * Navigate to bills list
 */
export const navigateToBills = (history, billerId) => {
    history.push(`/portal/customer/biller/${billerId}/bills`);
};

/**
 * Navigate to bill detail
 */
export const navigateToBillDetail = (history, billerId, billId) => {
    history.push(`/portal/customer/biller/${billerId}/bills/${billId}`);
};

/**
 * Navigate to contacts list
 */
export const navigateToContacts = (history, billerId) => {
    history.push(`/portal/customer/biller/${billerId}/contacts`);
};

/**
 * Navigate to contact detail
 */
export const navigateToContactDetail = (history, billerId, contactId) => {
    history.push(`/portal/customer/biller/${billerId}/contacts/${contactId}`);
};

/**
 * Navigate to registrations list
 */
export const navigateToRegistrations = (history, billerId) => {
    history.push(`/portal/customer/biller/${billerId}/registrations`);
};

/**
 * Navigate to registration detail
 */
export const navigateToRegistrationDetail = (history, billerId, registrationId) => {
    history.push(`/portal/customer/biller/${billerId}/registrations/${registrationId}`);
};

/**
 * Navigate to settings
 */
export const navigateToSettings = (history, billerId, section = 'biller') => {
    history.push(`/portal/customer/biller/${billerId}/settings/${section}`);
};

/**
 * Navigate to reports
 */
export const navigateToReports = (history, billerId) => {
    history.push(`/portal/customer/biller/${billerId}/reports`);
};

/**
 * Navigate to dashboard
 */
export const navigateToDashboard = (history, billerId) => {
    history.push(`/portal/customer/biller/${billerId}/dashboard`);
};

/**
 * Navigate to inbox
 */
export const navigateToInbox = (history, billerId) => {
    history.push(`/portal/customer/biller/${billerId}/inbox`);
};
