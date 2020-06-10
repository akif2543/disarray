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

export const getCurrentConversation = (state, props) => {
  if (props.match.params.conversationId) {
    return state.entities.conversations[props.match.params.conversationId];
  }
  if (props.location) {
    const re = /\/@me\/(\d+)\//;
    const id = props.location.pathname.match(re)[1];
    return state.entities.conversations[id];
  }
  return null;
};

export const getConversationMembers = (state, props) => {
  const { members } = getCurrentConversation(state, props);
  return members.map((m) => state.entities.users[m]);
};

export const getOtherUser = (state, props) => {
  const { members } = getCurrentConversation(state, props);
  return members
    .filter((m) => m !== parseInt(state.session.id))
    .map((id) => state.entities.users[id])[0];
};

export const getConversationMessages = (state, props) => {
  const convo = getCurrentConversation(state, props);
  if (convo === undefined) return null;
  const { messages } = convo;
  return messages
    .map((id) => state.entities.messages[id])
    .map((m) =>
      m === undefined ? null : { ...m, author: state.entities.users[m.author] }
    );
};
