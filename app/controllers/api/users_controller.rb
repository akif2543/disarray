class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def show
    begin
      @user = User.find(params[:id])
      render :show
    rescue
      render json: {error: "User not found", status: 404}
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
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
