import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SplashBar = ({ buttonText }) => (
  <nav>
    {/* logo */}
    <ul>
      <Link to="#">
        <FontAwesomeIcon icon={["fab", "twitter"]} />
      </Link>
      <Link to="#">
        <FontAwesomeIcon icon={["fab", "facebook-square"]} />
      </Link>
      <Link to="#">
        <FontAwesomeIcon icon={["fab", "instagram"]} />
      </Link>
      <Link to="/login">
        <button type="button" id="splash-nav-btn">
          {buttonText}
        </button>
      </Link>
    </ul>
  </nav>
);

export default SplashBar;
