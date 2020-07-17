import React, { useState } from "react";

const ConversationListItem = ({ convo, isActive, currentUser }) => {
  const [maxLength, setMaxLength] = useState(22);

  const hoverLength = () => setMaxLength(18);
  const normalLength = () => setMaxLength(22);

  const trimName = (name) => {
    const trimmed = name.trim();
    const last = trimmed.length - 1;
    return trimmed[last] === "," ? trimmed.slice(0, last) : trimmed;
  };

  const formatName = (name) => {
    if (name.length < 18) return name;
    if (isActive) return `${trimName(name.slice(0, 18))}...`;
    return name.length > 22 ? `${trimName(name.slice(0, maxLength))}...` : name;
  };

  const { members, group } = convo;

  const convoMembers = members
    .filter((user) => user.id !== currentUser.id)
    .map((u) => u.username)
    .join(", ");
  const m = members.find((u) => u.id !== currentUser.id);

  return (
    <button
      type="button"
      className="convo-li"
      onMouseOver={hoverLength}
      onFocus={hoverLength}
      onMouseOut={normalLength}
      onBlur={normalLength}
    >
      <img src={m.avatar} alt="" />
      <div className="convo-info">
        <h2>{formatName(convo.name || convoMembers)}</h2>
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
