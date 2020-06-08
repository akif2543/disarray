import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = ({ channel, memberBar, toggleMemberBar }) => (
  <nav className="nav-bar">
    {channel && (
      <div className="channel-name">
        <FontAwesomeIcon icon="hashtag" size="lg" /> <h3>{channel.name}</h3>
        {channel.topic && (
          <button type="button" className="topic">
            <h4>{channel.topic}</h4>
          </button>
        )}
      </div>
    )}

    <div className="nav-icon-group">
      {channel && (
        <div className="channel">
          <FontAwesomeIcon icon="bell" size="lg" className="nav-icon" />
          <FontAwesomeIcon
            icon="thumbtack"
            size="lg"
            transform={{ rotate: 45 }}
            className="nav-icon"
          />
          <FontAwesomeIcon
            icon="user-friends"
            size="lg"
            className={memberBar ? "nav-icon active" : "nav-icon"}
            onClick={toggleMemberBar}
          />
        </div>
      )}
      <div className="search-wrapper">
        <input type="text" placeholder="Search" className="search-bar" />
        <FontAwesomeIcon icon="search" className="search-icon" />
      </div>
      <div className="user-icons">
        <FontAwesomeIcon icon="at" size="lg" className="nav-icon" />
        <a href="https://www.github.com/akif2543">
          <FontAwesomeIcon
            icon={["fab", "github"]}
            size="lg"
            className="nav-icon"
          />
        </a>
      </div>
    </div>
  </nav>
);

export default NavBar;
