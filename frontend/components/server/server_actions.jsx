import React from "react";

import ServerInvite from "./server_invite";
import LeaveServer from "./leave_server";

const ServerActions = ({ server, leaveServer, closeModal, action }) => {
  let component;

  switch (action) {
    case "invite":
      component = <ServerInvite server={server} closeModal={closeModal} />;
      break;
    case "leave":
      component = (
        <LeaveServer
          server={server}
          closeModal={closeModal}
          leaveServer={leaveServer}
        />
      );
      break;
    default:
      break;
  }

  return <div>{component}</div>;
};

export default ServerActions;
