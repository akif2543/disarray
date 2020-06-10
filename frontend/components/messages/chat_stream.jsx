import React from "react";
import shortid from "shortid";
// import debounce from "lodash.debounce";

import Message from "./message";

class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
    this.scroller = React.createRef();
    // this.initialFetch = false;
  }

  componentDidUpdate(prevProps) {
    // if (this.bottom.current && !this.initialFetch)
    //   this.bottom.current.scrollIntoView();
    // const { messages, fetchMessages } = this.props;
    // if (!messages[0]) return;
    // this.initialFetch = true;
    // if (messages[0] !== prevProps.messages[0]) {
    //   this.scroller.current.addEventListener(
    //     "scroll",
    //     debounce(() => {
    //       if (this.scroller.current.scrollTop < 200) {
    //         const { createdAt, textChannel, messageableId } = messages[0];
    //         const time = new Date(createdAt).getTime();
    //         fetchMessages(messageableId, time);
    //       }
    //     }, 100)
    //   );
    // } else {
    if (this.bottom.current) this.bottom.current.scrollIntoView();
    // }
  }

  render() {
    const { memberbar, messages } = this.props;
    return (
      <main className={memberbar ? "chat" : "chat wide"} ref={this.scroller}>
        <ul className="message-list">
          <div ref={this.bottom} />
          {messages.map((m) =>
            m === undefined || !m ? null : (
              <Message key={shortid.generate()} m={m} bottom={this.bottom} />
            )
          )}
        </ul>
      </main>
    );
  }
}

export default ChatStream;
