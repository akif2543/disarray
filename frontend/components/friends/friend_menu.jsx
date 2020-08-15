import React, { useRef, useEffect } from "react";

const FriendMenu = ({ openModal, toggleMenu, el, id, push }) => {
  const menu = useRef(null);

  const handleClick = (e) => {
    if (menu.current.contains(e.target)) return;
    toggleMenu();
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") toggleMenu();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    document.addEventListener("keydown", handleEsc, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  const handleRemove = () => {
    push(`/@me?u=${id}`);
    openModal("unfriend");
  };

  let style;

  if (el && el.current) {
    const { top, height } = el.current.getBoundingClientRect();
    style = {
      top: `${top + height / 2}px`,
    };
  }
  return (
    <div className="friend-menu" style={style} ref={menu}>
      <button type="button" onClick={handleRemove} className="msg-delete">
        Remove Friend
      </button>
    </div>
  );
};

export default FriendMenu;
