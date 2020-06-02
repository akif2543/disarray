import React from "react";
import { Route } from "react-router-dom";

import SplashContainer from "./components/splash/splash_container";
import SessionContainer from "./components/session/session_container";
import { AuthRoute } from "./util/route_util";

const App = (props) => (
  <div>
    <Route exact path="/" component={SplashContainer} />
    <AuthRoute exact path="/register" component={SessionContainer} />
    <AuthRoute exact path="/login" component={SessionContainer} />
  </div>
);

export default App;
