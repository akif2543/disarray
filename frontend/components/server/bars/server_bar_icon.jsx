import React, { useState, useRef, memo, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Tooltip from "../../ui/tooltip";
import ContextMenu from "../../ui/context_menu";

import { initials } from "../../../util/format_util";

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

const ServerBarIcon = ({ server, active, isOwner }) => {
  const [tooltip, setTooltip] = useState(false);
  const [context, setContext] = useState(false);
  const [userClick, setUserClick] = useState([]);

  const el = useRef(null);

  const toggleTooltip = (bool) => () => setTooltip(bool);

  const toggleContext = () => setContext(!context);

  const handleContext = (e) => {
    e.preventDefault();
    setContext(true);
    setUserClick([e.clientX, e.clientY]);
  };

  useEffect(() => {
    if (el && el.current) {
      el.current.addEventListener("contextmenu", handleContext);
    }
    return () => {
      if (el && el.current) {
        el.current.removeEventListener("contextmenu", handleContext);
      }
    };
  }, [el]);

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
            <h1>{initials(server.name)}</h1>
          )}
        </button>
      </NavLink>
      {tooltip && <Tooltip text={server.name} className="sb-tt" el={el} />}
      {context && (
        <ContextMenu
          type="server"
          coords={userClick}
          toggleContext={toggleContext}
          id={server.id}
          isOwner={isOwner}
        />
      )}
    </div>
  );
};

export default memo(ServerBarIcon, areEqual);
