import { actionTypes } from '../actions/actions';

const initialState = {
  user: {},
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
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
