import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { RECEIVE_CURRENT_USER } from "../../actions/session_actions";
import Tooltip from "../ui/tooltip";

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
    currentPassword: "",
  };
  const input = useRef(null);
  const el = useRef(null);
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [avatar, setAvatar] = useState({ url: currentUser.avatar, file: null });
  const [focused, setFocused] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [avatarChange, setAvatarChange] = useState(false);
  const [password, setPassword] = useState("");
  const [localErrors, setLocalErrors] = useState([]);
  const [tooltip, setTooltip] = useState(false);

  const showTooltip = () => setTooltip(true);
  const hideTooltip = () => setTooltip(false);

  const toggleEdit = () => setEdit(!edit);

  const handleReset = () => {
    setAvatar({ url: currentUser.avatar, file: null });
    setAvatarChange(false);
    input.current.value = "";
  };

  const handleClose = () => {
    setEdit(false);
    setPasswordChange(false);
    setPassword("");
    setLocalErrors([]);
    clearErrors();
    setUser(initialUser);
    handleReset();
  };

  const handleChange = (field) => (e) =>
    setUser({ ...user, [field]: e.target.value });

  const handleAvatar = (e) => {
    const reader = new FileReader();
    const [file] = e.currentTarget.files;
    reader.onloadend = () => setAvatar({ url: reader.result, file });

    if (file) {
      setAvatarChange(true);
      reader.readAsDataURL(file);
    } else {
      handleReset();
    }
  };

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
      const formData = new FormData();
      const keys = Object.keys(user);
      keys.forEach((key) => formData.append(`user[${key}]`, user[key]));
      if (passwordChange) formData.append("user[password]", password);
      if (avatarChange) formData.append("user[avatar]", avatar.file);
      updateUser(id, formData).then((action) => {
        if (action.type === RECEIVE_CURRENT_USER) handleClose();
      });
    }
  };

  const { username, email, currentPassword } = user;
  const { url } = avatar;

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
          {edit ? (
            <label htmlFor="edit-avatar" className="avatar-label">
              <div className="img-upload">
                <FontAwesomeIcon icon={["far", "file-image"]} size="lg" />
              </div>
              <img src={url} alt="" className="avatar" />
              <input
                type="file"
                id="edit-avatar"
                onChange={handleAvatar}
                accept=".jpg,.jpeg,.png,.gif"
                ref={input}
              />
              <button
                type="button"
                onClick={handleReset}
                className="reset-avatar"
              >
                Remove
              </button>
            </label>
          ) : (
            <img src={currentUser.avatar} alt="" className="avatar" />
          )}
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
          onClick={isDemo ? null : toggleEdit}
          className={isDemo ? "edit-btn demo" : "edit-btn"}
          onFocus={showTooltip}
          onMouseEnter={showTooltip}
          onBlur={hideTooltip}
          onMouseLeave={hideTooltip}
          ref={el}
        >
          Edit
        </button>
      )}
      {isDemo && tooltip && (
        <Tooltip text="Cannot edit demo user" className="ue-tt" el={el} />
      )}
    </div>
  );
};

export default UserEditForm;
