class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find_by(id: params[:id])
    stream_from "appearance_channel"
    appear if @user
  end

  def appear
    unless @user.online
      @user.update(online: true)
      receive({id: params[:id], online: true})
    end
  end

  # def away
  #   p params
  #   receive({id: params[:id], status: "Idle"})
  # end

  def receive(data)
    ActionCable.server.broadcast("appearance_channel", data)
  end

  def unsubscribed
    @user.update(online: false)
    receive({id: params[:id], online: false})
  end
end
