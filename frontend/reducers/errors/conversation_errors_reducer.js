import {
  RECEIVE_CONVERSATION_ERRORS,
  CLEAR_CONVERSATION_ERRORS,
  RECEIVE_CONVERSATION,
  RECEIVE_CONVERSATIONS,
} from "../../actions/conversation_actions";

const conversationErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CONVERSATION_ERRORS:
      return action.errors;
    case CLEAR_CONVERSATION_ERRORS:
      return [];
    case RECEIVE_CONVERSATION:
      return [];
    case RECEIVE_CONVERSATIONS:
      return [];
    default:
      return state;
  }
};

export default conversationErrorsReducer;
