import { RECEIVE_SUB } from "../../actions/message_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const conversationChannelSubReducer = (state = null, action) => {
  const newState = state;
  switch (action.type) {
    case RECEIVE_SUB:
      return action.subType === "ConversationChannel" ? action.sub : newState;
    case LOGOUT_CURRENT_USER:
      newState.unsubscribe();
      return null;
    default:
      return state;
  }
};

export default conversationChannelSubReducer;
