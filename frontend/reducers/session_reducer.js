import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../actions/session_actions";

const sessionReducer = (state = { id: null }, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: Object.keys(action.user)[0] };
    case LOGOUT_CURRENT_USER:
      return { id: null };
    default:
      return state;
  }
};

export default sessionReducer;
