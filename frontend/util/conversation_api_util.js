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
};

export default ConversationAPI;
