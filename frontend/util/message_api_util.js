const MessageAPI = {
  fetchMessages: (type, id, time) =>
    $.ajax({
      url:
        type === "Channel"
          ? `/api/channels/${id}/messages?before=${time}&t=true`
          : `/api/conversations/${id}/messages?before=${time}&t=false`,
      method: "GET",
    }),
  updateMessage: (message) =>
    $.ajax({
      url: `/api/messages/${message.id}`,
      method: "PATCH",
      data: { message },
    }),
  deleteMessage: (id) =>
    $.ajax({
      url: `/api/messages/${id}`,
      method: "DELETE",
    }),
};

export default MessageAPI;
