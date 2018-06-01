import { combineReducers } from 'redux';
import contact from './contactReducer';
import reminder from './reminderReducer';

export default rootReducer =  combineReducers({
  contact,
  reminder,
});
