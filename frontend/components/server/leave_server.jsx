import React from "react";

const LeaveServer = ({ server, leaveServer, closeModal }) => {
  const handleLeave = () =>
    leaveServer({
      subscribeable_type: "Server",
      subscribeable_id: server.id,
    });

  return (
    <div className="leave-server">
      <header>
        <h1>LEAVE '{server.name.toUpperCase()}'</h1>
        <h2>
          Are you sure you want to leave <strong>{server.name}</strong>? You
          won't be able to rejoin this server unless you are re-invited.
        </h2>
      </header>
      <footer>
        <button type="button" onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button type="button" onClick={handleLeave} className="leave">
          Leave Server
        </button>
      </footer>
    </div>
  );
};

export default LeaveServer;
