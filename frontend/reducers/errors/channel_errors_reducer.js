import {
  RECEIVE_CHANNEL_ERRORS,
  RECEIVE_CHANNEL,
  REMOVE_CHANNEL,
  CLEAR_CHANNEL_ERRORS,
} from "../../actions/channel_actions";

const channelErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_CHANNEL_ERRORS:
      return action.errors;
    case CLEAR_CHANNEL_ERRORS:
      return [];
    case RECEIVE_CHANNEL:
      return [];
    case REMOVE_CHANNEL:
      return [];
    default:
      return state;
  }
};

export default channelErrorsReducer;
