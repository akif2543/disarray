import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = ({ channel }) => (
  <nav className="nav-bar">
    {channel && (
      <div className="channel-name">
        <FontAwesomeIcon icon="hashtag" size="lg" /> <h3>{channel.name}</h3>
      </div>
    )}

    {/* <div className="nav-icon-group">
      {channel && (
        <div className="channel">
          <FontAwesomeIcon icon="bell" size="lg" />
          <FontAwesomeIcon
            icon="thumbtack"
            size="lg"
            transform={{ rotate: 45 }}
          />
          <FontAwesomeIcon icon="user-friends" size="lg" />
        </div>
      )} */}
    {/* <div className="search-wrapper">
        <input type="text" placeholder="Search" />
        <FontAwesomeIcon icon="search" />
      </div>
      <div className="user-icons">
        <FontAwesomeIcon icon="at" size="lg" />
        <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
      </div> */}
    {/* </div> */}
  </nav>
);

export default NavBar;
