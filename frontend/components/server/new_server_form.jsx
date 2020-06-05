import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewServerForm = ({ name, handleChange, handleCreate, handleBack }) => {
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
          SERVER NAME
          <input type="text" value={name} onChange={handleChange("name")} />
          <p>
            By creating a server, you agree to Disarray's{" "}
            <a href="#">Community Guidelines</a>.
          </p>
        </label>
        <figure>
          <div className="s-icon"></div>
          <figcaption>
            Minimum Size: <strong>128x128</strong>
          </figcaption>
        </figure>
      </section>
      <footer>
        <h4 onClick={handleBack("create")}>
          <FontAwesomeIcon icon="arrow-left" /> Back
        </h4>
        <button type="submit">Create</button>
      </footer>
    </form>
  );
};

export default NewServerForm;
