import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tooltip from "../ui/tooltip";
import { channelName } from "../../util/format_util";

const ChannelSettings = ({
  channel,
  isPrimary,
  updateChannel,
  openModal,
  closeSettings,
  notAllowed,
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

  const handleNameChange = (e) => setName(channelName(e.target.value));
  const handleTopicChange = (e) => setTopic(e.target.value);
  const reset = () => {
    setName(channel.name);
    setTopic(t);
    clearError();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    clearError();
    if (name.length)
      return updateChannel({
        ...channel,
        name: name.replace(/-$/, ""),
        topic,
      });
    return setError(true);
  };

  const { id } = channel;

  return (
    <>
      <section className="settings-sidebar">
        <nav>
          <header className="channel-sidebar-head">
            <FontAwesomeIcon icon="hashtag" size="xs" />
            <div className="name-container">
              <h5 className="channel-name">{name}</h5>
            </div>
            <div className="sub-container">
              <h6 className="channel-subtitle">TEXT CHANNELS</h6>
            </div>
          </header>
          <ul>
            <button type="button" className="active">
              Overview
            </button>
            <div className="divider" />
            <button
              type="button"
              className={isPrimary || notAllowed ? "logout disabled" : "logout"}
              onClick={
                isPrimary || notAllowed
                  ? null
                  : openModal({ name: "delete channel", id })
              }
              onMouseEnter={showTooltip}
              onFocus={showTooltip}
              onMouseLeave={hideTooltip}
              onBlur={hideTooltip}
              ref={el}
              disabled={isPrimary || notAllowed}
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
                    placeholder="Let everyone know how to use this channel!"
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
