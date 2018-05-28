import { actionTypes } from '../actions/actions';

const initialState = {
  reminders: [],
};

export default function storeReminder(state = initialState, action) {
  switch (action.type) {
    case 'LOAD_REMINDERS':
      return {
        ...state,
        reminders: action.reminders,
      };
    default:
      return state;
  }
};
