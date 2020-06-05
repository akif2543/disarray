import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SplashBar = ({ loggedIn, handleDemo, startLoading }) => (
  <nav className="splash-nav">
    <nav>
      <Link to="/">
        <img src={window.logoIconURL} className="splash-logo-icon" alt="" />
        <img src={window.logoURL} className="splash-logo" alt="" />
      </Link>
      {/* <ul className="splash-nav-left">
        <li>
          <Link to="/@me" onClick={handleDemo}>
            <p>Demo</p>
          </Link>
        </li> */}
      {/* <li>
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
        </li> */}
      {/* </ul> */}
    </nav>
    <ul className="splash-nav-right">
      <a href="https://www.github.com/akif2543" className="splash-nav-link">
        <FontAwesomeIcon icon={["fab", "github"]} className="splash-icon" />
      </a>
      <a
        href="https://www.linkedin.com/in/akifsaifi"
        className="splash-nav-link"
      >
        <FontAwesomeIcon icon={["fab", "linkedin"]} className="splash-icon" />
      </a>
      <a href="https://www.instagram.com/discord" className="splash-nav-link">
        <FontAwesomeIcon icon={["fab", "angellist"]} className="splash-icon" />
      </a>
      <Link
        to={loggedIn ? "/@me" : "/login"}
        className="splash-nav-link login"
        onClick={loggedIn ? startLoading : null}
      >
        <button type="button" className="splash-nav-btn">
          {loggedIn ? "Open" : "Login"}
        </button>
      </Link>
    </ul>
  </nav>
);

export default SplashBar;
