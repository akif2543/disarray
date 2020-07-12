import FriendsAPI from "../util/friends_api_util";

export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const RECEIVE_PENDING = "RECEIVE_PENDING";
export const RECEIVE_DECLINE = "RECEIVE_DECLINE";
export const REMOVE_FRIEND = "REMOVE_FRIEND";
export const RECEIVE_BLOCK = "RECEIVE_BLOCK";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_FRIEND_ERROR = "RECEIVE_FRIEND_ERROR";

const receiveFriend = (res) => ({
  type: RECEIVE_FRIEND,
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

const receiveBlock = (res) => ({
  type: RECEIVE_BLOCK,
  ...res,
});

const removeFriend = (res) => ({
  type: REMOVE_FRIEND,
  ...res,
});

const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

const receiveFriendError = (error) => ({
  type: RECEIVE_FRIEND_ERROR,
  error,
});

export const requestFriend = (id) => (dispatch) =>
  FriendsAPI.requestFriend(id)
    .then((res) => dispatch(receivePending(res.data)))
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));

export const respondToRequest = (id, type) => (dispatch) =>
  FriendsAPI.respondToRequest(id, type)
    .then((res) =>
      dispatch(
        res.data.accept ? receiveFriend(res.data) : receiveDecline(res.data)
      )
    )
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));

export const unfriend = (id) => (dispatch) =>
  FriendsAPI.unfriend(id)
    .then((res) => dispatch(removeFriend(res.data)))
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));

export const mutualFriends = (id) => (dispatch) =>
  FriendsAPI.getMutuals(id)
    .then((res) => dispatch(receiveUser(res.data)))
    .fail((e) => dispatch(receiveFriendError(e.responseJSON)));
