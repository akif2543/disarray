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
    password: "",
  };

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [passwordChange, setPasswordChange] = useState(false);

  const toggleEdit = () => setEdit(!edit);

  const handleChange = (field) => (e) =>
    setUser({ ...user, [field]: e.target.value });

  const handleUpdate = () => {};

  const handleDelete = () => {};

  useEffect(() => {
    // fetchCurrentUser(currentUser.id)
  }, []);

  const {
    avatar,
    username,
    discriminator,
    email,
    password,
    newPassword,
  } = user;
  return (
    <div className="user-account">
      <form>
        <img src={avatar} alt="" className="avatar" />
        <div className="info">
          <div className="username">
            <h2>USERNAME</h2>
            {edit ? (
              <div className="input-wrapper">
                <input
                  type="text"
                  value={username}
                  onChange={handleChange("username")}
                />
                <div>
                  <span>#{discriminator}</span>
                </div>
              </div>
            ) : (
              <p>
                {username}
                <span>#{discriminator}</span>
              </p>
            )}
          </div>
          <div>
            <h2>EMAIL</h2>
            {edit ? (
              <input
                type="email"
                value={email}
                onChange={handleChange("email")}
              />
            ) : (
              <p>{email}</p>
            )}
          </div>
          {edit && (
            <div>
              <h2>CURRENT PASSWORD</h2>
              <input
                type="password"
                value={password}
                onChange={handleChange("password")}
              />
              {!passwordChange && <p className="pw-toggle">Change password?</p>}
            </div>
          )}
          {passwordChange && (
            <div>
              <h2>NEW PASSWORD</h2>
              <input
                type="password"
                value={newPassword}
                onChange={handleChange("newPassword")}
              />
            </div>
          )}
        </div>
        {edit && (
          <footer>
            <button type="button" onClick={handleDelete}>
              DeleteAccount
            </button>
            <div className="btn-group">
              <button type="button" className="cancel" onClick={toggleEdit}>
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
        <button type="button" onClick={toggleEdit}>
          Edit
        </button>
      )}
    </div>
  );
};

export default UserEditForm;
