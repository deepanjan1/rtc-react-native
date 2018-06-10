import { actionTypes } from '../actions/actions';

const initialState = {
  user: {},
  isLoggedIn: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: action.isLoggedIn,
      };
    default:
      return state;
  }
};
