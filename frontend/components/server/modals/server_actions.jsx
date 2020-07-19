import React from "react";

import ServerInvite from "./server_invite";
import ServerLeaveDelete from "./server_leave_delete";
import AddChannel from "../../channel/add_channel";
import EditServerNickName from "./edit_server_nickname";

const ServerActions = ({
  server,
  leaveServer,
  closeModal,
  closeSettings,
  action,
  deleteServer,
  createChannel,
  channel,
  deleteChannel,
  history,
  changeNickname,
  user,
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

    case "add channel":
      component = (
        <AddChannel
          serverId={server.id}
          closeModal={closeModal}
          createChannel={createChannel}
        />
      );
      break;
    case "delete channel":
      component = (
        <ServerLeaveDelete
          channel={channel}
          closeModal={closeModal}
          closeSettings={closeSettings}
          deleteChannel={deleteChannel}
          action={action}
          history={history}
        />
      );
      break;
    case "alias":
      component = (
        <EditServerNickName
          closeModal={closeModal}
          user={user}
          changeNickname={changeNickname}
          s={server.id}
        />
      );
    default:
      break;
  }

  return <div>{component}</div>;
};

export default ServerActions;
