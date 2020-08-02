import {
  RECEIVE_MESSAGE,
  REMOVE_MESSAGE,
  RECEIVE_MESSAGES,
} from "../../actions/message_actions";
import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_CONVERSATION } from "../../actions/conversation_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const messagesReducer = (state = {}, action) => {
  const newState = { ...state };
  let message;
  let channel;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.messages);
    case RECEIVE_CHANNEL:
      return Object.assign(newState, action.messages);
    case REMOVE_CHANNEL:
      [channel] = Object.values(action.channel);
      channel.messages.forEach((id) => delete newState[id]);
      return newState;
    case RECEIVE_CONVERSATION:
      return Object.assign(newState, action.messages);
    case RECEIVE_MESSAGE:
      return Object.assign(newState, action.message);
    case RECEIVE_MESSAGES:
      return action.messages ? Object.assign(newState, action.messages) : state;
    case REMOVE_MESSAGE:
      [message] = Object.values(action.message);
      delete newState[message.id];
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
