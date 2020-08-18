import ChannelAPI from "../util/channel_api_util";

export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const REMOVE_CHANNEL = "REMOVE CHANNEL";
export const MARK_CHANNEL_READ = "MARK_CHANNEL_READ";
export const RECEIVE_CHANNEL_ERRORS = "RECEIVE_CHANNEL_ERRORS";
export const CLEAR_CHANNEL_ERRORS = "CLEAR_CHANNEL_ERRORS";

export const receiveChannel = (channel) => ({
  type: RECEIVE_CHANNEL,
  ...channel,
});

export const removeChannel = (channel) => ({
  type: REMOVE_CHANNEL,
  ...channel,
});

export const markChannelRead = (id) => ({
  type: MARK_CHANNEL_READ,
  id,
});

export const receiveChannelErrors = (errors) => ({
  type: RECEIVE_CHANNEL_ERRORS,
  errors,
});

export const clearChannelErrors = () => ({
  type: CLEAR_CHANNEL_ERRORS,
});

export const fetchChannel = (id) => (dispatch) =>
  ChannelAPI.fetchChannel(id)
    .then((channel) => dispatch(receiveChannel(channel)))
    .fail((e) => dispatch(receiveChannelErrors(e.responseJSON)));

export const createChannel = (channel) => (dispatch) =>
  ChannelAPI.createChannel(channel).fail((e) =>
    dispatch(receiveChannelErrors(e.responseJSON))
  );

export const updateChannel = (channel) => (dispatch) =>
  ChannelAPI.updateChannel(channel).fail((e) =>
    dispatch(receiveChannelErrors(e.responseJSON))
  );

export const deleteChannel = (id) => (dispatch) =>
  ChannelAPI.deleteChannel(id).fail((e) =>
    dispatch(receiveChannelErrors(e.responseJSON))
  );
