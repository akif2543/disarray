import React, { useState } from "react";

import AvatarWithStatus from "../user/avatar_with_status";
import GroupDMIcon from "./group_dm_icon";

const ConversationListItem = ({ convo, isActive, currentUser }) => {
  const [maxLength, setMaxLength] = useState(19);

  const hoverLength = () => setMaxLength(17);
  const normalLength = () => setMaxLength(19);

  const trimName = (name) => {
    const trimmed = name.trim();
    const last = trimmed.length - 1;
    return trimmed[last] === "," ? trimmed.slice(0, last) : trimmed;
  };

  const formatName = (name) => (name.length <= maxLength) ? name : `${trimName(name.slice(0, maxLength))}...`;

  const { members, group, unreads, id, icon, name } = convo;

  const convoMembers = members
    .filter((user) => user !== undefined && user.id !== currentUser.id)
    .map((u) => u.username)
    .join(", ");
  const m = members.find((u) => u !== undefined && u.id !== currentUser.id);

  return (
    <button
      type="button"
      className={unreads ? "convo-li unread" : "convo-li"}
      onMouseOver={hoverLength}
      onFocus={hoverLength}
      onMouseOut={normalLength}
      onBlur={normalLength}
    >
      {group &&
        (icon ? (
          <img src={icon || m.avatar} alt="" className="avatar" />
        ) : (
          <GroupDMIcon id={id} sidebar />
        ))}
      {!group && (
        <AvatarWithStatus avatar={m.avatar} online={m.online} sidebar />
      )}
      <div className="convo-info">
        <h2>{formatName(name || convoMembers)}</h2>
        {group && (
          <h3>{`${members.length} ${
            members.length === 1 ? "member" : "members"
          }`}</h3>
        )}
      </div>
    </button>
  );
};

export default ConversationListItem;
