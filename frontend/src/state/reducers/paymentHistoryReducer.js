export const SET_PAYMENT_HISTORY_SEARCH_PARAMS = "SET_PAYMENT_HISTORY_SEARCH_PARAMS";

export default (state, action) => {
    switch (action.type) {
        case SET_PAYMENT_HISTORY_SEARCH_PARAMS:
            return {...state, searchParams: action.searchParams};

        default:
            return state;
    }
};
