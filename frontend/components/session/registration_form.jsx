import React from "react";
import { Link } from "react-router-dom";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      errors: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.valid = this.valid.bind(this);
    this.errors = {
      emailPresence: false,
      usernamePresence: false,
      invalidEmail: false,
      passwordPresence: false,
    };
  }

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleChange(type) {
    return (e) => this.setState({ [type]: e.target.value });
  }

  valid(email, username, password) {
    let valid = true;
    if (!email.length) {
      this.errors.emailPresence = true;
      valid = false;
    } else {
      this.errors.emailPresence = false;
    }
    if (!username.length) {
      this.errors.usernamePresence = true;
      valid = false;
    } else {
      this.errors.usernamePresence = false;
    }
    if (!password.length) {
      this.errors.passwordPresence = true;
      valid = false;
    } else {
      this.errors.passwordPresence = false;
    }
    if (!this.validEmail(email)) {
      this.errors.invalidEmail = true;
      valid = false;
    } else {
      this.errors.invalidEmail = false;
    }
    valid ? this.setState({ errors: false }) : this.setState({ errors: true });
    return valid;
  }

  validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  handleSubmit(e) {
    e.preventDefault();
    const { register } = this.props;
    const { email, username, password } = this.state;
    if (this.valid(email, username, password)) {
      register({ email, username, password });
      this.errors = {
        emailPresence: false,
        usernamePresence: false,
        invalidEmail: false,
        passwordPresence: false,
      };
    }
  }

  render() {
    const { email, username, password } = this.state;
    const { errors } = this.props;
    const emailError = errors.find((e) => e.match(/Email/));
    const usernameError = errors.find((e) => e.match(/Username/));
    const passwordError = errors.find((e) => e.match(/Password/));
    const {
      emailPresence,
      invalidEmail,
      usernamePresence,
      passwordPresence,
    } = this.errors;

    return (
      <form onSubmit={this.handleSubmit} className="session-form registration">
        <section className="form-group">
          <h1>Create an account</h1>
          <label
            htmlFor="email-input"
            className={emailPresence || emailError ? "presence-error" : ""}
          >
            EMAIL
            {"  "}
            {emailError && (
              <span className="session-error">{`- ${emailError}`}</span>
            )}
            {emailPresence && (
              <span className="session-error">- This field is required.</span>
            )}
            {invalidEmail && (
              <span className="session-error">
                - Please enter a valid email.
              </span>
            )}
            <input
              type="text"
              id="email-input"
              value={email}
              onChange={this.handleChange("email")}
            />
          </label>

          <label
            htmlFor="username-input"
            className={
              usernamePresence || usernameError ? "presence-error" : ""
            }
          >
            USERNAME
            {"  "}
            {usernameError && (
              <span className="session-error">{`- ${usernameError}`}</span>
            )}
            {usernamePresence && (
              <span className="session-error">- This field is required.</span>
            )}
            <input
              type="text"
              id="username-input"
              value={username}
              onChange={this.handleChange("username")}
            />
          </label>

          <label
            htmlFor="password-input"
            className={
              passwordPresence || passwordError ? "presence-error" : ""
            }
          >
            PASSWORD
            {"  "}
            {passwordError && (
              <span className="session-error">{`- ${passwordError}`}</span>
            )}
            {passwordPresence && (
              <span className="session-error">- This field is required.</span>
            )}
            <input
              type="password"
              id="password-input"
              value={password}
              onChange={this.handleChange("password")}
            />
          </label>

          <button type="submit">Continue</button>
          <Link to="/login">
            <p>Already have an account?</p>
          </Link>
          <p className="disclaimer">
            By registering you agree to Disarray's{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </section>
      </form>
    );
  }
}

export default RegistrationForm;
