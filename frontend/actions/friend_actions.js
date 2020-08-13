import FriendsAPI from "../util/friends_api_util";

export const RECEIVE_REQUEST = "RECEIVE_REQUEST";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const RECEIVE_ACCEPTANCE = "RECEIVE_ACCEPTANCE";
export const RECEIVE_REJECTION = "RECEIVE_REJECTION";
export const RECEIVE_RETRACTION = "RECEIVE_RETRACTION";
export const RECEIVE_PENDING = "RECEIVE_PENDING";
export const RECEIVE_DECLINE = "RECEIVE_DECLINE";
export const RECEIVE_CANCEL = "RECEIVE_CANCEL";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const LOSE_FRIEND = "LOSE_FRIEND";
export const RECEIVE_BLOCK = "RECEIVE_BLOCK";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_FRIEND_ERROR = "RECEIVE_FRIEND_ERROR";
export const CLEAR_FRIEND_ERROR = "CLEAR_FRIEND_ERROR";

export const receiveRequest = (res) => ({
  type: RECEIVE_REQUEST,
  ...res,
});

const receiveFriend = (res) => ({
  type: RECEIVE_FRIEND,
  ...res,
});

export const receiveAcceptance = (res) => ({
  type: RECEIVE_ACCEPTANCE,
  ...res,
});

export const receiveRejection = (res) => ({
  type: RECEIVE_REJECTION,
  ...res,
});

export const receiveRetraction = (res) => ({
  type: RECEIVE_RETRACTION,
  ...res,
});

export const loseFriend = (res) => ({
  type: LOSE_FRIEND,
  ...res,
});

const receivePending = (res) => ({
  type: RECEIVE_PENDING,
  ...res,
});

const receiveDecline = (res) => ({
  type: RECEIVE_DECLINE,
  ...res,
});

const receiveCancel = (res) => ({
  type: RECEIVE_CANCEL,
  ...res,
});

const receiveBlock = (res) => ({
  type: RECEIVE_BLOCK,
  ...res,
});

export const removeFriend = (res) => ({
  type: REMOVE_FRIEND,
  ...res,
});

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const receiveFriendError = (error) => ({
  type: RECEIVE_FRIEND_ERROR,
  error,
});

export const clearFriendError = () => ({
  type: CLEAR_FRIEND_ERROR,
});

export const requestFriend = (id, user) => (dispatch) =>
  FriendsAPI.requestFriend(id, user)
    .then((res) => dispatch(receivePending(res)))
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));

export const respondToRequest = (id, type) => (dispatch) =>
  FriendsAPI.respondToRequest(id, type)
    .then((res) => {
      switch (res.action) {
        case "accept":
          return dispatch(receiveFriend(res));
        case "decline":
          return dispatch(receiveDecline(res));
        case "cancel":
          return dispatch(receiveCancel(res));
        default:
          break;
      }
    })
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));

export const unfriend = (id) => (dispatch) =>
  FriendsAPI.unfriend(id)
    .then((res) => dispatch(removeFriend(res)))
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));

export const blockUser = (id) => (dispatch) =>
  FriendsAPI.block(id)
    .then((res) => dispatch(receiveBlock(res)))
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));

export const fetchUser = (id) => (dispatch) =>
  FriendsAPI.fetchUser(id)
    .then((res) => dispatch(receiveUser(res.data)))
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));
