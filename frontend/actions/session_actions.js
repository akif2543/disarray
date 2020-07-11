import SessionAPI from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const RECEIVE_USERS = "RECEIVE_USERS";

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  ...user,
});

const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  ...users,
});

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS,
});

export const register = (userData) => (dispatch) =>
  SessionAPI.register(userData)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .fail((e) => dispatch(receiveSessionErrors(e.responseJSON)));

export const login = (userData) => (dispatch) =>
  SessionAPI.login(userData)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .fail((e) => dispatch(receiveSessionErrors(e.responseJSON)));

export const logout = () => (dispatch) =>
  SessionAPI.logout()
    .then(() => dispatch(logoutCurrentUser()))
    .fail((e) => dispatch(receiveSessionErrors(e.responseJSON)));

export const fetchCurrentUser = (id) => (dispatch) =>
  SessionAPI.fetchCurrentUser(id)
    .then((user) => dispatch(receiveCurrentUser(user)))
    .fail((e) => dispatch(receiveSessionErrors(e.responseJSON)));

export const updateUser = (user) => (dispatch) =>
  SessionAPI.updateUser(user)
    .then((updatedUser) => dispatch(receiveCurrentUser(updatedUser)))
    .fail((e) => dispatch(receiveSessionErrors(e.responseJSON)));

export const deleteUser = (user) => (dispatch) =>
  SessionAPI.deleteUser(user)
    .then(() => dispatch(logoutCurrentUser()))
    .fail((e) => dispatch(receiveSessionErrors(e.responseJSON)));

export const fetchUsers = () => (dispatch) =>
  SessionAPI.fetchUsers().then((users) => dispatch(receiveUsers(users)));
