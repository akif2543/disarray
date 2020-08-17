import React, { useState, useRef, memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserPopoutContainer from "../user/user_popout";
import AvatarWithStatus from "../user/avatar_with_status";
import ContextMenu from "../ui/context_menu";

const areEqual = (prevProps, nextProps) => {
  if (
    prevProps.m.username !== nextProps.m.username ||
    prevProps.m.avatar !== nextProps.m.avatar ||
    prevProps.m.online !== nextProps.m.online
  )
    return false;
  if (
    prevProps.s &&
    prevProps.m.servers[prevProps.s.id] !== nextProps.m.servers[prevProps.s.id]
  )
    return false;
  return prevProps.owner === nextProps.owner;
};

const Member = ({ m, owner, s }) => {
  const el = useRef(null);

  const [popout, setPopout] = useState(false);
  const [context, setContext] = useState(false);
  const [userClick, setUserClick] = useState([]);

  const togglePopout = () => setPopout(!popout);
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

  return (
    <>
      <button
        type="button"
        className={m.online ? "member" : "member offline"}
        onClick={togglePopout}
        ref={el}
      >
        {m.online ? (
          <AvatarWithStatus avatar={m.avatar} online={m.online} sidebar />
        ) : (
          <img src={m.avatar} alt="" className="avatar" />
        )}
        <h2>{s ? m.servers[s] || m.username : m.username}</h2>
        {owner === m.id && <FontAwesomeIcon icon="crown" size="sm" />}
      </button>
      {context && (
        <ContextMenu
          type="user"
          dir="left"
          coords={userClick}
          toggleContext={toggleContext}
          id={m.id}
          s={Boolean(s)}
        />
      )}
      {popout && (
        <UserPopoutContainer m={m} togglePopout={togglePopout} el={el} />
      )}
    </>
  );
};

export default memo(Member, areEqual);
