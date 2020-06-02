import React from "react";

import image from "images/splash_image.png";
import SplashBar from "./splash_bar";
import SplashJumbotron from "./splash_jumbotron";

const Splash = ({ loggedIn }) => (
  <section className="splash-container">
    <SplashBar buttonText={loggedIn ? "Open" : "Login"} />
    <SplashJumbotron
      buttonText={loggedIn ? "Open" : "Open Disarray in your browser"}
    />
    <div className="splash-frame">
      <img src={image} alt="" className="splash-img" />
    </div>
  </section>
);

export default Splash;
