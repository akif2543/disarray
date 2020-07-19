class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance_channel"
    appear
  end

  def appear
    receive({id: params[:id], status: "Online"})
  end

  def away
    p params
    receive({id: params[:id], status: "Idle"})
  end

  def receive(data)
    ActionCable.server.broadcast("appearance_channel", data)
  end

  def unsubscribed
    receive({id: params[:id], status: "Offline"})
  end
end
