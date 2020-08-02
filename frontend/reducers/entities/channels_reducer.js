import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_SERVER, RECEIVE_ACTIVE } from "../../actions/server_actions";
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_MESSAGE,
  RECEIVE_UNREAD,
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
      }
      return newState;
    case RECEIVE_MESSAGES:
      if (action.messages) {
        messages = Object.keys(action.messages);
        message = action.messages[messages[0]];
        if (message.textChannel) {
          newState[message.messageableId].messages = messages.concat(
            newState[message.messageableId].messages
          );
        }
      }
      return newState;
    case REMOVE_MESSAGE:
      [message] = Object.values(action.message);
      if (message.textChannel) {
        i = newState[message.messageableId].messages.indexOf(message.id);
        newState[message.messageableId].messages.splice(i, 1);
        return newState;
      }
      return state;
    case RECEIVE_ACTIVE:
      newState[action.active].hasUnreads = false;
      return newState;
    case RECEIVE_UNREAD:
      if (action.textChannel) {
        newState[action.messageableId].hasUnreads = true;
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default channelsReducer;
