import React, { useState, useRef, memo } from "react";
import { NavLink } from "react-router-dom";

import Tooltip from "../../ui/tooltip";

const areEqual = (prev, next) => {
  if (prev.active !== next.active) return false;
  if (
    prev.server.name !== next.server.name ||
    prev.server.icon !== next.server.icon ||
    prev.server.hasUnreads !== next.server.hasUnreads
  )
    return false;
  return true;
};

const ServerBarIcon = ({ server, active }) => {
  const [tooltip, setTooltip] = useState(false);
  const el = useRef(null);

  const toggleTooltip = (bool) => () => setTooltip(bool);

  const initials = server.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  let style = { display: "none" };

  if (active) {
    style = { height: "42px" };
  } else if (server.hasUnreads && !tooltip) {
    style = { height: "10px", borderRadius: "50%" };
  } else if (tooltip) {
    style = { height: "22px" };
  }

  return (
    <div className="server-icon-container">
      <div className="note" style={style} />
      <NavLink
        to={`/channels/${server.id}/${server.active}`}
        className={active ? "active" : ""}
      >
        <button
          className={server.icon ? "server-icon" : "server-icon none"}
          type="button"
          onMouseOver={toggleTooltip(true)}
          onFocus={toggleTooltip(true)}
          onMouseOut={toggleTooltip(false)}
          onBlur={toggleTooltip(false)}
          ref={el}
        >
          {server.icon ? (
            <img src={server.icon} alt="" className="server-bar-icon" />
          ) : (
            <h1>{initials}</h1>
          )}
        </button>
      </NavLink>
      {tooltip && <Tooltip text={server.name} className="sb-tt" el={el} />}
    </div>
  );
};

export default memo(ServerBarIcon, areEqual);
