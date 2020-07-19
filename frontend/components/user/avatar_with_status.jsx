import React from "react";

const AvatarWithStatus = ({ avatar, status, sidebar }) => {
  // const getIndicator = () => {
  //   switch (status) {
  //     case "Online":
  //       return <div className="online" />;
  //     case "Offline":
  //       return (
  //         <div className="offline">
  //           <div className="inner" />
  //         </div>
  //       );
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className="avatar-with-status">
      <img src={avatar} alt="" className="avatar" />
      <div className={sidebar ? "status-bg sidebar" : "status-bg"}>
        {status === "Online" ? (
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

export default AvatarWithStatus;
