import {getCookie} from "./cookie-utils";

export function getAllFeatures() {
    const featuresString = getCookie("enabled-features");
    return !featuresString ? [] : featuresString.split(".");
}

export function isFeatureEnabled(feature_name) {
    return getAllFeatures().findIndex(f => f === feature_name) >= 0;
};
