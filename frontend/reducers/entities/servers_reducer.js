import {
  RECEIVE_SERVERS,
  RECEIVE_SERVER,
  REMOVE_SERVER,
  RECEIVE_ACTIVE,
  REMOVE_MEMBER,
  LEAVE_SERVER,
  MARK_READ,
} from "../../actions/server_actions";
import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from "../../actions/session_actions";
import { RECEIVE_CHANNEL, REMOVE_CHANNEL } from "../../actions/channel_actions";

const serversReducer = (state = {}, action) => {
  const newState = { ...state };
  let server;
  let channel;
  let i;
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign(newState, action.servers);
    case RECEIVE_SERVERS:
      return Object.assign(newState, action.servers);
    case RECEIVE_SERVER:
      [[i, server]] = Object.entries(action.server);
      if (newState[i]) {
        Object.assign(newState[i], server);
        return newState;
      }
      return Object.assign(newState, action.server);
    case REMOVE_SERVER:
      delete newState[action.id];
      return newState;
    case LEAVE_SERVER:
      delete newState[action.server];
      return newState;
    case RECEIVE_CHANNEL:
      [channel] = Object.values(action.channel);
      i = newState[channel.server].channels.indexOf(channel.id);
      if (i === -1) newState[channel.server].channels.push(channel.id);
      return newState;
    case REMOVE_CHANNEL:
      i = newState[action.server].channels.indexOf(action.id);
      newState[action.server].channels.splice(i, 1);
      newState[action.server].active = action.active;
      return newState;
    case RECEIVE_ACTIVE:
      newState[action.id].active = action.active;
      newState[action.id].hasUnreads = false;
      return newState;
    case MARK_READ:
      newState[action.id].hasUnreads = false;
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
