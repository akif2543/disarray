import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../../ui/tooltip";

const ServerBarBtn = ({ type, openModal, modalOpen, home }) => {
  const el = useRef(null);
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
              ref={el}
            >
              <img src={window.logoIconURL} />
            </button>
            {tooltip && <Tooltip text="Home" className="s-icon-tt" el={el} />}
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
            ref={el}
          >
            <FontAwesomeIcon icon="plus" size="lg" />
          </button>
          {tooltip && (
            <Tooltip text="Add a Server" className="s-icon-tt" el={el} />
          )}
        </div>
      );
    case "explore":
      return (
        <div>
          <Link to="#">
            <button
              className="server-btn"
              type="button"
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
              ref={el}
            >
              <FontAwesomeIcon icon="compass" size="lg" />
            </button>
          </Link>
          {tooltip && (
            <Tooltip
              text="Explore Public Servers [NYI]"
              className="s-icon-tt"
              el={el}
            />
          )}
          <div className="home-btn-divider" />
        </div>
      );
    default:
      return null;
  }
};

export default ServerBarBtn;
