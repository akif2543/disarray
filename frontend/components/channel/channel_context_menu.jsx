import React from "react";
import { connect } from "react-redux";

import { openModal, openSettings } from "../../actions/ui_actions";
import { getCurrentChannel, restricted } from "../../reducers/selectors";
import { markChannelRead } from "../../actions/channel_actions";

const ChannelContextMenu = ({
  isOwner,
  id,
  modal,
  settings,
  s,
  channel,
  read,
  notAllowed,
}) => {
  const { hasUnreads } = channel;

  const handleRead = () => read(id);

  const handleModal = (name) => () => modal({ name, id: s });

  const handleSettings = () => settings({ name: "channel", id });

  return (
    <>
      <button
        type="button"
        onClick={handleRead}
        className={hasUnreads ? "" : "no-unreads"}
        disabled={!hasUnreads}
      >
        Mark As Read
      </button>
      <div className="menu-divider" />
      {isOwner && (
        <>
          <button
            type="button"
            onClick={notAllowed ? null : handleSettings}
            className={notAllowed ? "disabled" : ""}
            disabled={notAllowed}
          >
            Edit Channel
          </button>
          <div className="menu-divider" />
        </>
      )}
      <button type="button" className="blue" onClick={handleModal("invite")}>
        Invite People
      </button>
      {isOwner && (
        <>
          <div className="menu-divider" />
          <button type="button" onClick={handleModal("add channel")}>
            Create Text Channel
          </button>
          <div className="menu-divider" />
          <button
            type="button"
            className={notAllowed ? "red disabled" : "red"}
            onClick={
              notAllowed ? null : () => modal({ name: "delete channel", id })
            }
            disabled={notAllowed}
          >
            Delete Channel
          </button>
        </>
      )}
    </>
  );
};

const mSTP = (state, ownProps) => ({
  channel: getCurrentChannel(state, ownProps),
  server: state.entities.servers[ownProps.s],
  notAllowed: restricted(state, ownProps),
});

const mDTP = (dispatch) => ({
  modal: (m) => dispatch(openModal(m)),
  settings: (s) => dispatch(openSettings(s)),
  read: (c) => dispatch(markChannelRead(c)),
});

const ChannelContextMenuContainer = connect(mSTP, mDTP)(ChannelContextMenu);

export default ChannelContextMenuContainer;
