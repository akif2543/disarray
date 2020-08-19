import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { closeModal } from "../../actions/ui_actions";
import { getConversationName } from "../../reducers/selectors";
import { leaveConversation } from "../../actions/conversation_actions";

const DMModal = ({ id, name, leave, close }) => {
  const { push } = useHistory();

  const handleClick = () =>
    leave(
      { subscribeable_type: "Conversation", subscribeable_id: id },
      push
    ).then(close());

  return (
    <div className="modal-confirm leave-dm">
      <header>
        <h1>LEAVE '{name.toUpperCase()}'</h1>
        <h2>
          Are you sure you want to leave <strong>{name}</strong>? You won&apos;t
          be able to rejoin this group unless you are re-invited.
        </h2>
      </header>
      <footer>
        <button type="button" onClick={close} className="cancel">
          Cancel
        </button>
        <button type="button" onClick={handleClick} className="leave">
          Leave Group
        </button>
      </footer>
    </div>
  );
};

const mSTP = (state, ownProps) => ({
  name: getConversationName(state, ownProps),
});

const mDTP = (dispatch) => ({
  leave: (m, push) => dispatch(leaveConversation(m, push)),
  close: () => dispatch(closeModal()),
});

const DMModalContainer = connect(mSTP, mDTP)(DMModal);

export default DMModalContainer;
