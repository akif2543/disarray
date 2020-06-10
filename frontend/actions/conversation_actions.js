import ConversationAPI from "../util/conversation_api_util";

export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
export const RECEIVE_CONVERSATION_ERRORS = "RECEIVE_CONVERSATION_ERRORS";
export const CLEAR_CONVERSATION_ERRORS = "CLEAR_CONVERSATION_ERRORS";

const receiveConversations = (convos) => ({
  type: RECEIVE_CONVERSATIONS,
  ...convos,
});

const receiveConversation = (convo) => ({
  type: RECEIVE_CONVERSATION,
  ...convo,
});

const receiveConversationErrors = (errors) => ({
  type: RECEIVE_CONVERSATION_ERRORS,
  errors,
});

export const clearConversationErrors = () => ({
  type: CLEAR_CONVERSATION_ERRORS,
});

export const fetchConversations = () => (dispatch) =>
  ConversationAPI.fetchConversations()
    .then((convos) => dispatch(receiveConversations(convos)))
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));

export const fetchConversation = (id) => (dispatch) =>
  ConversationAPI.fetchConversation(id)
    .then((convo) => dispatch(receiveConversation(convo)))
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));

export const createConversation = (convo) => (dispatch) =>
  ConversationAPI.createConversation(convo)
    .then((convo) => dispatch(receiveConversation(convo)))
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));
