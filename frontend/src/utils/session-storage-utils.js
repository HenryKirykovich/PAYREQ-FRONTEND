export const SESSION_STORAGE_KEYS = {
  currentBillerId: 'currentBillerId', // Value is integer.
  mailSearchParams: 'mailSearchParams', // Value is JSON stored as a string.
};

export function resetSessionStateEmberToReact(billerId) {
  const prevBillerId = sessionStorage.getItem(SESSION_STORAGE_KEYS.currentBillerId);
  if (prevBillerId === billerId) {
    // Re-apply session storage when the biller is still the same.
    const prevMailSearchParams = sessionStorage.getItem(
      SESSION_STORAGE_KEYS.mailSearchParams
    );
    if (prevMailSearchParams !== null) {
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.mailSearchParams,
        prevMailSearchParams
      );
    }
  } else {
    // Otherwise, reset the currentBillerId and session storage keys.
    sessionStorage.setItem(SESSION_STORAGE_KEYS.currentBillerId, billerId);
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.mailSearchParams);
  }
}
