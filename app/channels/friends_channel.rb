class FriendsChannel < ApplicationCable::Channel
  def subscribed
    user = User.find_by(id: params[:id])
    stream_for user
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
