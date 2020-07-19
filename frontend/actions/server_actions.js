import ServerAPI from "../util/server_api_util";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_ALIAS = "RECEIVE_ALIAS";
export const RECEIVE_ACTIVE = "RECEIVE_ACTIVE";
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

export const receiveActive = (server) => ({
  type: RECEIVE_ACTIVE,
  ...server,
});

const removeServer = (server) => ({
  type: REMOVE_SERVER,
  ...server,
});

const receiveAlias = (server) => ({
  type: RECEIVE_ALIAS,
  ...server,
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
    .then((newServer) => dispatch(receiveServer(newServer)))
    .fail((e) => dispatch(receiveServers(e.responseJSON)));

export const updateServer = (server) => (dispatch) =>
  ServerAPI.updateServer(server)
    .then((updatedServer) => dispatch(receiveServer(updatedServer)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const deleteServer = (id) => (dispatch) =>
  ServerAPI.deleteServer(id)
    .then((server) => dispatch(removeServer(server)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const joinServer = (membership) => (dispatch) =>
  ServerAPI.joinServer(membership)
    .then((server) => dispatch(receiveServer(server)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const leaveServer = (membership) => (dispatch) =>
  ServerAPI.leaveServer(membership)
    .then((server) => {
      dispatch(removeServer(server));
    })
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const changeNickname = (membership) => (dispatch) =>
  ServerAPI.changeNickname(membership)
    .then((server) => dispatch(receiveAlias(server)))
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));
