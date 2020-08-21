import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { initials } from "../../../util/format_util";

const ServerSettings = ({ server, openModal, updateServer, closeSettings }) => {
  const initialIcon = { url: server.icon || "", file: null };

  const input = useRef(null);

  const [name, setName] = useState(server.name);
  const [icon, setIcon] = useState(initialIcon);
  const [iconChange, setIconChange] = useState(false);

  const handleChange = (e) => setName(e.target.value);

  const [error, setError] = useState(false);

  const clearError = () => setError(false);

  const handleReset = () => {
    setIcon(initialIcon);
    setIconChange(false);
    input.current.value = "";
  };

  const reset = () => {
    setName(server.name);
    handleReset();
    clearError();
  };

  const handleIcon = (e) => {
    const reader = new FileReader();
    const [file] = e.currentTarget.files;
    reader.onloadend = () => setIcon({ url: reader.result, file });

    if (file) {
      setIconChange(true);
      reader.readAsDataURL(file);
    } else {
      handleReset();
    }
  };

  const { id } = server;

  const handleUpdate = (e) => {
    e.preventDefault();
    clearError();
    if (name.length) {
      const formData = new FormData();
      if (name !== server.name) formData.append("server[name]", name);
      if (iconChange) formData.append("server[icon]", icon.file);
      return updateServer(id, formData).then(() => {
        if (iconChange) setIconChange(false);
      });
    }
    return setError(true);
  };

  const handleClick = () => input.current.click();

  return (
    <div className="settings">
      <section className="settings-sidebar">
        <nav>
          <h5 className="server-name">{name.length ? name.toUpperCase() : "SERVER SETTINGS"}</h5>
          <ul>
            <button type="button" className="active">
              Overview
            </button>
            <div className="divider" />
            <button
              type="button"
              className="logout"
              onClick={openModal({ name: "delete", id })}
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
          <label htmlFor="edit-server-icon" className="server-icon-label">
            <div className="img-upload">
              <FontAwesomeIcon icon={["far", "file-image"]} size="lg" />
            </div>
            {iconChange || server.icon ? (
              <img src={icon.url} className="server-icon-preview" alt="" />
            ) : (
              <div className="s-icon">
                <h3>{initials(name)}</h3>
              </div>
            )}
            <input
              type="file"
              id="edit-server-icon"
              onChange={handleIcon}
              accept=".jpg,.jpeg,.png,.gif"
              ref={input}
            />
            {iconChange || server.icon ? (
              <button
                type="button"
                onClick={handleReset}
                className="reset-server-icon"
              >
                Remove
              </button>
            ) : (
              <figcaption>
                Minimum Size: <strong>128x128</strong>
              </figcaption>
            )}
          </label>
          <div className="recommend">
            <p>We recommend an image of at least 512x512 for the server.</p>
            <button
              type="button"
              className="upload-extra"
              onClick={handleClick}
            >
              Upload Image
            </button>
          </div>
          <div className="inputs">
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
        {(name !== server.name || iconChange) && (
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
