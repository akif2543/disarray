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
  const re = /\/channels\/(\d+)\//;
  const id = props.location.pathname.match(re)[1];
  return state.entities.servers[id];
};

export const getCurrentChannel = (state, props) =>
  state.entities.channels[props.match.params.channelId];

export const getCurrentChannelJanky = (state, props) => {
  const re = /\/channels\/\d+\/(\d+)/;
  const id = props.location.pathname.match(re)[1];
  return state.entities.channels[id];
};

export const getServerMembers = (state, props) => {
  const { members } = getCurrentServerJanky(state, props);
  return members.map((m) => state.entities.users[m]);
};

export const getServerChannels = (state, props) => {
  const { channels } = getCurrentServerJanky(state, props);
  return channels.map((c) => state.entities.channels[c]);
};
