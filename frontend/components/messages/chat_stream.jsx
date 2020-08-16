import React from "react";
import shortid from "shortid";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MessageContainer from "./message_container";
import ChatBannerContainer from "./chat_banner";
import { sameDay } from "../../util/date_util";

class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: null,
      lastTime: 1,
      loading: false,
      scrolling: false,
      editing: false,
    };
    this.bottom = React.createRef();
    this.scroller = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.setTimestamp = this.setTimestamp.bind(this);
    this.setSlice = this.setSlice.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.jumpBack = this.jumpBack.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  componentDidMount() {
    this.setTimestamp();
    this.scroller.current.addEventListener(
      "scroll",
      debounce(this.handleScroll, 150)
    );
    if (this.bottom.current) this.bottom.current.scrollIntoView();
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (
      prevProps.messages.length &&
      prevProps.messages[0] &&
      this.props.messages[0] &&
      prevProps.messages[0].id !== this.props.messages[0].id
    ) {
      return this.scroller.current.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { type, id } = this.props;
    if (
      (type === prevProps.type && id !== prevProps.id) ||
      (type !== prevProps.type && id === prevProps.id)
    ) {
      this.resetState();
      return;
    }

    if (
      prevProps.messages[0] !== this.props.messages[0] ||
      !prevProps.messages.length
    )
      this.setTimestamp();

    if (snapshot) {
      this.scroller.current.scrollTop =
        this.scroller.current.scrollHeight - snapshot;
      this.setSlice("loading", false);
    } else if (this.state.loading && !prevState.loading) {
      this.handleLoad();
    } else if (
      this.bottom.current &&
      !this.state.scrolling &&
      !this.state.editing
    ) {
      this.bottom.current.scrollIntoView();
    }
  }

  componentWillUnmount() {
    this.scroller.current.removeEventListener(
      "scroll",
      debounce(this.handleScroll, 150)
    );
  }

  setTimestamp() {
    const ts = this.props.messages[0];
    if (ts) this.setState({ timestamp: ts.createdAt });
  }

  setSlice(slice, update) {
    this.setState({ [slice]: update });
  }

  resetState() {
    const ts = this.props.messages[0];
    this.setState({
      timestamp: ts ? ts.createdAt : null,
      lastTime: 1,
      loading: false,
      scrolling: false,
    });
  }

  triggerLoad() {
    this.setState({ scrolling: true, loading: true });
  }

  handleScroll() {
    const { loading, editing } = this.state;

    if (!this.scroller.current) return;
    if (
      this.scroller.current.scrollHeight === this.scroller.current.clientHeight
    )
      return;
    if (
      this.scroller.current.scrollHeight - this.scroller.current.scrollTop ===
        this.scroller.current.clientHeight &&
      !editing
    )
      this.jumpBack();
    if (loading || this.scroller.current.scrollTop !== 0) return;
    this.triggerLoad();
  }

  toggleEditing() {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  jumpBack() {
    this.setState({ scrolling: false });
  }

  handleLoad() {
    const { loading, timestamp, lastTime } = this.state;
    if (!loading) return;
    if (timestamp === lastTime) {
      this.setSlice("loading", false);
      return;
    }
    this.setState({ lastTime: timestamp });
    const { id, fetchMessages, type } = this.props;
    const time = new Date(timestamp).getTime();
    fetchMessages(type, id, time).then((action) => {
      if (!action.messages) this.setSlice("loading", false);
    });
  }

  render() {
    const seen = new Set();
    const last = [];
    const {
      memberbar,
      messages,
      isNew,
      user: { blocked },
    } = this.props;
    const { scrolling, loading } = this.state;
    return (
      <main className={memberbar ? "chat" : "chat wide"} ref={this.scroller}>
        {isNew && <ChatBannerContainer />}
        <div ref={this.bottom} className="loader">
          {loading && <FontAwesomeIcon icon="spinner" spin />}
        </div>
        {messages.map((m) => {
          if (m === undefined || !m) return null;
          if (blocked[m.author]) return null;
          if (seen.has(m.id)) return null;
          seen.add(m.id);
          last.unshift([m.author, m.createdAt]);
          const short =
            last[1] &&
            last[1][0] === m.author &&
            sameDay(last[1][1], m.createdAt);
          return (
            <MessageContainer
              key={shortid.generate()}
              m={m}
              bottom={this.bottom}
              short={short}
              toggleEditing={this.toggleEditing}
            />
          );
        })}
        {scrolling && (
          <div className={memberbar ? "unread-alert" : "unread-alert wide"}>
            <button onClick={this.jumpBack} type="button">
              You&apos;re Viewing Older Messages
            </button>
            <button onClick={this.jumpBack} type="button">
              Jump To Present
              <FontAwesomeIcon
                icon="angle-down"
                style={{ marginLeft: "10px" }}
              />
            </button>
          </div>
        )}
      </main>
    );
  }
}

export default ChatStream;
