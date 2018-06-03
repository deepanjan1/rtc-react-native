import { actionTypes } from '../actions/actions';

const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOAD_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
