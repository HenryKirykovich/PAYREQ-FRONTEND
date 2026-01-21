export const SET_REGISTRATION_SEARCH_PARAMS = "SET_REGISTRATION_SEARCH_PARAMS";

export default (state, action) => {
    switch (action.type) {
        case SET_REGISTRATION_SEARCH_PARAMS:
            return {...state, searchParams: action.searchParams};

        default:
            return state;
    }
};