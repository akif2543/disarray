import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerInvite = ({ server, closeModal }) => {
  let code;

  const [selected, setSelected] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wrapper, setWrapper] = useState("btn-wrapper active");

  const select = () => setSelected(true);
  const deselect = () => setSelected(false);
  const copy = () => {
    setCopied(true);
    setWrapper("btn-wrapper copied");
  };
  const revert = () => {
    setCopied(false);
    setWrapper("btn-wrapper active");
  };

  const handleCopy = () => {
    code.select();
    document.execCommand("copy");
    return copy();
  };

  useEffect(() => {
    if (copied) {
      setInterval(revert, 2000);
    }
  }, [copied]);

  return (
    <div className="server-inv">
      <header>
        <h1>
          INVITE FRIENDS TO
          {"  "}
          {server.name.toUpperCase()}
        </h1>
        <button type="button" onClick={closeModal}>
          <FontAwesomeIcon icon="times" size="lg" />
        </button>
      </header>
      <footer>
        <h5>SEND A SERVER INVITE LINK TO A FRIEND</h5>
        <div className="input-wrapper">
          <input
            type="text"
            value={server.joinCode}
            readOnly
            ref={(elem) => (code = elem)}
            onFocus={select}
            onBlur={deselect}
            onClick={() => code.select()}
            className={copied ? "copied" : ""}
          />
          <div className={selected ? wrapper : "btn-wrapper"}>
            <button onClick={handleCopy} type="button">
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <p>Your invite link does not currently expire.</p>
      </footer>
    </div>
  );
};

export default ServerInvite;
