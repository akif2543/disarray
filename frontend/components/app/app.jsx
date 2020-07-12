import React from "react";
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

const App = ({ loading, settings }) => (
  <div className="app">
    {loading && <Loading />}
    {settings && <SettingsContainer />}
    <ProtectedRoute path="/" component={ModalContainer} />
    <Route exact path="/" component={SplashContainer} />
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

export default App;
