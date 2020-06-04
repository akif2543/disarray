import React from "react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.valid = this.valid.bind(this);
    this.errors = {
      emailPresence: false,
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

  valid(email, password) {
    let valid = true;
    if (!email.length) {
      this.errors.emailPresence = true;
      valid = false;
    } else {
      this.errors.emailPresence = false;
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
    const { login } = this.props;
    const { email, password } = this.state;
    if (this.valid(email, password)) {
      login({ email, password });
      this.errors = {
        emailPresence: false,
        invalidEmail: false,
        passwordPresence: false,
      };
    }
  }

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;
    const emailError = errors.find((e) => e.match(/Email/));
    const passwordError = errors.find((e) => e.match(/Password/));
    const { emailPresence, invalidEmail, passwordPresence } = this.errors;

    return (
      <form onSubmit={this.handleSubmit} className="session-form">
        <section className="form-group">
          <h1>Welcome back!</h1>
          <h6 className="session-sub">
            We&apos;re so excited to see you again!
          </h6>
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
              autoFocus
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
          <Link to="#">
            <p>Forgot your password?</p>
          </Link>

          <button type="submit">Login</button>
          <p>
            <span>Need an account?</span>
            {"  "}
            <Link to="/register">Register</Link>
          </p>
        </section>
        <section className="qr-group">
          <div className="qr-code">
            {/* <img src={window.qrUrl} alt="" /> */}
          </div>
          <div>
            <h1>Log in with QR Code</h1>
            <h6 className="session-sub">
              Scan this with the
              {"  "}
              <span>Disarray mobile app</span>
              {"  "}
              to log in instantly.
            </h6>
          </div>
        </section>
      </form>
    );
  }
}

export default LoginForm;
