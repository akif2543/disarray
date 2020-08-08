import {
  RECEIVE_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER,
  RECEIVE_ACTIVE,
  REMOVE_MEMBER,
} from "../../actions/server_actions";
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../../actions/session_actions";
import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";

const serversReducer = (state = {}, action) => {
  const newState = { ...state };
  let channel;
  let i;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.servers);
    case RECEIVE_SERVERS:
      return Object.assign(newState, action.servers);
    case RECEIVE_SERVER:
      return Object.assign(newState, action.server);
    case REMOVE_SERVER:
      delete newState[action.id];
      return newState;
    case RECEIVE_CHANNEL:
      [channel] = Object.values(action.channel);
      i = newState[channel.server].channels.indexOf(channel.id);
      if (i === -1) newState[channel.server].channels.push(channel.id);
      return newState;
    case REMOVE_CHANNEL:
      i = newState[action.server].channels.indexOf(action.id);
      newState[action.server].channels.splice(i, 1);
      return newState;
    case RECEIVE_ACTIVE:
      newState[action.id].active = action.active;
      return newState;
    case REMOVE_MEMBER:
      i = newState[action.server].members.indexOf(action.id);
      if (i > -1) newState[action.server].members.splice(i, 1);
      return newState;
    case LOGOUT_CURRENT_USER:
      return {};
    default:
      return state;
  }
};

export default serversReducer;
