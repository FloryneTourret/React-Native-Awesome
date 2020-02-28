import { combineReducers } from 'redux';
import ProfileNavReducer from './ProfileNavReducer';

export default combineReducers({
    profileNav: ProfileNavReducer,
});