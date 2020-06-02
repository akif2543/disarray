import React from "react";
import { Link } from "react-router-dom";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
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
    const { register, clearErrors } = this.props;
    clearErrors();
    register(this.state);
  }

  render() {
    const { email, username, password } = this.state;
    const { errors } = this.props;
    const emailError = errors.find((e) => e.match(/Email/));
    const usernameError = errors.find((e) => e.match(/Username/));
    const passwordError = errors.find((e) => e.match(/Password/));

    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Create an account</h2>
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

        <label htmlFor="username-input">
          USERNAME
          {usernameError && (
            <span className="session-error">{`- ${usernameError}`}</span>
          )}
          <input
            type="text"
            id="username-input"
            value={username}
            onChange={this.handleChange("username")}
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

        <button type="submit">Continue</button>
        <Link to="/login">
          <p>Already have an account?</p>
        </Link>
      </form>
    );
  }
}

export default RegistrationForm;
