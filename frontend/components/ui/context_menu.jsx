import React, { useRef, useEffect, useState } from "react";
import UserContextMenuContainer from "../user/user_context_menu";

const ContextMenu = ({ toggleContext, type, coords, id }) => {
  const el = useRef(null);

  const handleClick = (e) => {
    if (el.current.contains(e.target)) return;
    toggleContext();
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") toggleContext();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    document.addEventListener("keydown", handleEsc, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  let component;

  switch (type) {
    case "user":
      component = <UserContextMenuContainer id={id} />;
      break;
    default:
      break;
  }

  let style;

  if (coords) {
    const [x, y] = coords;

    const below = window.innerHeight - y;
    style =
      below && below < y ? { left: x, bottom: below } : { left: x, top: y };
  }

  return (
    <div className="dropdown-bg">
      <div className="context-menu" ref={el} style={style}>
        {component}
      </div>
    </div>
  );
};

export default ContextMenu;
