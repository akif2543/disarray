import React from "react";
import shortid from "shortid";

import Message from "./message";

class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
    this.scroller = React.createRef();
  }

  componentDidMount() {
    // this.scroller.addEventListener("scroll", () => {});
  }

  componentDidUpdate() {
    if (this.bottom.current) return this.bottom.current.scrollIntoView();
  }

  render() {
    const { memberbar, messages } = this.props;
    return (
      <main className={memberbar ? "chat" : "chat wide"}>
        <ul className="message-list" ref={this.scroller}>
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

// const ChatStream = ({ messages, memberbar }) => {
//   let bottom;

//   useEffect(() => {
//     debugger;
//     if (bottom.current) bottom.current.scrollIntoView();
//   }, [messages]);

//   return (
//     <main className={memberbar ? "chat" : "chat wide"}>
//       <ul className="message-list">
//         <div ref={(elem) => (bottom = elem)} />
//         {messages.map((m) => {
//           if (m === undefined || !m) return null;
//           return (
//             <li key={shortid.generate()}>
//               <h6>{m.author.username}</h6>
//               <span>{m.createdAt}</span>
//               <p>{m.body}</p>
//               <div ref={(elem) => (bottom = elem)} />
//             </li>
//           );
//         })}
//       </ul>
//     </main>
//   );
// };

// export default ChatStream;
