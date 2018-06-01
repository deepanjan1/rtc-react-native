import { actionTypes } from '../actions/actions';

const initialState = {
  contacts: [],
};

export default function contactReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SYNC_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
      };
    default:
      return state;
  }
};
