import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Friend = ({
  f,
  u,
  createConversation,
  openModal,
  all,
  pending,
  incoming,
  outgoing,
  blocked,
}) => {
  const [disc, setDisc] = useState(false);

  const showDisc = () => setDisc(true);
  const hideDisc = () => setDisc(false);

  return (
    <li
      className="item"
      onFocus={showDisc}
      onMouseEnter={showDisc}
      onMouseLeave={hideDisc}
      onBlur={hideDisc}
    >
      <div className="friend">
        <div className="user">
          <img src={f.avatar} alt="" />
          <div className="user-info">
            <div className="identifier">
              <h2 className="name">{f.username}</h2>
              <span className={disc ? "show" : "hide"}>#{f.discriminator}</span>
            </div>
            {all && <h3 className="sub">Status</h3>}
            {incoming && <h3 className="sub">Incoming Friend Request</h3>}
            {outgoing && <h3 className="sub">Outgoing Friend Request</h3>}
            {blocked && <h3 className="sub">Blocked</h3>}
          </div>
        </div>
        {all && (
          <div className={disc ? "actions hover" : "actions"}>
            <button type="button">
              <FontAwesomeIcon icon="comment-alt" className="dm-icon" />
            </button>
            <button type="button">
              <FontAwesomeIcon icon="ellipsis-v" />
            </button>
          </div>
        )}
        {pending && (
          <div className={disc ? "actions hover" : "actions"}>
            {incoming && (
              <button type="button">
                <FontAwesomeIcon icon="check" />
              </button>
            )}
            <button type="button">
              <FontAwesomeIcon icon="ellipsis-v" />
            </button>
          </div>
        )}
        {blocked && <div className={disc ? "actions hover" : "actions"} />}
      </div>
    </li>
  );
};

export default Friend;
