import { actionTypes } from '../actions/actions';

const initialState = {
  contact: '',
};

export default function storeContact(state = initialState, action) {
  switch (action.type) {
    case 'CURRENT_CONTACT':
      return {
        ...state,
        contact: action.contact,
      };
    case 'CLEAR_CURRENT_CONTACT':
      return {
        ...state,
        contact: '',
      };
    default:
      return state;
  }
};

// export default contacts;
