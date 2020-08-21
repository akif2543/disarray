import React, { useEffect } from "react";

const ServerLeaveDelete = ({
  server,
  leaveServer,
  closeModal,
  deleteServer,
  closeSettings,
  channel,
  deleteChannel,
  action,
  history,
}) => {
  let header;
  let warning;
  let handler;
  let buttonText;

  const handleLeave = () =>
    leaveServer({
      subscribeable_type: "Server",
      subscribeable_id: server.id,
    })
      .then(closeModal())
      .then(history.push("/@me"));

  const handleDelete = () =>
    deleteServer(server.id)
      .then(closeSettings())
      .then(closeModal())
      .then(history.push("/@me"));

  const handleDeleteChannel = () =>
    deleteChannel(channel.id)
      .then(closeSettings())
      .then(closeModal())
      .then(history.push(`/channels/${server.id}/${server.channels[0]}`));

  const setOptions = () => {
    switch (action) {
      case "leave":
        header = `LEAVE '${server.name.toUpperCase()}'`;
        warning = server ? (
          <h2>
            Are you sure you want to leave <strong>{server.name}</strong>? You
            won't be able to rejoin this server unless you are re-invited.
          </h2>
        ) : null;
        handler = handleLeave;
        buttonText = "Leave Server";
        break;
      case "delete":
        header = `DELETE '${server.name.toUpperCase()}'`;
        warning = server ? (
          <h2>
            Are you sure you want to delete <strong>{server.name}</strong>? This
            action cannot be undone.
          </h2>
        ) : null;
        handler = handleDelete;
        buttonText = "Delete Server";
        break;
      case "delete channel":
        header = "DELETE CHANNEL";
        warning = channel ? (
          <h2>
            Are you sure you want to delete <strong>#{channel.name}</strong>?
            This action cannot be undone.
          </h2>
        ) : null;
        handler = handleDeleteChannel;
        buttonText = "Delete Channel";
        break;
      default:
        break;
    }
  };

  setOptions();

  return (
    <div className="leave-server">
      <header>
        <h1>{header}</h1>
        {warning}
      </header>
      <footer>
        <button type="button" onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button type="button" onClick={handler} className="leave">
          {buttonText}
        </button>
      </footer>
    </div>
  );
};

export default ServerLeaveDelete;
