class ConversationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    @user = User.find_by(id: params[:id])
    stream_for @user if @user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
