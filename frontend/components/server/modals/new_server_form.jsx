import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewServerForm = ({
  name,
  handleChange,
  handleCreate,
  handleBack,
  error,
  clearErrors,
}) => {
  useEffect(() => () => clearErrors(), []);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((w) => w[0])
      .join("");

  return (
    <form onSubmit={handleCreate} className="new-server">
      <header>
        <h1>CREATE YOUR SERVER</h1>
        <h2>
          By creating a server, you will have access to <strong>free</strong>{" "}
          voice and text chat to use amongst your friends.
        </h2>
      </header>
      <section className="input-group">
        <label htmlFor="server-name">
          <strong className={error ? "server-name-err" : ""}>
            SERVER NAME{" "}
            {error && (
              <span className="err-msg"> - This field is required</span>
            )}
          </strong>

          <input
            type="text"
            value={name}
            onChange={handleChange("name")}
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
        <figure>
          <div className="s-icon">
            <h3>{getInitials(name)}</h3>
          </div>
          <figcaption>
            Minimum Size: <strong>128x128</strong>
          </figcaption>
        </figure>
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
