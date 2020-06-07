const ChannelAPI = {
  fetchChannel: (id) => $.ajax({ url: `/api/channels/${id}`, method: "GET" }),
  createChannel: (channel) =>
    $.ajax({ url: `/api/channels/${id}`, method: "POST", data: { channel } }),
  updateChannel: (channel) =>
    $.ajax({
      url: `/api/channels/${channel.id}`,
      method: "PATCH",
      data: { channel },
    }),
  deleteChannel: (id) =>
    $.ajax({
      url: `/api/channels/${id}`,
      method: "DELETE",
    }),
};

export default ChannelAPI;
