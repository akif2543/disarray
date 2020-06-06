import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_SERVER, REMOVE_SERVER } from "../actions/server_actions";

const usersReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  let i;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.user);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.users);
    case REMOVE_SERVER:
      i = newState[action.userId].servers.indexOf(action.subscribeableId);
      newState[action.userId].servers.splice(i, 1);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
