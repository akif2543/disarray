const SessionAPI = {
  register: (user) =>
    $.ajax({ url: "/api/users", method: "POST", data: { user } }),
  login: (user) =>
    $.ajax({ url: "/api/sessions", method: "POST", data: { user } }),
  logout: () => $.ajax({ url: "/api/sessions", method: "DELETE" }),
};

export default SessionAPI;
