import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";
import { RECEIVE_SERVER } from "../../actions/server_actions";

const channelsReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_CHANNEL:
      return Object.assign(newState, action.channel);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.channels);
    case REMOVE_CHANNEL:
      delete newState[Object.keys(action.channel)[0]];
      return newState;
    default:
      return state;
  }
};

export default channelsReducer;
