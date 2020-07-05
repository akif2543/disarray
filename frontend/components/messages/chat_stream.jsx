import React, { useRef, useEffect, useState } from "react";
import shortid from "shortid";
import debounce from "lodash.debounce";

import Message from "./message";

// const ChatStream = ({ memberbar, messages, id, fetchMessages }) => {
//   const top = useRef(null);
//   const bottom = useRef(null);
//   const scroller = useRef(null);

//   const timestamp = messages[0] ? messages[0].createdAt : null;

//   const [lastTime, setLastTime] = useState(1);
//   const [lastHeight, setLastHeight] = useState(0);
//   const [load, setLoad] = useState(false);
//   const [scrolling, setScrolling] = useState(false);

//   const handleScroll = () => {
//     // console.log(`scroller.current.scrollTop: ${scroller.current.scrollTop}`);
//     // console.log(
//     //   `scroller.current.clientHeight: ${scroller.current.clientHeight}`
//     // );
//     if (load || scroller.current.scrollTop !== 0) return;
//     setLastHeight(scroller.current.scrollHeight);
//     setScrolling(true);
//     setLoad(true);
//     setTimeout(() => setLoad(false), 2000);
//   };

//   useEffect(() => {
//     scroller.current.addEventListener("scroll", debounce(handleScroll, 150));
//     return () =>
//       scroller.current.removeEventListener(
//         "scroll",
//         debounce(handleScroll, 150)
//       );
//   }, [scroller.current]);

//   useEffect(() => {
//     if (!scrolling && bottom.current) bottom.current.scrollIntoView();
//     if (scrolling && bottom.current) {

//       // scroller.current.scrollTop = scroller.current.scrollHeight - lastHeight;
//     }
//   }, [bottom.current]);

//   useEffect(() => {
//     if (!load || timestamp === lastTime) return;
//     setLastTime(timestamp);
//     const time = new Date(timestamp).getTime();
//     fetchMessages(id, time);
//   }, [load]);

//   const seen = [];
//   return (
//     <main className={memberbar ? "chat" : "chat wide"} ref={scroller}>
//       <ul className="message-list">
//         {/* <div ref={top} /> */}
//         <div ref={bottom} />
//         {messages.map((m) => {
//           if (m === undefined || !m) return null;
//           seen.unshift(m.author.id);
//           return (
//             <Message
//               key={shortid.generate()}
//               m={m}
//               bottom={bottom}
//               short={seen[1] === m.author.id}
//             />
//           );
//         })}
//       </ul>
//     </main>
//   );
// };

class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: null,
      lastTime: 1,
      loading: false,
      scrolling: false,
      unreads: false,
    };
    this.bottom = React.createRef();
    this.scroller = React.createRef();
    this.handleScroll = this.handleScroll.bind(this);
    this.setTimestamp = this.setTimestamp.bind(this);
    this.toggleLoad = this.toggleLoad.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
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
      prevProps.messages[0] !== null &&
      prevProps.messages[0].id !== this.props.messages[0].id
    ) {
      const scroller = this.scroller.current;
      return scroller.scrollHeight;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      debugger;
      this.scroller.current.scrollTop =
        this.scroller.current.scrollHeight - snapshot;
      this.toggleLoad(false);
      debugger;
    } else if (prevProps.messages[0] !== this.props.messages[0]) {
      this.setTimestamp();
    } else if (this.state.loading && !prevState.loading) {
      this.handleLoad();
    } else if (this.bottom.current && !this.state.scrolling) {
      this.bottom.current.scrollIntoView();
    } else if (this.bottom.current && this.state.scrolling) {
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

  handleScroll() {
    if (!this.scroller.current) return;
    if (this.state.loading || this.scroller.current.scrollTop !== 0) return;
    this.toggleScroll(true);
    this.toggleLoad(true);
  }

  toggleScroll(bool) {
    this.setState({ scrolling: bool });
  }

  toggleLoad(bool) {
    this.setState({ loading: bool });
  }

  handleLoad() {
    const { loading, timestamp, lastTime } = this.state;
    if (!loading || timestamp === lastTime) return;
    this.setState({ lastTime: timestamp });
    const { id, fetchMessages } = this.props;
    const time = new Date(timestamp).getTime();
    fetchMessages(id, time);
  }

  render() {
    const seen = [];
    const { memberbar, messages } = this.props;
    const { unreads } = this.state;
    return (
      <main className={memberbar ? "chat" : "chat wide"} ref={this.scroller}>
        <ul className="message-list">
          <div ref={this.bottom} />
          {messages.map((m) => {
            if (m === undefined || !m) return null;
            seen.unshift(m.author.id);
            return (
              <Message
                key={shortid.generate()}
                m={m}
                bottom={this.bottom}
                short={seen[1] === m.author.id}
              />
            );
          })}
        </ul>
        {unreads && (
          <div className="unread-alert">You have unread messages</div>
        )}
      </main>
    );
  }
}

export default ChatStream;
