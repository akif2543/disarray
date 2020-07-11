import React, { useEffect, useState } from "react";

const UserEditForm = ({
  // handleUpdate,
  // handleChange,
  currentUser,
  // fetchCurrentUser,
}) => {
  const initialUser = {
    username: currentUser.username,
    email: currentUser.email,
    avatar: currentUser.avatar,
    password: "",
  };

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [focused, setFocused] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const toggleEdit = () => setEdit(!edit);

  const handleCancel = () => {
    setEdit(false);
    setPasswordChange(false);
    setNewPassword("");
    setUser(initialUser);
  };

  const handleChange = (field) => (e) =>
    setUser({ ...user, [field]: e.target.value });

  const handleUpdate = () => {};

  const handleDelete = () => {};

  // useEffect(() => {
  //   if (passwordChange) {
  //     setUser({ ...user, newPassword: "" });
  //   } else {
  //     const u = user;
  //     delete u.newPassword;
  //     setUser({ ...u });
  //   }
  // }, [passwordChange]);

  // useEffect(() => {
  //   if (!edit) setUser(initialUser);
  // }, [edit]);

  const { avatar, username, email, password } = user;

  const { discriminator } = currentUser;

  const asterisk = edit && <span className="required">*</span>;

  return (
    <div className={edit ? "user-account edit" : "user-account"}>
      <form className="user-edit">
        <div className="info">
          <img src={avatar} alt="" className="avatar" />
          <div className="inputs">
            <div className="input-grp">
              <label htmlFor="edit-username">
                <h2>USERNAME</h2>
                {asterisk}
              </label>
              {edit ? (
                <div
                  className={focused ? "input-wrapper focus" : "input-wrapper"}
                >
                  <input
                    id="edit-username"
                    type="text"
                    value={username}
                    onChange={handleChange("username")}
                    autoFocus
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                  <div className="disc">
                    <span>#{discriminator}</span>
                  </div>
                </div>
              ) : (
                <p>
                  {currentUser.username}
                  <span>#{discriminator}</span>
                </p>
              )}
            </div>
            <div className="input-grp">
              <label htmlFor="edit-email">
                <h2>EMAIL</h2>
                {asterisk}
              </label>
              {edit ? (
                <input
                  id="edit-email"
                  type="email"
                  value={email}
                  onChange={handleChange("email")}
                />
              ) : (
                <p>{currentUser.email}</p>
              )}
            </div>
            {edit && (
              <div className="input-grp">
                <label htmlFor="edit-pw">
                  <h2>CURRENT PASSWORD</h2>
                  {asterisk}
                </label>
                <input
                  id="edit-pw"
                  type="password"
                  value={password}
                  onChange={handleChange("password")}
                />
              </div>
            )}
            {edit && !passwordChange && (
              <button
                type="button"
                className="cancel"
                onClick={() => setPasswordChange(true)}
              >
                Change password?
              </button>
            )}
            {passwordChange && (
              <div className="input-grp">
                <label htmlFor="edit-npw">
                  <h2>NEW PASSWORD</h2>
                  {asterisk}
                </label>
                <input
                  id="edit-npw"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        {edit && (
          <footer>
            <button type="button" className="delete-btn" onClick={handleDelete}>
              Delete Account
            </button>
            <div className="btn-group">
              <button type="button" className="cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="save-btn" onClick={handleUpdate}>
                Save
              </button>
            </div>
          </footer>
        )}
      </form>
      {!edit && (
        <button type="button" onClick={toggleEdit} className="edit-btn">
          Edit
        </button>
      )}
    </div>
  );
};

export default UserEditForm;
