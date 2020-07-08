import React from "react";
import shortid from "shortid";
import debounce from "lodash.debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "./message";

class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: null,
      lastTime: 1,
      loading: false,
      scrolling: false,
      editting: false,
    };
    this.bottom = React.createRef();
    this.scroller = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.setTimestamp = this.setTimestamp.bind(this);
    this.setSlice = this.setSlice.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.jumpBack = this.jumpBack.bind(this);
    this.toggleEditting = this.toggleEditting.bind(this);
  }

  componentDidMount() {
    this.scroller.current.addEventListener(
      "scroll",
      debounce(this.handleScroll, 150)
    );
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

    if (snapshot) {
      this.scroller.current.scrollTop =
        this.scroller.current.scrollHeight - snapshot;
      this.setSlice("loading", false);
    } else if (prevProps.messages[0] !== this.props.messages[0]) {
      this.setTimestamp();
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
    if (ts) this.setSlice("timestamp", ts.createdAt);
  }

  setSlice(slice, update) {
    this.setState({ [slice]: update });
  }

  resetState() {
    this.setState({
      timestamp: null,
      lastTime: 1,
      loading: false,
      scrolling: false,
    });
  }

  triggerLoad() {
    this.setState({ scrolling: true, loading: true });
  }

  handleScroll() {
    if (!this.scroller.current) return;
    if (
      this.scroller.current.scrollHeight === this.scroller.current.clientHeight
    )
      return;
    if (
      this.scroller.current.scrollHeight - this.scroller.current.scrollTop ===
      this.scroller.current.clientHeight
    )
      this.jumpBack();
    if (this.state.loading || this.scroller.current.scrollTop !== 0) return;
    this.triggerLoad();
  }

  toggleEditting() {
    const { editting } = this.state;
    this.setState({ editting: !editting });
  }

  jumpBack() {
    this.setState({ scrolling: false });
  }

  handleLoad() {
    const { loading, timestamp, lastTime } = this.state;
    if (!loading || timestamp === lastTime) return;
    this.setSlice("lastTime", timestamp);
    const { id, fetchMessages, type } = this.props;
    const time = new Date(timestamp).getTime();
    fetchMessages(type, id, time);
  }

  render() {
    const seen = [];
    const last = [];
    const { memberbar, messages, user, updateMessage } = this.props;
    const { scrolling } = this.state;
    return (
      <main className={memberbar ? "chat" : "chat wide"} ref={this.scroller}>
        <ul className="message-list">
          <div ref={this.bottom} />
          {messages.map((m) => {
            if (m === undefined || !m) return null;
            if (seen.includes(m.id)) return;
            seen.push(m.id);
            last.unshift(m.author.id);
            return (
              <Message
                key={shortid.generate()}
                m={m}
                bottom={this.bottom}
                short={last[1] === m.author.id}
                u={user}
                updateMessage={updateMessage}
                toggleEditting={this.toggleEditting}
              />
            );
          })}
        </ul>
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
