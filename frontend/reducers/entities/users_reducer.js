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
  RECEIVE_CANCEL,
  RECEIVE_REQUEST,
  RECEIVE_ACCEPTANCE,
  RECEIVE_REJECTION,
  RECEIVE_RETRACTION,
  LOSE_FRIEND,
} from "../../actions/friend_actions";

const usersReducer = (state = {}, action) => {
  const newState = { ...state };
  let user;
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
    case RECEIVE_PENDING:
      newState[action.requester.id].pendingOut.push(action.requestee.id);
      [user] = Object.values(action.requestee);
      newState[user.id] = user;
      return newState;
    case RECEIVE_REQUEST:
      newState[action.requestee.id].pendingIn.push(action.requester.id);
      newState[action.requester.id] = action.requester;
      return newState;
    case RECEIVE_FRIEND:
      newState[action.requestee.id].friends.push(action.requester.id);
      i = newState[action.requestee.id].pendingIn.indexOf(action.requester.id);
      newState[action.requestee.id].pendingIn.splice(i, 1);
      return newState;
    case RECEIVE_ACCEPTANCE:
      newState[action.requester.id].friends.push(action.requestee.id);
      i = newState[action.requester.id].pendingOut.indexOf(action.requestee.id);
      newState[action.requester.id].pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_DECLINE:
      i = newState[action.requestee.id].pendingIn.indexOf(action.requester.id);
      newState[action.requestee.id].pendingIn.splice(i, 1);
      return newState;
    case RECEIVE_REJECTION:
      i = newState[action.requester.id].pendingOut.indexOf(action.requestee.id);
      newState[action.requester.id].pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_CANCEL:
      i = newState[action.requester.id].pendingOut.indexOf(action.requestee.id);
      newState[action.requester.id].pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_RETRACTION:
      i = newState[action.requestee.id].pendingIn.indexOf(action.requester.id);
      newState[action.requestee.id].pendingIn.splice(i, 1);
      return newState;
    case REMOVE_FRIEND:
      i = newState[action.unfriender.id].friends.indexOf(action.unfriendee.id);
      newState[action.unfriender.id].friends.splice(i, 1);
      return newState;
    case LOSE_FRIEND:
      i = newState[action.unfriendee.id].friends.indexOf(action.unfriender.id);
      newState[action.unfriendee.id].friends.splice(i, 1);
      return newState;
    default:
      return state;
  }
};

export default usersReducer;
