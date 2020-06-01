class Api::SessionsController < ApplicationController

  def create
    if User.find_by(email: params[:user][:email])
      @user = User.find_by_credentials(params[:user][:email], params[:user][:password])
      if @user
        login!(@user)
        render "api/users/show"
      else
        render json: ["Password does not match"], status: 422
      end
    else
      render json: ["Email does not exist"], status: 422
    end
  end

  def destroy
    if current_user
      logout!
      render json: { }
    else
      render json: ["No current user"], status: 404
    end
  end
end