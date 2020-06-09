export const RECEIVE_SUBSCRIPTION = "RECEIVE_SUBSCRIPTION";
export const REMOVE_SUBSCRIPTION = "REMOVE_SUBSCRIPTION";

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const REMOVE_MESSAGE = "REMOVE_MESSAGE";

export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  ...message,
});

// export const createSubscription = (params) => (
//   App.cable.subscriptions.create(params, {
//     received: (data) => receiveMessage(data),
//     speak(data) {
//       return this.perform("speak", data);
//     }
//   })
// )
