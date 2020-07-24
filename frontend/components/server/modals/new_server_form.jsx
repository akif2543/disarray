import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewServerForm = ({ u, createServer, push, handleBack }) => {
  // useEffect(() => () => clearErrors(), []);
  const initialIcon = { url: "", file: null };
  const [name, setName] = useState(`${u.username}'s server`);
  const [icon, setIcon] = useState(initialIcon);
  const [error, setError] = useState(false);

  const handleClear = () => setError(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClear();
    if (name.length) {
      const formData = new FormData();
      formData.append("server[name]", name);
      if (icon.file) {
        formData.append("server[icon]", icon.file);
      }
      createServer(formData).then((action) => {
        const [s] = Object.values(action.server);
        // const [c] = s.channels;
        push(`/channels/${s.id}/${s.active}`);
      });
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => setName(e.target.value);

  const handleReset = () => setIcon(initialIcon);

  const handleIcon = (e) => {
    const reader = new FileReader();
    const [file] = e.currentTarget.files;
    reader.onloadend = () => setIcon({ url: reader.result, file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      handleReset();
    }
  };

  const getInitials = (str) =>
    str
      .split(" ")
      .map((w) => w[0])
      .join("");

  const { file, url } = icon;

  return (
    <form onSubmit={handleSubmit} className="new-server">
      <header>
        <h1>CREATE YOUR SERVER</h1>
        <h2>
          By creating a server, you will have access to <strong>free</strong>{" "}
          voice and text chat to use amongst your friends.
        </h2>
      </header>
      <section className="input-group">
        <label htmlFor="server-name" className="server-name-label">
          <strong className={error ? "server-name-err" : ""}>
            SERVER NAME{" "}
            {error && (
              <span className="err-msg"> - This field is required</span>
            )}
          </strong>

          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Enter a server name"
            id="server-name"
            autoComplete="off"
          />
          <p>
            By creating a server, you agree to Disarray's{" "}
            <span>
              <strong>Community Guidelines</strong>
            </span>
            .
          </p>
        </label>
        <label htmlFor="edit-server-icon" className="server-icon-label">
          {file ? (
            <img src={url} className="server-icon-preview" alt="" />
          ) : (
            <div className="s-icon">
              <h3>{getInitials(name)}</h3>
            </div>
          )}
          <input
            type="file"
            id="edit-server-icon"
            onChange={handleIcon}
            accept=".jpg,.jpeg,.png,.gif"
          />
          {file ? (
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
      </section>
      <footer>
        <button className="back" type="button" onClick={handleBack("create")}>
          <h4>
            <FontAwesomeIcon icon="arrow-left" />
            <span> </span>
            BACK
          </h4>
        </button>
        <button type="submit" className="server-create">
          Create
        </button>
      </footer>
    </form>
  );
};

export default NewServerForm;
