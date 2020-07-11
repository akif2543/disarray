const SessionAPI = {
  register: (user) =>
    $.ajax({ url: "/api/users", method: "POST", data: { user } }),
  login: (user) =>
    $.ajax({ url: "/api/sessions", method: "POST", data: { user } }),
  logout: () => $.ajax({ url: "/api/sessions", method: "DELETE" }),
  fetchCurrentUser: (id) =>
    $.ajax({ url: `/api/users/${id}?cu=true`, method: "GET" }),
  fetchUsers: () => $.ajax({ url: "/api/users", method: "GET" }),
  updateUser: (user) =>
    $.ajax({
      url: `/api/users/${user.id}`,
      method: "PATCH",
      data: { user },
    }),
  deleteUser: (user) =>
    $.ajax({ url: `/api/users/${user.id}`, method: "DELETE", data: { user } }),
};

export default SessionAPI;
