import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JoinServerForm = ({
  joinCode,
  handleChange,
  handleJoin,
  handleBack,
  errors,
  error,
  clearErrors,
  clearServerErrors,
  clearCode,
}) => {
  useEffect(
    () => () => {
      clearErrors();
      clearServerErrors();
      clearCode();
    },
    []
  );

  const joinError = error || errors.length;

  return (
    <form onSubmit={handleJoin} className="new-server join">
      <header>
        <h1>JOIN A SERVER</h1>
        <h2>
          Enter an invite below to join an existing server. The invite will look
          something like these:
        </h2>
        <p>hTKzmak</p>
        <p>https://disarray-chat.herokuapp.com/hTKzmak</p>
        <p> https://disarray-chat.herokuapp.com/cool-people</p>
      </header>

      <label htmlFor="server-code">
        <input
          type="text"
          value={joinCode}
          onChange={handleChange("joinCode")}
          id="server-code"
          autoComplete="off"
        />
        <span>
          Enter an invite
          {Boolean(joinError) && (
            <span className="err-msg">
              {"  "}
              (The invite is invalid or has expired.)
            </span>
          )}
        </span>
      </label>

      <section>
        <p>Looking for more servers to join?</p>
        <a href="#">Explore Disarray's thriving server community</a>
      </section>

      <footer>
        <button className="back" type="button" onClick={handleBack("join")}>
          <h4>
            <FontAwesomeIcon icon="arrow-left" />
            <span>{"  "}</span>
            BACK
          </h4>
        </button>
        <button type="submit" className="server-join">
          Join
        </button>
      </footer>
    </form>
  );
};

export default JoinServerForm;
