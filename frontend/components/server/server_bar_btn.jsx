import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ServerIconTooltip from "./server_icon_tooltip";

const ServerBarBtn = ({ type, openModal, modalOpen, home }) => {
  const [tooltip, setTooltip] = useState(false);

  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);

  switch (type) {
    case "home":
      return (
        <div>
          <Link to="/@me">
            <button
              className={home ? "home-btn active" : "home-btn"}
              type="button"
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
            >
              <img src={window.logoIconURL} />
            </button>
            {tooltip && <ServerIconTooltip text="Home" />}
            <div className="home-btn-divider" />
          </Link>
        </div>
      );
    case "create":
      return (
        <div>
          <button
            className={modalOpen ? "server-btn active" : "server-btn"}
            type="button"
            onClick={() => openModal("portal")}
            onMouseOver={showTooltip}
            onFocus={showTooltip}
            onMouseOut={hideTooltip}
            onBlur={hideTooltip}
          >
            <FontAwesomeIcon icon="plus" size="lg" />
          </button>
          {tooltip && <ServerIconTooltip text="Add a Server" />}
        </div>
      );
    case "explore":
      return (
        <div>
          <Link to="/explore">
            <button
              className="server-btn"
              type="button"
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
            >
              <FontAwesomeIcon icon="compass" size="lg" />
            </button>
          </Link>
          {tooltip && <ServerIconTooltip text="Explore Public Servers" />}
          <div className="home-btn-divider" />
        </div>
      );
    default:
      return null;
  }
};

export default ServerBarBtn;
