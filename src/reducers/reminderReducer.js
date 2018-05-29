import { actionTypes } from '../actions/actions';

const initialState = {
  reminders: [],
  activeReminder: {},
};

export default function storeReminder(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_REMINDERS':
      return {
        ...state,
        reminders: action.reminders,
      };
    case 'SELECTED_REMINDER':
      return {
        ...state,
        activeReminder: action.reminder,
      };
    default:
      return state;
  }
};
