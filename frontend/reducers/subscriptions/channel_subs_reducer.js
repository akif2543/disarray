import { RECEIVE_SUB } from "../../actions/message_actions";
import { REMOVE_SERVER } from "../../actions/server_actions";
import { REMOVE_CHANNEL } from "../../actions/channel_actions";

const channelSubsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_SUB:
      if (action.subType === "Channel") {
        newState[action.id] = action.sub;
      }
      return newState;
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
    default:
      return state;
  }
};

export default channelSubsReducer;
