# README

![Disarray](/app/assets/images/logo_readme.png "Disarray Logo")
[Disarray](http://www.disarray-chat.herokuapp.com) is a clone of the popular chat app [Discord](http://www.discord.com). It allows users to create or join chat servers that can each contain multiple chat channels. Users can send instant messages on these channels and those messages will be broadcast to all members of that server, or they can choose to privately direct message other users.

![Disarray Splash](/app/assets/images/splash_readme.png "Disarray Splash Page")
Artwork by [Tania Tiedemann](https://www.instagram.com/tatied.art/)

![Disarray Chat](/app/assets/images/chat_readme.png "Disarray Chat Channel")

## Technologies Used

Disarray was created with a Rails backend and a React frontend, with Redux used for state management. Rails' Action Cable and Redis were used to integrate WebSockets into the application and allow for live chat.

## Challenges

### Overflow & Tooltips

One of the least expected challenges I encountered in this project was properly positioning and displaying tooltips. Discord has a number of tooltips throughout their application that appear when you hover specific components, like the server icons on the vertical bar on the far left, or on the icons on the horizontal navbar at the very top. Initially, implementing them was relatively straightforward, as simple as setting the outer tooltip div to `position: relative` and the content to `position: absolute`. The problem arose when tooltips needed to be inside containers with `overflow-y: scroll`. By design, when an element's overflow is set to scroll in one direction, the overflow in the other direction is set to auto. In the case of the server bar, this meant none of the tooltips would be visible as they were situated outside the container's x-axis.

I did some Googling but wasn't able to find a direct solution to my problem, but I did come across a [tip](https://css-tricks.com/popping-hidden-overflow/) to wrap the scrollable element in a div with `position: relative`, and then use
`position: absolute` on the tooltip to position it in relation to the parent wrapper and allow the tooltip to appear outside the scrollable element's margins. In order to make this work in the case of the server bar, I would have to dynamically set the top and left properties of the tooltips using the position of the server icons on the screen. I try to avoid using refs unless absolutely necessary in React, but this seemed like a no-brainer. I created a ref to the server icon button and passed it to the tooltip component as a prop.

```js
const ServerBarIcon = ({ server, active }) => {
  const [tooltip, setTooltip] = useState(false);
  const el = useRef(null);

  const toggleTooltip = (bool) => () => setTooltip(bool);

  return (
    <div>
      <button
        className={active ? "server-icon active" : "server-icon"}
        type="button"
        onMouseOver={toggleTooltip(true)}
        onFocus={toggleTooltip(true)}
        onMouseOut={toggleTooltip(false)}
        onBlur={toggleTooltip(false)}
        ref={el}
      >
        {!server.icon && <h1>{initials}</h1>}
      </button>
      {tooltip && <Tooltip text={server.name} className="sb-tt" el={el} />}
    </div>
  );
};
```

In the tooltip component, I used `element.getBoundingClientRect()` to get the distance from the top of the viewport to the bottom of the element, then subtracted half the height of the tooltip and half the element's height, and incorporated that into an inline style to line the tooltip up with the proper element, like so:

```js
<div
  className={`tooltip ${className}`}
  style={{ top: `${bottom - 17.5 - height / 2}px` }}
>
```

And just like that, I had visible tooltips in an `overflow-y: scroll` container!

![Tooltip](/app/assets/images/tooltip_readme.png "Disarray Server Bar Tooltip")

### Infinite Scroll in a Chat Channel

Another obstacle I encountered was implementing infinite scroll in chat channels to load earlier messages. I wanted each channel to only load a batch of the most recent messages, and then allow the user to request earlier messages at their will. The chat component uses refs (_sigh_, once again) to scroll to the bottom of the chat whenever a new message is received using `element.scrollIntoView()`. This behavior proved problematic when attempting to load earlier messages though. The user would scroll to the top of the chat, triggering a request to fetch a batch of earlier messages, but when the chat component was updated to include those messages, the most recent message would scroll into view, causing the scrollbar to jump all the way back to the bottom of the component, and forcing the user to have to scroll all the way back up in order to view the messages they requested. Not very user-friendly!

To get past this issue, I needed to find a way to temporarily disable the scroll into view call when earlier messages were being fetched. To accomplish this I created `loading` and `scrolling` slices of local state:

```js
class ChatStream extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      scrolling: false,
    };
```

When the scrollbar reaches the top of the chat, both `loading` and `scrolling` get set to `true`. I also adjusted my `componentDidUpdate` method to fetch more messages when `loading` changed from `false` to `true`, and for the last message in the chat to scroll into view only when `scrolling` was set to `false`:

```js
if (this.state.loading && !prevState.loading) {
  this.handleLoad();
} else if (this.bottom.current && !this.state.scrolling) {
  this.bottom.current.scrollIntoView();
}
```

This fixed the issue of the scrollbar jumping to the bottom of the component when earlier messages were loaded, however, it was now doing the opposite——it would jump to the top of the chat instead! You know how the old saying goes, _one step forward, two steps back_.... I did some digging and found that React has a (somewhat obscure) lifecycle method specifically for such a usecase. (And herein lies the reason this is a class component and not a functional one as I would have preferred.) So I used the `getSnapshotBeforeUpdate` method to check if the first message in the component's current props was different than the first one in the previous props, and if so, to return the scroll height of the chat before the new messages were added. Otherwise, return null.

```js
getSnapshotBeforeUpdate(prevProps) {
    if (
      prevProps.messages[0].id !== this.props.messages[0].id
    ) {
      return this.scroller.current.scrollHeight;
    }
    return null;
  }
```

The return value from this method actually gets passed to `componentDidUpdate` as an argument with the parameter `snapshot`. With that in mind, I tweaked my update method to check if a snapshot was present, and if so, to get the new scroll height of the chat and set the scrollbar to the difference between the new height and the previous height, thus retaining the user's scroll position in the chat history. Once this was done, I set `loading` to `false`.

```js
if (snapshot) {
  this.scroller.current.scrollTop =
    this.scroller.current.scrollHeight - snapshot;
  this.setState({ loading: false });
}
```

I also incorporated a banner like Discord does to signal to the user that they were viewing older messages when `scrolling` is set to `true`. By clicking it, they could set it back to `false`, which would cause the scroll bar to jump back all the way to the bottom of the chat and reinitiate the scroll into view behavior for new messages. So ended my long odyssey to load earlier messages on scroll!

![Old message alert](/app/assets/images/old_alert_readme.png "Disarray Alert When Viewing Older Messages")
