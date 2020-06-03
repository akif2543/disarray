import React from "react";

import image from "images/splash_crop.png";
import SplashBar from "./splash_bar";
import SplashJumbotron from "./splash_jumbotron";

const Splash = ({ loggedIn, login }) => {
  const handleDemo = () =>
    login({ email: "demo@demo.com", password: "password" });

  return (
    <section className="splash-container">
      <SplashBar
        buttonText={loggedIn ? "Open" : "Login"}
        handleDemo={handleDemo}
      />
      <SplashJumbotron
        buttonText={loggedIn ? "Open" : "Open Disarray in your browser"}
        handleDemo={handleDemo}
      />
      <div className="splash-frame">
        <img src={image} alt="" className="splash-img" />
      </div>
    </section>
  );
};

export default Splash;
