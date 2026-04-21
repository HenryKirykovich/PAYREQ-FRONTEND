import {defaultEnglish, getLang} from "./language-utils";

const toDateWithoutTime = isoDateString => new Date(new Date(isoDateString).toDateString());
const nowDateWithoutTime = () => new Date((new Date()).toDateString());

export const daysUntil = dueDate => Math.floor((toDateWithoutTime(dueDate) - nowDateWithoutTime()) / 1000 / 60 / 60 / 24); //shouldn't need to floor but just in case;

export const monthsFromToday = dueDate => (nowDateWithoutTime().getMonth() - toDateWithoutTime(dueDate).getMonth()) + (12 *  (nowDateWithoutTime().getFullYear() - toDateWithoutTime(dueDate).getFullYear())); //shouldn't need to floor but just in case;

export const datesEqual = (date1, date2) => toDateWithoutTime(date1) - toDateWithoutTime(date2) === 0;

export const isIEBrowser = () => {
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older
        return true
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11
        return true;
    }
    //
    // var edge = ua.indexOf('Edge/');
    // if (edge > 0) {
    //     return true;
    // }

    // other browser
    return false;
};

export const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "Australia/Sydney";

export const timeInUTC = dateStr => {
    if (!dateStr) return ""
    const date = new Date (dateStr)
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000).toISOString();
};

export const getDateAsFormatted = (dateStr, format = { timeZone: 'UTC', month: '2-digit', day: '2-digit', year: 'numeric' }) => new Date(dateStr).toLocaleDateString(defaultEnglish(getLang()), format);

export const getDateAsUTCFormatted = (dateStr, format) => getDateAsFormatted(dateStr, {...format, timeZone: 'UTC'});

export const getDateTimeAsFormatted = (dateStr, format = { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) => new Date(dateStr).toLocaleDateString(defaultEnglish(getLang()), format);

export const getDateTimeAsUTCFormatted = (dateStr, format) => getDateTimeAsFormatted(dateStr, {...format, timeZone: 'UTC'});

export const getDateWithMonthYear = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const format = { month: 'short', year: 'numeric', timeZone: 'UTC' };
    return date.toLocaleDateString(defaultEnglish(getLang()), format);
};

export const getPayreqDateAsFormatted = (dateStr) => {
    const dayMonthFormat = {
        month: "short",
        day: '2-digit'
    };
    const yearFormat = {
        year: 'numeric'
    }
    const hourFormat = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const d = new Date(dateStr);
    const lang = defaultEnglish(getLang());
    return `${d.toLocaleDateString(lang, dayMonthFormat)} ${d.toLocaleDateString(lang, yearFormat)} ${d.toLocaleTimeString(lang, hourFormat)}`;
};

/*
 * Get the amount of time from now for a date
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String|Date} time The date to get the time from now for
 * @return {Object}           The time from now data
 */
export function timeFromNow (time) {

    // Get timestamps
    let unixTime = new Date(time).getTime();
    if (!unixTime) return;
    let now = new Date().getTime();

    // Calculate difference
    let difference = (unixTime / 1000) - (now / 1000);

    // Setup return object
    let tfn = {};

    // Check if time is in the past, present, or future
    tfn.when = 'now';
    if (difference > 0) {
        tfn.when = 'future';
    } else if (difference < -1) {
        tfn.when = 'past';
    }

    // Convert difference to absolute
    difference = Math.abs(difference);

    // Calculate time unit
    if (difference / (60 * 60 * 24 * 365) > 1) {
        // Years
        tfn.unitOfTime = 'years';
        tfn.time = Math.floor(difference / (60 * 60 * 24 * 365));
    } else if (difference / (60 * 60 * 24 * 45) > 1) {
        // Months
        tfn.unitOfTime = 'months';
        tfn.time = Math.floor(difference / (60 * 60 * 24 * 45));
    } else if (difference / (60 * 60 * 24) > 1) {
        // Days
        tfn.unitOfTime = 'days';
        tfn.time = Math.floor(difference / (60 * 60 * 24));
    } else if (difference / (60 * 60) > 1) {
        // Hours
        tfn.unitOfTime = 'hours';
        tfn.time = Math.floor(difference / (60 * 60));
    } else if (difference / 60 > 1) {
        // Hours
        tfn.unitOfTime = 'minutes';
        tfn.time = Math.floor(difference / 60);
    } else {
        // Seconds
        tfn.unitOfTime = 'seconds';
        tfn.time = Math.floor(difference);
    }

    // Return time from now data
    return tfn;
};
