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
  return members
    .map((m) => state.entities.users[m])
    .sort((a, b) =>
      a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
    );
};

export const getServerChannels = (state, props) => {
  const { channels } = getCurrentServer(state, props);
  return channels.map((c) => state.entities.channels[c]);
};

export const getTextChannelMessages = (state, props) => {
  const channel = getCurrentChannel(state, props);
  if (channel === undefined) return null;
  const { messages } = channel;
  return (
    messages
      .map((id) => state.entities.messages[id])
      // .map((m) =>
      //   m === undefined ? null : { ...m, author: state.entities.users[m.author] }
      // )
      .sort((a, b) => {
        if (!a || !b) return;
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
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

export const getConversations = (state) => {
  const { conversations } = getCurrentUser(state);
  return conversations
    .map((id) => state.entities.conversations[id])
    .map((c) => ({
      ...c,
      members: c.members.map((id) => state.entities.users[id]),
    }));
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
  return (
    messages
      .map((id) => state.entities.messages[id])
      // .map((m) =>
      //   m === undefined ? null : { ...m, author: state.entities.users[m.author] }
      // )
      .sort((a, b) => {
        if (!a || !b) return;
        return new Date(a.createdAt) - new Date(b.createdAt);
      })
  );
};

export const getMessageAuthor = (state, props) => {
  const { author } = props.m;
  return state.entities.users[author];
};

export const getMessageFromPath = (state, props) => {
  const {
    location: { pathname },
  } = props;
  // debugger;
  const id = pathname.match(/\/@?[a-z]+\/\d+\/\d*\/*(\d+)/)[1];
  // debugger;
  return state.entities.messages[id];
};

export const getAuthorFromMessage = (state, props) => {
  const m = getMessageFromPath(state, props);
  return state.entities.users[m.author];
};

export const getUserFriends = (state) => {
  const user = getCurrentUser(state);
  const { friends } = user;
  return friends.map((f) => state.entities.users[f]);
};

export const getUserIncomingPendingFriends = (state) => {
  const user = getCurrentUser(state);
  const { pendingIn } = user;
  return pendingIn.map((f) => state.entities.users[f]);
};

export const getUserOutgoingPendingFriends = (state) => {
  const user = getCurrentUser(state);
  const { pendingOut } = user;
  return pendingOut.map((f) => state.entities.users[f]);
};

export const getUserBlockedFriends = (state) => {
  const user = getCurrentUser(state);
  const { blocked } = user;
  return blocked.map((f) => state.entities.users[f]);
};
