import { receiveChannelErrors } from "./channel_actions";
import MessageAPI from "../util/message_api_util";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";
export const RECEIVE_SUB = "RECEIVE_SUB";

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  ...message,
});

const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  ...messages,
});

export const removeMessage = (message) => ({
  type: REMOVE_MESSAGE,
  ...message,
});

export const receiveSub = (sub) => ({
  type: RECEIVE_SUB,
  ...sub,
});

export const fetchMessages = (type, id, time) => (dispatch) =>
  MessageAPI.fetchMessages(type, id, time)
    .then((messages) => dispatch(receiveMessages(messages)))
    .fail((e) => dispatch(receiveChannelErrors(e.responseJSON)));

export const updateMessage = (message) => (dispatch) =>
  MessageAPI.updateMessage(message).fail((e) =>
    dispatch(receiveChannelErrors(e.responseJSON))
  );

export const deleteMessage = (id) => (dispatch) =>
  MessageAPI.deleteMessage(id).fail((e) =>
    dispatch(receiveChannelErrors(e.responseJSON))
  );
