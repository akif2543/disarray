import React, { useRef, useEffect } from "react";

import UserContextMenuContainer from "../user/user_context_menu";
import MessageContextMenuContainer from "../messages/message_context_menu";

const ContextMenu = ({
  toggleContext,
  type,
  coords,
  id,
  s,
  isAuthor,
  toggleEdit,
}) => {
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
      component = <UserContextMenuContainer id={id} s={s} />;
      break;
    case "message":
      component = (
        <MessageContextMenuContainer
          id={id}
          isAuthor={isAuthor}
          toggleEdit={toggleEdit}
          toggleContext={toggleContext}
        />
      );
      break;
    default:
      break;
  }

  let style;

  if (coords.length) {
    const [x, y] = coords;

    const below = window.innerHeight - y;
    const right = window.innerWidth - x;
    const horizontal = { left: right && right > x ? x : x - 188 };
    const vertical = below && below < y ? { bottom: below } : { top: y };

    style = { ...horizontal, ...vertical };
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
