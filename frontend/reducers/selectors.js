export const loading = (state) => state.ui.loading;
export const settings = (state) => state.ui.settings;

export const getCurrentUser = (state) => {
  if (!state.session.id) return {};
  const user = state.entities.users[state.session.id];
  return {
    ...user,
    ...state.session,
  };
};

export const getUserServers = (state) => {
  if (!state.session.id) return [];
  const { servers } = getCurrentUser(state);
  const ids = Object.keys(servers);
  return ids.reverse().map((id) => {
    const s = state.entities.servers[id];
    s.hasUnreads =
      s.hasUnreads ||
      s.channels.some(
        (c) =>
          state.entities.channels[c] && state.entities.channels[c].hasUnreads
      );
    return s;
  });
};

export const getCurrentServer = (state, props) => {
  if (props.match.params.serverId) {
    return state.entities.servers[props.match.params.serverId];
  }
  if (props.location) {
    if (props.location.pathname.includes("channels")) {
      const re = /\/channels\/(\d+)\//;
      const id = props.location.pathname.match(re)[1];
      return state.entities.servers[id];
    }
    return null;
  }
  return null;
};

export const getCurrentChannel = (state, props) => {
  if (props.match.params.channelId) {
    return state.entities.channels[props.match.params.channelId];
  }
  if (props.location) {
    if (props.location.pathname.includes("channels")) {
      const re = /\/channels\/\d+\/(\d+)/;
      const id = props.location.pathname.match(re)[1];
      return state.entities.channels[id];
    }
    return null;
  }
  return null;
};

export const isPrimaryChannel = (state, props) => {
  const channel = getCurrentChannel(state, props);
  const server = getCurrentServer(state, props);
  return channel && server ? channel.id === server.channels[0] : false;
};

export const getServerMembers = (state, props) => {
  const { id, members } = getCurrentServer(state, props);
  return members
    .filter((n, i, a) => a.indexOf(n) === i)
    .map((m) => state.entities.users[m])
    .sort((a, b) => {
      const nameA = a.servers[id] || a.username;
      const nameB = b.servers[id] || b.username;
      return nameA.toLowerCase() < nameB.toLowerCase() ? -1 : 1;
    });
};

export const getServerChannels = (state, props) => {
  const { channels } = getCurrentServer(state, props);
  return channels.sort((a, b) => a - b).map((c) => state.entities.channels[c]);
};

export const getTextChannelMessages = (state, props) => {
  const channel = getCurrentChannel(state, props);
  if (channel === undefined) return null;
  const { messages } = channel;
  return messages.map((id) => state.entities.messages[id]);
};

export const getCurrentConversation = (state, props) => {
  if (props.match.params.conversationId) {
    return state.entities.conversations[props.match.params.conversationId];
  }
  return null;
  // if (props.location) {
  //   const re = /\/@me\/(\d+)\//;
  //   const id = props.location.pathname.match(re)[1];
  //   return state.entities.conversations[id];
  // }
};

export const conversations = (state) => {
  const { conversations } = getCurrentUser(state);
  return conversations.map((c) => state.entities.conversations[c]);
};

export const getConversations = (state) => {
  if (!state.session.id) return [];
  const convos = conversations(state);
  return convos.map((c) => ({
    ...c,
    members: c.members.map((id) => state.entities.users[id]),
  }));
};

export const unreadConversations = (state) => {
  const convos = getConversations(state);
  return convos.filter((c) => c.unreads);
};

export const getConversationIds = (state) => {
  if (!state.session.id) return [];
  return state.session.conversations;
};

export const getConversationMembers = (state, props) => {
  const convo = getCurrentConversation(state, props);
  if (!convo) return [];
  const { members } = convo;
  return members
    .filter((n, i, a) => a.indexOf(n) === i)
    .map((m) => state.entities.users[m])
    .sort((a, b) =>
      a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
    );
};

export const getConversationName = (state, props) => {
  const { members, name } = getCurrentConversation(state, props);
  if (name) return name;
  return members
    .filter((m) => m !== parseInt(state.session.id))
    .map((id) => state.entities.users[id].username)
    .join(", ");
};

export const getConversationMessages = (state, props) => {
  const convo = getCurrentConversation(state, props);
  if (convo === undefined) return null;
  const { messages } = convo;
  return messages.map((id) => state.entities.messages[id]);
};

export const getMessageAuthor = (state, props) => {
  const { author } = props.m;
  return state.entities.users[author];
};

export const getMessageFromPath = (state, props) => {
  const {
    location: { search },
  } = props;
  const id = search.slice(3);
  return state.entities.messages[id];
};

export const getAuthorFromMessage = (state, props) => {
  const m = getMessageFromPath(state, props);
  return state.entities.users[m.author];
};

export const getUserFriends = (state) => {
  const user = getCurrentUser(state);
  const { friends } = user;
  return friends
    .map((f) => state.entities.users[f])
    .sort((a, b) =>
      a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
    );
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

export const getFriendFromPath = (state, props) => {
  const {
    location: { search },
  } = props;
  const [full, id] = search.match(/^\?id=(\d+)$/);
  return state.entities.users[id];
};

export const getSubscription = (state, props) => {
  const {
    match: {
      params: { channelId, conversationId },
    },
  } = props;
  return channelId
    ? state.subscriptions.channel[channelId]
    : state.subscriptions.conversation[conversationId];
};
