import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "assets/images/logo.png";

const SplashBar = ({ buttonText }) => (
  <nav className="splash-nav">
    <ul className="splash-nav-left">
      <Link to="/">
        <img src={logo} className="splash-logo" alt="" />
      </Link>
      <li>
        <p>Demo</p>
      </li>
      <li>
        <p>Why Disarray?</p>
      </li>
      <li>
        <p>Nitro</p>
      </li>
      <li>
        <p>Jobs</p>
      </li>
      <li>
        <p>
          Developers <FontAwesomeIcon icon="angle-down" size="xs" />
        </p>
      </li>
      <li>
        <p>
          Community <FontAwesomeIcon icon="angle-down" size="xs" />
        </p>
      </li>
      <li>
        <p>
          Support <FontAwesomeIcon icon="angle-down" size="xs" />
        </p>
      </li>
    </ul>
    <ul className="splash-nav-right">
      <a href="https://www.twitter.com/discord">
        <FontAwesomeIcon icon={["fab", "twitter"]} className="splash-icon" />
      </a>
      <a href="https://www.facebook.com/discord">
        <FontAwesomeIcon
          icon={["fab", "facebook-square"]}
          className="splash-icon"
        />
      </a>
      <a href="https://www.instagram.com/discord">
        <FontAwesomeIcon icon={["fab", "instagram"]} className="splash-icon" />
      </a>
      <Link to="/login">
        <button type="button" className="splash-nav-btn">
          {buttonText}
        </button>
      </Link>
    </ul>
  </nav>
);

export default SplashBar;
