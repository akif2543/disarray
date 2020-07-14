class Api::FriendsController < ApplicationController

  before_action :ensure_logged_in

  def index

  end

  def show
    @user = User.includes(:friends).find_by(id: params[:id])
    if @user
      @mutuals = current_user.mutual_friends(@user)
      render "api/users/show"
    else
      render json: ["User not found"], status: 404
    end
  end

  def create
    @user = params[:id] ? User.find_by(id: params[:id]) : User.find_by(username: params[:user][:username], discriminator: params[:user][:discriminator])
    if !@user || @user == current_user
      render json: ["User not found"], status: 404
    else
      current_user.friend_request(@user)
      FriendsChannel.broadcast_to(@user, format_request)
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user
      if params[:accept]
        @request = "accept"
        current_user.accept_request(@user)
      elsif params[:decline]
        @request = "decline"
        current_user.decline_request(@user)
      else
        @request = "cancel"
        @user.decline_request(current_user)
      end
      FriendsChannel.broadcast_to(@user, format_response)
    else
      render json: ["User not found"], status: 404
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user && current_user.friends_with?(@user)
     @current_user.remove_friend(@user)
     FriendsChannel.broadcast_to(@user, format_unfriend)
    else
      render json: ["User not found"], status: 404
    end
  end

  private

  def format_request
    JSON.parse(render("api/friends/create.json.jbuilder"))
  end

  def format_response
    JSON.parse(render("api/friends/update.json.jbuilder"))
  end

  def format_unfriend
    JSON.parse(render("api/friends/destroy.json.jbuilder"))
  end

end
