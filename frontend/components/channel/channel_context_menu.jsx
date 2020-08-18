import React from "react";
import { connect } from "react-redux";

import { openModal, openSettings } from "../../actions/ui_actions";
import { canAct, getCurrentChannel } from "../../reducers/selectors";
import { markChannelRead } from "../../actions/channel_actions";

const ChannelContextMenu = ({
  isOwner,
  id,
  oModal,
  oSettings,
  s,
  channel,
  read,
  canAct,
}) => {
  const { hasUnreads } = channel;

  const handleRead = () => read(id);

  const handleModal = (name) => () => oModal({ name, id: s });

  const handleSettings = () => oSettings({ name: "channel", id });

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
            onClick={canAct ? handleSettings : null}
            className={canAct ? "" : "disabled"}
            disabled={!canAct}
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
            className={canAct ? "red" : "red disabled"}
            onClick={
              canAct ? () => oModal({ name: "delete channel", id }) : null
            }
            disabled={!canAct}
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
  canAct: canAct(state, ownProps),
});

const mDTP = (dispatch) => ({
  oModal: (modal) => dispatch(openModal(modal)),
  oSettings: (settings) => dispatch(openSettings(settings)),
  read: (c) => dispatch(markChannelRead(c)),
});

const ChannelContextMenuContainer = connect(mSTP, mDTP)(ChannelContextMenu);

export default ChannelContextMenuContainer;
