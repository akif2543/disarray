import React from "react";

import NewServerForm from "./new_server_form";
import ServerPortal from "./server_portal";

class ServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: true,
      create: false,
      join: false,
      name: `${this.props.currentUser.username}'s server`,
      code: "",
      error: false,
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
  }

  handleClick(type) {
    return () => this.setState({ [type]: true, portal: false });
  }

  handleBack(type) {
    return () => this.setState({ [type]: false, portal: true });
  }

  handleChange(type) {
    return (e) => this.setState({ [type]: e.target.value });
  }

  handleCreate(e) {
    e.preventDefault();
    const { name } = this.state;
    if (name.length) {
      const server = { name };
      this.props.createServer(server);
    } else {
      this.setState({ error: true });
    }
  }

  handleJoin(e) {
    e.preventDefault();
    const { code } = this.state;
    const membership = { code };
    this.props.joinServer(membership);
  }

  clearErrors() {
    this.setState({ error: false });
  }

  render() {
    const { currentUser } = this.props;
    const { portal, create, join, name, code, error, initials } = this.state;
    return (
      <div className="server-modal">
        {portal && <ServerPortal handleClick={this.handleClick} />}
        {create && (
          <NewServerForm
            name={name}
            currentUser={currentUser}
            handleBack={this.handleBack}
            handleChange={this.handleChange}
            handleCreate={this.handleCreate}
            error={error}
            clearErrors={this.clearErrors}
          />
        )}
      </div>
    );
  }
}

export default ServerModal;
