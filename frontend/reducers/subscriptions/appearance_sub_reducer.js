import { RECEIVE_SUB } from "../../actions/message_actions";
import { LOGOUT_CURRENT_USER } from "../../actions/session_actions";

const appearanceSubReducer = (state = null, action) => {
  const newState = state;
  switch (action.type) {
    case RECEIVE_SUB:
      return action.subType === "Appearance" ? action.sub : newState;
    case LOGOUT_CURRENT_USER:
      if (newState) newState.unsubscribe();
      return null;
    default:
      return state;
  }
};

export default appearanceSubReducer;
