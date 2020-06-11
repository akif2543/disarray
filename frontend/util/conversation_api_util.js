const ConversationAPI = {
  fetchConversations: () =>
    $.ajax({ url: "/api/conversations", method: "GET" }),
  fetchConversation: (id) =>
    $.ajax({ url: `/api/conversations/${id}`, method: "GET" }),
  createConversation: (conversation) =>
    $.ajax({
      url: "/api/conversations",
      method: "POST",
      data: { conversation },
    }),
  directMessage: (id, message) =>
    $.ajax({
      url: `/api/conversations/${id}/messages`,
      method: "POST",
      data: { message },
    }),
};

export default ConversationAPI;
