import React from "react";
import RegistrationForm from "./registration_form";
import LoginForm from "./login_form";

const Session = ({ errors, register, login, match, clearErrors }) => (
  <div>
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
