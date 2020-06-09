import {
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE,
} from "../../actions/websocket_actions";
import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";

const messagesReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  let message;
  let channel;

  switch (action.type) {
    case RECEIVE_CHANNEL:
      return Object.assign(newState, action.messages);
    case REMOVE_CHANNEL:
      [channel] = Object.values(action.channel);
      channel.messages.forEach((id) => delete newState[id]);
      return newState;
    case RECEIVE_MESSAGE:
      return Object.assign(newState, action.message);
    case REMOVE_MESSAGE:
      [message] = Object.values(action.message);
      delete newState[message.id];
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
