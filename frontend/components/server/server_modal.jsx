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
      name: "",
      code: `${this.props.currentUser.username}'s server`,
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    const server = { name };
    this.props.createServer(server);
  }

  handleJoin(e) {
    e.preventDefault();
    const { code } = this.state;
    const membership = { code };
    this.props.joinServer(membership);
  }

  render() {
    const { currentUser } = this.props;
    const { portal, create, join, name, code } = this.state;
    return (
      <div className="server-modal">
        {/* {portal && 
        <ServerPortal handleClick={this.handleClick} />} */}
        {/* {create && ( */}
        <NewServerForm
          name={name}
          currentUser={currentUser}
          handleBack={this.handleBack}
          handleChange={this.handleChange}
          handleCreate={this.handleCreate}
        />
        {/* )} */}
      </div>
    );
  }
}

export default ServerModal;
