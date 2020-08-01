import React, { memo } from "react";

const AvatarWithStatus = ({ avatar, online, sidebar, u, m }) => {
  let className = "status-bg";

  if (sidebar) {
    className = "status-bg sidebar";
  } else if (u) {
    className = "status-bg u";
  } else if (m) {
    className = "status-bg m";
  }

  return (
    <div className="avatar-with-status">
      <img src={avatar} alt="" className="avatar" />
      <div className={className}>
        {online ? (
          <div className="online" />
        ) : (
          <div className="offline">
            <div className="inner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AvatarWithStatus);
