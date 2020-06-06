import React from "react";
import { Link } from "react-router-dom";
import ServerIconTooltip from "./server_icon_tooltip";

class ServerBarIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: false,
      contextMenu: false,
    };
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
  }

  showTooltip() {
    return this.setState({ tooltip: true });
  }

  hideTooltip() {
    return this.setState({ tooltip: false });
  }

  render() {
    const { server } = this.props;
    const { tooltip, contextMenu } = this.state;
    return (
      <div>
        <Link to={`/channels/${server.id}`}>
          <button
            className="server-icon"
            type="button"
            onHover={this.showTooltip}
            onBlur={this.hideTooltip}
          ></button>
        </Link>
        {tooltip && <ServerIconTooltip text={server.name} />}
      </div>
    );
  }
}

export default ServerBarIcon;
