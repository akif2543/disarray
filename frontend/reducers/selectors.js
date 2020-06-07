export const loading = (state) => state.ui.loading;
export const settings = (state) => state.ui.settings;

export const getCurrentUser = (state) => state.entities.users[state.session.id];

export const getUserServers = (state) => {
  const { servers } = getCurrentUser(state);
  return servers.map((id) => state.entities.servers[id]);
};

export const getCurrentServer = (state, props) =>
  state.entities.servers[props.match.params.serverId];

export const getCurrentServerJanky = (state, props) => {
  const re = /\/channels\/(\d+)/;
  const serverId = props.location.pathname.match(re)[1];
  return state.entities.servers[serverId];
};

export const getServerMembers = (state, props) => {
  const { members } = getCurrentServer(state, props);
  return members.map((m) => state.entities.users[m]);
};
