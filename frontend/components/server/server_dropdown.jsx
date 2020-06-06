import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerDropdown = ({ openModal, openSettings, toggleDropdown }) => (
  <div className="dropdown-bg" onClick={toggleDropdown}>
    <div className="dropdown" onClick={(e) => e.stopPropagation()}>
      <ul>
        <button type="button" className="inv">
          {/* onClick={openModal("invite")} */}
          <h3>Invite People</h3>
          <FontAwesomeIcon icon="user-plus" />
        </button>
        <button type="button">
          {/* onClick={openSettings} */}
          <h3>Server Settings</h3>
          <FontAwesomeIcon icon="cog" />
        </button>
        <button type="button">
          {/* onClick={openModal("channel") */}
          <h3>Create Channel</h3>
          <FontAwesomeIcon icon="plus-circle" />
        </button>
        <button type="button">
          {/* onClick={openModal("nickname")} */}
          <h3>Change Nickname</h3>
          <FontAwesomeIcon icon="pen" />
        </button>
      </ul>
    </div>
  </div>
);

export default ServerDropdown;
