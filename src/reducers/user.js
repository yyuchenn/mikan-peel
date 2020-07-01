export const FILL_USER = 'FILL_USER';
export const CLEAN_USER = 'CLEAN_USER';
export const SET_LOGGING = 'SET_LOGGING';
export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';
export const SET_GOO = 'SET_GOO';

const user = (state = {privilege: 0, logging: true}, action) => {
    switch (action.type) {
        case 'FILL_USER':
            return {
                uid: action.uid,
                nickname: action.nickname,
                avatar: action.avatar,
                privilege: action.privilege,
                number_of_notifications: action.number_of_notifications,
                goo_timestamp: action.goo_timestamp
            };
        case 'CLEAN_USER':
            return {
                privilege: 0
            };
        case 'SET_LOGGING':
            return Object.assign({}, state, {
                logging: action.logging
            });
        case 'SET_NOTIFICATIONS':
            return Object.assign({}, state, {
                number_of_notifications: state.number_of_notifications + action.number
            });
        case 'SET_GOO':
            return Object.assign({}, state, {
                goo_timestamp: action.goo_timestamp
            });
        default:
            return state
    }
};

export default user;