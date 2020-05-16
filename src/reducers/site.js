export const SET_BROADCAST = 'SET_BROADCAST';
export const SET_SNACK_MSG = 'SET_SNACK_MSG';
export const SET_BUSY = 'SET_BUSY';

const site = (state = {broadcast : "", snackMsg : {message: ""}, isBusy : true}, action) => {
    switch (action.type) {
        case 'SET_BROADCAST':
            return Object.assign({}, action, {
                broadcast: action.broadcast,
            });
        case 'SET_SNACK_MSG':
            return Object.assign({}, action, {
                snackMsg: action.snackMsg,
            });
        case 'SET_BUSY':
            return Object.assign({}, action, {
                isBusy: action.isBusy,
            });
        default:
            return state
    }
};

export default site;