export const SET_USER_CONTEXT = "SET_USER_CONTEXT";
export const UPDATE_USER_CONTEXT = "UPDATE_USER_CONTEXT";

export default (state, action) => {
    switch (action.type) {
        case SET_USER_CONTEXT:
            return action.user;

        case UPDATE_USER_CONTEXT:
            return {
                ...state,
                ...action.user
            };

        default:
            return state;
    }
};