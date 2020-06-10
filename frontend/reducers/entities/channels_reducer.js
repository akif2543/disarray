import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
  REMOVE_MESSAGE,
} from "../../actions/message_actions";

const channelsReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  let message;
  let messages;
  let i;

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
    case RECEIVE_MESSAGES:
      messages = Object.values(action.messages);
      if (messages[0].textChannel) {
        newState[messages[0].messageableId].messages = messages
          .map((m) => m.id)
          .concat(newState[messages[0].messageableId].messages);
        return newState;
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
