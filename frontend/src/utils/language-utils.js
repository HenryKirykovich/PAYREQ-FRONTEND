export const getLang = () => localStorage.getItem("language") || navigator.language;

export const getParentLang = lang => lang.length > 2 ? lang.substring(0, 2) : lang;

export const defaultEnglish = lang => lang === "en" ? "en-au" : lang; //we don't have any US customers so default to AU so dates show correctly.

export const switchLanguage = (accountLang) => {
    if(getLang() !== accountLang){
        localStorage.setItem("language", accountLang);
    }
};

export const hasLanguageChange = (accountLang) => {
    return getLang() !== accountLang;
}
