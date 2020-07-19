const { RECEIVE_STATUS } = require("../../actions/session_actions");

const statusReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_STATUS:
      newState[action.id] = action.status;
      return newState;
    default:
      return state;
  }
};

export default statusReducer;
