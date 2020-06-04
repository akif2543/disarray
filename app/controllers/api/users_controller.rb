class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def show
    begin
      @user = User.includes(:servers).find(params[:id])
      render :show
    rescue
      render json: ["User not found."], status: 404
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    begin
      @user = User.includes(:servers).find(params[:id])
      if @user.update(user_params)
        render :show
      else
        render json: @user.errors.full_messages, status: 422
      end
    rescue
      render json: ["User not found."], status: 404
    end
  end

  def destroy
    begin
      @user = User.find(params[:id])
      @user.destroy
      render status: 204
    rescue
      render json: ["User not found."], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
