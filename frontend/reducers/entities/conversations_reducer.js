import {
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
} from "../../actions/conversation_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
} from "../../actions/message_actions";

const conversationsReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  let messages;
  let message;

  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      return Object.assign(newState, action.conversations);
    case RECEIVE_CONVERSATION:
      return Object.assign(newState, action.conversation);
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.conversations);
    case RECEIVE_MESSAGES:
      if (action.messages) {
        messages = Object.values(action.messages);
        if (!messages[0].textChannel) {
          newState[messages[0].messageableId].messages = messages
            .map((m) => m.id)
            .concat(newState[messages[0].messageableId].messages);
          return newState;
        }
        return state;
      }
      return state;
    case RECEIVE_MESSAGE:
      [message] = Object.values(action.message);
      if (!message.textChannel) {
        newState[message.messageableId].messages.push(message.id);
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default conversationsReducer;
