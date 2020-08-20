import {
  RECEIVE_CONVERSATIONS,
  RECEIVE_CONVERSATION,
  RECEIVE_ACTIVE_CONVO,
  REMOVE_CONVERSATION_MEMBER,
  CLOSE_CONVERSATION,
} from "../../actions/conversation_actions";
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../../actions/session_actions";
import {
  RECEIVE_MESSAGES,
  RECEIVE_MESSAGE,
  RECEIVE_UNREAD,
} from "../../actions/message_actions";

const conversationsReducer = (state = {}, action) => {
  const newState = { ...state };
  let messages;
  let message;
  let i;

  switch (action.type) {
    case RECEIVE_CONVERSATIONS:
      return Object.assign(newState, action.conversations);
    case RECEIVE_CONVERSATION:
      return Object.assign(newState, action.conversation);
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.conversations);
    case RECEIVE_MESSAGES:
      if (action.messages) {
        messages = Object.keys(action.messages);
        message = action.messages[messages[0]];
        if (!message.textChannel) {
          newState[message.messageableId].messages = messages.concat(
            newState[message.messageableId].messages
          );
        }
      }
      return newState;
    case RECEIVE_MESSAGE:
      [message] = Object.values(action.message);
      if (!message.textChannel) {
        newState[message.messageableId].messages.push(message.id);
      }
      return newState;
    case RECEIVE_UNREAD:
      if (!action.textChannel) {
        newState[action.messageableId].unreads += 1;
        newState[action.messageableId].hide = false;
        return newState;
      }
      return state;
    case RECEIVE_ACTIVE_CONVO:
      if (action.convo) {
        newState[action.convo].unreads = 0;
        newState[action.convo].hide = false;
      }
      return newState;
    case REMOVE_CONVERSATION_MEMBER:
      i = newState[action.conversation].members.indexOf(action.id);
      if (i >= 0) newState[action.conversation].members.splice(i, 1);
      newState[action.conversation].owner = action.owner;
      return newState;
    case CLOSE_CONVERSATION:
      newState[action.id].unreads = 0;
      newState[action.id].hide = true;
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default conversationsReducer;
