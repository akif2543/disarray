import React, { memo } from "react";

const AvatarWithStatus = ({
  avatar,
  online,
  sidebar,
  u,
  m,
  prof,
  id,
  modal,
}) => {
  const handleClick = () => modal({ name: "profile", id });

  let className = "badge-bg";

  if (sidebar) {
    className = "badge-bg sidebar";
  } else if (u) {
    className = "badge-bg u";
  } else if (m) {
    className = "badge-bg m";
  } else if (prof) {
    className = "badge-bg prof";
  }

  return (
    <div className="avatar-with-status">
      <img src={avatar} alt="" className="avatar" />
      {m && (
        <button type="button" className="hover-cover" onClick={handleClick} />
      )}
      <div className={className}>
        {online ? (
          <div className="notification online" />
        ) : (
          <div className="notification offline">
            <div className="inner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AvatarWithStatus);
