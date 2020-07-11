class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def show
    if params[:cu]
      render( partial: "api/users/current_user", locals: {user: current_user})
    else
      begin
        @user = User.includes(:servers).find(params[:id])
        render :show
      rescue
        render json: ["User not found."], status: 404
      end
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render( partial: "api/users/current_user", locals: {user: @user})
    else
      render json: User.discordify_errors(@user.errors.full_messages), status: 422
    end
  end

  def update
    if current_user
      if @current_user.is_password?(params[:user][:currentPassword])
        if @current_user.update(user_params)
          render( partial: "api/users/current_user", locals: {user: @current_user})
        else
          render json: User.discordify_errors(@current_user.errors.full_messages), status: 422
        end
      else
        render json: [["current password", "Password does not match."]], status: 422
      end
    else
      render json: ["You don't have permission to do that."], status: 403
    end
  end

  def destroy
    if current_user
      if @current_user.is_password?(params[:user][:password])
        @current_user.destroy
        render json: {success: true}, status: 204
      else
        render json: [["current password", "Password does not match."]], status: 422
      end
      
    else
      render json: ["You don't have permission to do that."], status: 403
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
