import ConversationAPI from "../util/conversation_api_util";

export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
export const REMOVE_CONVERSATION = "REMOVE_CONVERSATION";
export const CLOSE_CONVERSATION = "CLOSE_CONVERSATION";
export const REMOVE_CONVERSATION_MEMBER = "REMOVE_CONVERSATION_MEMBER";
export const RECEIVE_CONVERSATION_ERRORS = "RECEIVE_CONVERSATION_ERRORS";
export const CLEAR_CONVERSATION_ERRORS = "CLEAR_CONVERSATION_ERRORS";
export const RECEIVE_ACTIVE_CONVO = "RECEIVE_ACTIVE_CONVO";

const receiveConversations = (convos) => ({
  type: RECEIVE_CONVERSATIONS,
  ...convos,
});

export const receiveConversation = (convo) => ({
  type: RECEIVE_CONVERSATION,
  ...convo,
});

export const closeConversation = (id, push) => {
  const re = new RegExp(`#/@me/${id}`);
  if (re.test(window.location.hash)) push("/@me");
  return {
    type: CLOSE_CONVERSATION,
    id,
  };
};

const removeConversation = (convo) => ({
  type: REMOVE_CONVERSATION,
  ...convo,
});

export const removeConversationMember = (convo) => ({
  type: REMOVE_CONVERSATION_MEMBER,
  ...convo,
});

export const receiveActiveConversation = (convo) => ({
  type: RECEIVE_ACTIVE_CONVO,
  convo,
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

export const createConversation = (convo, group) => (dispatch) =>
  ConversationAPI.createConversation(convo, group)
    .then((newConvo) => dispatch(receiveConversation(newConvo)))
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));

export const directMessage = (id, message) => (dispatch) =>
  ConversationAPI.directMessage(id, message)
    .then((convo) => dispatch(receiveConversation(convo)))
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));

export const addToConversation = (id, ids) => (dispatch) =>
  ConversationAPI.addToConversation(id, ids)
    .then((convo) => dispatch(receiveConversation(convo)))
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));

export const customizeConversation = (id, conversation) => (dispatch) =>
  ConversationAPI.customizeConversation(id, conversation)
    .then((convo) => dispatch(receiveConversation(convo)))
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));

export const leaveConversation = (c, push) => (dispatch) =>
  ConversationAPI.leaveConversation(c)
    .then((convo) => {
      const re = new RegExp(`#/@me/${c.subscribeable_id}`);
      if (re.test(window.location.hash)) push("/@me");
      return dispatch(removeConversation(convo));
    })
    .fail((e) => dispatch(receiveConversationErrors(e.responseJSON)));
