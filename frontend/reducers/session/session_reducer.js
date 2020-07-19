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

const sessionReducer = (state = { id: null, info: null }, action) => {
  const newState = { ...state };
  let user;
  let i;
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
        info: {
          conversations,
          conversees,
          friends,
          pendingIn,
          pendingOut,
          blocked,
          email,
        },
      };
    case LOGOUT_CURRENT_USER:
      return { id: null, info: null };
    case RECEIVE_PENDING:
      newState.info.pendingOut.push(action.requestee.id);
      return newState;
    case RECEIVE_REQUEST:
      newState.info.pendingIn.push(action.requester.id);
      return newState;
    case RECEIVE_FRIEND:
      newState.info.friends.push(action.requester.id);
      i = newState.info.pendingIn.indexOf(action.requester.id);
      newState.info.pendingIn.splice(i, 1);
      return newState;
    case RECEIVE_ACCEPTANCE:
      newState.info.friends.push(action.requestee.id);
      i = newState.info.pendingOut.indexOf(action.requestee.id);
      newState.info.pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_DECLINE:
      i = newState.info.pendingIn.indexOf(action.requester.id);
      newState.info.pendingIn.splice(i, 1);
      return newState;
    case RECEIVE_REJECTION:
      i = newState.info.pendingOut.indexOf(action.requestee.id);
      newState.info.pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_CANCEL:
      i = newState.info.pendingOut.indexOf(action.requestee.id);
      newState.info.pendingOut.splice(i, 1);
      return newState;
    case RECEIVE_RETRACTION:
      i = newState.info.pendingIn.indexOf(action.requester.id);
      newState.info.pendingIn.splice(i, 1);
      return newState;
    case REMOVE_FRIEND:
      i = newState.info.friends.indexOf(action.unfriendee.id);
      newState.info.friends.splice(i, 1);
      return newState;
    case LOSE_FRIEND:
      i = newState.info.friends.indexOf(action.unfriender.id);
      newState.info.friends.splice(i, 1);
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
