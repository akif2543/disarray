class ServerChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @server = Server.find_by(id: params[:id])
    stream_for @server if @server
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
