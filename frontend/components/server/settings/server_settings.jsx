import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServerSettings = ({ server, openModal, updateServer, closeSettings }) => {
  const [name, setName] = useState(server.name);
  const handleChange = (e) => setName(e.target.value);

  const [error, setError] = useState(false);

  const clearError = () => setError(false);

  const reset = () => {
    setName(server.name);
    clearError();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    clearError();
    if (name.length) return updateServer({ id: server.id, name });
    return setError(true);
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("");

  return (
    <div className="settings">
      <section className="settings-sidebar">
        <nav>
          <h5>{name.length ? name.toUpperCase() : "SERVER SETTINGS"}</h5>
          <ul>
            <button type="button" className="active">
              Overview
            </button>
            <div className="divider" />
            <button
              type="button"
              className="logout"
              onClick={() => openModal("delete")}
            >
              Delete Server
            </button>
          </ul>
        </nav>
      </section>
      <main>
        <header className="server-head">
          <h2>SERVER OVERVIEW</h2>
          <div>
            <button type="button" onClick={closeSettings}>
              <FontAwesomeIcon icon={["far", "times-circle"]} size="2x" />
            </button>
            <h4>ESC</h4>
          </div>
        </header>
        <form className="edit-server-form" onSubmit={handleUpdate}>
          <figure>
            <div className="s-icon">
              <h3>{getInitials(name)}</h3>
            </div>
            <figcaption>
              Minimum Size: <strong>128x128</strong>
            </figcaption>
          </figure>
          <div className="info">
            <div className="username">
              <h2>SERVER NAME</h2>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={name}
                  onChange={handleChange}
                  className={error ? "presence-err" : ""}
                />
                {error && (
                  <span className="presence-err">This field is required</span>
                )}
              </div>
            </div>
          </div>
        </form>
        {name !== server.name && (
          <div className="unsaved-warning">
            <h3>Careful — you have unsaved changes!</h3>
            <div className="btn-group">
              <button className="cancel" type="button" onClick={reset}>
                Reset
              </button>
              <button className="save" type="submit" onClick={handleUpdate}>
                Save Changes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ServerSettings;
