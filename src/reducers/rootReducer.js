import { combineReducers } from 'redux';
import contact from './contactReducer';
import reminder from './reminderReducer';
import user from './userReducer';
import nav from './navReducer';

export default rootReducer =  combineReducers({
  contact,
  reminder,
  user,
  nav,
});
