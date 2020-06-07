import React from "react";

const ServerLeaveDelete = ({
  server,
  leaveServer,
  closeModal,
  deleteServer,
  action,
}) => {
  const handleLeave = () =>
    leaveServer({
      subscribeable_type: "Server",
      subscribeable_id: server.id,
    });

  const handleDelete = () => deleteServer(server.id);

  const leaveWarning = (
    <h2>
      Are you sure you want to leave <strong>{server.name}</strong>? You won't
      be able to rejoin this server unless you are re-invited.
    </h2>
  );

  const deleteWarning = (
    <h2>
      Are you sure you want to delete <strong>{server.name}</strong>? This
      action cannot be undone.
    </h2>
  );

  return (
    <div className="leave-server">
      <header>
        <h1>
          {action === "leave"
            ? `LEAVE '${server.name.toUpperCase()}'`
            : `DELETE '${server.name.toUpperCase()}'`}
        </h1>
        {action === "leave" ? leaveWarning : deleteWarning}
      </header>
      <footer>
        <button type="button" onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button
          type="button"
          onClick={action === "leave" ? handleLeave : handleDelete}
          className="leave"
        >
          {action === "leave" ? "Leave Server" : "Delete Server"}
        </button>
      </footer>
    </div>
  );
};

export default ServerLeaveDelete;
