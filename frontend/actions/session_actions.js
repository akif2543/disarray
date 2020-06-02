import SessionAPI from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  user,
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
  SessionAPI.logout(() => dispatch(logoutCurrentUser())).fail((e) =>
    dispatch(receiveSessionErrors(e.responseJSON))
  );
