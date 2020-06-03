import React from "react";
import { Link } from "react-router-dom";

import RegistrationForm from "./registration_form";
import LoginForm from "./login_form";
import logo from "assets/images/logo_solo.png";
import icon from "assets/images/icon_solo.png";

const Session = ({ errors, register, login, match, clearErrors }) => (
  <div className="session-container">
    <div className="logo-group">
      <Link to="/">
        <img src={icon} className="logo-icon" alt="" />
        <img src={logo} className="logo" alt="" />
      </Link>
    </div>
    {match.path === "/register" ? (
      <RegistrationForm
        errors={errors}
        register={register}
        clearErrors={clearErrors}
      />
    ) : (
      <LoginForm errors={errors} login={login} clearErrors={clearErrors} />
    )}
  </div>
);

export default Session;
