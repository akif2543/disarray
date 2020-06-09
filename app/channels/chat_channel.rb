class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @channel = Channel.find_by(id: params[:channel_id])
    stream_for @channel if @channel
  end

  def speak
    @message = Message.new(m_params)
    if @message.save
      ChatChannel.broadcast_to(@channel, format_message)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def m_params
    params.require(:message).permit(:body, :author_id, :messageable_type, :messageable_id)
  end

  def format_message
    json = ApplicationController.render(
        partial: "api/messages/message.json.jbuilder",
        locals: { message: @message})
    JSON.parse(json)
  end
end
