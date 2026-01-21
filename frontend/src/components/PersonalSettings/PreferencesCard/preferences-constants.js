export const LANG_LABELS = {
    "en": "English",
    "en-au": "English (Australia)",
    "en-ca": "English (Canada)",
    "en-uk": "English (United Kingdom)",
    "en-us": "English (United States)",
    "fr": "Français",
    "fr-ca": "Français (Canada)"
}

export const LANGUAGE_DROPDOWN_VALUES = Object.keys(LANG_LABELS).map(k => ({value: k, label: LANG_LABELS[k]}));

export const HELPER_DROPDOWN_VALUES = [
    {value: 'true', label: "forms.generic.on"},
    {value: 'false', label: "forms.generic.off"},
];
