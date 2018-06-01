import { actionTypes } from '../actions/actions';

const initialState = {
  reminders: [],
  activeReminder: {},
};

export default function reminderReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_REMINDERS:
      return {
        ...state,
        reminders: action.reminders,
      };
    case actionTypes.SELECTED_REMINDER:
      return {
        ...state,
        activeReminder: action.reminder,
      };
    default:
      return state;
  }
};
