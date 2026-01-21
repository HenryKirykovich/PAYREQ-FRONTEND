export const SET_ALERT = "SET_ALERT";

export default (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return action.alert;

        default:
            return state;
    }
};