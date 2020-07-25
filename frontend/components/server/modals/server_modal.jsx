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
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleClick(type) {
    return () => this.setState({ [type]: true, portal: false });
  }

  handleBack(type) {
    return () => this.setState({ [type]: false, portal: true });
  }

  render() {
    const {
      errors,
      clearServerErrors,
      history: { push },
      createServer,
      joinServer,
      currentUser,
    } = this.props;
    const { portal, create, join } = this.state;
    return (
      <div className="server-modal">
        {portal && <ServerPortal handleClick={this.handleClick} />}
        {create && (
          <NewServerForm
            u={currentUser}
            handleBack={this.handleBack}
            createServer={createServer}
            clearServerErrors={clearServerErrors}
            push={push}
          />
        )}
        {join && (
          <JoinServerForm
            joinServer={joinServer}
            errors={errors}
            handleBack={this.handleBack}
            clearServerErrors={clearServerErrors}
            push={push}
          />
        )}
      </div>
    );
  }
}

export default ServerModal;
