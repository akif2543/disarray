export const appearanceSub = (id, receive, sub) => {
  App.appearance = App.cable.subscriptions.create(
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

  sub({ subType: "Appearance", sub: App.appearance });
  delete App.appearance;
};

export const friendsSub = (id, actions, sub) => {
  const {
    receiveRequest,
    receiveAcceptance,
    receiveRejection,
    receiveRetraction,
    loseFriend,
    receiveBlock,
  } = actions;
  App.friends = App.cable.subscriptions.create(
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
          case "block":
            return receiveBlock(data);
          default:
            break;
        }
      },
    }
  );
  sub({ subType: "Friends", sub: App.friends });
  delete App.friends;
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

export const serverSub = (s, serverActions, messageActions, sub, push) => {
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
        let re;
        switch (data.action) {
          case "receive server":
            return receiveServer(data);
          case "remove server":
            re = new RegExp(`#/channels/${data.id}/\\d+`);
            if (re.test(window.location.hash)) push("/@me");
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
            re = new RegExp(`#/channels/${data.server}/${data.id}`);
            if (re.test(window.location.hash))
              push(`/channels/${data.server}/${data.active}`);
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

export const serverSubs = (servers, serverActions, messageActions, sub, push) =>
  servers.forEach((s) =>
    serverSub(s, serverActions, messageActions, sub, push)
  );

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

export const convoChannelSub = (id, receive, messageActions, unmember, sub) => {
  const { removeMessage, receiveMessage, receiveUnread } = messageActions;
  App.cc = App.cable.subscriptions.create(
    { channel: "ConversationChannel", id },
    {
      received: (data) => {
        if (data.action === "remove member") return unmember(data);
        receive(data);
        const [c] = Object.values(data.conversation);
        const re = new RegExp(`#/@me/${c.id}`);
        if (c.owner !== id && !re.test(window.location.hash))
          receiveUnread({ textChannel: false, messageableId: c.id });
        return convoSub(
          c.id,
          receiveMessage,
          removeMessage,
          receiveUnread,
          sub
        );
      },
    }
  );
  sub({ subType: "ConversationChannel", sub: App.cc });
  delete App.cc;
};

export const convoSubs = (convos, messageActions, sub) => {
  const { removeMessage, receiveMessage, receiveUnread } = messageActions;
  convos.forEach((c) =>
    convoSub(c, receiveMessage, removeMessage, receiveUnread, sub)
  );
};
