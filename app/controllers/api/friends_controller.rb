class Api::FriendsController < ApplicationController

  before_action :ensure_logged_in

  def index

  end

  def show
    @user = User.includes(:friends).find_by(id: params[:id])
    if @user
      @mutuals = current_user.mutual_friends(@user)
      render(partial: "api/users/user", locals: {user: @user, mutuals: @mutuals})
    else
      render json: ["User not found"], status: 404
    end
  end

  def create
    @user = User.find_by(id: params[:id])
    if @user
      current_user.friend_request(@user)
      render json: {success: "request sent", id: current_user.id, otherId: @user.id }, status: 201
    else
      render json: ["User not found"], status: 404
    end
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user
      if params[:add]
        current_user.accept_request(@user)
        render json: {accept: "request accepted", id: current_user.id, otherId: @user.id }, status: 201
      else
        current_user.decline_request(@user)
        render json: {decline: "request declined", id: current_user.id, otherId: @user.id }, status: 200
      end
    else
      render json: ["User not found"], status: 404
    end
  end

  def destroy
    @user = User.find_by(id: params[:id])
    if @user && current_user.friends_with?(@user)
     @current_user.remove_friend(@user)
     render json: {success: "User unfriended", id: current_user.id, otherId: @user.id }, status: 200
    else
      render json: ["User not found"], status: 404
    end
  end
end
