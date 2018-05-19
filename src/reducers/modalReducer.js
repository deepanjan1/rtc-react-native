import { actionTypes } from '../actions/actions';

const initialState = {
  showModal: false,
};

export default function showModal(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_CREATE_FORM_MODAL':
      return {
        ...state,
        showModal: true,
      };
    case 'CLOSE_CREATE_FORM_MODAL':
      return {
        ...state,
        showModal: false,
      };

    default:
      return state;
  }
};
