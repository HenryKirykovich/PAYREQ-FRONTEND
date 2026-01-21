export const SET_INBOX_SEARCH_PARAMS = "SET_INBOX_SEARCH_PARAMS";
export const SET_INBOX_VIEW = "SET_INBOX_VIEW";

export default (state, action) => {
    switch (action.type) {
        case SET_INBOX_SEARCH_PARAMS:
            return {...state, searchParams: action.searchParams};

        case SET_INBOX_VIEW:
            return {...state, view: action.view};

        default:
            return state;
    }
};