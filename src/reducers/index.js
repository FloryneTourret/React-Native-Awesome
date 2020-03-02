import { combineReducers } from 'redux';
import ProfileNavReducer from './ProfileNavReducer';
import AuthReducer from './AuthReducer';

export default combineReducers({
    auth: AuthReducer,
    profileNav: ProfileNavReducer,
});