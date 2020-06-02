import React from "react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { clearErrors } = this.props;
    clearErrors();
  }

  handleChange(type) {
    return (e) => this.setState({ [type]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login, clearErrors } = this.props;
    clearErrors();
    login(this.state);
  }

  render() {
    const { email, password } = this.state;
    const { errors } = this.props;
    const emailError = errors.find((e) => e.match(/Email/));
    const passwordError = errors.find((e) => e.match(/Password/));

    return (
      <form onSubmit={this.handleSubmit} className="session-form">
        <section className="form-group">
          <h1>Welcome back!</h1>
          <h6 className="session-sub">
            We&apos;re so excited to see you again!
          </h6>
          <label htmlFor="email-input">
            EMAIL
            {emailError && (
              <span className="session-error">{`- ${emailError}`}</span>
            )}
            <input
              type="text"
              id="email-input"
              value={email}
              onChange={this.handleChange("email")}
            />
          </label>

          <label htmlFor="password-input">
            PASSWORD
            {passwordError && (
              <span className="session-error">{`- ${passwordError}`}</span>
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
      </form>
    );
  }
}

export default LoginForm;
