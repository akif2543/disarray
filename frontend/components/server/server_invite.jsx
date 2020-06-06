import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerInvite = ({ server, closeModal }) => {
  let code;

  const handleCopy = () => {
    code.select();
    document.execCommand("copy");
  };

  return (
    <div className="server-inv">
      <header>
        <h1>
          INVITE FRIENDS TO
          {server.name.toUpperCase()}
        </h1>
        <button type="button" onClick={closeModal}>
          <FontAwesomeIcon icon="times" />
        </button>
      </header>
      <footer>
        <h4>SEND A SERVER INVITE LINK TO A FRIEND</h4>
        <div className="input-wrapper">
          <input
            type="text"
            value={server.joinCode}
            readOnly
            ref={(elem) => (code = elem)}
          />
          <button onClick={handleCopy} type="button">
            Copy
          </button>
        </div>
        <p>Your invite link does not currently expire.</p>
      </footer>
    </div>
  );
};

export default ServerInvite;
