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
import {
  RECEIVE_USER,
  RECEIVE_FRIEND,
  RECEIVE_PENDING,
  RECEIVE_DECLINE,
  REMOVE_FRIEND,
} from "../../actions/friend_actions";

const usersReducer = (state = {}, action) => {
  const newState = { ...state };
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
    case RECEIVE_USER:
      return Object.assign(newState, action.user);
    case RECEIVE_FRIEND:
      newState[action.id].friends.push(action.otherId);
      newState[action.id].pendingIn.splice(
        newState[action.id].pendingIn.indexOf(action.otherId),
        1
      );
      return newState;
    case RECEIVE_PENDING:
      newState[action.id].pendingOut.push(action.user.id);
      newState[action.user.id] = action.user;
      return newState;
    case RECEIVE_DECLINE:
      newState[action.id].pendingIn.splice(
        newState[action.id].pendingIn.indexOf(action.otherId),
        1
      );
      return newState;
    case REMOVE_FRIEND:
      newState[action.id].friends.splice(
        newState[action.id].friends.indexOf(action.otherId),
        1
      );
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
