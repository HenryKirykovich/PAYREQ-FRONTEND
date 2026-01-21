import { useCallback, useEffect } from "react";
import * as Yup from "yup";
import {numberRegex, symbolRegex} from "../components/PersonalSettings/SecurityDetailsCard/PasswordStrengthMeter";

const buildSelectOption = ([k, v]) => ({value: k, label: v});

export const buildSelectOptions = object => Object.entries(object).map(buildSelectOption);

export const useDebouncedEffect = (effect, delay , deps) => {
    const callback = useCallback(effect, deps);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [callback, delay]);
};

/**
 * When you want a form to submit on a valid change of a value
 * @param handleChange
 * @param handleSubmit
 * @param e
 * @param error
 */
export const changeAndSubmit = (handleChange, handleSubmit, e, error) => {
    handleChange(e);
    if (!error) {
        handleSubmit(e);
    }
};
/**
 * When you want a form to submit on a valid change of a value
 * @param handleChange
 * @param handleSubmit
 * @param e
 */
export const changeAndSubmitOnDate = (handleChange, handleSubmit, e) => {
    handleChange(e);
    if ([0, 10].includes(e.target.value.length)) {
        handleSubmit(e);
    }
};

/**
 * In order for the payload to be parsed properly by the legacy API routes and their current middleware,
 * We need to submit forms as x-www-form-urlencoded and not as a payload body
 */
export const LEGACY_POST_AXIOS_CONFIG = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export const DEFAULT_MAX_STRING_LENGTH = 255;

export const PASSWORD_YUP_VALIDATION = Yup.string()
    .required("forms.generic.required.label")
    .matches(symbolRegex, "personalSettings.password.missingSymbol")
    .matches(numberRegex, "personalSettings.password.missingNumber")
    .min(10, "personalSettings.password.lessThanTen")
    .max(DEFAULT_MAX_STRING_LENGTH, 'forms.generic.max.length.label')
