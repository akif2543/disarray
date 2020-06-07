import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserSettingsSidebar = ({ logout }) => (
  <section className="settings-sidebar">
    <nav>
      <h5>USER SETTINGS</h5>
      <ul>
        <button type="button" className="active">
          My Account
        </button>
        <div className="divider" />
        <Link to="/">
          <button type="button" className="logout" onClick={logout}>
            Logout
          </button>
        </Link>
        <div className="divider" />
        <div className="icons">
          <a href="https://www.github.com/akif2543" className="splash-nav-link">
            <FontAwesomeIcon icon={["fab", "github"]} className="splash-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/akifsaifi"
            className="splash-nav-link"
          >
            <FontAwesomeIcon
              icon={["fab", "linkedin"]}
              className="splash-icon"
            />
          </a>
          <a
            href="https://www.instagram.com/discord"
            className="splash-nav-link"
          >
            <FontAwesomeIcon
              icon={["fab", "angellist"]}
              className="splash-icon"
            />
          </a>
        </div>
      </ul>
    </nav>
  </section>
);

export default UserSettingsSidebar;
