import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USERS,
  RECEIVE_STATUS,
  LOGOUT_CURRENT_USER,
} from "../../actions/session_actions";
import {
  RECEIVE_SERVER,
  REMOVE_SERVER,
  RECEIVE_ALIAS,
  LEAVE_SERVER,
} from "../../actions/server_actions";
import { RECEIVE_CHANNEL } from "../../actions/channel_actions";
import {
  RECEIVE_MESSAGE,
  RECEIVE_MESSAGES,
} from "../../actions/message_actions";
import {
  RECEIVE_CONVERSATION,
  RECEIVE_CONVERSATIONS,
} from "../../actions/conversation_actions";
import {
  RECEIVE_USER,
  RECEIVE_PENDING,
  RECEIVE_REQUEST,
} from "../../actions/friend_actions";

const usersReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.users);
    case RECEIVE_USERS:
      return Object.assign(newState, action.users);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.users);
    case REMOVE_SERVER:
      action.members.forEach((m) => {
        if (newState[m]) delete newState[m].servers[action.id];
      });
      return newState;
    case LEAVE_SERVER:
      delete newState[action.id].servers[action.server];
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
    case RECEIVE_USER:
      return Object.assign(newState, action.user);
    case RECEIVE_PENDING:
      newState[action.requestee.id] = action.requestee;
      return newState;
    case RECEIVE_REQUEST:
      newState[action.requester.id] = action.requester;
      return newState;
    case RECEIVE_ALIAS:
      newState[action.id].servers[action.server] = action.alias;
      return newState;
    case RECEIVE_STATUS:
      if (newState[action.id]) {
        newState[action.id].online = action.online;
        return newState;
      }
      return state;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default usersReducer;
