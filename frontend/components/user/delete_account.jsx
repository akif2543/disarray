import React, { useState } from "react";

const DeleteAccount = ({
  currentUser,
  closeModal,
  deleteUser,
  serverError,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { id } = currentUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    if (password.trim().length) return deleteUser({ id, password });
    setError(true);
  };

  const pwError =
    error || serverError.length ? "Password does not match" : null;

  return (
    <div className="modal-confirm acc-del">
      <header>
        <h1>DELETE ACCOUNT</h1>
        <div className="warning">
          <h2>
            Are you sure that you want to delete your account? This will
            immediately log you out of your account and you will not be able to
            log in again.
          </h2>
        </div>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="input-grp">
            <label htmlFor="edit-pw">
              <h2>PASSWORD</h2>
            </label>
            <input
              id="edit-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={pwError ? "err" : ""}
            />
            {pwError && <span className="err-msg">{pwError}</span>}
          </div>
        </form>
      </main>
      <footer>
        <button type="button" onClick={closeModal} className="cancel">
          Cancel
        </button>
        <button type="submit" onClick={handleSubmit} className="leave">
          Delete Account
        </button>
      </footer>
    </div>
  );
};

export default DeleteAccount;
