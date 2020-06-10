import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../ui/tooltip";

const ChannelListItem = ({
  channel,
  openModal,
  openSettings,
  isOwner,
  isActive,
}) => {
  const [tooltips, setTooltips] = useState({ invite: false, edit: false });
  const [maxLength, setMaxLength] = useState(22);

  const showTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: true });
  const hideTooltip = (type) => () =>
    setTooltips({ ...tooltips, [type]: false });

  const hoverLength = () => setMaxLength(18);
  const normalLength = () => setMaxLength(22);

  const { invite, edit } = tooltips;

  const formatName = (name) => {
    if (name.length < 18) return name;
    if (isActive) return `${name.slice(0, 18)}...`;
    return `${name.slice(0, maxLength)}...`;
  };

  return (
    <button
      type="button"
      onMouseOver={hoverLength}
      onFocus={hoverLength}
      onMouseOut={normalLength}
      onBlur={normalLength}
    >
      <div>
        <FontAwesomeIcon icon="hashtag" size="lg" className="hashtag" />
        <h3>{formatName(channel.name)}</h3>
      </div>
      <div className="icon-grp">
        {invite && <Tooltip text="Create Invite" className="cl-tt i inv" />}
        <FontAwesomeIcon
          icon="user-plus"
          onClick={() => openModal("invite")}
          onMouseOver={showTooltip("invite")}
          onFocus={showTooltip("invite")}
          onMouseOut={hideTooltip("invite")}
          onBlur={hideTooltip("invite")}
        />

        {isOwner && (
          <div>
            {edit && <Tooltip text="Edit Channel" className="cl-tt i" />}
            <FontAwesomeIcon
              icon="cog"
              onClick={() => openSettings("channel")}
              onMouseOver={showTooltip("edit")}
              onFocus={showTooltip("edit")}
              onMouseOut={hideTooltip("edit")}
              onBlur={hideTooltip("edit")}
            />
          </div>
        )}
      </div>
    </button>
  );
};

export default ChannelListItem;