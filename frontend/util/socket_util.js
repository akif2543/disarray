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

export const serverSubs = (
  servers,
  serverActions,
  messageActions,
  receiveSub
) => {
  const {
    receiveServer,
    removeServer,
    receiveAlias,
    removeMember,
    receiveChannel,
    removeChannel,
  } = serverActions;
  const { removeMessage, receiveMessage } = messageActions;

  servers.forEach((s) => {
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
              return receiveChannel(data);
            case "remove channel":
              return removeChannel(data);
            default:
              break;
          }
        },
      }
    );

    receiveSub({ id: s.id, subType: "Server", sub: App.server });

    s.channels.forEach((c) => {
      App.channel = App.cable.subscriptions.create(
        { channel: "ChatChannel", channel_id: c },
        {
          received: (data) =>
            data.remove ? removeMessage(data) : receiveMessage(data),
          speak(data) {
            return this.perform("speak", data);
          },
        }
      );
      receiveSub({ id: c, subType: "Channel", sub: App.channel });
    });
  });
};

export const convoSub = (id, receive) => {
  App.cable.subscriptions.create(
    { channel: "ConversationChannel", id },
    {
      received: (data) => receive(data),
    }
  );
};

export const convoSubs = (convos, messageActions, receiveSub) => {
  const { removeMessage, receiveMessage } = messageActions;
  convos.forEach((c) => {
    App.convo = App.cable.subscriptions.create(
      { channel: "ChatChannel", conversation_id: c },
      {
        received: (data) =>
          data.remove ? removeMessage(data) : receiveMessage(data),
        speak(data) {
          return this.perform("speak", data);
        },
      }
    );
    receiveSub({ id: c, subType: "Conversation", sub: App.convo });
  });
};
