import {
  RECEIVE_FRIEND_ERROR,
  RECEIVE_FRIEND,
  RECEIVE_USER,
  RECEIVE_PENDING,
  RECEIVE_DECLINE,
  REMOVE_FRIEND,
  CLEAR_FRIEND_ERROR,
} from "../../actions/friend_actions";

const friendsErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FRIEND_ERROR:
      return action.error;
    case CLEAR_FRIEND_ERROR:
    case RECEIVE_FRIEND:
    case RECEIVE_USER:
    case RECEIVE_PENDING:
    case RECEIVE_DECLINE:
    case REMOVE_FRIEND:
      return [];
    default:
      return state;
  }
};

export default friendsErrorsReducer;
