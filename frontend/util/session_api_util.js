const SessionAPI = {
  register: (user) =>
    $.ajax({ url: "/api/users", method: "POST", data: { user } }),
  login: (user) =>
    $.ajax({ url: "/api/sessions", method: "POST", data: { user } }),
  logout: () => $.ajax({ url: "/api/sessions", method: "DELETE" }),
  fetchCurrentUser: (id) =>
    $.ajax({ url: `/api/users/${id}?cu=true`, method: "GET" }),
  updateUser: (user) =>
    $.ajax({ url: `/api/users/${user.id}`, method: "PATCH", data: { user } }),
  deleteUser: (id) => $.ajax({ url: `/api/users/${id}`, method: "DELETE" }),
};

export default SessionAPI;
