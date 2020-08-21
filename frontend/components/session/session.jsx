import React from "react";
import { Link } from "react-router-dom";

import RegistrationForm from "./registration_form";
import LoginForm from "./login_form";

const Session = ({
  errors,
  register,
  login,
  match,
  clearErrors,
  loading,
  startLoading,
  loggedIn,
  stopLoading,
}) => (
  <div className="session-container">
    <div className="logo-group">
      <Link to="/">
        <img src={window.logoIconURL} className="logo-icon" alt="" />
        <img src={window.logoURL} className="logo" alt="" />
      </Link>
    </div>
    {match.path === "/register" ? (
      <RegistrationForm
        errors={errors}
        register={register}
        clearErrors={clearErrors}
        loading={loading}
        startLoading={startLoading}
        loggedIn={loggedIn}
        stopLoading={stopLoading}
      />
    ) : (
      <LoginForm
        errors={errors}
        login={login}
        clearErrors={clearErrors}
        loading={loading}
        startLoading={startLoading}
        loggedIn={loggedIn}
        stopLoading={stopLoading}
      />
    )}
  </div>
);

export default Session;
