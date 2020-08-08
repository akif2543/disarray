import { RECEIVE_SUB } from "../../actions/message_actions";
import { REMOVE_SERVER } from "../../actions/server_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const serverSubsReducer = (state = {}, action) => {
  const newState = { ...state };
  let subs;
  switch (action.type) {
    case RECEIVE_SUB:
      if (action.subType === "Server") {
        newState[action.id] = action.sub;
      }
      return newState;
    case REMOVE_SERVER:
      if (newState[action.id]) {
        newState[action.id].unsubscribe();
        delete newState[action.id];
      }
      return newState;
    case LOGOUT_CURRENT_USER:
      subs = Object.values(newState);
      subs.forEach((sub) => sub.unsubscribe());
      return {};
    default:
      return state;
  }
};

export default serverSubsReducer;
