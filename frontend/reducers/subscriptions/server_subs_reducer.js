import { RECEIVE_SUB } from "../../actions/message_actions";
import { REMOVE_SERVER } from "../../actions/server_actions";

const serverSubsReducer = (state = {}, action) => {
  const newState = { ...state };
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
    default:
      return state;
  }
};

export default serverSubsReducer;
