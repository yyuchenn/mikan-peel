export const SET_BROADCAST = 'SET_BROADCAST';
export const SET_SNACK_MSG = 'SET_SNACK_MSG';
export const SET_BUSY = 'SET_BUSY';
export const SET_SHOW_CHERRY = 'SET_SHOW_CHERRY';

const site = (state = {broadcast : "", snackMsg : {message: ""}, busy : 1, showCherry : true}, action) => {
    switch (action.type) {
        case 'SET_BROADCAST':
            return Object.assign({}, state, {
                broadcast: action.broadcast,
            });
        case 'SET_SNACK_MSG':
            return Object.assign({}, state, {
                snackMsg: action.snackMsg,
            });
        case 'SET_BUSY':
            return Object.assign({}, state, {
                busy: state.busy + (action.isBusy ? 1 : -1),
            });
        case 'SET_SHOW_CHERRY':
            return Object.assign({}, state, {
                showCherry: action.showCherry,
            });
        default:
            return state
    }
};

export default site;