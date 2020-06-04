import React from "react";

import SplashBar from "./splash_bar";
import SplashJumbotron from "./splash_jumbotron";
import { Link } from "react-router-dom";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    this.props.stopLoading();
  }

  handleDemo() {
    const { login, startLoading } = this.props;
    startLoading();
    return login({ email: "demo@demo.com", password: "password" });
  }

  render() {
    const { loggedIn, startLoading } = this.props;
    return (
      <section className="splash-container">
        <SplashBar
          loggedIn={loggedIn}
          handleDemo={this.handleDemo}
          startLoading={startLoading}
        />
        <SplashJumbotron
          loggedIn={loggedIn}
          handleDemo={this.handleDemo}
          startLoading={startLoading}
        />
        <div className="splash-frame">
          <img src={window.splashURL} alt="" className="splash-img" />
        </div>
        <footer className="footer-frame">
          <div>
            <h2>Ready to try Disarray? It's free!</h2>
            <h3>JOIN TODAY</h3>
          </div>
          <Link to="/register">
            <button type="button">Sign Up Now</button>
          </Link>
        </footer>
      </section>
    );
  }
}

export default Splash;
