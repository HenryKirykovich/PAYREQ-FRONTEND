export const SET_ERROR = "SET_ERROR";

export default (state, action) => {
    switch (action.type) {
        case SET_ERROR:
            return action.error;

        default:
            return state;
    }
};