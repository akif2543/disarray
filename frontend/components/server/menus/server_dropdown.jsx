import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerDropdown = ({
  id,
  isOwner,
  canAct,
  openModal,
  openSettings,
  toggleDropdown,
}) => {
  const handleClick = (name) => () => {
    toggleDropdown();
    return openModal({ name, id });
  };

  const handleSettings = (name) => () => {
    toggleDropdown();
    return openSettings({ name, id });
  };

  return (
    <div className="dropdown-bg" onClick={toggleDropdown}>
      <div className="dropdown" onClick={(e) => e.stopPropagation()}>
        <ul>
          <button type="button" className="inv" onClick={handleClick("invite")}>
            <h3>Invite People</h3>
            <FontAwesomeIcon icon="user-plus" />
          </button>
          {isOwner && (
            <button
              type="button"
              className={canAct ? "" : "disabled"}
              onClick={canAct ? handleSettings("server") : null}
              disabled={!canAct}
            >
              <h3>Server Settings</h3>
              <FontAwesomeIcon icon="cog" />
            </button>
          )}
          {isOwner && (
            <button type="button" onClick={handleClick("add channel")}>
              <h3>Create Channel</h3>
              <FontAwesomeIcon icon="plus-circle" />
            </button>
          )}
          <button type="button" onClick={handleClick("alias")}>
            <h3>Change Nickname</h3>
            <FontAwesomeIcon icon="pen" />
          </button>
          {!isOwner && (
            <button
              type="button"
              className={canAct ? "leave" : "leave disabled"}
              onClick={canAct ? handleClick("leave") : null}
              disabled={!canAct}
            >
              <h3>Leave Server</h3>
              <FontAwesomeIcon icon="arrow-alt-circle-left" />
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ServerDropdown;
