import React, { useRef, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AvatarWithStatus from "../user/avatar_with_status";
import GroupDMIcon from "./group_dm_icon";
import ContextMenu from "../ui/context_menu";

const ConversationListItem = ({ convo, currentUser, close }) => {
  const el = useRef(null);
  const xEl = useRef(null);
  const { push } = useHistory();

  const [context, setContext] = useState(false);
  const [userClick, setUserClick] = useState([]);
  const [icon, setIcon] = useState({ url: convo.icon, file: null });

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

  const { members, group, unreads, id, name, owner } = convo;

  const handleClick = (e) => {
    if (xEl.current.contains(e.target)) {
      e.preventDefault();
      close(id, push);
    }
  };

  const { url } = icon;

  const convoMembers = members
    .filter((user) => user !== undefined && user.id !== currentUser.id)
    .map((u) => u.username)
    .join(", ");
  const m = members.find((u) => u !== undefined && u.id !== currentUser.id);

  return (
    <>
      <NavLink to={`/@me/${id}`} onClick={handleClick}>
        <button
          type="button"
          className={unreads ? "convo-li unread" : "convo-li"}
          ref={el}
        >
          {group &&
            (url ? (
              <img src={url || m.avatar} alt="" className="avatar" />
            ) : (
              <GroupDMIcon id={id} sidebar />
            ))}
          {!group && (
            <AvatarWithStatus avatar={m.avatar} online={m.online} sidebar />
          )}
          <div className="convo-info">
            <h2>{name || convoMembers}</h2>
            {group && (
              <h3>{`${members.length} ${
                members.length === 1 ? "member" : "members"
              }`}</h3>
            )}
          </div>
          <div className="close-dm" ref={xEl}>
            <FontAwesomeIcon icon="times" size="lg" />
          </div>
        </button>
      </NavLink>
      {group && context && (
        <ContextMenu
          type="convo"
          coords={userClick}
          toggleContext={toggleContext}
          isOwner={owner === currentUser.id}
          setIcon={setIcon}
          id={id}
        />
      )}
      {!group && context && (
        <ContextMenu
          type="user"
          coords={userClick}
          toggleContext={toggleContext}
          id={m.id}
          dm={id}
        />
      )}
    </>
  );
};

export default ConversationListItem;
