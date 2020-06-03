import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "assets/images/logo_solo.png";
import icon from "assets/images/icon_solo.png";

const SplashBar = ({ buttonText, handleDemo }) => (
  <nav className="splash-nav">
    <nav>
      <Link to="/">
        <img src={icon} className="splash-logo-icon" alt="" />
        <img src={logo} className="splash-logo" alt="" />
      </Link>
      <ul className="splash-nav-left">
        <li>
          <Link to="/@me" onClick={handleDemo}>
            <p>Demo</p>
          </Link>
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
    </nav>
    <ul className="splash-nav-right">
      <a href="https://www.twitter.com/discord" className="splash-nav-link">
        <FontAwesomeIcon icon={["fab", "twitter"]} className="splash-icon" />
      </a>
      <a href="https://www.facebook.com/discord" className="splash-nav-link">
        <FontAwesomeIcon
          icon={["fab", "facebook-square"]}
          className="splash-icon"
        />
      </a>
      <a href="https://www.instagram.com/discord" className="splash-nav-link">
        <FontAwesomeIcon icon={["fab", "instagram"]} className="splash-icon" />
      </a>
      <Link to="/login" className="splash-nav-link login">
        <button type="button" className="splash-nav-btn">
          {buttonText}
        </button>
      </Link>
    </ul>
  </nav>
);

export default SplashBar;
