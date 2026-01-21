export const SET_BILLER = "SET_BILLER";

export default (state, action) => {
    switch (action.type) {
        case SET_BILLER:
            return action.biller;

        default:
            return state;
    }
};