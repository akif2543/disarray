import React from "react";
import { Route } from "react-router-dom";

import SplashContainer from "./components/splash/splash_container";
import SessionContainer from "./components/session/session_container";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import MainContainer from "./components/main/main_container";
import Loading from "./components/loading";

const App = ({ loading }) => (
  <div>
    {loading && <Loading />}
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute exact path="/register" component={SessionContainer} />
    <AuthRoute exact path="/login" component={SessionContainer} />
    <ProtectedRoute path="/@me" component={MainContainer} />
  </div>
);

export default App;
