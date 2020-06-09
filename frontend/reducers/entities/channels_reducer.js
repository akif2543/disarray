import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";
import { RECEIVE_MESSAGE } from "../../actions/websocket_actions";

const channelsReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  let message;

  switch (action.type) {
    case RECEIVE_CHANNEL:
      return Object.assign(newState, action.channel);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.channels);
    case REMOVE_CHANNEL:
      delete newState[Object.keys(action.channel)[0]];
      return newState;
    case RECEIVE_MESSAGE:
      [message] = Object.values(action.message);
      if (message.textChannel) {
        newState[message.messageableId].messages.push(message.id);
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default channelsReducer;
