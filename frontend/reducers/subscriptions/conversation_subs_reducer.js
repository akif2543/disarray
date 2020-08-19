import { RECEIVE_SUB } from "../../actions/message_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";
import { REMOVE_CONVERSATION } from "../../actions/conversation_actions";

const conversationSubsReducer = (state = {}, action) => {
  const newState = { ...state };
  let subs;
  switch (action.type) {
    case RECEIVE_SUB:
      if (action.subType === "Conversation") {
        newState[action.id] = action.sub;
      }
      return newState;
    case REMOVE_CONVERSATION:
      if (newState[action.conversation]) {
        newState[action.conversation].unsubscribe();
        delete newState[action.conversation];
      }
      return newState;
    case LOGOUT_CURRENT_USER:
      subs = Object.values(newState);
      subs.forEach((sub) => sub.unsubscribe());
      return {};
    default:
      return state;
  }
};

export default conversationSubsReducer;
