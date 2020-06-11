import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USERS,
} from "../../actions/session_actions";
import { RECEIVE_SERVER, REMOVE_SERVER } from "../../actions/server_actions";
import { RECEIVE_CHANNEL } from "../../actions/channel_actions";
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
} from "../../actions/message_actions";
import {
  RECEIVE_CONVERSATION,
  RECEIVE_CONVERSATIONS,
} from "../../actions/conversation_actions";

const usersReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  let i;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.users, action.user);
    case RECEIVE_USERS:
      return Object.assign(newState, action.users);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.users);
    case REMOVE_SERVER:
      i = newState[action.userId].servers.indexOf(action.subscribeableId);
      newState[action.userId].servers.splice(i, 1);
      return newState;
    case RECEIVE_CHANNEL:
      return Object.assign(newState, action.users);
    case RECEIVE_CONVERSATIONS:
      return Object.assign(newState, action.users);
    case RECEIVE_CONVERSATION:
      return Object.assign(newState, action.users);
    case RECEIVE_MESSAGE:
      return Object.assign(newState, action.user);
    case RECEIVE_MESSAGES:
      return action.users ? Object.assign(newState, action.users) : state;
    default:
      return state;
  }
};

export default usersReducer;
