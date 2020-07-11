import React, { useState } from "react";
import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";

const UserEditForm = ({
  currentUser,
  updateUser,
  serverErrors,
  clearErrors,
  openModal,
}) => {
  const initialUser = {
    username: currentUser.username,
    email: currentUser.email,
    // avatar: currentUser.avatar,
    currentPassword: "",
  };

  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [focused, setFocused] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [password, setPassword] = useState("");
  const [localErrors, setLocalErrors] = useState([]);

  const toggleEdit = () => setEdit(!edit);

  const handleClose = () => {
    setEdit(false);
    setPasswordChange(false);
    setPassword("");
    setLocalErrors([]);
    clearErrors();
    setUser(initialUser);
  };

  const handleChange = (field) => (e) =>
    setUser({ ...user, [field]: e.target.value });

  const validateEmail = (email) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const isValid = () => {
    const keys = Object.keys(user);
    const err = [];

    keys.forEach((key) => {
      const msg = key === "currentPassword" ? "Password does not match" : key;
      if (!user[key].trim().length) err.push(msg);
    });
    if (!validateEmail(user.email))
      err.push("Not a well formed email address.");
    setLocalErrors(err);
    return !err.length;
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLocalErrors([]);
    if (isValid()) {
      const { id } = currentUser;
      updateUser(
        passwordChange ? { ...user, id, password } : { ...user, id }
      ).then((action) => {
        if (action.type === RECEIVE_CURRENT_USER) handleClose();
      });
    }
  };

  const { username, email, currentPassword } = user;

  const { discriminator } = currentUser;

  const asterisk = edit && <span className="required">*</span>;
  const presence = "This field is required";

  let serverE = serverErrors.find((e) => e[0].match(/email/));
  serverE = serverE ? serverE[1] : null;
  let serverU = serverErrors.find((e) => e[0].match(/username/));
  serverU = serverU ? serverU[1] : null;
  let serverC = serverErrors.find((e) => e[0].match(/current/));
  serverC = serverC ? serverC[1] : null;
  let serverN = serverErrors.find((e) => e[0].match(/password/));
  serverN = serverN ? serverN[1] : null;

  const usernameError = localErrors.includes("username") ? presence : serverU;
  const invalidEmail = localErrors.find((e) => e.match(/address/)) || serverE;
  const emailError = localErrors.includes("email") ? presence : invalidEmail;
  const passwordError = localErrors.find((e) => e.match(/Password/)) || serverC;
  const newPasswordError = serverN;

  const showPasswordError = passwordError && !(usernameError || emailError);

  const isDemo = currentUser.username === "Demogorgon";

  const usernameClass = () => {
    if (usernameError) {
      return "input-wrapper err";
    }
    if (focused) {
      return "input-wrapper focus";
    }
    return "input-wrapper";
  };

  return (
    <div className={edit ? "user-account edit" : "user-account"}>
      <form className="user-edit">
        <div className="info">
          <img src={currentUser.avatar} alt="" className="avatar" />
          <div className="inputs">
            <div className="input-grp">
              <label htmlFor="edit-username">
                <h2>USERNAME</h2>
                {asterisk}
              </label>
              {edit ? (
                <div>
                  <div className={usernameClass()}>
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
                  {usernameError && (
                    <span className="err-msg">{usernameError}</span>
                  )}
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
                <div>
                  <input
                    id="edit-email"
                    type="email"
                    value={email}
                    onChange={handleChange("email")}
                    className={emailError ? "err" : ""}
                  />
                  {emailError && !usernameError && (
                    <span className="err-msg">{emailError}</span>
                  )}
                </div>
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
                  value={currentPassword}
                  onChange={handleChange("currentPassword")}
                  className={showPasswordError ? "err" : ""}
                />
                {showPasswordError && (
                  <span className="err-msg">{passwordError}</span>
                )}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={newPasswordError ? "err" : ""}
                />
                {newPasswordError && (
                  <span className="err-msg">{newPasswordError}</span>
                )}
              </div>
            )}
          </div>
        </div>
        {edit && (
          <footer>
            <button
              type="button"
              className="delete-btn"
              onClick={() => openModal("accountDelete")}
            >
              Delete Account
            </button>
            <div className="btn-group">
              <button type="button" className="cancel" onClick={handleClose}>
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
        <button
          type="button"
          onClick={toggleEdit}
          className={isDemo ? "edit-btn demo" : "edit-btn"}
          disabled={isDemo}
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default UserEditForm;
