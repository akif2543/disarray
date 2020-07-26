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
} from "../../actions/friend_actions";
import { RECEIVE_CONVERSATION } from "../../actions/conversation_actions";

const infoReducer = (state = {}, action) => {
  const newState = { ...state };
  let user;
  let i;
  let c;
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
      };
    case LOGOUT_CURRENT_USER:
      return {};
    case RECEIVE_CONVERSATION:
      [c] = Object.values(action.conversation);
      newState.conversations.push(c.id);
      if (!c.group) {
        user = c.members.find((m) => m !== newState.id);
        newState.conversees[user] = c.id;
      }
      return newState;
    case RECEIVE_PENDING:
      newState.info.pendingOut.push(action.requestee.id);
      return newState;
    case RECEIVE_REQUEST:
      newState.pendingIn.push(action.requester.id);
      return newState;
    case RECEIVE_FRIEND:
      newState.friends.push(action.requester.id);
      i = newState.pendingIn.indexOf(action.requester.id);
      newState.pendingIn.splice(i, 1);
      return newState;
    case RECEIVE_ACCEPTANCE:
      newState.friends.push(action.requestee.id);
      i = newState.pendingOut.indexOf(action.requestee.id);
      newState.pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_DECLINE:
      i = newState.pendingIn.indexOf(action.requester.id);
      newState.pendingIn.splice(i, 1);
      return newState;
    case RECEIVE_REJECTION:
      i = newState.pendingOut.indexOf(action.requestee.id);
      newState.pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_CANCEL:
      i = newState.pendingOut.indexOf(action.requestee.id);
      newState.pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_RETRACTION:
      i = newState.pendingIn.indexOf(action.requester.id);
      newState.pendingIn.splice(i, 1);
      return newState;
    case REMOVE_FRIEND:
      i = newState.friends.indexOf(action.unfriendee.id);
      newState.friends.splice(i, 1);
      return newState;
    case LOSE_FRIEND:
      i = newState.friends.indexOf(action.unfriender.id);
      newState.friends.splice(i, 1);
      return newState;
    default:
      return state;
  }
};

export default infoReducer;
