import React, { useRef, useEffect } from "react";

const FriendMenu = ({
  openModal,
  toggleMenu,
  el,
  id,
  convos,
  closeModal,
  createConversation,
  push,
  prof,
  isFriend,
  isBlocked,
  unblock,
}) => {
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

  const handleModal = (name) => () => openModal({ name, id });

  const handleMessage = () => {
    const c = convos[id];
    closeModal();
    if (c) {
      push(`/@me/${c}`);
    } else {
      const convo = { other_id: id };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return push(`/@me/${cv.id}`);
      });
    }
  };

  let style;

  if (el && el.current) {
    const { top, height } = el.current.getBoundingClientRect();
    style = prof
      ? {
          top: `60px`,
          right: `-155px`,
        }
      : {
          top: `${top + height / 2}px`,
        };
  }

  return (
    <div className="friend-menu" style={style} ref={menu}>
      {prof ? (
        <>
          {isFriend && (
            <button
              type="button"
              onClick={handleModal("unfriend")}
              className="msg-delete"
            >
              Remove Friend
            </button>
          )}
          {isBlocked ? (
            <button type="button" onClick={unblock(id)} className="msg-delete">
              Unblock
            </button>
          ) : (
            <button
              type="button"
              onClick={handleModal("block")}
              className="msg-delete"
            >
              Block
            </button>
          )}
          <button type="button" onClick={handleMessage}>
            Message
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={handleModal("unfriend")}
          className="msg-delete"
        >
          Remove Friend
        </button>
      )}
    </div>
  );
};

export default FriendMenu;
