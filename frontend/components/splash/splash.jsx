import React from "react";

// import image from "images/splash_crop.png";
import SplashBar from "./splash_bar";
import SplashJumbotron from "./splash_jumbotron";

const Splash = ({ loggedIn, login, startLoading }) => {
  const handleDemo = () => {
    startLoading();
    return login({ email: "demo@demo.com", password: "password" });
  };

  return (
    <section className="splash-container">
      <SplashBar
        loggedIn={loggedIn}
        handleDemo={handleDemo}
        startLoading={startLoading}
      />
      <SplashJumbotron
        loggedIn={loggedIn}
        handleDemo={handleDemo}
        startLoading={startLoading}
      />
      <div className="splash-frame">
        <img src={window.splashURL} alt="" className="splash-img" />
      </div>
    </section>
  );
};

export default Splash;
