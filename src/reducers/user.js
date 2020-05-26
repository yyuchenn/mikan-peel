export const FILL_USER = 'FILL_USER';
export const CLEAN_USER = 'CLEAN_USER';
export const SET_LOGGING = 'SET_LOGGING';

const user = (state = {privilege: 0}, action) => {
    switch (action.type) {
        case 'FILL_USER':
            return {
                id: action.id,
                username: action.username,
                privilege: action.privilege,
                number_of_notification: action.number_of_notification,
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
        default:
            return state
    }
};

export default user;