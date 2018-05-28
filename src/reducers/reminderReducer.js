import { actionTypes } from '../actions/actions';

const initialState = {
  reminders: [],
};

export default function storeReminder(state = initialState, action) {
  switch (action.type) {
    // case 'ADD_REMINDER':
    //   return {
    //     ...state,
    //     reminders: [...state.reminders, action.reminderWithKey],
    //   };
    case 'LOAD_REMINDERS':
      return {
        ...state,
        reminders: action.reminders,
      };
    // case 'DELETE_REMINDERS':
    //   return {
    //     ...state,
    //     reminders: [
    //       ...state.reminders.slice(0, action.index),
    //       ...state.reminders.slice(action.index + 1),
    //     ],
    //   };
    default:
      return state;
  }
};
