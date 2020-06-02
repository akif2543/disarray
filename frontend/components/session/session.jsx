import React from "react";
import RegistrationForm from "./registration_form";
import LoginForm from "./login_form";
import session_bg from "images/session_bg.jpg";

const Session = ({ errors, register, login, match, clearErrors }) => (
  <div className="session-container">
    {/* <img src={session_bg} alt="" className="session_bg" /> */}
    {/* logo */}
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
