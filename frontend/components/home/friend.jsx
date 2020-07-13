import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../ui/tooltip";

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
  push,
}) => {
  const mesEl = useRef(null);
  const morEl = useRef(null);
  const accEl = useRef(null);
  const igEl = useRef(null);

  const [disc, setDisc] = useState(false);
  const [tooltips, setTooltips] = useState({
    message: false,
    more: false,
    accept: false,
    ignore: false,
  });

  const showDisc = () => setDisc(true);
  const hideDisc = () => setDisc(false);

  const showTooltip = (t) => () => setTooltips({ ...tooltips, [t]: true });
  const hideTooltip = (t) => () => setTooltips({ ...tooltips, [t]: false });

  const findConversation = () =>
    f.conversations.find((id) => u.conversations.includes(id));

  const handleMessage = () => {
    const c = findConversation();

    if (c > 0) {
      push(`/@me/${c}`);
    } else {
      const convo = { user1_id: u.id, user2_id: f.id };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return push(`/@me/${cv.id}`);
      });
    }
  };

  const { message, more, accept, ignore } = tooltips;

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
            <button
              type="button"
              onFocus={showTooltip("message")}
              onMouseEnter={showTooltip("message")}
              onMouseLeave={hideTooltip("message")}
              onBlur={hideTooltip("message")}
              onClick={handleMessage}
              ref={mesEl}
            >
              <FontAwesomeIcon icon="comment-alt" className="dm-icon" />
            </button>
            {message && (
              <Tooltip text="Message" className="fl-tt msg" el={mesEl} />
            )}
            <button
              type="button"
              onFocus={showTooltip("more")}
              onMouseEnter={showTooltip("more")}
              onMouseLeave={hideTooltip("more")}
              onBlur={hideTooltip("more")}
              ref={morEl}
            >
              <FontAwesomeIcon icon="ellipsis-v" />
            </button>
            {more && <Tooltip text="More" className="fl-tt more" el={morEl} />}
          </div>
        )}
        {pending && (
          <div className={disc ? "actions hover" : "actions"}>
            {incoming && (
              <button
                type="button"
                onFocus={showTooltip("accept")}
                onMouseEnter={showTooltip("accept")}
                onMouseLeave={hideTooltip("accept")}
                onBlur={hideTooltip("accept")}
                ref={accEl}
              >
                <FontAwesomeIcon icon="check" />
              </button>
            )}
            {accept && <Tooltip text="Accept" className="fl-tt" el={accEl} />}
            <button
              type="button"
              onFocus={showTooltip("ignore")}
              onMouseEnter={showTooltip("ignore")}
              onMouseLeave={hideTooltip("ignore")}
              onBlur={hideTooltip("ignore")}
              ref={igEl}
            >
              <FontAwesomeIcon icon="ellipsis-v" />
            </button>
            {ignore && <Tooltip text="Ignore" className="fl-tt" el={igEl} />}
          </div>
        )}
        {blocked && <div className={disc ? "actions hover" : "actions"} />}
      </div>
    </li>
  );
};

export default Friend;
