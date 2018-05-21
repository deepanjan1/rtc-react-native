import { actionTypes } from '../actions/actions';

const initialState = {
  reminder: {
    name: '',
    date: '',
    personID: '',
    frequency: null,
  },
};

export default function storeReminder(state = initialState, action) {
  switch (action.type) {
    case 'ADD_REMINDER':
      return {
        ...state,
        reminder: action.reminder,
      };
    default:
      return state;
  }
};
