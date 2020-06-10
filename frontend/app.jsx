import React from "react";
import { Route } from "react-router-dom";

import SplashContainer from "./components/splash/splash_container";
import SessionContainer from "./components/session/session_container";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import MainContainer from "./components/main/main_container";
import Loading from "./components/ui/loading";
import ModalContainer from "./components/ui/modal";
import ServerContainer from "./components/server/bars/server_container";
import ServerBarContainer from "./components/server/bars/server_bar_container";
import SettingsContainer from "./components/ui/settings";
import TextChannelContainer from "./components/channel/text_channel_container";
import ConversationContainer from "./components/conversation/conversation_container";

const App = ({ loading, settings }) => (
  <div>
    {loading && <Loading />}
    {settings && <SettingsContainer />}
    <ProtectedRoute path="/" component={ModalContainer} />
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute
      exact
      path={["/register", "/login"]}
      component={SessionContainer}
    />
    <ProtectedRoute exact path="/@me" component={MainContainer} />
    <ProtectedRoute
      path={["/channels/:serverId/:channelId", "/@me"]}
      component={ServerBarContainer}
    />
    <ProtectedRoute
      exact
      path="/@me/:conversationId"
      component={ConversationContainer}
    />
    <ProtectedRoute
      path="/channels/:serverId/:channelId"
      component={ServerContainer}
    />
    <ProtectedRoute
      exact
      path="/channels/:serverId/:channelId"
      component={TextChannelContainer}
    />
  </div>
);

export default App;
