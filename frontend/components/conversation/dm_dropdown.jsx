import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import shortid from "shortid";

import { getCurrentUser, getUserFriends } from "../../reducers/selectors";
import { createConversation } from "../../actions/conversation_actions";

const DMDropdown = ({
  createConversation,
  toggleDropdown,
  friends,
  currentUser,
  history,
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

  useEffect(() => {
    setRemaining(9 - members.length);
  }, [members]);

  // const getConversation = (user) =>
  //   user.conversations.find((id) => currentUser.conversations.includes(id));

  const handleChange = (e) => {
    setUsername(e.target.value);
    filterFriends(e.target.value);
  };

  const handleCreate = () => {
    const ids = members.map((m) => m.id);
    debugger;
    createConversation({ ids }, true).then((action) => {
      debugger;
      const [cv] = Object.values(action.conversation);
      toggleDropdown();
      return history.push(`/@me/${cv.id}`);
    });
  };

  const handleCheck = (friend) => () => {
    const i = members.indexOf(friend);
    if (i === -1) {
      if (remaining) setMembers([...members, friend]);
    } else {
      const m = Array.from(members);
      m.splice(i, 1);
      setMembers(m);
    }
  };

  return (
    <div className="dropdown-bg" onClick={toggleDropdown}>
      <div className="dm-dropdown" onClick={(e) => e.stopPropagation()}>
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
        <footer className="dmd-foot">
          <button type="button" className="grp-dm-btn" onClick={handleCreate}>
            Create Group DM
          </button>
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

const DMDropdownContainer = withRouter(connect(mSTP, mDTP)(DMDropdown));

export default DMDropdownContainer;
