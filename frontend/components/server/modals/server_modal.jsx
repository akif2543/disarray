import React from "react";

import NewServerForm from "./new_server_form";
import ServerPortal from "./server_portal";
import JoinServerForm from "./join_server_form";

class ServerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portal: true,
      create: false,
      join: false,
      name: `${this.props.currentUser.username}'s server`,
      joinCode: "",
      error: false,
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.clearCode = this.clearCode.bind(this);
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
    const { joinCode } = this.state;
    if (joinCode.length) {
      this.clearErrors();
      const membership = { join_code: joinCode };
      this.props.joinServer(membership);
    } else {
      this.setState({ error: true });
    }
  }

  clearErrors() {
    this.setState({ error: false });
  }

  clearCode() {
    this.setState({ joinCode: "" });
  }

  render() {
    const { errors, clearServerErrors } = this.props;
    const { portal, create, join, name, joinCode, error } = this.state;
    return (
      <div className="server-modal">
        {portal && <ServerPortal handleClick={this.handleClick} />}
        {create && (
          <NewServerForm
            name={name}
            handleBack={this.handleBack}
            handleChange={this.handleChange}
            handleCreate={this.handleCreate}
            error={error}
            clearErrors={this.clearErrors}
          />
        )}
        {join && (
          <JoinServerForm
            handleJoin={this.handleJoin}
            errors={errors}
            error={error}
            clearErrors={this.clearErrors}
            joinCode={joinCode}
            handleChange={this.handleChange}
            handleBack={this.handleBack}
            clearServerErrors={clearServerErrors}
            clearCode={this.clearCode}
          />
        )}
      </div>
    );
  }
}

export default ServerModal;
