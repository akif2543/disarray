import React, { useEffect } from "react";
import { Route } from "react-router-dom";

import SplashContainer from "../splash/splash_container";
import SessionContainer from "../session/session_container";
import { AuthRoute, ProtectedRoute } from "../../util/route_util";
import HomeContainer from "../home/home_container";
import Loading from "../ui/loading";
import ModalContainer from "../ui/modal";
import ServerPanelContainer from "../server/bars/server_panel_container";
import ServerBarContainer from "../server/bars/server_bar_container";
import SettingsContainer from "../ui/settings";
import TextChannelContainer from "../channel/text_channel_container";
import ConversationContainer from "../conversation/conversation_container";
import ConversationPanelContainer from "../conversation/conversation_panel_container";

const Application = ({
  loading,
  settings,
  loggedIn,
  user,
  modal,
  receiveStatus,
  receiveRequest,
  receiveAcceptance,
  receiveRejection,
  receiveRetraction,
  loseFriend,
}) => {
  useEffect(() => {
    if (loggedIn && App) {
      App.cable.subscriptions.create(
        { channel: "AppearanceChannel", id: user.id },
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
            return (
              document.visibilityState === "visible" && document.hasFocus()
            );
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
          received: (status) => receiveStatus(status),
        }
      );
      App.cable.subscriptions.create(
        { channel: "FriendsChannel", id: user.id },
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
    }
  }, [loggedIn, Boolean(App)]);

  return (
    <div className="app">
      <Route exact path="/" component={SplashContainer} />
      {loading && <Loading />}
      {settings && <SettingsContainer />}
      {modal && <ModalContainer />}
      <AuthRoute
        exact
        path={["/register", "/login"]}
        component={SessionContainer}
      />
      <ProtectedRoute
        path={["/channels/:serverId/:channelId", "/@me"]}
        component={ServerBarContainer}
      />
      <ProtectedRoute
        path="/channels/:serverId/:channelId"
        component={ServerPanelContainer}
      />
      <ProtectedRoute path="/@me" component={ConversationPanelContainer} />
      <ProtectedRoute
        path="/@me/:conversationId"
        component={ConversationContainer}
      />
      <ProtectedRoute exact path="/@me" component={HomeContainer} />
      <ProtectedRoute
        path="/channels/:serverId/:channelId"
        component={TextChannelContainer}
      />
    </div>
  );
};

export default Application;
