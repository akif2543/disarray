import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../../ui/tooltip";

const ServerBarBtn = ({
  type,
  openModal,
  modalOpen,
  active,
  pending,
  match,
}) => {
  const el = useRef(null);
  const [tooltip, setTooltip] = useState(false);

  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);

  let style = { display: "none" };

  if (
    (type === "create" && modalOpen) ||
    (type === "home" && match.path === "/@me")
  ) {
    style = { height: "42px" };
  } else if (tooltip) {
    style = { height: "22px" };
  }

  switch (type) {
    case "home":
      return (
        <div className="home-icon-container">
          <div className="note" style={style} />
          <NavLink to={active ? `/@me/${active}` : "/@me"}>
            <button
              className="home-btn"
              type="button"
              onMouseOver={showTooltip}
              onFocus={showTooltip}
              onMouseOut={hideTooltip}
              onBlur={hideTooltip}
              ref={el}
            >
              <img src={window.logoIconURL} alt="" />
              {Boolean(pending) && (
                <div className="badge-bg">
                  <div className="notification">
                    {pending < 10 ? pending : "9+"}
                  </div>
                </div>
              )}
            </button>
            {tooltip && <Tooltip text="Home" className="sb-tt" el={el} />}
          </NavLink>
        </div>
      );
    case "create":
      return (
        <div className="server-icon-container">
          <div className="note" style={style} />
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
          {tooltip && <Tooltip text="Add a Server" className="sb-tt" el={el} />}
        </div>
      );
    case "explore":
      return (
        <div>
          <button
            className="server-btn"
            type="button"
            onMouseOver={showTooltip}
            onFocus={showTooltip}
            onMouseOut={hideTooltip}
            onBlur={hideTooltip}
            ref={el}
            style={{ cursor: "not-allowed", margin: "5px 0" }}
          >
            <FontAwesomeIcon icon="compass" size="lg" />
          </button>
          {tooltip && (
            <Tooltip
              text="Explore Public Servers [NYI]"
              className="sb-tt"
              el={el}
            />
          )}
        </div>
      );
    default:
      return null;
  }
};

export default ServerBarBtn;
