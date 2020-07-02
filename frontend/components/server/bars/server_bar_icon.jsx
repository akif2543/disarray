import React from "react";
import { Link } from "react-router-dom";

import Tooltip from "../../ui/tooltip";

class ServerBarIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltip: false,
    };
    this.showTooltip = this.showTooltip.bind(this);
    this.hideTooltip = this.hideTooltip.bind(this);
    this.icon = React.createRef();
  }

  showTooltip() {
    return this.setState({ tooltip: true });
  }

  hideTooltip() {
    return this.setState({ tooltip: false });
  }

  render() {
    const { server, active } = this.props;
    const initials = server.name
      .split(" ")
      .map((w) => w[0])
      .join("");
    const { tooltip } = this.state;
    return (
      <div>
        <Link to={`/channels/${server.id}/${server.channels[0]}`}>
          <button
            className={active ? "server-icon active" : "server-icon"}
            type="button"
            onMouseOver={this.showTooltip}
            onFocus={this.showTooltip}
            onMouseOut={this.hideTooltip}
            onBlur={this.hideTooltip}
            ref={this.icon}
          >
            {!server.icon && <h1>{initials}</h1>}
          </button>
        </Link>
        {tooltip && (
          <Tooltip text={server.name} className="s-icon-tt" el={this.icon} />
        )}
      </div>
    );
  }
}

export default ServerBarIcon;
