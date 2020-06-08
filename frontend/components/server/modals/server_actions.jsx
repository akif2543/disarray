import React from "react";

import ServerInvite from "./server_invite";
import ServerLeaveDelete from "./server_leave_delete";
import AddChannel from "../../channel/add_channel";

const ServerActions = ({
  server,
  leaveServer,
  closeModal,
  closeSettings,
  action,
  deleteServer,
  createChannel,
  history,
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
          closeSettings={closeSettings}
          leaveServer={leaveServer}
          action={action}
          history={history}
        />
      );
      break;
    case "delete":
      component = (
        <ServerLeaveDelete
          server={server}
          closeModal={closeModal}
          closeSettings={closeSettings}
          deleteServer={deleteServer}
          action={action}
          history={history}
        />
      );
      break;

    case "channel":
      component = (
        <AddChannel
          serverId={server.id}
          closeModal={closeModal}
          createChannel={createChannel}
        />
      );
      break;
    default:
      break;
  }

  return <div>{component}</div>;
};

export default ServerActions;
