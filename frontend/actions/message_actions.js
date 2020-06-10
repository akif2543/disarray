import { receiveChannelErrors } from "./channel_actions";
import MessageAPI from "../util/message_api_util";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  ...message,
});

const receiveMessages = (messages) => ({
  type: RECEIVE_MESSAGES,
  ...messages,
});

const removeMessage = (message) => ({
  type: REMOVE_MESSAGE,
  ...message,
});

export const fetchMessages = (id, time) => (dispatch) =>
  MessageAPI.fetchMessages(id, time)
    .then((messages) => dispatch(receiveMessages(messages)))
    .fail((e) => dispatch(receiveChannelErrors(e.responseJSON)));

export const updateMessage = (message) => (dispatch) =>
  MessageAPI.updateMessage(message)
    .then((updatedMessage) => dispatch(receiveMessage(updatedMessage)))
    .fail((e) => dispatch(receiveChannelErrors(e.responseJSON)));

export const deleteMessage = (id) => (dispatch) =>
  MessageAPI.deleteMessage(id)
    .then((deletedMessage) => dispatch(removeMessage(deletedMessage)))
    .fail((e) => dispatch(receiveChannelErrors(e.responseJSON)));