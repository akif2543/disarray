export const appearanceSub = (id, receive) => {
  App.cable.subscriptions.create(
    { channel: "AppearanceChannel", id },
    {
      initialized() {
        this.update = this.update.bind(this);
      },
      connected() {
        this.install();
        this.update();
      },
      disconnected() {
        this.uninstall();
      },
      update() {
        if (this.documentIsActive) this.appear();
      },
      appear() {
        this.perform("appear");
      },
      get documentIsActive() {
        return document.visibilityState === "visible" && document.hasFocus();
      },
      install() {
        window.addEventListener("focus", this.update);
        window.addEventListener("blur", this.update);
        document.addEventListener("visibilitychange", this.update);
      },

      uninstall() {
        window.removeEventListener("focus", this.update);
        window.removeEventListener("blur", this.update);
        document.removeEventListener("visibilitychange", this.update);
      },
      received: (status) => receive(status),
    }
  );
};

export const friendsSub = (id, actions) => {
  const {
    receiveRequest,
    receiveAcceptance,
    receiveRejection,
    receiveRetraction,
    loseFriend,
  } = actions;
  App.cable.subscriptions.create(
    { channel: "FriendsChannel", id },
    {
      received: (data) => {
        switch (data.action) {
          case "request":
            return receiveRequest(data);
          case "accept":
            return receiveAcceptance(data);
          case "decline":
            return receiveRejection(data);
          case "cancel":
            return receiveRetraction(data);
          case "unfriend":
            return loseFriend(data);
          default:
            break;
        }
      },
    }
  );
};

const channelSub = (id, receive, remove, unread, sub) => {
  App.channel = App.cable.subscriptions.create(
    { channel: "ChatChannel", channel_id: id },
    {
      received: (data) => {
        if (data.remove) return remove(data);
        const [message] = Object.values(data.message);
        const { messageableId, textChannel } = message;
        const re = new RegExp(`#/channels/\\d+/${messageableId}`);
        if (!re.test(window.location.hash))
          unread({ textChannel, messageableId });
        return receive(data);
      },
      speak(data) {
        return this.perform("speak", data);
      },
    }
  );
  sub({ id, subType: "Channel", sub: App.channel });
  delete App.channel;
};

export const serverSub = (s, serverActions, messageActions, sub) => {
  const {
    receiveServer,
    removeServer,
    receiveAlias,
    removeMember,
    receiveChannel,
    removeChannel,
  } = serverActions;
  const { removeMessage, receiveMessage, receiveUnread } = messageActions;
  let c;
  App.server = App.cable.subscriptions.create(
    { channel: "ServerChannel", id: s.id },
    {
      received: (data) => {
        switch (data.action) {
          case "receive server":
            return receiveServer(data);
          case "remove server":
            return removeServer(data);
          case "receive alias":
            return receiveAlias(data);
          case "remove member":
            return removeMember(data);
          case "receive channel":
            [c] = Object.keys(data.channel);
            channelSub(c, receiveMessage, removeMessage, receiveUnread, sub);
            return receiveChannel(data);
          case "remove channel":
            return removeChannel(data);
          default:
            break;
        }
      },
    }
  );
  sub({ id: s.id, subType: "Server", sub: App.server });
  s.channels.forEach((c) =>
    channelSub(c, receiveMessage, removeMessage, receiveUnread, sub)
  );
  delete App.server;
};

export const serverSubs = (servers, serverActions, messageActions, sub) =>
  servers.forEach((s) => serverSub(s, serverActions, messageActions, sub));

const convoSub = (id, receive, remove, unread, sub) => {
  App.convo = App.cable.subscriptions.create(
    { channel: "ChatChannel", conversation_id: id },
    {
      received: (data) => {
        if (data.remove) return remove(data);
        const [message] = Object.values(data.message);
        const { messageableId, textChannel } = message;
        const re = new RegExp(`#/@me/${messageableId}`);
        if (!re.test(window.location.hash))
          unread({ textChannel, messageableId });
        return receive(data);
      },
      speak(data) {
        return this.perform("speak", data);
      },
    }
  );
  sub({ id, subType: "Conversation", sub: App.convo });
  delete App.convo;
};

export const convoChannelSub = (id, receive, messageActions, sub) => {
  const { removeMessage, receiveMessage, receiveUnread } = messageActions;
  App.cable.subscriptions.create(
    { channel: "ConversationChannel", id },
    {
      received: (data) => {
        const [c] = Object.values(data.conversation);
        convoSub(c.id, receiveMessage, removeMessage, receiveUnread, sub);
        return receive(data);
      },
    }
  );
};

export const convoSubs = (convos, messageActions, sub) => {
  const { removeMessage, receiveMessage, receiveUnread } = messageActions;
  convos.forEach((c) =>
    convoSub(c, receiveMessage, removeMessage, receiveUnread, sub)
  );
};
