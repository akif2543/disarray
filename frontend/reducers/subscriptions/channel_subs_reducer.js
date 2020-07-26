const { RECEIVE_SUB } = require("../../actions/message_actions");

const channelSubsReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_SUB:
      if (action.subType === "Channel") {
        newState[action.id] = action.sub;
      }
      return newState;
    default:
      return state;
  }
};

export default channelSubsReducer;
