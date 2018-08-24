import { actionTypes } from '../actions/actions';

const initialState = {
  user: {},
  notificationToken: '',
  contactToken: '',
  isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.LOGGED_OUT:
      console.log('reducer is working properly');
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: {},
      };
    case actionTypes.LOAD_NOTIFICATION_TOKEN:
      return {
        ...state,
        notificationToken: action.notificationToken,
        notificationModal: action.notificationModal,
      };
    case actionTypes.NOTIFICATION_MODAL_ON:
      return {
        ...state,
        notificationModal: action.notificationModal,
      };
    default:
      return state;
  }
};
