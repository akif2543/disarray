import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from "shortid";

import { getCurrentUser, getUserFriends } from "../../reducers/selectors";
import { createConversation } from "../../actions/conversation_actions";

const NewGroupDM = ({
  createConversation,
  togglePopout,
  friends,
  currentUser,
  history: { push },
  el,
  nav,
  switchTab,
}) => {
  const [remaining, setRemaining] = useState(9);
  const [username, setUsername] = useState("");
  const [found, setFound] = useState(friends);
  const [members, setMembers] = useState([]);

  const filterFriends = (input) => {
    if (username.length) {
      const f = friends.filter(
        (u) =>
          u.username.toLowerCase().includes(input.toLowerCase()) &&
          u.id !== currentUser.id
      );
      setFound(f);
    } else {
      setFound(friends);
    }
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") togglePopout();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEsc, false);
    return () => {
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  useEffect(() => {
    setRemaining(9 - members.length);
  }, [members]);

  const handleChange = (e) => {
    setUsername(e.target.value);
    filterFriends(e.target.value);
  };

  const handleCreate = () => {
    const ids = members.map((m) => m.id);
    createConversation({ ids }, true).then((action) => {
      const [cv] = Object.values(action.conversation);
      togglePopout();
      return push(`/@me/${cv.id}`);
    });
  };

  const handleCheck = (friend) => () => {
    const i = members.indexOf(friend);
    if (i === -1) {
      if (remaining) setMembers([...members, friend]);
      setUsername("");
      setFound(friends);
    } else {
      const m = Array.from(members);
      m.splice(i, 1);
      setMembers(m);
    }
  };

  const handleAdd = () => {
    if (nav) {
      switchTab("add");
      // togglePopout();
    }
  };

  let style;

  if (el && el.current) {
    const { left, bottom, right } = el.current.getBoundingClientRect();

    style = nav
      ? { top: `${bottom + 5}px`, left: `${right - 442}px` }
      : { top: `${bottom}px`, left: `${left}px` };
  }

  const hasFriends = Boolean(friends.length);

  return (
    <div className="dropdown-bg" onClick={togglePopout}>
      <div
        className="dm-dropdown"
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {hasFriends ? (
          <section className="dmd-head">
            <h4>SELECT FRIENDS</h4>
            <p>
              {remaining
                ? `You can add ${remaining} more ${
                    remaining === 1 ? "friend" : "friends"
                  }.`
                : "This group has a 10 member limit."}
            </p>
            <div className="input-wrapper">
              <ul className="dm-members">
                {members.map((m) => (
                  <li key={shortid.generate()} className="selected-mem">
                    <button
                      type="button"
                      onClick={handleCheck(m)}
                      className="remove-btn"
                    >
                      <h4 className="member-name">{m.username}</h4>
                      <FontAwesomeIcon icon="times" />
                    </button>
                  </li>
                ))}
                <li className="search-li">
                  <input
                    type="text"
                    value={username}
                    className="friend-search"
                    placeholder={
                      members.length
                        ? "Find or start a conversation"
                        : "Type the username of a friend"
                    }
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>
          </section>
        ) : (
          <section className="dmd-head">
            <h4>SELECT FRIENDS</h4>
            <p>You don&apos;t have any friends to add!</p>
          </section>
        )}
        {hasFriends && (
          <main className="dmd-users">
            <ul>
              {found.map((f) => (
                <button
                  type="button"
                  className="dmd-user-li"
                  onClick={handleCheck(f)}
                  key={shortid.generate()}
                >
                  <div className="user">
                    <img src={f.avatar} alt="" />
                    <h4>{f.username}</h4>
                    <h5>{`${f.username}#${f.discriminator}`}</h5>
                  </div>
                  <label className="container" htmlFor="check">
                    <input
                      id="check"
                      type="checkbox"
                      checked={members.includes(f)}
                      name={f.username}
                      value={f.id}
                      onChange={handleCheck(f)}
                    />
                    <span className="checkmark">
                      <FontAwesomeIcon icon="check" className="tick" />
                    </span>
                  </label>
                </button>
              ))}
            </ul>
          </main>
        )}
        <footer className="dmd-foot">
          {hasFriends ? (
            <button type="button" className="grp-dm-btn" onClick={handleCreate}>
              Create Group DM
            </button>
          ) : (
            <button
              type="button"
              className="grp-dm-friend-btn"
              onClick={handleAdd}
            >
              Add Friend
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  friends: getUserFriends(state),
});

const mDTP = (dispatch) => ({
  createConversation: (convo, group) =>
    dispatch(createConversation(convo, group)),
});

const NewGroupDMContainer = withRouter(connect(mSTP, mDTP)(NewGroupDM));

export default NewGroupDMContainer;
