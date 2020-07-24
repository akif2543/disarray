import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import Tooltip from "../../ui/tooltip";

const ServerBarIcon = ({ server, active }) => {
  const [tooltip, setTooltip] = useState(false);
  const el = useRef(null);

  const toggleTooltip = (bool) => () => setTooltip(bool);

  const initials = server.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <div>
      <Link to={`/channels/${server.id}/${server.active}`}>
        <button
          className={active ? "server-icon active" : "server-icon"}
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
      </Link>
      {tooltip && <Tooltip text={server.name} className="sb-tt" el={el} />}
    </div>
  );
};

export default ServerBarIcon;
