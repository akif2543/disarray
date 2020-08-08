import ServerAPI from "../util/server_api_util";
import { receiveChannel, removeChannel } from "./channel_actions";
import { receiveMessage, removeMessage, receiveSub } from "./message_actions";
import { serverSub } from "../util/socket_util";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const RECEIVE_ALIAS = "RECEIVE_ALIAS";
export const RECEIVE_ACTIVE = "RECEIVE_ACTIVE";
export const REMOVE_SERVER = "REMOVE_SERVER";
export const LEAVE_SERVER = "LEAVE_SERVER";
export const REMOVE_MEMBER = "REMOVE_MEMBER";
export const RECEIVE_SERVER_ERRORS = "RECEIVE_SERVER_ERRORS";
export const CLEAR_SERVER_ERRORS = "CLEAR_SERVER_ERRORS";

const receiveServers = (servers) => ({
  type: RECEIVE_SERVERS,
  ...servers,
});

export const receiveServer = (server) => ({
  type: RECEIVE_SERVER,
  ...server,
});

export const receiveActive = (server) => ({
  type: RECEIVE_ACTIVE,
  ...server,
});

export const removeServer = (server) => ({
  type: REMOVE_SERVER,
  ...server,
});

export const removeLeftServer = (server) => ({
  type: LEAVE_SERVER,
  ...server,
});

export const removeMember = (server) => ({
  type: REMOVE_MEMBER,
  ...server,
});

export const receiveAlias = (server) => ({
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

const serverActions = (dispatch) => ({
  receiveServer: (server) => dispatch(receiveServer(server)),
  removeServer: (server) => dispatch(removeServer(server)),
  receiveAlias: (server) => dispatch(receiveAlias(server)),
  removeMember: (member) => dispatch(removeMember(member)),
  receiveChannel: (channel) => dispatch(receiveChannel(channel)),
  removeChannel: (channel) => dispatch(removeChannel(channel)),
});

const messageActions = (dispatch) => ({
  receiveMessage: (message) => dispatch(receiveMessage(message)),
  removeMessage: (message) => dispatch(removeMessage(message)),
});

export const createServer = (server) => (dispatch) =>
  ServerAPI.createServer(server)
    .then((res) => {
      const [s] = Object.values(res.server);
      const receive = (sub) => dispatch(receiveSub(sub));
      serverSub(s, serverActions(dispatch), messageActions(dispatch), receive);
      return dispatch(receiveServer(res));
    })
    .fail((e) => dispatch(receiveServers(e.responseJSON)));

export const updateServer = (id, server) => (dispatch) =>
  ServerAPI.updateServer(id, server).fail((e) =>
    dispatch(receiveServerErrors(e.responseJSON))
  );

export const deleteServer = (id) => (dispatch) =>
  ServerAPI.deleteServer(id).fail((e) =>
    dispatch(receiveServerErrors(e.responseJSON))
  );

export const joinServer = (membership) => (dispatch) =>
  ServerAPI.joinServer(membership)
    .then((res) => {
      const [s] = Object.values(res.server);
      const receive = (sub) => dispatch(receiveSub(sub));
      serverSub(s, serverActions(dispatch), messageActions(dispatch), receive);
      return dispatch(receiveServer(res));
    })
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const leaveServer = (membership) => (dispatch) =>
  ServerAPI.leaveServer(membership)
    .then((server) => {
      dispatch(removeLeftServer(server));
    })
    .fail((e) => dispatch(receiveServerErrors(e.responseJSON)));

export const changeNickname = (membership) => (dispatch) =>
  ServerAPI.changeNickname(membership).fail((e) =>
    dispatch(receiveServerErrors(e.responseJSON))
  );
