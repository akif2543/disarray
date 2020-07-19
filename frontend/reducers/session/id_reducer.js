import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../../actions/session_actions";

const idReducer = (state = null, action) => {
  let user;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      [user] = Object.values(action.user);
      return user.id;
    case LOGOUT_CURRENT_USER:
      return null;
    default:
      return state;
  }
};

export default idReducer;
