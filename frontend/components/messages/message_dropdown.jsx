import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MessageDropdown = ({
  isAuthor,
  toggleDropdown,
  el,
  toggleEdit,
  history,
  id,
  openModal,
}) => {
  const node = useRef(null);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) return;
    toggleDropdown();
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") toggleDropdown();
  };

  const handleEdit = () => {
    toggleEdit();
    toggleDropdown();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    document.addEventListener("keydown", handleEsc, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  let style;

  if (el && el.current) {
    const { top, bottom } = el.current.getBoundingClientRect();
    const below = window.innerHeight - bottom;
    style = top > below ? { bottom: `${16}px` } : { top: `${-16}px` };
  }

  const handleDelete = () => {
    const {
      push,
      location: { pathname },
    } = history;
    push(`${pathname}?m=${id}`);
    openModal("messageDelete");
  };

  return (
    <div className="msg-dropdown" ref={node} style={style}>
      {isAuthor && (
        <button type="button" onClick={handleEdit}>
          Edit Message
          <FontAwesomeIcon icon="pen" />
        </button>
      )}
      <button type="button">
        Pin Message
        <FontAwesomeIcon icon="thumbtack" transform={{ rotate: 45 }} />
      </button>
      {isAuthor && (
        <button type="button" className="msg-delete" onClick={handleDelete}>
          Delete Message
          <FontAwesomeIcon icon="trash-alt" />
        </button>
      )}
    </div>
  );
};

export default MessageDropdown;
