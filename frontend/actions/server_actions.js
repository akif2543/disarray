import ServerAPI from "../util/server_api_util";
import { receiveCurrentUser } from "./session_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";
export const CLEAR_SERVER_ERRORS = "CLEAR_SERVER_ERRORS";

const receiveServers = (servers) => ({
  type: RECEIVE_SERVERS,
  ...servers,
});

const receiveServer = (server) => ({
  type: RECEIVE_SERVER,
  ...server,
});

const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  serverId,
});

const receiveServerErrors = (errors) => ({
  type: RECEIVE_SERVER_ERRORS,
  errors,
});

export const clearServerErrors = () => ({
  type: CLEAR_SERVER_ERRORS,
});

export const requestServers = () => (dispatch) =>
  ServerAPI.fetchServers()
    .then((servers) => dispatch(receiveServers(servers)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const requestServer = (id) => (dispatch) =>
  ServerAPI.fetchServer(id)
    .then((server) => dispatch(receiveServer(server)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const createServer = (server) => (dispatch) =>
  ServerAPI.createServer(server)
    .then((server) => dispatch(receiveServer(server)))
    .fail((e) => dispatch(receiveServers(e.responseJSON)));

export const updateServer = (server) => (dispatch) =>
  ServerAPI.updateServer(server)
    .then((server) => dispatch(receiveServer(server)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const deleteServer = (id) => (dispatch) =>
  ServerAPI.deleteServer(id)
    .then(() => dispatch(removeServer(id)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const joinServer = (membership) => (dispatch) =>
  ServerAPI.joinServer(membership)
    .then((server) => dispatch(receiveServer(server)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const leaveServer = (membership) => (dispatch) =>
  ServerAPI.leaveServer(membership)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));
