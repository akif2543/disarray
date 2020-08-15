import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../../actions/session_actions";
import {
  RECEIVE_PENDING,
  RECEIVE_REQUEST,
  RECEIVE_FRIEND,
  RECEIVE_ACCEPTANCE,
  RECEIVE_DECLINE,
  RECEIVE_REJECTION,
  RECEIVE_CANCEL,
  RECEIVE_RETRACTION,
  REMOVE_FRIEND,
  LOSE_FRIEND,
  BLOCK_USER,
  RECEIVE_BLOCK,
  UNBLOCK_USER,
} from "../../actions/friend_actions";
import {
  RECEIVE_CONVERSATION,
  RECEIVE_ACTIVE_CONVO,
} from "../../actions/conversation_actions";
import { RECEIVE_MESSAGE } from "../../actions/message_actions";

const sessionReducer = (state = { id: null }, action) => {
  const newState = { ...state };
  let user;
  let i;
  let c;
  let message;

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      [user] = Object.values(action.user);
      const {
        id,
        conversations,
        conversees,
        friends,
        pendingIn,
        pendingOut,
        blocked,
        email,
      } = user;
      return {
        id,
        conversations,
        conversees,
        friends,
        pendingIn,
        pendingOut,
        blocked,
        email,
        active: null,
      };
    case LOGOUT_CURRENT_USER:
      return { id: null };
    case RECEIVE_CONVERSATION:
      [c] = Object.values(action.conversation);
      i = newState.conversations.indexOf(c.id);
      if (i === -1) newState.conversations.push(c.id);
      if (!c.group && i === -1) {
        user = c.members.find((m) => m !== newState.id);
        newState.conversees[user] = c.id;
      }
      return newState;
    case RECEIVE_ACTIVE_CONVO:
      return { ...newState, active: action.convo };
    case RECEIVE_PENDING:
      newState.pendingOut.push(action.requestee.id);
      return newState;
    case RECEIVE_REQUEST:
      if (action.requester.id !== newState.id)
        newState.pendingIn.push(action.requester.id);
      return newState;
    case RECEIVE_FRIEND:
      if (action.requester.id !== newState.id) {
        newState.friends.push(action.requester.id);
        i = newState.pendingIn.indexOf(action.requester.id);
        newState.pendingIn.splice(i, 1);
      }
      return newState;
    case RECEIVE_ACCEPTANCE:
      if (action.requestee.id !== newState.id) {
        newState.friends.push(action.requestee.id);
        i = newState.pendingOut.indexOf(action.requestee.id);
        newState.pendingOut.splice(i, 1);
      }
      return newState;
    case RECEIVE_DECLINE:
      if (action.requester.id !== newState.id) {
        i = newState.pendingIn.indexOf(action.requester.id);
        newState.pendingIn.splice(i, 1);
      }
      return newState;
    case RECEIVE_REJECTION:
      if (action.requestee.id !== newState.id) {
        i = newState.pendingOut.indexOf(action.requestee.id);
        newState.pendingOut.splice(i, 1);
      }
      return newState;
    case RECEIVE_CANCEL:
      if (action.requester.id !== newState.id) {
        i = newState.pendingOut.indexOf(action.requester.id);
        newState.pendingOut.splice(i, 1);
      }
      return newState;
    case RECEIVE_RETRACTION:
      if (action.requestee.id !== newState.id) {
        i = newState.pendingIn.indexOf(action.requestee.id);
        newState.pendingIn.splice(i, 1);
      }
      return newState;
    case REMOVE_FRIEND:
      if (action.unfriendee.id !== newState.id) {
        i = newState.friends.indexOf(action.unfriendee.id);
        newState.friends.splice(i, 1);
      }
      return newState;
    case LOSE_FRIEND:
      if (action.unfriender.id !== newState.id) {
        i = newState.friends.indexOf(action.unfriender.id);
        newState.friends.splice(i, 1);
      }
      return newState;
    case BLOCK_USER:
      if (action.blocker.id === newState.id) {
        i = newState.friends.indexOf(action.blockee.id);
        if (i >= 0) newState.friends.splice(i, 1);
        newState.blocked[action.blockee.id] = true;
      }
      return newState;
    case RECEIVE_BLOCK:
      if (action.blockee.id === newState.id) {
        i = newState.friends.indexOf(action.blocker.id);
        if (i >= 0) newState.friends.splice(i, 1);
      }
      return newState;
    case UNBLOCK_USER:
      if (action.blocker.id === newState.id) {
        delete newState.blocked[action.blockee.id];
      }
      return newState;
    case RECEIVE_MESSAGE:
      [message] = Object.values(action.message);
      if (!message.textChannel) {
        i = newState.conversations.indexOf(message.messageableId);
        newState.conversations.splice(i, 1);
        newState.conversations.unshift(message.messageableId);
      }
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
