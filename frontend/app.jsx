import React from "react";
import { Route } from "react-router-dom";

import SplashContainer from "./components/splash/splash_container";
import SessionContainer from "./components/session/session_container";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import MainContainer from "./components/main/main_container";
import Loading from "./components/loading";
import ModalContainer from "./components/modal";
import ServerContainer from "./components/server/server_container";
import ServerBarContainer from "./components/server/server_bar_container";

const App = ({ loading }) => (
  <div>
    {loading && <Loading />}
    <ModalContainer />
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute
      exact
      path={["/register", "/login"]}
      component={SessionContainer}
    />
    {/* <AuthRoute exact path="/login" component={SessionContainer} /> */}
    <ProtectedRoute path="/@me" component={MainContainer} />
    <ProtectedRoute
      path={["/channels/", "/@me"]}
      component={ServerBarContainer}
    />
    <ProtectedRoute path="/channels/:serverId" component={ServerContainer} />
  </div>
);

export default App;
