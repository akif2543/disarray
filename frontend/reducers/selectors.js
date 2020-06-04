export const loading = (state) => state.ui.loading;

export const getCurrentUser = (state) => state.entities.users[state.session.id];

export const getUserServers = (state) => {
  const { servers } = getCurrentUser(state);
  return servers.map((id) => state.entities.servers[id]);
};

export const getCurrentServer = (state, id) => state.entities.servers[id];

export const getServerMembers = (state, id) => {
  const { members } = getCurrentServer(state, id);
  return members.map((m) => state.entities.users[m]);
};
