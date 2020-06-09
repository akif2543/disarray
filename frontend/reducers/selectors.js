export const loading = (state) => state.ui.loading;
export const settings = (state) => state.ui.settings;

export const getCurrentUser = (state) => state.entities.users[state.session.id];

export const getUserServers = (state) => {
  const { servers } = getCurrentUser(state);
  return servers.map((id) => state.entities.servers[id]);
};

export const getCurrentServer = (state, props) => {
  if (props.match.params.serverId) {
    return state.entities.servers[props.match.params.serverId];
  }
  if (props.location) {
    const re = /\/channels\/(\d+)\//;
    const id = props.location.pathname.match(re)[1];
    return state.entities.servers[id];
  }
  return null;
};

export const getCurrentChannel = (state, props) => {
  if (props.match.params.channelId) {
    return state.entities.channels[props.match.params.channelId];
  }
  if (props.location) {
    const re = /\/channels\/\d+\/(\d+)/;
    const id = props.location.pathname.match(re)[1];
    return state.entities.channels[id];
  }
  return null;
};

export const getServerMembers = (state, props) => {
  const { members } = getCurrentServer(state, props);
  return members.map((m) => state.entities.users[m]);
};

export const getServerChannels = (state, props) => {
  const { channels } = getCurrentServer(state, props);
  return channels.map((c) => state.entities.channels[c]);
};

export const getTextChannelMessages = (state, props) => {
  const channel = getCurrentChannel(state, props);
  if (channel === undefined) return null;
  const { messages } = channel;
  return messages
    .map((id) => state.entities.messages[id])
    .map((m) =>
      m === undefined ? null : { ...m, author: state.entities.users[m.author] }
    );
};
