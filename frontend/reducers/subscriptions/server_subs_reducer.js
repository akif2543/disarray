import { RECEIVE_SUB } from "../../actions/message_actions";

const serverSubsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_SUB:
      if (action.subType === "Server") {
        newState[action.id] = action.sub;
      }
      return newState;
    default:
      return state;
  }
};

export default serverSubsReducer;
