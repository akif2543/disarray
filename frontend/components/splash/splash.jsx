import React from "react";

import SplashBar from "./splash_bar";
import SplashJumbotron from "./splash_jumbotron";

const Splash = ({ loggedIn }) => (
  <section>
    <SplashBar buttonText={loggedIn ? "Open" : "Login"} />
    <SplashJumbotron
      buttonText={loggedIn ? "Open" : "Open Disarray in your browser"}
    />
  </section>
);

export default Splash;
