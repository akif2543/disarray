const ConversationAPI = {
  fetchConversations: () =>
    $.ajax({ url: "/api/conversations", method: "GET" }),
  fetchConversation: (id) =>
    $.ajax({ url: `/api/conversations/${id}`, method: "GET" }),
  createConversation: (conversation, group) =>
    $.ajax({
      url: `/api/conversations${group ? "?group=true" : ""}`,
      method: "POST",
      data: { conversation },
    }),
  directMessage: (id, message) =>
    $.ajax({
      url: `/api/conversations/${id}/messages`,
      method: "POST",
      data: { message },
    }),
  addToConversation: (id, conversation) =>
    $.ajax({
      url: `/api/conversations/${id}?add=true`,
      method: "PATCH",
      data: { conversation },
    }),
  customizeConversation: (id, conversation) =>
    $.ajax({
      url: `/api/conversations/${id}`,
      method: "PATCH",
      data: conversation,
      contentType: false,
      processData: false,
    }),
  leaveConversation: (membership) =>
    $.ajax({
      method: "DELETE",
      url: "/api/memberships",
      data: { membership },
    }),
};

export default ConversationAPI;
