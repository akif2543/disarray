import {
  RECEIVE_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER,
} from "../../actions/server_actions";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import { RECEIVE_CHANNEL } from "../../actions/channel_actions";

const serversReducer = (state = {}, action) => {
  const newState = Object.assign({}, state);
  let channel;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.servers);
    case RECEIVE_SERVERS:
      return Object.assign(newState, action.servers);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.server);
    case REMOVE_SERVER:
      delete newState[action.subscribeableId];
      return newState;
    case RECEIVE_CHANNEL:
      [channel] = Object.values(action.channel);
      newState[channel.server].channels.push(channel.id);
      return newState;
    default:
      return state;
  }
};

export default serversReducer;
