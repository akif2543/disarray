const { RECEIVE_SUB } = require("../../actions/message_actions");

const conversationSubsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_SUB:
      if (action.subType === "Conversation") {
        newState[action.id] = action.sub;
      }
      return newState;
    default:
      return state;
  }
};

export default conversationSubsReducer;
