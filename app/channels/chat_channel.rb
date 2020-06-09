class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @channel = Channel.find_by(id: params[:channel_id])
    stream_for @channel if @channel
  end

  def speak(data)
    @message = Message.new(data["message"])
    if @message.save
      ChatChannel.broadcast_to(@channel, format_message)
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  private

  def format_message
    json = ApplicationController.render(
        partial: "api/messages/full_message.json.jbuilder",
        locals: { message: @message})
    JSON.parse(json)
  end
end
