import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../ui/tooltip";

const ChannelSettings = ({
  channel,
  isPrimary,
  updateChannel,
  openModal,
  closeSettings,
}) => {
  const el = useRef(null);

  const t = channel.topic === null ? "" : channel.topic;
  const [name, setName] = useState(channel.name);
  const [topic, setTopic] = useState(t);
  const [error, setError] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);

  const clearError = () => setError(false);

  const formatName = (input) => input.replace(" ", "-").toLowerCase();

  const viewName = (input) =>
    input.length < 21
      ? input.toUpperCase()
      : input.slice(0, 20).toUpperCase().concat("...");

  const viewSub = () => {
    const sub = "TEXT CHANNELS";
    if (name.length < 12) return sub;
    if (name.length > 19) return "";
    return sub.slice(0, name.length - 18).concat("...");
  };

  const handleNameChange = (e) => setName(formatName(e.target.value));
  const handleTopicChange = (e) => setTopic(e.target.value);
  const reset = () => {
    setName(channel.name);
    setTopic(t);
    clearError();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    clearError();
    if (name.length) return updateChannel({ ...channel, name, topic });
    return setError(true);
  };

  return (
    <>
      <section className="settings-sidebar">
        <nav>
          <header className="channel-sidebar-head">
            <FontAwesomeIcon icon="hashtag" size="xs" />
            <h5>{viewName(name)}</h5>
            <h6>{viewSub()}</h6>
          </header>
          <ul>
            <button type="button" className="active">
              Overview
            </button>
            <div className="divider" />
            <button
              type="button"
              className={isPrimary ? "logout disabled" : "logout"}
              onClick={isPrimary ? null : () => openModal("delete channel")}
              onMouseEnter={showTooltip}
              onFocus={showTooltip}
              onMouseLeave={hideTooltip}
              onBlur={hideTooltip}
              ref={el}
            >
              Delete Channel
            </button>
            {isPrimary && tooltip && (
              <Tooltip
                text="Cannot delete primary channel"
                className="dc-tt"
                el={el}
              />
            )}
          </ul>
        </nav>
      </section>
      <main>
        <header className="server-head">
          <h2>OVERVIEW</h2>
          <div>
            <button type="button" onClick={closeSettings}>
              <FontAwesomeIcon icon={["far", "times-circle"]} size="2x" />
            </button>
            <h4>ESC</h4>
          </div>
        </header>
        <form className="edit-server-form channel" onSubmit={handleUpdate}>
          <div className="inputs channel">
            <div className="username channel-info">
              <label htmlFor="set-name">
                <h2>CHANNEL NAME</h2>
                <div className="input-wrapper">
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    id="set-name"
                    className={error ? "presence-err" : ""}
                  />
                  {error && (
                    <span className="presence-err">This field is required</span>
                  )}
                </div>
              </label>
              <label htmlFor="set-topic">
                <h2>CHANNEL TOPIC</h2>
                <div className="input-wrapper">
                  <textarea
                    maxLength="1024"
                    value={topic}
                    onChange={handleTopicChange}
                    id="set-topic"
                    placeholder="No topic set."
                  />
                </div>
              </label>
            </div>
          </div>
        </form>
        {(name !== channel.name || topic !== t) && (
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
    </>
  );
};

export default ChannelSettings;
