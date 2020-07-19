import React, { useState } from "react";

const EditServerNickName = ({ user, changeNickname, s, closeModal }) => {
  const [nick, setNick] = useState(user.servers[s] || "");

  const handleChange = (e) => setNick(e.target.value);

  const handleReset = () => {
    changeNickname({
      member_id: user.id,
      subscribeable_id: s,
      alias: null,
    }).then(closeModal());
  };

  const handleSubmit = (e) => {
    if (!nick.trim().length) {
      handleReset();
    } else {
      changeNickname({
        member_id: user.id,
        subscribeable_id: s,
        alias: nick,
      }).then(closeModal());
    }
  };

  return (
    <div className="modal-confirm alias">
      <header>
        <h1>CHANGE NICKNAME</h1>
      </header>
      <main>
        <label htmlFor="alias-input" className="label">
          <form onSubmit={handleSubmit}>
            <h2 className="alias-label">NICKNAME</h2>
            <input
              type="text"
              id="alias-input"
              value={nick}
              placeholder={user.username}
              onChange={handleChange}
              autoComplete="off"
              autoFocus
            />
          </form>
          <button type="button" className="alias-reset" onClick={handleReset}>
            Reset Nickname
          </button>
        </label>
      </main>
      <footer>
        <button type="button" onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button type="button" onClick={handleSubmit} className="leave">
          Save
        </button>
      </footer>
    </div>
  );
};

export default EditServerNickName;
