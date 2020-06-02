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
      <form onSubmit={this.handleSubmit}>
        <h2>Welcome back!</h2>
        <p>We&apos;re so excited to see you again!</p>
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

        <button type="submit">Continue</button>
        <p>
          Need an account?
          <Link to="/register">Register</Link>
        </p>
      </form>
    );
  }
}

export default LoginForm;
