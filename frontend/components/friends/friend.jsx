import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../ui/tooltip";
import FriendMenu from "./friend_menu";
import AvatarWithStatus from "../user/avatar_with_status";
import ContextMenu from "../ui/context_menu";

const Friend = ({
  f,
  u,
  createConversation,
  respondToRequest,
  openModal,
  all,
  pending,
  incoming,
  outgoing,
  blocked,
  unblockUser,
  push,
}) => {
  const friendEl = useRef(null);
  const mesEl = useRef(null);
  const morEl = useRef(null);
  const accEl = useRef(null);
  const igEl = useRef(null);
  const blockEl = useRef(null);

  const [disc, setDisc] = useState(false);
  const [menu, setMenu] = useState(false);
  const [context, setContext] = useState(false);
  const [userClick, setUserClick] = useState([]);
  const [tooltips, setTooltips] = useState({
    message: false,
    more: false,
    accept: false,
    ignore: false,
    unblock: false,
  });

  const showDisc = () => setDisc(true);
  const hideDisc = () => setDisc(false);

  const toggleMenu = () => setMenu(!menu);

  const showTooltip = (t) => () => setTooltips({ ...tooltips, [t]: true });
  const hideTooltip = (t) => () => setTooltips({ ...tooltips, [t]: false });

  const toggleContext = () => setContext(!context);

  const handleContext = (e) => {
    e.preventDefault();
    setContext(true);
    setUserClick([e.clientX, e.clientY]);
  };

  useEffect(() => {
    if (friendEl && friendEl.current) {
      friendEl.current.addEventListener("contextmenu", handleContext);
    }
    return () => {
      if (friendEl && friendEl.current) {
        friendEl.current.removeEventListener("contextmenu", handleContext);
      }
    };
  }, [friendEl]);

  const handleMessage = () => {
    const c = u.conversees[f.id];

    if (c) {
      push(`/@me/${c}`);
    } else {
      const convo = { other_id: f.id };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        return push(`/@me/${cv.id}`);
      });
    }
  };

  const { message, more, accept, ignore, unblock } = tooltips;

  return (
    <li
      className="item"
      onFocus={showDisc}
      onMouseEnter={showDisc}
      onMouseLeave={hideDisc}
      onBlur={hideDisc}
    >
      <div className="friend" ref={friendEl}>
        <div className="user" onClick={all ? handleMessage : null}>
          {all ? (
            <AvatarWithStatus avatar={f.avatar} online={f.online} />
          ) : (
            <img src={f.avatar} alt="" className="avatar" />
          )}
          <div className="user-info">
            <div className="identifier">
              <h2 className="name">{f.username}</h2>
              <span className={disc ? "show" : "hide"}>#{f.discriminator}</span>
            </div>
            {all && <h3 className="sub">{f.online ? "Online" : "Offline"}</h3>}
            {incoming && <h3 className="sub">Incoming Friend Request</h3>}
            {outgoing && <h3 className="sub">Outgoing Friend Request</h3>}
            {blocked && <h3 className="sub">Blocked</h3>}
          </div>
        </div>
        {all && (
          <div className={disc ? "actions hover" : "actions"}>
            <button
              type="button"
              className="friend-action-btn"
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
              className="friend-action-btn"
              onFocus={showTooltip("more")}
              onMouseEnter={showTooltip("more")}
              onMouseLeave={hideTooltip("more")}
              onBlur={hideTooltip("more")}
              onClick={toggleMenu}
              ref={morEl}
            >
              <FontAwesomeIcon icon="ellipsis-v" />
            </button>
            {menu && (
              <FriendMenu
                openModal={openModal}
                toggleMenu={toggleMenu}
                el={morEl}
                id={f.id}
                push={push}
              />
            )}
            {more && <Tooltip text="More" className="fl-tt more" el={morEl} />}
          </div>
        )}
        {pending && (
          <div className={disc ? "actions hover" : "actions"}>
            {incoming && (
              <button
                type="button"
                className="friend-action-btn yes"
                onFocus={showTooltip("accept")}
                onMouseEnter={showTooltip("accept")}
                onMouseLeave={hideTooltip("accept")}
                onBlur={hideTooltip("accept")}
                onClick={() => respondToRequest(f.id, "accept")}
                ref={accEl}
              >
                <FontAwesomeIcon icon="check" />
              </button>
            )}
            {accept && (
              <Tooltip text="Accept" className="fl-tt acc" el={accEl} />
            )}
            <button
              type="button"
              className="friend-action-btn no"
              onFocus={showTooltip("ignore")}
              onMouseEnter={showTooltip("ignore")}
              onMouseLeave={hideTooltip("ignore")}
              onBlur={hideTooltip("ignore")}
              onClick={() =>
                respondToRequest(f.id, incoming ? "decline" : "cancel")
              }
              ref={igEl}
            >
              <FontAwesomeIcon icon="times" />
            </button>
            {ignore && (
              <Tooltip
                text={incoming ? "Ignore" : "Cancel"}
                className="fl-tt ig"
                el={igEl}
              />
            )}
          </div>
        )}
        {blocked && (
          <div className={disc ? "actions hover" : "actions"}>
            <button
              type="button"
              className="friend-action-btn no"
              onFocus={showTooltip("unblock")}
              onMouseEnter={showTooltip("unblock")}
              onMouseLeave={hideTooltip("unblock")}
              onBlur={hideTooltip("unblock")}
              onClick={unblockUser(f.id)}
              ref={blockEl}
            >
              <FontAwesomeIcon icon="user-times" />
            </button>
            {unblock && (
              <Tooltip text="Unblock" className="fl-tt ub" el={blockEl} />
            )}
          </div>
        )}
      </div>
      {context && (
        <ContextMenu
          type="user"
          dir="right"
          coords={userClick}
          toggleContext={toggleContext}
          id={f.id}
        />
      )}
    </li>
  );
};

export default Friend;
