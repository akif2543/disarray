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
      passwordPresence: false,
    };
  }

  componentDidMount() {
    const { clearErrors, stopLoading } = this.props;
    clearErrors();
    stopLoading();
  }

  // componentWillUnmount() {
  //   this.props.startLoading();
  // }

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

    valid ? this.setState({ errors: false }) : this.setState({ errors: true });
    return valid;
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
        passwordPresence: false,
      };
    }
  }

  render() {
    const { email, username, password } = this.state;
    const { errors, loading, stopLoading } = this.props;
    const emailError = errors.find((e) => e[0].match(/email/));
    const usernameError = errors.find((e) => e[0].match(/username/));
    const passwordError = errors.find((e) => e[0].match(/password/));
    const { emailPresence, usernamePresence, passwordPresence } = this.errors;

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
              <span className="session-error">{`- ${emailError[1]}`}</span>
            )}
            {emailPresence && (
              <span className="session-error">- This field is required.</span>
            )}
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={this.handleChange("email")}
              autoFocus={loading ? false : true}
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
              <span className="session-error">{`- ${usernameError[1]}`}</span>
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
              <span className="session-error">{`- ${passwordError[1]}`}</span>
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
