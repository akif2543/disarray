import React from "react";
import { Route } from "react-router-dom";
import SplashContainer from "./components/splash/splash_container";

const App = (props) => (
  <div>
    <Route exact path="/" component={SplashContainer} />
  </div>
);

export default App;
