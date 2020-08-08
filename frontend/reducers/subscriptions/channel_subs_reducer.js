import { RECEIVE_SUB } from "../../actions/message_actions";
import { REMOVE_SERVER, LEAVE_SERVER } from "../../actions/server_actions";
import { REMOVE_CHANNEL } from "../../actions/channel_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const channelSubsReducer = (state = {}, action) => {
  const newState = { ...state };
  let subs;
  switch (action.type) {
    case RECEIVE_SUB:
      if (action.subType === "Channel") {
        newState[action.id] = action.sub;
      }
      return newState;
    case LEAVE_SERVER:
    case REMOVE_SERVER:
      action.channels.forEach((id) => {
        if (newState[id]) {
          newState[id].unsubscribe();
          delete newState[id];
        }
      });
      return newState;
    case REMOVE_CHANNEL:
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

export default channelSubsReducer;
