const MessageAPI = {
  fetchMessages: (id, time) =>
    $.ajax({
      url: `/api/channels/${id}/messages?before=${time}`,
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
