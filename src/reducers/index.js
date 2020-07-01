import { combineReducers } from 'redux'
import site from './site'
import user from './user'

const mikanPeel = combineReducers({
    site,
    user,
});

export default mikanPeel