import React from "react";

import ServerInvite from "./server_invite";
import ServerLeaveDelete from "./server_leave_delete";

const ServerActions = ({
  server,
  leaveServer,
  closeModal,
  action,
  deleteServer,
}) => {
  let component;

  switch (action) {
    case "invite":
      component = <ServerInvite server={server} closeModal={closeModal} />;
      break;
    case "leave":
      component = (
        <ServerLeaveDelete
          server={server}
          closeModal={closeModal}
          leaveServer={leaveServer}
          action={action}
        />
      );
      break;
    case "delete":
      component = (
        <ServerLeaveDelete
          server={server}
          closeModal={closeModal}
          deleteServer={deleteServer}
          action={action}
        />
      );
      break;
    default:
      break;
  }

  return <div>{component}</div>;
};

export default ServerActions;
