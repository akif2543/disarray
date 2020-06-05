import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class NewServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: `${this.props.currentUser.username}'s server`,
      // icon: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(type) {
    return (e) => this.setState({ [type]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createServer(this.state);
  }

  render() {
    const { name, icon } = this.state;
    return (
      <div className="new-server">
        <h1>CREATE YOUR SERVER</h1>
        <h2>
          By creating a server, you will have access to <span>free</span>voice
          and text chat to use amongst your friends.
        </h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="server-name">
            SERVER NAME
            <input
              type="text"
              value={name}
              onChange={this.handleChange("name")}
            />
            <p>
              By creating a server, you agree to Disarray's{" "}
              <a href="#">Community Guidelines</a>.
            </p>
          </label>
          <figure>
            <div classname="s-icon"></div>
            <figcaption>
              Minimum Size: <span>128x128</span>
            </figcaption>
          </figure>
          <footer>
            <h4>
              <FontAwesomeIcon icon="arrow-left" /> Back
            </h4>
            <button type="submit">Create</button>
          </footer>
        </form>
      </div>
    );
  }
}

export default NewServerForm;
