import React from "react";
import ServerPanel from "./server_panel";
import MemberBar from "./member_bar";

class Server extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { requestServer, match } = this.props;
    requestServer(match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    const { serverId } = this.props.match.params;
    const prevId = prevProps.match.params.serverId;
    if (serverId !== prevId) this.props.requestServer(serverId);
  }

  render() {
    const { members, sidebarOpen, server } = this.props;
    return (
      <div className="server-frame">
        <ServerPanel {...this.props} />
        {sidebarOpen && <MemberBar members={members} owner={server.owner} />}
      </div>
    );
  }
}

export default Server;
