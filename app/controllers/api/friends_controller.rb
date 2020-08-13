class Api::FriendsController < ApplicationController

  before_action :ensure_logged_in

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
    unless params[:block]
      if !@user || @user == current_user || current_user.friends_with?(@user)
        render json: ["User not found"], status: 404
      else
        if current_user.friend_request(@user)
          FriendsChannel.broadcast_to(@user, format_request)
        else
          render json: ["Cannot send a friend request to this user"], status: 400
        end
      end
    else
      if !@user || @user == current_user
        render json: ["User not found"], status: 404
      else
        @current_user.remove_friend(@user) if current_user.friends_with?(@user)
        @current_user.block_friend(@user)  
        FriendsChannel.broadcast_to(@user, format_block)
      end
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user
      if params[:accept] && current_user.requested_friends.include?(@user)
        @request = "accept"
        @current_user.accept_request(@user)
        FriendsChannel.broadcast_to(@user, format_response)
      elsif params[:decline] && current_user.requested_friends.include?(@user)
        @request = "decline"
        @current_user.decline_request(@user)
        FriendsChannel.broadcast_to(@user, format_response)
      elsif params[:cancel] && current_user.pending_friends.include?(@user)
        @request = "cancel"
        @user.decline_request(@current_user)
        FriendsChannel.broadcast_to(@user, format_response)
      else 
        render json: ["User not found"], status: 404
      end
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

  def format_block
    JSON.parse(render("api/friends/block.json.jbuilder"))
  end
end
