import {
  RECEIVE_FRIEND_ERROR,
  RECEIVE_FRIEND,
  RECEIVE_USER,
  RECEIVE_PENDING,
  RECEIVE_DECLINE,
  REMOVE_FRIEND,
} from "../../actions/friend_actions";

const friendsErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FRIEND_ERROR:
      return action.error;
    case RECEIVE_FRIEND:
      return [];
    case RECEIVE_USER:
      return [];
    case RECEIVE_PENDING:
      return [];
    case RECEIVE_DECLINE:
      return [];
    case REMOVE_FRIEND:
      return [];
    default:
      return state;
  }
};

export default friendsErrorsReducer;
