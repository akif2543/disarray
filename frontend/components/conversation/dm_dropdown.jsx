import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import shortid from "shortid";

import { getCurrentUser, getUserFriends } from "../../reducers/selectors";
import { createConversation } from "../../actions/conversation_actions";

const DMDropdown = ({
  createConversation,
  toggleDropdown,
  friends,
  users,
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

  const getConversation = (user) =>
    user.conversations.find((id) => currentUser.conversations.includes(id));

  const handleChange = (e) => {
    setUsername(e.target.value);
    filterFriends(e.target.value);
  };

  const handleCreate = (user) => () => {
    // const c = getConversation(user);
    // if (c > 0) {
    //   history.push(`/@me/${c}`);
    //   toggleDropdown();
    // } else {
    const convo = { user1_id: currentUser.id, user2_id: user.id };
    createConversation(convo).then((action) => {
      const [cv] = Object.values(action.conversation);
      toggleDropdown();
      return history.push(`/@me/${cv.id}`);
    });
    // }
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
            <ul className="members">
              {members.map((m) => (
                <li></li>
              ))}
            </ul>
            <input
              type="text"
              value={username}
              placeholder="Type the username of a friend"
              onChange={handleChange}
            />
          </div>
        </section>
        <main className="dmd-users">
          <ul>
            {found.map((f) => (
              <button
                type="button"
                className="dmd-user-li"
                onClick={handleCreate(f)}
                key={shortid.generate()}
              >
                <div className="user">
                  <img src={f.avatar} alt="" />
                  <h4>{f.username}</h4>
                  <h5>{`${f.username}#${f.discriminator}`}</h5>
                </div>
                <input type="checkbox" value={f.id} onChange={handleAdd} />
              </button>
            ))}
          </ul>
        </main>
        <footer className="dmd-foot">
          <button type="button" className="grp-dm-btn">
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
  createConversation: (convo) => dispatch(createConversation(convo)),
});

const DMDropdownContainer = withRouter(connect(mSTP, mDTP)(DMDropdown));

export default DMDropdownContainer;
