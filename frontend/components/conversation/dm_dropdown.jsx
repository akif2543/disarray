import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUsers } from "../../actions/session_actions";
import { getCurrentUser } from "../../reducers/selectors";
import { createConversation } from "../../actions/conversation_actions";
import shortid from "shortid";

const DMDropdown = ({
  createConversation,
  toggleDropdown,
  fetchUsers,
  users,
  currentUser,
  history,
}) => {
  const [username, setUsername] = useState("");
  const [found, setFound] = useState(
    users.filter((u) => u.id !== currentUser.id)
  );

  useEffect(() => {
    fetchUsers().then(setFound(users.filter((u) => u.id !== currentUser.id)));
  }, []);

  const filterUsers = () => {
    if (username.length) {
      const f = users.filter(
        (u) =>
          u.username.toLowerCase().includes(username.toLowerCase()) &&
          u.id !== currentUser.id
      );
      setFound(f);
    } else {
      setFound(users.filter((u) => u.id !== currentUser.id));
    }
  };
  const getConversation = (user) =>
    user.conversations.find((id) => currentUser.conversations.includes(id));

  const handleChange = (e) => {
    setUsername(e.target.value);
    filterUsers();
  };

  const handleCreate = (user) => () => {
    const c = getConversation(user);
    if (c > 0) {
      history.push(`/@me/${c}`);
      toggleDropdown();
    } else {
      const convo = { user1_id: currentUser.id, user2_id: user.id };
      createConversation(convo).then((action) => {
        const [cv] = Object.values(action.conversation);
        toggleDropdown();
        return history.push(`/@me/${cv.id}`);
      });
    }
  };

  return (
    <div className="dropdown-bg" onClick={toggleDropdown}>
      <div className="dm-dropdown" onClick={(e) => e.stopPropagation()}>
        <section className="dmd-head">
          <h4>SELECT A USER</h4>
          <input
            type="text"
            value={username}
            placeholder="Type in a username"
            onChange={handleChange}
          />
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
                <img src={f.avatar} alt="" />
                <h4>{f.username}</h4>
                <h5>{`${f.username}#${f.discriminator}`}</h5>
              </button>
            ))}
          </ul>
        </main>
        <footer className="dmd-foot"></footer>
      </div>
    </div>
  );
};

const mSTP = (state) => ({
  currentUser: getCurrentUser(state),
  users: Object.values(state.entities.users),
});

const mDTP = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsers()),
  createConversation: (convo) => dispatch(createConversation(convo)),
});

const DMDropdownContainer = withRouter(connect(mSTP, mDTP)(DMDropdown));

export default DMDropdownContainer;
