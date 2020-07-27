import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_MESSAGE,
} from "../../actions/message_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const channelsReducer = (state = {}, action) => {
  const newState = { ...state };
  let message;
  let messages;
  let i;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.channels);
    case RECEIVE_CHANNEL:
      return Object.assign(newState, action.channel);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.channels);
    case REMOVE_CHANNEL:
      delete newState[action.id];
      return newState;
    case RECEIVE_MESSAGE:
      [message] = Object.values(action.message);
      if (message.textChannel) {
        newState[message.messageableId].messages.push(message.id);
        return newState;
      }
      return state;
    case RECEIVE_MESSAGES:
      if (action.messages) {
        messages = Object.values(action.messages);
        if (messages[0].textChannel) {
          newState[messages[0].messageableId].messages = messages
            .map((m) => m.id)
            .concat(newState[messages[0].messageableId].messages);
          return newState;
        }
        return state;
      }
      return state;
    case REMOVE_MESSAGE:
      [message] = Object.values(action.message);
      if (message.textChannel) {
        i = newState[message.messageableId].messages.indexOf(message.id);
        newState[message.messageableId].messages.splice(i, 1);
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default channelsReducer;
