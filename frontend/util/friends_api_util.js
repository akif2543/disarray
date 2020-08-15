const FriendsAPI = {
  fetchUser: (id) => $.ajax({ url: `/api/friends/${id}`, method: "GET" }),
  requestFriend: (id, user) =>
    $.ajax({
      url: `/api/friends${id ? `?id=${id}` : ""}`,
      method: "POST",
      data: { user },
    }),
  respondToRequest: (id, type) =>
    $.ajax({ url: `/api/friends/${id}?${type}=true`, method: "PATCH" }),
  unfriend: (id) => $.ajax({ url: `/api/friends/${id}`, method: "DELETE" }),
  block: (id) =>
    $.ajax({ url: `/api/friends?id=${id}&block=true}`, method: "POST" }),
  unblock: (id) =>
    $.ajax({ url: `/api/friends/${id}?unblock=true`, method: "DELETE" }),
};

export default FriendsAPI;
