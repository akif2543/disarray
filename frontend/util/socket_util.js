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

const channelSub = (id, receive, remove, sub) => {
  App.channel = App.cable.subscriptions.create(
    { channel: "ChatChannel", channel_id: id },
    {
      received: (data) => (data.remove ? remove(data) : receive(data)),
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
  const { removeMessage, receiveMessage } = messageActions;
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
            channelSub(c, receiveMessage, removeMessage, sub);
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
  s.channels.forEach((c) => channelSub(c, receiveMessage, removeMessage, sub));
  delete App.server;
};

export const serverSubs = (servers, serverActions, messageActions, sub) =>
  servers.forEach((s) => serverSub(s, serverActions, messageActions, sub));

const convoSub = (id, receive, remove, sub) => {
  App.convo = App.cable.subscriptions.create(
    { channel: "ChatChannel", conversation_id: id },
    {
      received: (data) => (data.remove ? remove(data) : receive(data)),
      speak(data) {
        return this.perform("speak", data);
      },
    }
  );
  sub({ id, subType: "Conversation", sub: App.convo });
  delete App.convo;
};

export const convoChannelSub = (id, receive, messageActions, sub) => {
  const { removeMessage, receiveMessage } = messageActions;
  App.cable.subscriptions.create(
    { channel: "ConversationChannel", id },
    {
      received: (data) => {
        const [c] = Object.values(data.conversation);
        convoSub(c.id, receiveMessage, removeMessage, sub);
        return receive(data);
      },
    }
  );
};

export const convoSubs = (convos, messageActions, sub) => {
  const { removeMessage, receiveMessage } = messageActions;
  convos.forEach((c) => convoSub(c, receiveMessage, removeMessage, sub));
};
