const ServerAPI = {
  fetchServers: () => $.ajax("/api/servers"),
  fetchServer: (id) => $.ajax(`/api/servers/${id}`),
  createServer: (server) =>
    $.ajax({ method: "POST", url: "/api/servers", data: { server } }),
  updateServer: (server) =>
    $.ajax({ method: "PATCH", url: `/api/servers/${id}`, data: { server } }),
  deleteServer: (id) => $.ajax({ method: "DELETE", url: `/api/servers/${id}` }),
  joinServer: (membership) =>
    $.ajax({ method: "POST", url: "/api/memberships", data: { membership } }),
  leaveServer: (id) =>
    $.ajax({ method: "DELETE", url: `/api/memberships/${id}` }),
};

export default ServerAPI;
