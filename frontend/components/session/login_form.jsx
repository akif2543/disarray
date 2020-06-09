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
    this.handleDemo = this.handleDemo.bind(this);
    this.valid = this.valid.bind(this);
    this.errors = {
      emailPresence: false,
      passwordPresence: false,
    };
  }

  componentDidMount() {
    const { clearErrors, stopLoading } = this.props;
    clearErrors();
  }

  componentWillUnmount() {
    return this.props.startLoading();
  }

  handleDemo() {
    const { startLoading, login } = this.props;
    startLoading();
    return login({ email: "demo@demo.com", password: "password" });
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

    valid ? this.setState({ errors: false }) : this.setState({ errors: true });
    return valid;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login, websocketConnect } = this.props;
    const { email, password } = this.state;
    if (this.valid(email, password)) {
      this.errors = {
        emailPresence: false,
        passwordPresence: false,
      };
      login({ email, password });
    }
  }

  render() {
    const { email, password } = this.state;
    const { errors, loading } = this.props;
    const emailError = errors.find((e) => e.match(/Email/));
    const passwordError = errors.find((e) => e.match(/Password/));
    const { emailPresence, passwordPresence } = this.errors;

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
            <input
              type="email"
              id="email-input"
              value={email}
              onChange={this.handleChange("email")}
              autoFocus={loading ? false : true}
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
          <Link to="/@me" onClick={this.handleDemo}>
            <p>Want a demo?</p>
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
            <img src={window.dkIconURL} alt="" />
          </div>
          <div>
            <h1>Try a demo</h1>
            <h6 className="session-sub">
              Use a{"  "}
              <Link to="/@me" onClick={this.handleDemo}>
                Disarray demo account
              </Link>
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
