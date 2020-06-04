import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const UserBar = ({ currentUser, logout }) => (
  <div className="user-bar">
    <div className="user">
      <div className="avatar"></div>
      <ul className="info">
        <h1>{currentUser.username}</h1>
        <h2>#{currentUser.discriminator}</h2>
      </ul>
    </div>
    <ul className="user-bar-ilist">
      <FontAwesomeIcon icon="microphone" className="user-bar-icon" />
      <FontAwesomeIcon icon="headphones-alt" className="user-bar-icon" />
      <Link to="/" onClick={logout}>
        <FontAwesomeIcon icon="cog" className="user-bar-icon temp-log" />
      </Link>
    </ul>
  </div>
);

export default UserBar;
